import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { sanitizeInput, escapeHtml } from '@/utils/sanitize';
import { validateRequired, validateEmail } from '@/utils/validators';


function createTransporter() {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'localhost',
    port: parseInt(process.env.SMTP_PORT || '1025'),
    secure: false, 
    auth: process.env.SMTP_USER ? {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    } : undefined,
    tls: {
      rejectUnauthorized: false 
    }
  });
}


function validateContactForm(data) {
  const errors = [];

  if (!validateRequired(data.name)) {
    errors.push('Le nom est requis');
  }

  if (!validateRequired(data.subject)) {
    errors.push('L\'objet est requis');
  }

  if (!validateRequired(data.message)) {
    errors.push('Le message est requis');
  } else if (data.message.trim().length < 10) {
    errors.push('Le message doit contenir au moins 10 caractères');
  }

  if (!validateRequired(data.to) || !validateEmail(data.to)) {
    errors.push('L\'adresse email de destination est invalide');
  }

  return errors;
}


function generateEmailTemplate(data) {
  const sanitizedName = escapeHtml(data.name);
  const sanitizedSubject = escapeHtml(data.subject);
  const sanitizedMessage = escapeHtml(data.message).replace(/\n/g, '<br>');
  const sanitizedArtisanName = escapeHtml(data.artisanName);

  return `
    <!DOCTYPE html>
    <html lang="fr">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Nouvelle demande de contact</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          line-height: 1.6;
          color: #333;
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
        }
        .header {
          background: linear-gradient(135deg, #0074c7 0%, #00497c 100%);
          color: white;
          padding: 30px;
          text-align: center;
          border-radius: 8px 8px 0 0;
        }
        .content {
          background: #ffffff;
          padding: 30px;
          border: 1px solid #e0e0e0;
          border-top: none;
        }
        .info-row {
          margin-bottom: 20px;
          padding-bottom: 15px;
          border-bottom: 1px solid #f0f0f0;
        }
        .label {
          font-weight: bold;
          color: #0074c7;
          margin-bottom: 5px;
        }
        .value {
          color: #384050;
        }
        .message-box {
          background: #f1f8fc;
          padding: 20px;
          border-radius: 5px;
          margin-top: 20px;
        }
        .footer {
          background: #384050;
          color: white;
          padding: 20px;
          text-align: center;
          font-size: 12px;
          border-radius: 0 0 8px 8px;
        }
        .footer a {
          color: #0074c7;
          text-decoration: none;
        }
      </style>
    </head>
    <body>
      <div class="header">
        <h1>Nouvelle demande de contact</h1>
        <p>Trouve ton artisan - Région Auvergne-Rhône-Alpes</p>
      </div>
      
      <div class="content">
        <p>Bonjour <strong>${sanitizedArtisanName}</strong>,</p>
        <p>Vous avez reçu une nouvelle demande de contact via la plateforme Trouve ton artisan.</p>
        
        <div class="info-row">
          <div class="label">Nom du contact :</div>
          <div class="value">${sanitizedName}</div>
        </div>
        
        <div class="info-row">
          <div class="label">Objet de la demande :</div>
          <div class="value">${sanitizedSubject}</div>
        </div>
        
        <div class="message-box">
          <div class="label">Message :</div>
          <div class="value">${sanitizedMessage}</div>
        </div>
        
        <p style="margin-top: 30px; color: #666; font-size: 14px;">
          <strong>⏱️ Rappel :</strong> Merci de répondre à cette demande sous 48 heures.
        </p>
      </div>
      
      <div class="footer">
        <p>Cet email a été envoyé via la plateforme Trouve ton artisan</p>
        <p>© ${new Date().getFullYear()} Région Auvergne-Rhône-Alpes</p>
        <p>
          <a href="${process.env.NEXT_PUBLIC_SITE_URL}">Visiter le site</a>
        </p>
      </div>
    </body>
    </html>
  `;
}


export async function POST(request) {
  try {
    
    const data = await request.json();

    
    const sanitizedData = {
      name: sanitizeInput(data.name),
      subject: sanitizeInput(data.subject),
      message: sanitizeInput(data.message),
      to: sanitizeInput(data.to),
      artisanName: sanitizeInput(data.artisanName)
    };

    // Validation
    const validationErrors = validateContactForm(sanitizedData);
    if (validationErrors.length > 0) {
      return NextResponse.json(
        { 
          success: false, 
          errors: validationErrors 
        },
        { status: 400 }
      );
    }

    
    const transporter = createTransporter();

    
    try {
      await transporter.verify();
      console.log('✅ Serveur SMTP prêt à envoyer des emails');
    } catch (error) {
      console.error('❌ Erreur de connexion SMTP:', error);
      return NextResponse.json(
        { 
          success: false, 
          message: 'Erreur de configuration du serveur email' 
        },
        { status: 500 }
      );
    }

    
    const mailOptions = {
      from: `"Trouve ton artisan" <${process.env.SMTP_FROM || 'noreply@trouve-ton-artisan.fr'}>`,
      to: sanitizedData.to,
      subject: `Nouvelle demande : ${sanitizedData.subject}`,
      text: `
Nouvelle demande de contact

De : ${sanitizedData.name}
Objet : ${sanitizedData.subject}

Message :
${sanitizedData.message}

---
Cet email a été envoyé via la plateforme Trouve ton artisan.
Merci de répondre sous 48 heures.
      `,
      html: generateEmailTemplate(sanitizedData)
    };

    
    const info = await transporter.sendMail(mailOptions);

    console.log('✅ Email envoyé avec succès:', info.messageId);
    console.log('📧 Aperçu disponible sur: http://localhost:1080');

   
    return NextResponse.json({
      success: true,
      message: 'Email envoyé avec succès',
      messageId: info.messageId
    });

  } catch (error) {
    console.error('❌ Erreur lors de l\'envoi de l\'email:', error);
    
    return NextResponse.json(
      { 
        success: false, 
        message: 'Une erreur est survenue lors de l\'envoi de l\'email',
        error: process.env.NODE_ENV === 'development' ? error.message : undefined
      },
      { status: 500 }
    );
  }
}


export async function GET() {
  return NextResponse.json({
    status: 'ok',
    message: 'API de contact opérationnelle',
    maildev: {
      web: 'http://localhost:1080',
      smtp: 'localhost:1025'
    }
  });
}