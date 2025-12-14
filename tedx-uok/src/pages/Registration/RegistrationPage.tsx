import React, { useState } from 'react';
import { FormInput } from '../../components/forms/FormInput';
import { FormSelect } from '../../components/forms/FormSelect';
import { SubmitButton } from '../../components/forms/SubmitButton';
import { FormMessage } from '../../components/forms/FormMessage';

interface RegistrationFormData {
  full_name: string;
  email: string;
  phone: string;
  ticket_type: string;
  event_id: string;
}

interface FormErrors {
  full_name?:  string;
  email?: string;
  phone?: string;
  ticket_type?: string;
}

export const RegistrationPage: React. FC = () => {
  const [formData, setFormData] = useState<RegistrationFormData>({
    full_name:  '',
    email: '',
    phone: '',
    ticket_type: '',
    event_id:  'EVENT_001', // Hidden field - default event ID
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState(false);
  const [submitMessage, setSubmitMessage] = useState<{
    type: 'success' | 'error';
    text: string;
  } | null>(null);

  const ticketOptions = [
    { value: 'general', label: 'General Admission - LKR 1,000' },
    { value:  'vip', label: 'VIP - LKR 2,500' },
    { value: 'student', label: 'Student - LKR 500' },
    { value: 'early_bird', label: 'Early Bird - LKR 800' },
  ];

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone: string): boolean => {
    const phoneRegex = /^[0-9+\s-()]{10,15}$/;
    return phoneRegex.test(phone);
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // Validate full_name
    if (!formData. full_name.trim()) {
      newErrors.full_name = 'Full name is required';
    } else if (formData. full_name.trim().length < 2) {
      newErrors.full_name = 'Name must be at least 2 characters';
    }

    // Validate email
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(formData. email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Validate phone
    if (! formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!validatePhone(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number';
    }

    // Validate ticket_type
    if (!formData.ticket_type) {
      newErrors.ticket_type = 'Please select a ticket type';
    }

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
      console.log('Registration Data:', formData);

      setSubmitMessage({
        type: 'success',
        text: 'Registration successful! Check your email for confirmation.',
      });

      // Reset form after successful submission
      setFormData({
        full_name: '',
        email: '',
        phone:  '',
        ticket_type: '',
        event_id: 'EVENT_001',
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
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-4">
            Event <span className="text-[#EB0028]">Registration</span>
          </h1>
          <p className="text-gray-400 text-lg">
            Secure your spot at TEDx University of Kelaniya
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
            {/* Hidden event_id field */}
            <input type="hidden" name="event_id" value={formData.event_id} />

            <FormInput
              label="Full Name"
              name="full_name"
              type="text"
              value={formData.full_name}
              onChange={handleChange}
              placeholder="Enter your full name"
              error={errors.full_name}
              required
            />

            <FormInput
              label="Email Address"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="your.email@example.com"
              error={errors.email}
              required
            />

            <FormInput
              label="Phone Number"
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleChange}
              placeholder="+94 XX XXX XXXX"
              error={errors.phone}
              required
            />

            <FormSelect
              label="Ticket Type"
              name="ticket_type"
              value={formData.ticket_type}
              onChange={handleChange}
              options={ticketOptions}
              placeholder="Select your ticket type"
              error={errors.ticket_type}
              required
            />

            <div className="pt-4">
              <SubmitButton loading={loading}>
                Complete Registration
              </SubmitButton>
            </div>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-500 text-sm">
              By registering, you agree to our terms and conditions
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegistrationPage;