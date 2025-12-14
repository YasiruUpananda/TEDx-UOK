import React, { useState } from 'react';
import { FormInput } from '../../components/forms/FormInput';
import { FormSelect } from '../../components/forms/FormSelect';
import { SubmitButton } from '../../components/forms/SubmitButton';
import { FormMessage } from '../../components/forms/FormMessage';

interface VolunteerFormData {
  full_name: string;
  email: string;
  phone:  string;
  university: string;
  interest_area: string;
  availability: string;
  cv_url: string;
  event_id: string;
}

interface FormErrors {
  full_name?: string;
  email?: string;
  phone?: string;
  university?: string;
  interest_area?: string;
  availability?: string;
  cv_url?: string;
}

export const VolunteersPage:  React.FC = () => {
  const [formData, setFormData] = useState<VolunteerFormData>({
    full_name: '',
    email:  '',
    phone: '',
    university: '',
    interest_area: '',
    availability: '',
    cv_url: '',
    event_id: 'EVENT_001', // Hidden field - default event ID
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState(false);
  const [submitMessage, setSubmitMessage] = useState<{
    type:  'success' | 'error';
    text: string;
  } | null>(null);

  const interestAreaOptions = [
    { value: 'logistics', label: 'Logistics & Operations' },
    { value:  'marketing', label: 'Marketing & Social Media' },
    { value: 'tech', label: 'Technical Support' },
    { value: 'registration', label: 'Registration & Guest Services' },
    { value: 'content', label: 'Content Creation' },
    { value:  'photography', label: 'Photography & Videography' },
  ];

  const availabilityOptions = [
    { value:  'weekdays', label: 'Weekdays' },
    { value: 'weekends', label: 'Weekends' },
    { value: 'both', label: 'Both Weekdays & Weekends' },
    { value: 'event_day', label: 'Event Day Only' },
  ];

  const validateEmail = (email:  string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex. test(email);
  };

  const validatePhone = (phone:  string): boolean => {
    const phoneRegex = /^[0-9+\s-()]{10,15}$/;
    return phoneRegex.test(phone);
  };

  const validateURL = (url: string): boolean => {
    if (!url) return true; // Optional field
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
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
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Validate phone
    if (!formData.phone. trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!validatePhone(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number';
    }

    // Validate university
    if (!formData. university.trim()) {
      newErrors.university = 'University name is required';
    }

    // Validate interest_area
    if (!formData.interest_area) {
      newErrors.interest_area = 'Please select an interest area';
    }

    // Validate availability
    if (! formData.availability) {
      newErrors.availability = 'Please select your availability';
    }

    // Validate cv_url (optional but must be valid URL if provided)
    if (formData.cv_url && !validateURL(formData.cv_url)) {
      newErrors.cv_url = 'Please enter a valid URL';
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
        type: 'error',
        text: 'Please fix the errors above before submitting',
      });
      return;
    }

    setLoading(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Log the form data (in production, this would be sent to backend)
      console.log('Volunteer Data:', formData);

      setSubmitMessage({
        type: 'success',
        text: 'Thank you for volunteering! We will contact you soon.',
      });

      // Reset form after successful submission
      setFormData({
        full_name: '',
        email: '',
        phone: '',
        university:  '',
        interest_area: '',
        availability: '',
        cv_url: '',
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
            Volunteer <span className="text-[#EB0028]">With Us</span>
          </h1>
          <p className="text-gray-400 text-lg">
            Join our team and make TEDx UOK a success! 
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

            <FormInput
              label="University"
              name="university"
              type="text"
              value={formData.university}
              onChange={handleChange}
              placeholder="Enter your university name"
              error={errors.university}
              required
            />

            <FormSelect
              label="Interest Area"
              name="interest_area"
              value={formData.interest_area}
              onChange={handleChange}
              options={interestAreaOptions}
              placeholder="Select your area of interest"
              error={errors.interest_area}
              required
            />

            <FormSelect
              label="Availability"
              name="availability"
              value={formData.availability}
              onChange={handleChange}
              options={availabilityOptions}
              placeholder="Select your availability"
              error={errors.availability}
              required
            />

            <FormInput
              label="CV/Resume URL (Optional)"
              name="cv_url"
              type="url"
              value={formData.cv_url}
              onChange={handleChange}
              placeholder="https://drive.google.com/your-cv"
              error={errors.cv_url}
              required={false}
            />

            <div className="pt-4">
              <SubmitButton loading={loading}>
                Submit Application
              </SubmitButton>
            </div>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-500 text-sm">
              We'll review your application and get back to you within 3-5 business days
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VolunteersPage;