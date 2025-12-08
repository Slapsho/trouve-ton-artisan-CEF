'use client';

import { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { sanitizeInput } from '@/utils/sanitize';
import { validateRequired } from '@/utils/validators';
import styles from './ContactForm.module.scss';

export default function ContactForm({ artisanEmail, artisanName }) {
  const [formData, setFormData] = useState({
    name: '',
    subject: '',
    message: ''
  });

  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState({ type: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Gestion des changements dans le formulaire
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Effacer l'erreur du champ modifié
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  // Validation du formulaire
  const validateForm = () => {
    const newErrors = {};

    if (!validateRequired(formData.name)) {
      newErrors.name = 'Le nom est requis';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Le nom doit contenir au moins 2 caractères';
    }

    if (!validateRequired(formData.subject)) {
      newErrors.subject = "L'objet est requis";
    } else if (formData.subject.trim().length < 3) {
      newErrors.subject = "L'objet doit contenir au moins 3 caractères";
    }

    if (!validateRequired(formData.message)) {
      newErrors.message = 'Le message est requis';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Le message doit contenir au moins 10 caractères';
    } else if (formData.message.trim().length > 1000) {
      newErrors.message = 'Le message ne peut pas dépasser 1000 caractères';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Soumission du formulaire
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Réinitialiser le statut
    setStatus({ type: '', message: '' });
    
    // Valider le formulaire
    if (!validateForm()) {
      setStatus({ 
        type: 'danger', 
        message: 'Veuillez corriger les erreurs dans le formulaire' 
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Préparer les données
      const sanitizedData = {
        name: sanitizeInput(formData.name),
        subject: sanitizeInput(formData.subject),
        message: sanitizeInput(formData.message),
        to: artisanEmail,
        artisanName: artisanName
      };

      console.log('📤 Envoi de l\'email...', { to: sanitizedData.to });

      // Envoyer la requête à l'API
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(sanitizedData),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        console.log('✅ Email envoyé avec succès');
        
        setStatus({
          type: 'success',
          message: `Votre message a été envoyé avec succès à ${artisanName} ! Une réponse vous sera apportée sous 48h.`
        });
        
        // Réinitialiser le formulaire
        setFormData({ name: '', subject: '', message: '' });
        setErrors({});
        
        // Scroll vers le message de succès
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        throw new Error(result.message || 'Erreur lors de l\'envoi');
      }
    } catch (error) {
      console.error('❌ Erreur:', error);
      
      setStatus({
        type: 'danger',
        message: 'Une erreur est survenue lors de l\'envoi du message. Veuillez réessayer.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.contactForm}>
      <h3>Contacter {artisanName}</h3>
      <p className={styles.info}>
        Remplissez ce formulaire pour envoyer un message à {artisanName}. 
        Vous recevrez une réponse sous 48h.
      </p>
      
      {status.message && (
        <Alert 
          variant={status.type} 
          dismissible 
          onClose={() => setStatus({ type: '', message: '' })}
          className="mb-4"
        >
          {status.message}
        </Alert>
      )}

      <Form onSubmit={handleSubmit} noValidate>
        {/* Nom */}
        <Form.Group className="mb-3" controlId="contactName">
          <Form.Label>
            Votre nom <span className="text-danger">*</span>
          </Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            isInvalid={!!errors.name}
            placeholder="Ex: Jean Dupont"
            required
            disabled={isSubmitting}
            maxLength={100}
          />
          <Form.Control.Feedback type="invalid">
            {errors.name}
          </Form.Control.Feedback>
        </Form.Group>

        {/* Objet */}
        <Form.Group className="mb-3" controlId="contactSubject">
          <Form.Label>
            Objet de votre demande <span className="text-danger">*</span>
          </Form.Label>
          <Form.Control
            type="text"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            isInvalid={!!errors.subject}
            placeholder="Ex: Demande de devis pour rénovation"
            required
            disabled={isSubmitting}
            maxLength={200}
          />
          <Form.Control.Feedback type="invalid">
            {errors.subject}
          </Form.Control.Feedback>
        </Form.Group>

        {/* Message */}
        <Form.Group className="mb-3" controlId="contactMessage">
          <Form.Label>
            Votre message <span className="text-danger">*</span>
          </Form.Label>
          <Form.Control
            as="textarea"
            rows={6}
            name="message"
            value={formData.message}
            onChange={handleChange}
            isInvalid={!!errors.message}
            placeholder="Décrivez votre besoin en détail..."
            required
            disabled={isSubmitting}
            maxLength={1000}
          />
          <Form.Text className="text-muted">
            {formData.message.length}/1000 caractères
          </Form.Text>
          <Form.Control.Feedback type="invalid">
            {errors.message}
          </Form.Control.Feedback>
        </Form.Group>

        <Button 
          variant="primary" 
          type="submit" 
          disabled={isSubmitting}
          className={styles.submitButton}
        >
          {isSubmitting ? (
            <>
              <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
              Envoi en cours...
            </>
          ) : (
            <>
              📧 Envoyer le message
            </>
          )}
        </Button>

        <p className={styles.disclaimer}>
          <small>
            * Champs obligatoires. Vos données personnelles sont protégées et ne seront 
            utilisées que dans le cadre de votre demande.
          </small>
        </p>
      </Form>
    </div>
  );
}