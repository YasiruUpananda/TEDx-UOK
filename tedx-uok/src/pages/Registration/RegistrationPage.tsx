import React, { useState } from 'react';

import { supabase } from '../../api/supabaseClient';
import { FormInput } from '../../components/forms/FormInput';
import { FormSelect } from '../../components/forms/FormSelect';
import { SubmitButton } from '../../components/forms/SubmitButton';
import { FormMessage } from '../../components/forms/FormMessage';

interface RegistrationFormData {
  full_name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  ticket_type: string;
  event_id: string;
}

interface FormErrors {
  full_name?: string;
  email?: string;
  phone?: string;
  address?: string;
  city?: string;
  ticket_type?: string;
}

// PayHere Redirect Helper
// PayHere Redirect Helper
const redirectToPayHere = (payload: any) => {
  console.log("Starting PayHere Redirect with Payload:", payload);

  const form = document.createElement("form");
  form.setAttribute("method", "POST");
  form.setAttribute("action", "https://sandbox.payhere.lk/pay/checkout");
  form.setAttribute("style", "display: none;");

  Object.keys(payload).forEach(key => {
    const input = document.createElement("input");
    input.setAttribute("type", "hidden");
    input.setAttribute("name", key);
    input.setAttribute("value", payload[key]);
    form.appendChild(input);
  });

  document.body.appendChild(form);
  form.submit();
};



export const RegistrationPage: React.FC = () => {

  const [formData, setFormData] = useState<RegistrationFormData>({
    full_name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    ticket_type: '',
    event_id: 'EVENT_001', // Hidden field - default event ID
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState(false);
  const [submitMessage, setSubmitMessage] = useState<{
    type: 'success' | 'error';
    text: string;
  } | null>(null);

  // DEBUG: Verify Supabase Connection
  React.useEffect(() => {
    supabase.auth.getSession().then(({ data, error }) => {
      console.log("SUPABASE AUTH TEST:", data, error);
    });
  }, []);


  /* PayHere SDK Removed - Using Direct Form Submission */


  const ticketOptions = [
    { value: 'standard', label: 'Standard Ticket - LKR 1,000' },
    { value: 'vip', label: 'VIP - LKR 2,500' },
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
    if (!formData.full_name.trim()) {
      newErrors.full_name = 'Full name is required';
    } else if (formData.full_name.trim().length < 2) {
      newErrors.full_name = 'Name must be at least 2 characters';
    }

    // Validate email
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Validate phone
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!validatePhone(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number';
    }

    // Validate address
    if (!formData.address.trim()) {
      newErrors.address = 'Address is required';
    }

    // Validate city
    if (!formData.city.trim()) {
      newErrors.city = 'City is required';
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

  const handleSubmit = async (e: React.FormEvent) => {
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


      // 1. Calculate Amount based on Ticket Type
      let amount = 0;

      switch (formData.ticket_type) {
        case 'standard':
          amount = 1000;
          break;
        case 'vip':
          amount = 2500;
          break;
        case 'student':
          amount = 500;
          break;
        case 'early_bird':
          amount = 800;
          break;
        default:
          throw new Error("Invalid Ticket Type");
      }

      const currency = "LKR";


      // 2. Fetch Active Event
      // FIX For "invalid input syntax for type uuid": Do NOT fallback to '1'.
      const { data: eventData, error: eventError } = await supabase
        .from('events')
        .select('event_id')
        .eq('is_active', true)
        .limit(1)
        .single();

      if (eventError || !eventData) {
        console.error("Fetch Event Error:", eventError);
        throw new Error("No active event found. Cannot register.");
      }

      const eventId = eventData.event_id;
      console.log("Using Active Event ID:", eventId);

      // 3. Insert into Registrations
      console.log("Creating Registration...");
      // DO NOT send explicit registration_id. Let DB generate it.
      const { data: regData, error: regError } = await supabase
        .from('registrations')
        .insert({
          event_id: eventId,
          full_name: formData.full_name,
          email: formData.email,
          phone: formData.phone,
          address: formData.address,
          city: formData.city,
          ticket_type: formData.ticket_type,
        })
        .select('registration_id')
        .single();

      if (regError || !regData) {
        throw new Error(`Registration Failed: ${regError?.message}`);
      }

      const registrationId = regData.registration_id;
      console.log("Registration Created:", registrationId);

      // 4. Insert into Payments
      console.log("Creating Payment Record...");
      const { data: payData, error: payError } = await supabase
        .from('payments')
        .insert({
          registration_id: registrationId,
          amount: amount,
          currency: currency
        })
        .select('payment_id')
        .single();

      if (payError || !payData) {
        throw new Error(`Payment Record Failed: ${payError?.message}`);
      }

      const paymentId = payData.payment_id;
      console.log("Payment Record Created:", paymentId);

      // 5. Redirect to PayHere
      // 5. Call Edge Function to Get Secure PayHere Payload
      console.log("Invoking Edge Function to get PayHere Hash...");
      setSubmitMessage({ type: 'success', text: 'Securing Payment...' });

      const { data: payHerePayload, error: funcError } = await supabase.functions.invoke('create-payhere-payment', {
        body: { payment_id: paymentId }
      });
      if (funcError) {
        throw new Error(`Payment Function Failed: ${funcError.message}`);
      }
      if (payHerePayload && payHerePayload.error) {
        throw new Error(`Payment Function Error: ${payHerePayload.error}`);
      }

      // 6. Redirect to PayHere
      setSubmitMessage({ type: 'success', text: 'Redirecting to Payment Gateway...' });

      // Override return/cancel URLs to ensure they match frontend config if needed,
      // but usually trusting the backend payload is better.
      // We will blindly use the payload returned by the secure backend.
      redirectToPayHere(payHerePayload);
    } catch (error: any) {
      console.error("Submission Error:", error);
      setSubmitMessage({
        type: 'error',
        text: error.message || 'An unexpected error occurred during registration.',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto w-full">
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
            Event <span className="text-[#EB0028]">Registration</span>
          </h1>
          <p className="text-gray-400 text-lg">
            Secure your spot at TEDx University of Kelaniya
          </p>
        </div>

        <div className="bg-[#0E0E0E] border border-[#1F1F1F] rounded-xl sm:rounded-2xl p-6 sm:p-8">
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
              label="Address"
              name="address"
              type="text"
              value={formData.address}
              onChange={handleChange}
              placeholder="House/Apt No, Street"
              error={errors.address}
              required
            />

            <FormInput
              label="City"
              name="city"
              type="text"
              value={formData.city}
              onChange={handleChange}
              placeholder="City"
              error={errors.city}
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
                {loading ? 'Processing...' : 'Proceed to Payment'}
              </SubmitButton>
            </div>

            {/* Debug buttons removed */}
          </form>

          {/* Hidden PayHere Form removed as we use JS SDK now */}


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