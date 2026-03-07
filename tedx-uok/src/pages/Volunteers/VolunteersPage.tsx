import React from "react";
import { supabase } from "../../lib/supabase";

type TableInsert<_T extends string> = Record<string, unknown>;

interface FormData {
  full_name: string;
  email: string;
  phone: string;
  university: string;
  interest_area: string;
  availability: string;
  cv_url: string;
}

interface FormErrors {
  [key: string]: string;
}

const FormInput = ({
  label,
  name,
  type = "text",
  value,
  onChange,
  placeholder,
  error,
  required = true,
}: {
  label: string;
  name: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  error?: string;
  required?: boolean;
}) => {
  const [isFocused, setIsFocused] = React.useState(false);
  const [isHovered, setIsHovered] = React.useState(false);

  const getBorderColor = () => {
    if (error) return "#EB0028";
    if (isFocused || isHovered) return "#EB0028";
    return "#1F1F1F";
  };

  return (
    <div className="space-y-2">
      <label
        htmlFor={name}
        className="block text-sm font-medium text-gray-300"
        style={{ letterSpacing: "0", textAlign: "left" }}
      >
        {label} {required && <span className="text-[#EB0028]">*</span>}
      </label>
      <input
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        placeholder={placeholder}
        style={{
          transition: "border-color 0.3s ease",
          borderWidth: "2px",
          borderStyle: "solid",
          borderColor: getBorderColor(),
          backgroundColor: "#0E0E0E",
          borderRadius: "0.5rem",
          padding: "0.75rem 1rem",
          width: "100%",
          color: "#FFFFFF",
          outline: "none",
          letterSpacing: "0",
        }}
        required={required}
      />
      {error && (
        <p
          className="text-[#EB0028] text-sm mt-1"
          style={{ letterSpacing: "0", textAlign: "left" }}
        >
          {error}
        </p>
      )}
    </div>
  );
};

const FormSelect = ({
  label,
  name,
  value,
  onChange,
  options,
  error,
  required = true,
}: {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: string[];
  error?: string;
  required?: boolean;
}) => {
  const [isFocused, setIsFocused] = React.useState(false);
  const [isHovered, setIsHovered] = React.useState(false);

  const getBorderColor = () => {
    if (error) return "#EB0028";
    if (isFocused || isHovered) return "#EB0028";
    return "#1F1F1F";
  };

  return (
    <div className="space-y-2">
      <label
        htmlFor={name}
        className="block text-sm font-medium text-gray-300"
        style={{ letterSpacing: "0", textAlign: "left" }}
      >
        {label} {required && <span className="text-[#EB0028]">*</span>}
      </label>
      <select
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{
          transition: "border-color 0.3s ease",
          borderWidth: "2px",
          borderStyle: "solid",
          borderColor: getBorderColor(),
          backgroundColor: "#0E0E0E",
          borderRadius: "0.5rem",
          padding: "0.75rem 1rem",
          width: "100%",
          color: "#FFFFFF",
          outline: "none",
          letterSpacing: "0",
        }}
        required={required}
      >
        <option
          value=""
          style={{ backgroundColor: "#0E0E0E", color: "#FFFFFF" }}
        >
          Select an option
        </option>
        {options.map((option) => (
          <option
            key={option}
            value={option}
            style={{ backgroundColor: "#0E0E0E", color: "#FFFFFF" }}
          >
            {option}
          </option>
        ))}
      </select>
      {error && (
        <p
          className="text-[#EB0028] text-sm mt-1"
          style={{ letterSpacing: "0", textAlign: "left" }}
        >
          {error}
        </p>
      )}
    </div>
  );
};

import { useSEO } from "../../hooks/useSEO";
import { seoConfig } from "../../config/seo";

