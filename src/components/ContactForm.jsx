'use client';

import { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { sanitizeInput } from '@/utils/sanitize';
import { validateEmail, validateRequired } from '@/utils/validators';
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

 
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
   
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

 
  const validateForm = () => {
    const newErrors = {};

    if (!validateRequired(formData.name)) {
      newErrors.name = 'Le nom est requis';
    }

    if (!validateRequired(formData.subject)) {
      newErrors.subject = "L'objet est requis";
    }

    if (!validateRequired(formData.message)) {
      newErrors.message = 'Le message est requis';
    } else if (formData.message.length < 10) {
      newErrors.message = 'Le message doit contenir au moins 10 caractères';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

 
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      setStatus({ type: 'danger', message: 'Veuillez corriger les erreurs' });
      return;
    }

    setIsSubmitting(true);
    setStatus({ type: '', message: '' });

    try {
      
      const sanitizedData = {
        name: sanitizeInput(formData.name),
        subject: sanitizeInput(formData.subject),
        message: sanitizeInput(formData.message),
        to: artisanEmail,
        artisanName: artisanName
      };

      
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(sanitizedData),
      });

      if (response.ok) {
        setStatus({
          type: 'success',
          message: 'Votre message a été envoyé avec succès ! Une réponse vous sera apportée sous 48h.'
        });
       
        setFormData({ name: '', subject: '', message: '' });
      } else {
        throw new Error('Erreur lors de l\'envoi');
      }
    } catch (error) {
      setStatus({
        type: 'danger',
        message: 'Une erreur est survenue. Veuillez réessayer.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.contactForm}>
      <h3>Contacter {artisanName}</h3>
      
      {status.message && (
        <Alert variant={status.type} dismissible onClose={() => setStatus({ type: '', message: '' })}>
          {status.message}
        </Alert>
      )}

      <Form onSubmit={handleSubmit} noValidate>
        {/* Nom */}
        <Form.Group className="mb-3" controlId="name">
          <Form.Label>Votre nom <span className="text-danger">*</span></Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            isInvalid={!!errors.name}
            placeholder="Entrez votre nom"
            required
          />
          <Form.Control.Feedback type="invalid">
            {errors.name}
          </Form.Control.Feedback>
        </Form.Group>

        {/* Objet */}
        <Form.Group className="mb-3" controlId="subject">
          <Form.Label>Objet <span className="text-danger">*</span></Form.Label>
          <Form.Control
            type="text"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            isInvalid={!!errors.subject}
            placeholder="Objet de votre demande"
            required
          />
          <Form.Control.Feedback type="invalid">
            {errors.subject}
          </Form.Control.Feedback>
        </Form.Group>

        {/* Message */}
        <Form.Group className="mb-3" controlId="message">
          <Form.Label>Message <span className="text-danger">*</span></Form.Label>
          <Form.Control
            as="textarea"
            rows={5}
            name="message"
            value={formData.message}
            onChange={handleChange}
            isInvalid={!!errors.message}
            placeholder="Décrivez votre demande..."
            required
          />
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
          {isSubmitting ? 'Envoi en cours...' : 'Envoyer'}
        </Button>
      </Form>
    </div>
  );
}