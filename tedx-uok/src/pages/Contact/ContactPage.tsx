import React, { useState, useEffect } from "react";
import { FormInput } from "../../components/forms/FormInput";
import { FormSelect } from "../../components/forms/FormSelect";
import { FormTextarea } from "../../components/forms/FormTextarea";
import { SubmitButton } from "../../components/forms/SubmitButton";
import { FormMessage } from "../../components/forms/FormMessage";
// FormSubmit.io endpoint for email delivery
const FORMSUBMIT_ENDPOINT = "https://formsubmit.co/tedxuok26.2@gmail.com";

interface ContactFormData {
  name: string;
  email: string;
  message: string;
  category: string;
  honeypot: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
  category?: string;
}

import { useSEO } from "../../hooks/useSEO";
import { seoConfig } from "../../config/seo";

export const ContactPage: React.FC = () => {
  useSEO(seoConfig.contact);
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    message: "",
    category: "",
    honeypot: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState(false);
  const [submitMessage, setSubmitMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  // Set body background to black when component mounts
  useEffect(() => {
    document.body.style.backgroundColor = "#000000";
    document.body.style.margin = "0";
    document.body.style.padding = "0";
    document.documentElement.style.backgroundColor = "#000000";

    return () => {
      // Cleanup when component unmounts
      document.body.style.backgroundColor = "";
      document.documentElement.style.backgroundColor = "";
    };
  }, []);

  const categoryOptions = [
    { value: "general", label: "General Inquiry" },
    { value: "sponsorship", label: "Sponsorship" },
    { value: "partnership", label: "Partnership" },
    { value: "media", label: "Media & Press" },
    { value: "speaker", label: "Speaker Inquiry" },
    { value: "feedback", label: "Feedback" },
    { value: "other", label: "Other" },
  ];

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // Validate name
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }

    // Validate email
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    // Validate message
    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters";
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitMessage(null);

    // Honeypot spam detection: if field is filled, it's a bot
    if (formData.honeypot.trim() !== "") {
      console.warn("Spam detected: honeypot field was filled");
      // Silently succeed to not alert bots, but don't send email
      setSubmitMessage({
        type: "success",
        text: "Thank you for contacting us! We will get back to you soon.",
      });
      setFormData({
        name: "",
        email: "",
        message: "",
        category: "",
        honeypot: "",
      });
      return;
    }

    if (!validateForm()) {
      setSubmitMessage({
        type: "error",
        text: "Please fix the errors above before submitting",
      });
      return;
    }

    setLoading(true);

    try {
      // Create FormData for FormSubmit.io with professional formatting
      const form = new FormData();
      form.append("name", formData.name);
      form.append("email", formData.email);
      form.append("category", formData.category || "General Inquiry");
      form.append("message", formData.message);
      
      // Professional email configuration
      form.append("_subject", `New Contact Form Submission from ${formData.name}`);
      form.append("_replyto", formData.email);
      form.append("_captcha", "false");
      form.append("_template", "table");

      // Submit to FormSubmit.io
      const response = await fetch(FORMSUBMIT_ENDPOINT, {
        method: "POST",
        body: form,
      });

      // Log response for debugging
      console.log("Response status:", response.status);
      console.log("Response ok:", response.ok);

      if (!response.ok) {
        const errorText = await response.text();
        console.error("FormSubmit error response:", errorText);
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      console.log("Contact message sent successfully via FormSubmit.io");

      setSubmitMessage({
        type: "success",
        text: "Thank you for contacting us! We will get back to you soon.",
      });

      // Reset form after successful submission
      setFormData({
        name: "",
        email: "",
        message: "",
        category: "",
        honeypot: "",
      });
      setErrors({});
    } catch (error) {
      console.error("Contact form submission error:", error);
      const errorMessage = error instanceof Error ? error.message : String(error);
      console.error("Detailed error:", errorMessage);
      setSubmitMessage({
        type: "error",
        text: "Something went wrong sending your message. Please try again or email us directly at tedxuok26.2@gmail.com",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>{`
        body, html, #root {
          background-color:  #000000 !important;
          margin: 0 !important;
          padding: 0 !important;
        }
        * {
          letter-spacing:  0 !important;
        }
      `}</style>

      <div
        style={{
          backgroundColor: "#000000",
          minHeight: "100vh",
          width: "100%",
        }}
      >
        <div className="bg-black py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg: px-8">
          <div className="max-w-3xl mx-auto w-full">
            <div className="text-center mb-12">
              <h1
                className="text-3xl sm:text-4xl md: text-5xl font-bold mb-4"
                style={{ color: "#FFFFFF", letterSpacing: "0" }}
              >
                Contact <span style={{ color: "#EB0028" }}>Us</span>
              </h1>
              <p
                className="text-lg mb-4"
                style={{ color: "#FFFFFF", letterSpacing: "0" }}
              >
                Have questions? We'd love to hear from you
              </p>

              {/* Trust-building message */}
              <div className="mt-6 max-w-2xl mx-auto bg-[#0E0E0E] border border-[#1F1F1F] rounded-lg p-4">
                <div className="flex items-start space-x-3">
                  <svg
                    className="w-6 h-6 text-[#EB0028] flex-shrink-0 mt-0.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                    />
                  </svg>
                  <div className="text-left">
                    <p
                      className="text-gray-300 text-sm"
                      style={{ letterSpacing: "0" }}
                    >
                      <strong className="text-white">
                        We're here to help!
                      </strong>{" "}
                      Our team typically responds within 24-48 hours. For urgent
                      inquiries, please indicate "Urgent" in your message.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-[#0E0E0E] border border-[#1F1F1F] rounded-xl sm:rounded-2xl p-6 sm:p-8">
              {submitMessage?.type === 'success' && (
                <div className="mb-6">
                  <FormMessage
                    type={submitMessage.type}
                    message={submitMessage.text}
                    onClose={() => setSubmitMessage(null)}
                  />
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Honeypot field for spam detection - hidden from users */}
                <input
                  type="text"
                  name="honeypot"
                  value={formData.honeypot}
                  onChange={(e) => handleChange("honeypot", e.target.value)}
                  style={{ display: "none" }}
                  aria-hidden="true"
                  tabIndex={-1}
                  autoComplete="off"
                />
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
                  placeholder="your.email@example.com"
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
                  <SubmitButton loading={loading}>Send Message</SubmitButton>
                </div>
              </form>

              <div className="mt-6 text-center">
                <p
                  className="text-gray-500 text-sm"
                  style={{ letterSpacing: "0" }}
                >
                  We typically respond within 24-48 hours
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactPage;
