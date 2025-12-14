
import React, { useState } from 'react';
import { FormInput } from '../../components/forms/FormInput';
import { FormSelect } from '../../components/forms/FormSelect';
import { FormTextarea } from '../../components/forms/FormTextarea';
import { SubmitButton } from '../../components/forms/SubmitButton';
import { FormMessage } from '../../components/forms/FormMessage';

interface ContactFormData {
  name: string;
  email: string;
  message: string;
  category: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
  category?: string;
}

export const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    message: '',
    category: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState(false);
  const [submitMessage, setSubmitMessage] = useState<{
    type: 'success' | 'error';
    text: string;
  } | null>(null);

  const categoryOptions = [
    { value:  'general', label: 'General Inquiry' },
    { value: 'sponsorship', label: 'Sponsorship' },
    { value:  'partnership', label: 'Partnership' },
    { value: 'media', label: 'Media & Press' },
    { value: 'speaker', label: 'Speaker Inquiry' },
    { value: 'feedback', label: 'Feedback' },
    { value: 'other', label: 'Other' },
  ];

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // Validate name
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }

    // Validate email
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(formData. email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Validate message
    if (! formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message. trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }

    // Category is optional, no validation needed

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (name: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error for this field when user types
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  const handleSubmit = async (e:  React.FormEvent) => {
    e.preventDefault();
    setSubmitMessage(null);

    if (!validateForm()) {
      setSubmitMessage({
        type:  'error',
        text:  'Please fix the errors above before submitting',
      });
      return;
    }

    setLoading(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Log the form data (in production, this would be sent to backend)
      console.log('Contact Data:', formData);

      setSubmitMessage({
        type: 'success',
        text: 'Thank you for contacting us! We will get back to you soon.',
      });

      // Reset form after successful submission
      setFormData({
        name: '',
        email:  '',
        message: '',
        category: '',
      });
      setErrors({});
    } catch (error) {
      setSubmitMessage({
        type: 'error',
        text: 'Something went wrong. Please try again.',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black py-20 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-4">
            Contact <span className="text-[#EB0028]">Us</span>
          </h1>
          <p className="text-gray-400 text-lg">
            Have questions?  We'd love to hear from you
          </p>
        </div>

        <div className="bg-[#0E0E0E] border border-[#1F1F1F] rounded-2xl p-8">
          {submitMessage && (
            <div className="mb-6">
              <FormMessage
                type={submitMessage.type}
                message={submitMessage.text}
                onClose={() => setSubmitMessage(null)}
              />
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <FormInput
              label="Name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
              error={errors.name}
              required
            />

            <FormInput
              label="Email Address"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="your. email@example.com"
              error={errors.email}
              required
            />

            <FormSelect
              label="Category (Optional)"
              name="category"
              value={formData.category}
              onChange={handleChange}
              options={categoryOptions}
              placeholder="Select a category"
              error={errors.category}
              required={false}
            />

            <FormTextarea
              label="Message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Tell us what's on your mind..."
              error={errors.message}
              required
              rows={5}
            />

            <div className="pt-4">
              <SubmitButton loading={loading}>
                Send Message
              </SubmitButton>
            </div>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-500 text-sm">
              We typically respond within 24-48 hours
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
