import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { sanitizeInput, escapeHtml } from '@/utils/sanitize';
import { validateRequired, validateEmail } from '@/utils/validators';
import { rateLimit, getClientIp } from '@/utils/rateLimit';


const limiter = rateLimit({
  interval: 60 * 1000, 
  maxRequestsPerInterval: 5,
});

function createTransporter() {
 
  const isProduction = process.env.NODE_ENV === 'production';
  
  return nodemailer.createTransporter({
    host: process.env.SMTP_HOST || 'localhost',
    port: parseInt(process.env.SMTP_PORT || '1025'),
    secure: isProduction, 
    auth: process.env.SMTP_USER ? {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    } : undefined,
    tls: {
   
      rejectUnauthorized: isProduction,
      minVersion: 'TLSv1.2', 
    }
  });
}

function validateContactForm(data) {
  const errors = [];

  if (!validateRequired(data.name)) {
    errors.push('Le nom est requis');
  } else if (data.name.trim().length < 2) {
    errors.push('Le nom doit contenir au moins 2 caractères');
  } else if (data.name.trim().length > 100) {
    errors.push('Le nom ne peut pas dépasser 100 caractères');
  }

 
  if (!validateRequired(data.subject)) {
    errors.push("L'objet est requis");
  } else if (data.subject.trim().length < 3) {
    errors.push("L'objet doit contenir au moins 3 caractères");
  } else if (data.subject.trim().length > 200) {
    errors.push("L'objet ne peut pas dépasser 200 caractères");
  }

 
  if (!validateRequired(data.message)) {
    errors.push('Le message est requis');
  } else if (data.message.trim().length < 10) {
    errors.push('Le message doit contenir au moins 10 caractères');
  } else if (data.message.trim().length > 5000) {
    errors.push('Le message ne peut pas dépasser 5000 caractères');
  }


  if (!validateRequired(data.to)) {
    errors.push("L'adresse email de destination est requise");
  } else if (!validateEmail(data.to)) {
    errors.push("L'adresse email de destination est invalide");
  } else {
    
    const emailParts = data.to.split('@');
    if (emailParts.length !== 2) {
      errors.push("Format d'email invalide");
    } else {
      const [localPart, domain] = emailParts;
      
    
      if (localPart.length > 64) {
        errors.push("La partie locale de l'email est trop longue");
      }
      
     
      if (domain.length > 255 || !domain.includes('.')) {
        errors.push("Le domaine de l'email est invalide");
      }
      
      
      const suspiciousDomains = ['tempmail.com', 'guerrillamail.com', '10minutemail.com'];
      if (suspiciousDomains.some(d => domain.toLowerCase().includes(d))) {
        errors.push("Les adresses email temporaires ne sont pas autorisées");
      }
    }
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
      </div>
    </body>
    </html>
  `;
}

export async function POST(request) {
  try {
   
    const clientIp = getClientIp(request);
    
    try {
      await limiter.check(clientIp);
    } catch (rateLimitError) {
      console.warn(`⚠️ Rate limit exceeded for IP: ${clientIp}`);
      return NextResponse.json(
        { 
          success: false, 
          message: `Trop de tentatives. Veuillez réessayer dans ${rateLimitError.retryAfter} secondes.`,
        },
        { 
          status: 429,
          headers: {
            'Retry-After': rateLimitError.retryAfter.toString(),
          },
        }
      );
    }

    
    const data = await request.json();

    
    const sanitizedData = {
      name: sanitizeInput(data.name),
      subject: sanitizeInput(data.subject),
      message: sanitizeInput(data.message),
      to: sanitizeInput(data.to),
      artisanName: sanitizeInput(data.artisanName)
    };

    
    const validationErrors = validateContactForm(sanitizedData);
    if (validationErrors.length > 0) {
      console.warn('❌ Validation failed:', validationErrors);
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
      console.log('✅ Serveur SMTP prêt');
    } catch (error) {
      console.error('❌ Erreur SMTP:', error);
      return NextResponse.json(
        { 
          success: false, 
          message: 'Service email temporairement indisponible' 
        },
        { status: 503 }
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

    console.log('✅ Email envoyé:', info.messageId, 'to:', sanitizedData.to);

    return NextResponse.json({
      success: true,
      message: 'Email envoyé avec succès',
    });

  } catch (error) {
    console.error('❌ Erreur:', error);
    
    
    const isProduction = process.env.NODE_ENV === 'production';
    
    return NextResponse.json(
      { 
        success: false, 
        message: 'Une erreur est survenue lors de l\'envoi du message',
        ...(isProduction ? {} : { error: error.message }),
      },
      { status: 500 }
    );
  }
}

export async function GET() {
 
  if (process.env.NODE_ENV === 'production') {
    return NextResponse.json(
      { error: 'Not found' },
      { status: 404 }
    );
  }

  return NextResponse.json({
    status: 'ok',
    message: 'API de contact opérationnelle',
    environment: process.env.NODE_ENV,
  });
}