const VolunteersPage: React.FC = () => {
  // Set body background to black when component mounts
  useSEO(seoConfig.volunteers);
  React.useEffect(() => {
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
  const [formData, setFormData] = React.useState<FormData>({
    full_name: "",
    email: "",
    phone: "",
    university: "",
    interest_area: "",
    availability: "",
    cv_url: "",
  });

  const [errors, setErrors] = React.useState<FormErrors>({});
  const [submitStatus, setSubmitStatus] = React.useState<
    "idle" | "success" | "error"
  >("idle");
  const [selectedFile, setSelectedFile] = React.useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = React.useState<number>(0);
  const [isUploading, setIsUploading] = React.useState(false);

  React.useEffect(() => {
    document.body.style.backgroundColor = "#000000";
    document.body.style.margin = "0";
    document.body.style.padding = "0";
    document.documentElement.style.backgroundColor = "#000000";

    return () => {
      document.body.style.backgroundColor = "";
      document.documentElement.style.backgroundColor = "";
    };
  }, []);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const maxSize = 5 * 1024 * 1024;
      const allowedTypes = [
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      ];

      // Validate file size
      if (file.size > maxSize) {
        setErrors((prev) => ({
          ...prev,
          cv_file: `File size must be less than 5MB (current: ${(
            file.size /
            1024 /
            1024
          ).toFixed(2)}MB)`,
        }));
        setSelectedFile(null);
        return;
      }

      // Validate file type
      if (!allowedTypes.includes(file.type)) {
        setErrors((prev) => ({
          ...prev,
          cv_file: "Only PDF and Word documents are allowed",
        }));
        setSelectedFile(null);
        return;
      }

      setSelectedFile(file);
      setErrors((prev) => ({ ...prev, cv_file: "" }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.full_name.trim())
      newErrors.full_name = "Full name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
    if (!formData.university.trim())
      newErrors.university = "University is required";
    if (!formData.interest_area)
      newErrors.interest_area = "Interest area is required";
    if (!formData.availability)
      newErrors.availability = "Availability is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) {
      setSubmitStatus("error");
      return;
    }

    try {
      // Get current event ID (you can make this dynamic)
      const { data: settings } = await supabase
        .from("settings")
        .select("current_event_id")
        .single();

      const eventId = settings?.current_event_id || 1;

      // Upload CV to storage if file exists
      let cvUrl = formData.cv_url;
      if (selectedFile) {
        setIsUploading(true);
        setUploadProgress(0);

        // Simulate upload progress
        const progressInterval = setInterval(() => {
          setUploadProgress((prev) => {
            if (prev >= 90) {
              clearInterval(progressInterval);
              return 90;
            }
            return prev + 10;
          });
        }, 100);

        const fileExt = selectedFile.name.split(".").pop();
        const fileName = `${Date.now()}-${Math.random()
          .toString(36)
          .substring(7)}.${fileExt}`;

        const { error: uploadError } = await supabase.storage
          .from("volunteer-cv")
          .upload(fileName, selectedFile);

        clearInterval(progressInterval);
        setUploadProgress(100);

        if (uploadError) {
          setIsUploading(false);
          throw uploadError;
        }

        const {
          data: { publicUrl },
        } = supabase.storage.from("volunteer-cv").getPublicUrl(fileName);

        cvUrl = publicUrl;
        setIsUploading(false);
      }

      // Insert volunteer application
      const volunteerData: TableInsert<"volunteer_applications"> = {
        event_id: eventId,
        full_name: formData.full_name,
        email: formData.email,
        phone: formData.phone,
        university: formData.university,
        interest_area: formData.interest_area,
        availability: formData.availability,
        cv_url: cvUrl || null,
        status: "New",
      };

      const { error } = await supabase
        .from("volunteer_applications")
        .insert(volunteerData);

      if (error) throw error;

      setSubmitStatus("success");

      setTimeout(() => {
        setFormData({
          full_name: "",
          email: "",
          phone: "",
          university: "",
          interest_area: "",
          availability: "",
          cv_url: "",
        });
        setSelectedFile(null);
        setSubmitStatus("idle");
      }, 3000);
    } catch (error) {
      console.error("Error submitting application:", error);
      setSubmitStatus("error");
      setTimeout(() => setSubmitStatus("idle"), 3000);
    }
  };

  const roleOptions = [
    "Logistics & Operations",
    "Marketing & Social Media",
    "Technical Support",
    "Registration & Guest Services",
    "Content Creation",
    "Photography & Videography",
  ];

  const availabilityOptions = [
    "Weekdays only",
    "Weekends only",
    "Both weekdays and weekends",
    "Flexible",
  ];

  return (
    <>
      <style>{`
        body, html, #root {
          background-color: #000000 !important;
          margin: 0 !important;
          padding: 0 !important;
        }
        :: placeholder {
          color: #6B7280;
          opacity: 1;
        }
        * {
          letter-spacing: 0 !important;
        }
      `}</style>

      <div
        style={{
          backgroundColor: "#000000",
          minHeight: "100vh",
          width: "100%",
        }}
      >
        <div className="bg-black py-12 px-4">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <h1
                className="text-4xl sm:text-5xl font-bold mb-4"
                style={{ color: "#FFFFFF", letterSpacing: "0" }}
              >
                Volunteer Application for{" "}
                <span style={{ color: "#EB0028" }}>
                  TED<sup style={{ color: "#EB0028" }}>x</sup>
                </span>{" "}
                <span style={{ color: "#FFFFFF" }}>UoK</span>
              </h1>
              <p
                className="text-gray-400 text-lg mb-4"
                style={{ letterSpacing: "0" }}
              >
                Join our team and help create an unforgettable experience
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
                      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                    />
                  </svg>
                  <div className="text-left">
                    <p
                      className="text-gray-300 text-sm"
                      style={{ letterSpacing: "0" }}
                    >
                      <strong className="text-white">
                        Your privacy matters.
                      </strong>{" "}
                      All information is kept confidential and used only for
                      volunteer selection. We typically review applications
                      within 3-5 business days.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {submitStatus === "success" && (
              <div className="mb-8 bg-green-900/20 border border-green-500 rounded-xl p-6">
                <div className="flex items-start space-x-4 mb-4">
                  <svg
                    className="w-8 h-8 text-green-500 flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <div className="flex-1">
                    <h3
                      className="text-white font-bold text-xl mb-2"
                      style={{ letterSpacing: "0" }}
                    >
                      Application Submitted Successfully!
                    </h3>
                    <p
                      className="text-gray-300 mb-4"
                      style={{ letterSpacing: "0" }}
                    >
                      Thank you for your interest in volunteering with TED
                      <sup>x</sup> UoK! Your application is being reviewed.
                    </p>

                    <div className="bg-black/30 rounded-lg p-4 mb-4">
                      <h4
                        className="text-white font-semibold mb-3"
                        style={{ letterSpacing: "0" }}
                      >
                        What happens next?
                      </h4>
                      <div className="space-y-3">
                        <div className="flex items-start space-x-3">
                          <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0 text-xs font-bold">
                            1
                          </div>
                          <div>
                            <p
                              className="text-gray-300 text-sm"
                              style={{ letterSpacing: "0" }}
                            >
                              <strong>Within 24 hours:</strong> You'll receive a
                              confirmation email
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start space-x-3">
                          <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0 text-xs font-bold">
                            2
                          </div>
                          <div>
                            <p
                              className="text-gray-300 text-sm"
                              style={{ letterSpacing: "0" }}
                            >
                              <strong>Within 3-5 days:</strong> Our team will
                              review your application
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start space-x-3">
                          <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0 text-xs font-bold">
                            3
                          </div>
                          <div>
                            <p
                              className="text-gray-300 text-sm"
                              style={{ letterSpacing: "0" }}
                            >
                              <strong>If selected:</strong> We'll contact you
                              for an interview and orientation
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <p
                      className="text-gray-400 text-sm"
                      style={{ letterSpacing: "0" }}
                    >
                      Please check your email regularly. If you have any
                      questions, feel free to contact us.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {submitStatus === "error" && (
              <div className="mb-8 p-4 bg-red-900/20 border border-[#EB0028] rounded-lg">
                <div className="flex items-center space-x-3">
                  <svg
                    className="w-6 h-6 text-[#EB0028]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                  <div>
                    <h3
                      className="text-white font-bold"
                      style={{ letterSpacing: "0" }}
                    >
                      Submission Failed
                    </h3>
                    <p
                      className="text-gray-400 text-sm"
                      style={{ letterSpacing: "0" }}
                    >
                      Please check the form and try again.
                    </p>
                  </div>
                </div>
              </div>
            )}

            <form
              onSubmit={handleSubmit}
              className="bg-[#0A0A0A] border border-[#1F1F1F] rounded-xl p-8 space-y-6"
            >
              <div>
                <h2
                  className="text-2xl font-bold mb-6 flex items-center justify-center"
                  style={{ color: "#FFFFFF", letterSpacing: "0" }}
                >
                  <span
                    className="w-8 h-8 bg-[#EB0028] rounded-full flex items-center justify-center text-sm font-bold mr-3"
                    style={{ color: "#FFFFFF" }}
                  >
                    1
                  </span>
                  Personal Information
                </h2>
                <div className="space-y-4">
                  <FormInput
                    label="Full Name"
                    name="full_name"
                    value={formData.full_name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    error={errors.full_name}
                  />
                  <FormInput
                    label="Email Address"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="john. doe@example.com"
                    error={errors.email}
                  />
                  <FormInput
                    label="Phone Number"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+94 77 123 4567"
                    error={errors.phone}
                  />
                </div>
              </div>

              <div>
                <h2
                  className="text-2xl font-bold mb-6 flex items-center justify-center"
                  style={{ color: "#FFFFFF", letterSpacing: "0" }}
                >
                  <span
                    className="w-8 h-8 bg-[#EB0028] rounded-full flex items-center justify-center text-sm font-bold mr-3"
                    style={{ color: "#FFFFFF" }}
                  >
                    2
                  </span>
                  Academic Information
                </h2>
                <div className="space-y-4">
                  <FormInput
                    label="University"
                    name="university"
                    value={formData.university}
                    onChange={handleChange}
                    placeholder="University of Kelaniya"
                    error={errors.university}
                  />
                </div>
              </div>

              <div>
                <h2
                  className="text-2xl font-bold mb-6 flex items-center justify-center"
                  style={{ color: "#FFFFFF", letterSpacing: "0" }}
                >
                  <span
                    className="w-8 h-8 bg-[#EB0028] rounded-full flex items-center justify-center text-sm font-bold mr-3"
                    style={{ color: "#FFFFFF" }}
                  >
                    2
                  </span>
                  Volunteer Details
                </h2>
                <div className="space-y-4">
                  <FormSelect
                    label="Interest Area"
                    name="interest_area"
                    value={formData.interest_area}
                    onChange={handleChange}
                    options={roleOptions}
                    error={errors.interest_area}
                  />
                  <FormSelect
                    label="Availability"
                    name="availability"
                    value={formData.availability}
                    onChange={handleChange}
                    options={availabilityOptions}
                    error={errors.availability}
                  />
                </div>
              </div>

              <div>
                <h2
                  className="text-2xl font-bold mb-6 flex items-center justify-center"
                  style={{ color: "#FFFFFF", letterSpacing: "0" }}
                >
                  <span
                    className="w-8 h-8 bg-[#EB0028] rounded-full flex items-center justify-center text-sm font-bold mr-3"
                    style={{ color: "#FFFFFF" }}
                  >
                    3
                  </span>
                  CV / Resume
                </h2>
                <div className="space-y-4">
                  <div className="space-y-3">
                    <label
                      className="block text-sm font-medium text-gray-300"
                      style={{ letterSpacing: "0", textAlign: "left" }}
                    >
                      Upload CV{" "}
                      <span className="text-gray-500">(Optional)</span>
                    </label>

                    <div className="relative">
                      <input
                        type="file"
                        accept=".pdf,.doc,. docx"
                        onChange={handleFileChange}
                        className="hidden"
                        id="cv-upload"
                      />
                      <label
                        htmlFor="cv-upload"
                        className="block bg-[#0E0E0E] border-2 border-dashed border-[#1F1F1F] rounded-lg p-6 text-center hover:border-[#EB0028] transition-all cursor-pointer"
                        style={{ transition: "all 0.3s ease" }}
                      >
                        <svg
                          className="w-12 h-12 mx-auto mb-3 text-gray-500"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                          />
                        </svg>
                        {selectedFile ? (
                          <div>
                            <p
                              className="text-white font-semibold mb-1"
                              style={{ letterSpacing: "0" }}
                            >
                              {selectedFile.name}
                            </p>
                            <p
                              className="text-gray-500 text-xs"
                              style={{ letterSpacing: "0" }}
                            >
                              {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                            </p>
                          </div>
                        ) : (
                          <div>
                            <p
                              className="text-gray-400 text-sm mb-2"
                              style={{ letterSpacing: "0" }}
                            >
                              <span className="text-[#EB0028] font-semibold">
                                Click to upload
                              </span>{" "}
                              or drag and drop
                            </p>
                            <p
                              className="text-gray-500 text-xs"
                              style={{ letterSpacing: "0" }}
                            >
                              PDF, DOC, DOCX (max. 5MB)
                            </p>
                          </div>
                        )}
                      </label>
                    </div>

                    {/* Upload Progress Bar */}
                    {isUploading && (
                      <div className="mt-3 space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span
                            className="text-gray-400"
                            style={{ letterSpacing: "0" }}
                          >
                            Uploading...
                          </span>
                          <span
                            className="text-[#EB0028] font-semibold"
                            style={{ letterSpacing: "0" }}
                          >
                            {uploadProgress}%
                          </span>
                        </div>
                        <div className="w-full bg-[#1F1F1F] rounded-full h-2 overflow-hidden">
                          <div
                            className="bg-[#EB0028] h-full transition-all duration-300 ease-out"
                            style={{ width: `${uploadProgress}%` }}
                          />
                        </div>
                      </div>
                    )}

                    {/* File Selected Success Feedback */}
                    {selectedFile && !isUploading && (
                      <div className="mt-3 p-3 bg-green-900/20 border border-green-500 rounded-lg">
                        <div className="flex items-center space-x-2">
                          <svg
                            className="w-5 h-5 text-green-500 flex-shrink-0"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                          <p
                            className="text-green-400 text-sm"
                            style={{ letterSpacing: "0" }}
                          >
                            File ready to upload with your application
                          </p>
                        </div>
                      </div>
                    )}

                    {errors.cv_file && (
                      <p
                        className="text-[#EB0028] text-sm mt-1"
                        style={{ letterSpacing: "0", textAlign: "left" }}
                      >
                        {errors.cv_file}
                      </p>
                    )}

                    <div className="flex items-center space-x-4 my-4">
                      <div className="flex-1 h-px bg-[#1F1F1F]"></div>
                      <span
                        className="text-gray-500 text-sm"
                        style={{ letterSpacing: "0" }}
                      >
                        or
                      </span>
                      <div className="flex-1 h-px bg-[#1F1F1F]"></div>
                    </div>

                    <FormInput
                      label="CV URL"
                      name="cv_url"
                      type="url"
                      value={formData.cv_url}
                      onChange={handleChange}
                      placeholder="https://drive.google.com/your-cv"
                      error={errors.cv_url}
                      required={false}
                    />

                    <p
                      className="text-gray-500 text-xs flex items-start space-x-2"
                      style={{ letterSpacing: "0", textAlign: "left" }}
                    >
                      <svg
                        className="w-4 h-4 mt-0.5 flex-shrink-0"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span>
                        Share your CV via Google Drive or Dropbox for easy
                        access
                      </span>
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-6">
                <button
                  type="submit"
                  className="w-full bg-[#EB0028] py-4 rounded-lg font-bold text-lg hover:bg-[#c7001f] shadow-lg hover:shadow-xl"
                  style={{
                    color: "#FFFFFF",
                    transition: "all 0.3s ease",
                    letterSpacing: "0",
                  }}
                >
                  Submit Application
                </button>
                <p
                  className="text-gray-500 text-sm text-center mt-4"
                  style={{ letterSpacing: "0" }}
                >
                  By submitting, you agree to our terms and privacy policy
                </p>
              </div>
            </form>

            <div className="text-center mt-8 pb-8">
              <a
                href="/volunteer"
                style={{
                  color: "#EB0028",
                  textDecoration: "none",
                  letterSpacing: "0",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.5rem",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.textDecoration = "underline")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.textDecoration = "none")
                }
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  style={{ color: "#EB0028" }}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
                <span>Back to Volunteer Information</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default VolunteersPage;
