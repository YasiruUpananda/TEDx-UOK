import React, { useState, useEffect } from "react";
import { FormInput } from "../../components/forms/FormInput";
import { FormSelect } from "../../components/forms/FormSelect";
import { SubmitButton } from "../../components/forms/SubmitButton";
import { FormMessage } from "../../components/forms/FormMessage";
import { supabase } from "../../lib/supabase";

interface RegistrationFormData {
  full_name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  ticket_type: string;
  event_id: number;
}

interface FormErrors {
  full_name?: string;
  email?: string;
  phone?: string;
  address?: string;
  city?: string;
  ticket_type?: string;
  event_id?: string;
}

interface Event {
  event_id: number;
  name: string;
  date: string;
  is_active: boolean;
}

export const RegistrationPage: React.FC = () => {
  const [formData, setFormData] = useState<RegistrationFormData>({
    full_name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    ticket_type: '',
    event_id: 0, // Hidden field - default event ID
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState(false);
  const [events, setEvents] = useState<Event[]>([]);
  const [loadingEvents, setLoadingEvents] = useState(true);
  const [submitMessage, setSubmitMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  // Set body background to black when component mounts
  useEffect(() => {
    document.body.style.backgroundColor = '#000000';
    document.body.style.margin = '0';
    document.body.style.padding = '0';
    document.documentElement.style.backgroundColor = '#000000';

    return () => {
      // Cleanup when component unmounts
      document.body.style.backgroundColor = '';
      document.documentElement.style.backgroundColor = '';
    };
  }, []);

  // Fetch active events from Supabase
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const { data, error } = await supabase
          .from("events")
          .select("event_id, name, date, is_active")
          .eq("is_active", true)
          .order("date", { ascending: true });

        if (error) {
          console.error("Error fetching events:", error);
          return;
        }

        setEvents(data || []);
        // Auto-select first event if available
        if (data && data.length > 0) {
          setFormData((prev) => ({ ...prev, event_id: data[0].event_id }));
        }
      } catch (error) {
        console.error("Error fetching events:", error);
      } finally {
        setLoadingEvents(false);
      }
    };

    fetchEvents();
  }, []);

  const ticketOptions = [
    { value: "student", label: "Student - LKR 500" },
    { value: "non_student", label: "Non-student - LKR 1,000" },
    { value: "vip", label: "VIP - LKR 2,500" },
    { value: "complimentary", label: "Complimentary - Free" },
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
      newErrors.ticket_type = "Please select a ticket type";
    }

    // Validate event_id
    if (!formData.event_id) {
      newErrors.event_id = "Please select an event";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (name: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: name === "event_id" ? parseInt(value, 10) : value,
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
        type: "error",
        text: "Please fix the errors above before submitting",
      });
      return;
    }

    setLoading(true);

    try {
      // Insert registration data into Supabase
      const { data, error } = await supabase
        .from("registrations")
        .insert([
          {
            event_id: formData.event_id,
            full_name: formData.full_name,
            email: formData.email,
            phone: formData.phone,
            address: formData.address,
            city: formData.city,
            ticket_type: formData.ticket_type,
            status: "Pending",
          },
        ])
        .select();

      if (error) {
        console.error("Supabase error:", error);
        setSubmitMessage({
          type: "error",
          text: error.message || "Failed to register. Please try again.",
        });
        return;
      }

      console.log("Registration Data inserted:", data);

      setSubmitMessage({
        type: 'success',
        text: 'Registration successful! Check your email for confirmation.',
      });

      // Reset form after successful submission
      setFormData({
        full_name: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        ticket_type: '',
        event_id: events.length > 0 ? events[0].event_id : 0,
      });
      setErrors({});
    } catch (error) {
      console.error("Registration error:", error);
      setSubmitMessage({
        type: "error",
        text: "Something went wrong. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-black text-white">
      <div className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto w-full">
          <div className="text-center mb-12">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 tracking-normal text-white">
              Event <span className="text-[#EB0028]">Registration</span>
            </h1>
            <p className="text-lg mb-4 tracking-normal text-white">
              Secure your spot at <span className="text-[#EB0028]">TED<sup className="text-[#EB0028]">x</sup></span> <span className="text-white">UoK</span>
            </p>

            {/* Trust-building message */}
            <div className="mt-6 max-w-2xl mx-auto bg-[#0E0E0E] border border-[#1F1F1F] rounded-lg p-4 text-left">
              <div className="flex items-start space-x-3">
                <svg className="w-6 h-6 text-[#EB0028] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                <div>
                  <p className="text-gray-300 text-sm tracking-normal">
                    <strong className="text-white">Secure Registration.</strong> Your information is encrypted and protected. You'll receive a confirmation email immediately after registration with your event ticket and details.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-[#0E0E0E] border border-[#1F1F1F] rounded-xl sm:rounded-2xl p-6 sm:p-8">
            {submitMessage && submitMessage.type === 'success' && (
              <div className="mb-6 bg-green-900/20 border border-green-500 rounded-xl p-6 text-left">
                <div className="flex items-start space-x-4 mb-4">
                  <svg className="w-8 h-8 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div className="flex-1">
                    <h3 className="text-white font-bold text-xl mb-2 tracking-normal">Registration Successful!</h3>
                    <p className="text-gray-300 mb-4 tracking-normal">Thank you for registering for TED<sup>x</sup> UoK! Your spot is reserved.</p>

                    <div className="bg-black/30 rounded-lg p-4 mb-4">
                      <h4 className="text-white font-semibold mb-3 tracking-normal">What happens next?</h4>
                      <div className="space-y-3">
                        <div className="flex items-start space-x-3">
                          <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0 text-xs font-bold text-black">1</div>
                          <div>
                            <p className="text-gray-300 text-sm tracking-normal"><strong>Immediately:</strong> Check your email for registration confirmation and ticket details</p>
                          </div>
                        </div>
                        <div className="flex items-start space-x-3">
                          <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0 text-xs font-bold text-black">2</div>
                          <div>
                            <p className="text-gray-300 text-sm tracking-normal"><strong>Payment (if required):</strong> Complete payment via the link in your email within 24 hours</p>
                          </div>
                        </div>
                        <div className="flex items-start space-x-3">
                          <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0 text-xs font-bold text-black">3</div>
                          <div>
                            <p className="text-gray-300 text-sm tracking-normal"><strong>Event Day:</strong> Bring your ticket (email or printed) and a valid ID</p>
                          </div>
                        </div>
                        <div className="flex items-start space-x-3">
                          <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0 text-xs font-bold text-black">4</div>
                          <div>
                            <p className="text-gray-300 text-sm tracking-normal"><strong>Stay Updated:</strong> Follow us on social media for event updates and reminders</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3 mt-4">
                      <a
                        href="mailto:check-email"
                        className="inline-flex items-center justify-center px-4 py-2 bg-[#EB0028] rounded-lg text-white text-sm font-semibold hover:bg-[#c7001f] transition-all no-underline tracking-normal"
                      >
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        Check Your Email
                      </a>
                      <a
                        href="/agenda"
                        className="inline-flex items-center justify-center px-4 py-2 bg-[#1F1F1F] border border-[#EB0028] rounded-lg text-white text-sm font-semibold hover:bg-[#2F2F2F] transition-all no-underline tracking-normal"
                      >
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        View Event Agenda
                      </a>
                    </div>

                    <p className="text-gray-400 text-xs mt-4 tracking-normal">
                      Didn't receive an email? Check your spam folder or <a href="/contact" className="text-[#EB0028] hover:underline">contact support</a>.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {submitMessage && submitMessage.type === 'error' && (
              <div className="mb-6">
                <FormMessage
                  type={submitMessage.type}
                  message={submitMessage.text}
                  onClose={() => setSubmitMessage(null)}
                />
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6 text-left">
              <FormSelect
                label="Select Event"
                name="event_id"
                value={formData.event_id.toString()}
                onChange={handleChange}
                options={events.map(event => ({
                  value: event.event_id.toString(),
                  label: `${event.name} - ${new Date(event.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}`
                }))}
                placeholder={loadingEvents ? "Loading events..." : "Select an event"}
                error={errors.event_id}
                required
                disabled={loadingEvents || events.length === 0}
              />

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
                placeholder="Enter your address"
                error={errors.address}
                required
              />

              <FormInput
                label="City"
                name="city"
                type="text"
                value={formData.city}
                onChange={handleChange}
                placeholder="Enter your city"
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
                  Complete Registration
                </SubmitButton>
              </div>
            </form>

            <div className="mt-6 text-center">
              <p className="text-gray-500 text-sm tracking-normal">
                By registering, you agree to our terms and conditions
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegistrationPage;
