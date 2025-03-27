// src/pages/student/ApplicationForm.tsx
import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { submitApplication } from "../../services/applicationService";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Card from "../../components/Card";
import Button from "../../components/Button";
import { toast } from "react-toastify";

// Define validation schema
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_FILE_TYPES = ["application/pdf"];

const currentYear = new Date().getFullYear();
const yearOptions = Array.from({ length: 50 }, (_, i) => currentYear - i);

const applicationSchema = z.object({
  // Personal Information
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  gender: z.enum(["male", "female", "other"], {
    errorMap: () => ({ message: "Please select gender" }),
  }),
  phone: z
    .string()
    .min(10, "Phone number must be at least 10 digits")
    .regex(/^\d+$/, "Phone number must contain only digits"),
  whatsappNumber: z
    .string()
    .min(10, "WhatsApp number must be at least 10 digits")
    .regex(/^\d+$/, "WhatsApp number must contain only digits"),
  alternatePhone: z
    .string()
    .regex(/^\d*$/, "Phone number must contain only digits")
    .optional()
    .or(z.literal("")),
  aadharNumber: z
    .string()
    .length(12, "Aadhar number must be 12 digits")
    .regex(/^\d+$/, "Aadhar number must contain only digits"),
  dateOfBirth: z.string().min(1, "Date of birth is required"),
  referredBy: z.string().optional().or(z.literal("")),
  // Address Information
  country: z.string().min(1, "Country is required"),
  state: z.string().optional().or(z.literal("")),
  city: z.string().min(1, "City is required"),
  permanentAddress: z.string().min(1, "Permanent address is required"),

  // Course Selection
  course: z.enum(
    ["SAP ABAP", "SAP SD", "SAP MM", "SAP CPI", "SAP BASIS", "SAP FICO"],
    {
      errorMap: () => ({ message: "Please select a course" }),
    }
  ),

  // SSC (10th) Details
  sscMarks: z
    .string()
    .min(1, "SSC marks percentage is required")
    .regex(/^\d+(\.\d+)?$/, "Enter valid percentage")
    .refine((val) => parseFloat(val) <= 100, "Percentage cannot exceed 100"),
  sscPassingYear: z.string().min(1, "SSC passing year is required"),

  // HSC (12th) Details
  hscMarks: z
    .string()
    .regex(/^\d+(\.\d+)?$/, "Enter valid percentage")
    .refine(
      (val) => !val || parseFloat(val) <= 100,
      "Percentage cannot exceed 100"
    )
    .optional()
    .or(z.literal("")),
  hscPassingYear: z.string().optional().or(z.literal("")),

  // Diploma Details (Optional)
  hasDiploma: z.boolean().optional(),
  diplomaStream: z.string().optional().or(z.literal("")),
  diplomaMarks: z
    .string()
    .regex(/^\d+(\.\d+)?$/, "Enter valid percentage")
    .refine(
      (val) => !val || parseFloat(val) <= 100,
      "Percentage cannot exceed 100"
    )
    .optional()
    .or(z.literal("")),
  diplomaPassingYear: z.string().optional().or(z.literal("")),
  // Graduation Details
  graduationStream: z.string().min(1, "Graduation stream is required"),
  graduationMarks: z
    .string()
    .min(1, "Graduation marks percentage is required")
    .regex(/^\d+(\.\d+)?$/, "Enter valid percentage")
    .refine((val) => parseFloat(val) <= 100, "Percentage cannot exceed 100"),
  graduationPassingYear: z
    .string()
    .min(1, "Graduation passing year is required"),
  technicalStream: z.string().min(1, "Technical stream is required"),

  // Education Gap
  educationGap: z.boolean().optional(),
  educationGapYears: z
    .string()
    .regex(/^\d*$/, "Enter valid number of years")
    .optional()
    .or(z.literal("")),
  educationGapReason: z.string().optional().or(z.literal("")),

  // Post Graduation Details (Optional)
  hasPostGraduation: z.boolean().optional(),
  postGraduationStream: z.string().optional().or(z.literal("")),
  postGraduationMarks: z
    .string()
    .regex(/^\d+(\.\d+)?$/, "Enter valid percentage")
    .refine(
      (val) => !val || parseFloat(val) <= 100,
      "Percentage cannot exceed 100"
    )
    .optional()
    .or(z.literal("")),
  postGraduationPassingYear: z.string().optional().or(z.literal("")),
  // Technical Skills
  technicalSkills: z.string().min(1, "Technical skills are required"),

  // Work Experience
  hasWorkExperience: z.boolean().optional(),
  workExperienceMonths: z
    .string()
    .regex(/^\d*$/, "Enter valid number of months")
    .optional()
    .or(z.literal("")),
  workExperienceDetails: z.string().optional().or(z.literal("")),
  // Terms & Conditions
  acknowledge: z.boolean().refine((val) => val === true, {
    message: "You must acknowledge the terms and conditions",
  }),

  // Resume - handled with file upload
  resumeFile: z
    .any()
    .refine((files) => files?.length > 0, "Please select a resume file")
    .refine(
      (files) => files?.[0]?.size <= MAX_FILE_SIZE,
      "File size must be less than 5MB"
    )
    .refine(
      (files) => ACCEPTED_FILE_TYPES.includes(files?.[0]?.type),
      "Only PDF files are accepted"
    ),
});

type ApplicationFormData = z.infer<typeof applicationSchema>;
// Country options
const countries = [
  { value: "india", label: "India" },
  { value: "usa", label: "United States" },
  { value: "uk", label: "United Kingdom" },
  { value: "canada", label: "Canada" },
  { value: "australia", label: "Australia" },
  { value: "germany", label: "Germany" },
  { value: "france", label: "France" },
  { value: "japan", label: "Japan" },
  { value: "china", label: "China" },
  { value: "singapore", label: "Singapore" },
  { value: "uae", label: "United Arab Emirates" },
  { value: "other", label: "Other" },
];
// Indian states
const indianStates = [
  { value: "andhra_pradesh", label: "Andhra Pradesh" },
  { value: "arunachal_pradesh", label: "Arunachal Pradesh" },
  { value: "assam", label: "Assam" },
  { value: "bihar", label: "Bihar" },
  { value: "chhattisgarh", label: "Chhattisgarh" },
  { value: "goa", label: "Goa" },
  { value: "gujarat", label: "Gujarat" },
  { value: "haryana", label: "Haryana" },
  { value: "himachal_pradesh", label: "Himachal Pradesh" },
  { value: "jharkhand", label: "Jharkhand" },
  { value: "karnataka", label: "Karnataka" },
  { value: "kerala", label: "Kerala" },
  { value: "madhya_pradesh", label: "Madhya Pradesh" },
  { value: "maharashtra", label: "Maharashtra" },
  { value: "manipur", label: "Manipur" },
  { value: "meghalaya", label: "Meghalaya" },
  { value: "mizoram", label: "Mizoram" },
  { value: "nagaland", label: "Nagaland" },
  { value: "odisha", label: "Odisha" },
  { value: "punjab", label: "Punjab" },
  { value: "rajasthan", label: "Rajasthan" },
  { value: "sikkim", label: "Sikkim" },
  { value: "tamil_nadu", label: "Tamil Nadu" },
  { value: "telangana", label: "Telangana" },
  { value: "tripura", label: "Tripura" },
  { value: "uttar_pradesh", label: "Uttar Pradesh" },
  { value: "uttarakhand", label: "Uttarakhand" },
  { value: "west_bengal", label: "West Bengal" },
  { value: "delhi", label: "Delhi" },
  { value: "puducherry", label: "Puducherry" },
  { value: "chandigarh", label: "Chandigarh" },
];
// Educational stream options
const graduationStreams = [
  { value: "BTECH", label: "Bachelor of Technology (B.Tech)" },
  { value: "BE", label: "Bachelor of Engineering (BE)" },
  { value: "BSC", label: "Bachelor of Science (B.Sc)" },
  { value: "BCA", label: "Bachelor of Computer Applications (BCA)" },
  { value: "BCOM", label: "Bachelor of Commerce (B.Com)" },
  { value: "BBA", label: "Bachelor of Business Administration (BBA)" },
  { value: "BA", label: "Bachelor of Arts (BA)" },
  { value: "BMS", label: "Bachelor of Management Studies (BMS)" },
  { value: "BPHARMA", label: "Bachelor of Pharmacy (B.Pharma)" },
  { value: "OTHER", label: "Other" },
];

// Technical streams based on graduation stream
const technicalStreamsByGraduation = {
  BTECH: [
    { value: "CS", label: "Computer Science & Engineering" },
    { value: "IT", label: "Information Technology" },
    { value: "ECE", label: "Electronics and Communication Engineering" },
    { value: "EEE", label: "Electrical and Electronics Engineering" },
    { value: "MECH", label: "Mechanical Engineering" },
    { value: "CIVIL", label: "Civil Engineering" },
    { value: "CHE", label: "Chemical Engineering" },
    { value: "OTHER", label: "Other" },
  ],
  BE: [
    { value: "CS", label: "Computer Science & Engineering" },
    { value: "IT", label: "Information Technology" },
    { value: "ECE", label: "Electronics and Communication Engineering" },
    { value: "EEE", label: "Electrical and Electronics Engineering" },
    { value: "MECH", label: "Mechanical Engineering" },
    { value: "CIVIL", label: "Civil Engineering" },
    { value: "CHE", label: "Chemical Engineering" },
    { value: "OTHER", label: "Other" },
  ],
  BSC: [
    { value: "CS", label: "Computer Science" },
    { value: "IT", label: "Information Technology" },
    { value: "MATH", label: "Mathematics" },
    { value: "PHY", label: "Physics" },
    { value: "CHEM", label: "Chemistry" },
    { value: "STAT", label: "Statistics" },
    { value: "OTHER", label: "Other" },
  ],
  BCA: [
    { value: "CS", label: "Computer Science" },
    { value: "IT", label: "Information Technology" },
    { value: "SE", label: "Software Engineering" },
    { value: "OTHER", label: "Other" },
  ],
  BCOM: [
    { value: "ACCOUNT", label: "Accounting" },
    { value: "FINANCE", label: "Finance" },
    { value: "BANKING", label: "Banking" },
    { value: "OTHER", label: "Other" },
  ],
  BBA: [
    { value: "MARKETING", label: "Marketing" },
    { value: "HR", label: "Human Resources" },
    { value: "FINANCE", label: "Finance" },
    { value: "OTHER", label: "Other" },
  ],
  BA: [
    { value: "ECONOMICS", label: "Economics" },
    { value: "ENGLISH", label: "English" },
    { value: "PSYCHOLOGY", label: "Psychology" },
    { value: "OTHER", label: "Other" },
  ],
  BMS: [
    { value: "MARKETING", label: "Marketing" },
    { value: "HR", label: "Human Resources" },
    { value: "FINANCE", label: "Finance" },
    { value: "OTHER", label: "Other" },
  ],
  BPHARMA: [
    { value: "PHARMACY", label: "Pharmacy" },
    { value: "OTHER", label: "Other" },
  ],
  OTHER: [{ value: "OTHER", label: "Other" }],
};
const defaultTechnicalStreams = [
  { value: "CS", label: "Computer Science" },
  { value: "IT", label: "Information Technology" },
  { value: "ECE", label: "Electronics and Communication" },
  { value: "EEE", label: "Electrical and Electronics" },
  { value: "MECH", label: "Mechanical Engineering" },
  { value: "CIVIL", label: "Civil Engineering" },
  { value: "CHE", label: "Chemical Engineering" },
  { value: "PHY", label: "Physics" },
  { value: "MATH", label: "Mathematics" },
  { value: "OTHER", label: "Other" },
];

const postGraduationStreams = [
  { value: "MTECH", label: "Master of Technology (M.Tech)" },
  { value: "ME", label: "Master of Engineering (ME)" },
  { value: "MSC", label: "Master of Science (M.Sc)" },
  { value: "MCA", label: "Master of Computer Applications (MCA)" },
  { value: "MCOM", label: "Master of Commerce (M.Com)" },
  { value: "MBA", label: "Master of Business Administration (MBA)" },
  { value: "MA", label: "Master of Arts (MA)" },
  { value: "MPHARMA", label: "Master of Pharmacy (M.Pharma)" },
  { value: "OTHER", label: "Other" },
];

const diplomaStreams = [
  { value: "COMP", label: "Computer Engineering" },
  { value: "IT", label: "Information Technology" },
  { value: "ELECTRONICS", label: "Electronics Engineering" },
  { value: "ELECTRICAL", label: "Electrical Engineering" },
  { value: "MECHANICAL", label: "Mechanical Engineering" },
  { value: "CIVIL", label: "Civil Engineering" },
  { value: "CHEMICAL", label: "Chemical Engineering" },
  { value: "OTHER", label: "Other" },
];
const ApplicationForm = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFileName, setSelectedFileName] = useState<string>("");
  const [availableTechnicalStreams, setAvailableTechnicalStreams] = useState(
    defaultTechnicalStreams
  );
  const [showStateDropdown, setShowStateDropdown] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<ApplicationFormData>({
    resolver: zodResolver(applicationSchema),
    defaultValues: {
      email: currentUser?.email || "",
      name: currentUser?.displayName || "",
      gender: "male", // default gender
      country: "india", // default country
      hasDiploma: false,
      hasPostGraduation: false,
      hasWorkExperience: false,
      educationGap: false,
      acknowledge: false,
    },
  });

  // Watch form values for conditional rendering
  const watchHasDiploma = watch("hasDiploma");
  const watchHasPostGraduation = watch("hasPostGraduation");
  const watchHasWorkExperience = watch("hasWorkExperience");
  const watchEducationGap = watch("educationGap");
  const watchGraduationStream = watch("graduationStream");
  const watchCountry = watch("country");
  // Update technical streams based on graduation stream
  useEffect(() => {
    if (watchGraduationStream) {
      const streams =
        technicalStreamsByGraduation[
          watchGraduationStream as keyof typeof technicalStreamsByGraduation
        ] || defaultTechnicalStreams;
      setAvailableTechnicalStreams(streams);
      // Reset technical stream when graduation stream changes
      setValue("technicalStream", "");
    }
  }, [watchGraduationStream, setValue]);

  // Show state dropdown only if India is selected
  useEffect(() => {
    if (watchCountry === "india") {
      setShowStateDropdown(true);
    } else {
      setShowStateDropdown(false);
      setValue("state", "");
    }
  }, [watchCountry, setValue]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      setSelectedFileName(files[0].name);
      setValue("resumeFile", files);
    } else {
      setSelectedFileName("");
      setValue("resumeFile", null);
    }
  };

  const onSubmit = async (data: ApplicationFormData) => {
    if (!currentUser) {
      toast.error("You must be logged in to submit an application");
      return;
    }

    try {
      setIsSubmitting(true);

      // Create form data to send to the server
      const formData = new FormData();

      // Append the resume file
      if (data.resumeFile && data.resumeFile[0]) {
        formData.append("resumeFile", data.resumeFile[0]);
      }

      // Remove the file from the data before JSON serialization
      const { resumeFile, ...applicationData } = data;

      formData.append(
        "applicationData",
        JSON.stringify({
          ...applicationData,
          userId: currentUser.uid,
        })
      );

      await submitApplication(formData);

      toast.success("Application submitted successfully!");
      navigate("/student");
    } catch (error) {
      console.error("Error submitting application:", error);
      toast.error("Failed to submit application. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <div className="pb-10">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">
        Apply for Training
      </h1>

      <Card>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          {/* Personal Information Section */}
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-4 border-b pb-2">
              Personal Information
            </h2>
            <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Full Name <span className="text-red-500">*</span>
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    id="name"
                    autoComplete="name"
                    className={`shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md ${
                      errors.name ? "border-red-300" : ""
                    }`}
                    {...register("name")}
                  />
                  {errors.name && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.name.message}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label
                  htmlFor="gender"
                  className="block text-sm font-medium text-gray-700"
                >
                  Gender <span className="text-red-500">*</span>
                </label>
                <div className="mt-1">
                  <select
                    id="gender"
                    className={`shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md ${
                      errors.gender ? "border-red-300" : ""
                    }`}
                    {...register("gender")}
                  >
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                  {errors.gender && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.gender.message}
                    </p>
                  )}
                </div>
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email <span className="text-red-500">*</span>
                </label>
                <div className="mt-1">
                  <input
                    type="email"
                    id="email"
                    autoComplete="email"
                    className={`shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md ${
                      errors.email ? "border-red-300" : ""
                    }`}
                    {...register("email")}
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.email.message}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label
                  htmlFor="dateOfBirth"
                  className="block text-sm font-medium text-gray-700"
                >
                  Date of Birth <span className="text-red-500">*</span>
                </label>
                <div className="mt-1">
                  <input
                    type="date"
                    id="dateOfBirth"
                    className={`shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md ${
                      errors.dateOfBirth ? "border-red-300" : ""
                    }`}
                    {...register("dateOfBirth")}
                    max={new Date().toISOString().split("T")[0]}
                  />
                  {errors.dateOfBirth && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.dateOfBirth.message}
                    </p>
                  )}
                </div>
              </div>
              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-gray-700"
                >
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <div className="mt-1">
                  <input
                    type="tel"
                    id="phone"
                    autoComplete="tel"
                    className={`shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md ${
                      errors.phone ? "border-red-300" : ""
                    }`}
                    {...register("phone")}
                  />
                  {errors.phone && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.phone.message}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label
                  htmlFor="whatsappNumber"
                  className="block text-sm font-medium text-gray-700"
                >
                  WhatsApp Number <span className="text-red-500">*</span>
                </label>
                <div className="mt-1">
                  <input
                    type="tel"
                    id="whatsappNumber"
                    className={`shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md ${
                      errors.whatsappNumber ? "border-red-300" : ""
                    }`}
                    {...register("whatsappNumber")}
                  />
                  {errors.whatsappNumber && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.whatsappNumber.message}
                    </p>
                  )}
                </div>
              </div>
              <div>
                <label
                  htmlFor="alternatePhone"
                  className="block text-sm font-medium text-gray-700"
                >
                  Alternate Phone Number
                </label>
                <div className="mt-1">
                  <input
                    type="tel"
                    id="alternatePhone"
                    className={`shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md ${
                      errors.alternatePhone ? "border-red-300" : ""
                    }`}
                    {...register("alternatePhone")}
                  />
                  {errors.alternatePhone && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.alternatePhone.message}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label
                  htmlFor="aadharNumber"
                  className="block text-sm font-medium text-gray-700"
                >
                  Aadhar Card Number <span className="text-red-500">*</span>
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    id="aadharNumber"
                    className={`shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md ${
                      errors.aadharNumber ? "border-red-300" : ""
                    }`}
                    {...register("aadharNumber")}
                  />
                  {errors.aadharNumber && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.aadharNumber.message}
                    </p>
                  )}
                </div>
              </div>
              <div>
                <label
                  htmlFor="referredBy"
                  className="block text-sm font-medium text-gray-700"
                >
                  Referred By
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    id="referredBy"
                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    {...register("referredBy")}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Address Information Section */}
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-4 border-b pb-2">
              Address Information
            </h2>
            <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="country"
                  className="block text-sm font-medium text-gray-700"
                >
                  Country <span className="text-red-500">*</span>
                </label>
                <div className="mt-1">
                  <select
                    id="country"
                    className={`shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md ${
                      errors.country ? "border-red-300" : ""
                    }`}
                    {...register("country")}
                  >
                    {countries.map((country) => (
                      <option key={country.value} value={country.value}>
                        {country.label}
                      </option>
                    ))}
                  </select>
                  {errors.country && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.country.message}
                    </p>
                  )}
                </div>
              </div>
              {showStateDropdown && (
                <div>
                  <label
                    htmlFor="state"
                    className="block text-sm font-medium text-gray-700"
                  >
                    State <span className="text-red-500">*</span>
                  </label>
                  <div className="mt-1">
                    <select
                      id="state"
                      className={`shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md ${
                        errors.state ? "border-red-300" : ""
                      }`}
                      {...register("state")}
                    >
                      <option value="">Select State</option>
                      {indianStates.map((state) => (
                        <option key={state.value} value={state.value}>
                          {state.label}
                        </option>
                      ))}
                    </select>
                    {errors.state && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.state.message}
                      </p>
                    )}
                  </div>
                </div>
              )}

              <div>
                <label
                  htmlFor="city"
                  className="block text-sm font-medium text-gray-700"
                >
                  City <span className="text-red-500">*</span>
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    id="city"
                    className={`shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md ${
                      errors.city ? "border-red-300" : ""
                    }`}
                    {...register("city")}
                  />
                  {errors.city && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.city.message}
                    </p>
                  )}
                </div>
              </div>
              <div className="sm:col-span-2">
                <label
                  htmlFor="permanentAddress"
                  className="block text-sm font-medium text-gray-700"
                >
                  Permanent Address <span className="text-red-500">*</span>
                </label>
                <div className="mt-1">
                  <textarea
                    id="permanentAddress"
                    rows={3}
                    className={`shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md ${
                      errors.permanentAddress ? "border-red-300" : ""
                    }`}
                    placeholder="Enter your complete permanent address"
                    {...register("permanentAddress")}
                  ></textarea>
                  {errors.permanentAddress && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.permanentAddress.message}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Course Selection */}
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-4 border-b pb-2">
              Course Selection
            </h2>
            <div className="grid grid-cols-1">
              <div>
                <label
                  htmlFor="course"
                  className="block text-sm font-medium text-gray-700"
                >
                  Course <span className="text-red-500">*</span>
                </label>
                <div className="mt-1">
                  <select
                    id="course"
                    className={`shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md ${
                      errors.course ? "border-red-300" : ""
                    }`}
                    {...register("course")}
                  >
                    <option value="">Select a course</option>
                    <option value="SAP ABAP">SAP ABAP</option>
                    <option value="SAP SD">SAP SD</option>
                    <option value="SAP MM">SAP MM</option>
                    <option value="SAP CPI">SAP CPI</option>
                    <option value="SAP BASIS">SAP BASIS</option>
                    <option value="SAP FICO">SAP FICO</option>
                  </select>
                  {errors.course && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.course.message}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
          {/* Educational Information Section */}
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-4 border-b pb-2">
              Educational Information
            </h2>

            {/* SSC (10th) Details */}
            <div className="mb-6">
              <h3 className="text-md font-medium text-gray-800 mb-4">
                SSC (10th Standard) Details
              </h3>
              <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="sscPassingYear"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Passing Year <span className="text-red-500">*</span>
                  </label>
                  <div className="mt-1">
                    <select
                      id="sscPassingYear"
                      className={`shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md ${
                        errors.sscPassingYear ? "border-red-300" : ""
                      }`}
                      {...register("sscPassingYear")}
                    >
                      <option value="">Select Year</option>
                      {yearOptions.map((year) => (
                        <option key={year} value={year.toString()}>
                          {year}
                        </option>
                      ))}
                    </select>
                    {errors.sscPassingYear && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.sscPassingYear.message}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="sscMarks"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Percentage (%) <span className="text-red-500">*</span>
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      id="sscMarks"
                      className={`shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md ${
                        errors.sscMarks ? "border-red-300" : ""
                      }`}
                      placeholder="e.g. 85.5"
                      {...register("sscMarks")}
                    />
                    {errors.sscMarks && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.sscMarks.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
            {/* HSC (12th) Details */}
            <div className="mb-6">
              <h3 className="text-md font-medium text-gray-800 mb-4">
                HSC (12th Standard) Details
              </h3>
              <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="hscPassingYear"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Passing Year
                  </label>
                  <div className="mt-1">
                    <select
                      id="hscPassingYear"
                      className={`shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md ${
                        errors.hscPassingYear ? "border-red-300" : ""
                      }`}
                      {...register("hscPassingYear")}
                    >
                      <option value="">Select Year</option>
                      {yearOptions.map((year) => (
                        <option key={year} value={year.toString()}>
                          {year}
                        </option>
                      ))}
                    </select>
                    {errors.hscPassingYear && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.hscPassingYear.message}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="hscMarks"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Percentage (%)
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      id="hscMarks"
                      className={`shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md ${
                        errors.hscMarks ? "border-red-300" : ""
                      }`}
                      placeholder="e.g. 75.5"
                      {...register("hscMarks")}
                    />
                    {errors.hscMarks && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.hscMarks.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
            {/* Diploma Details */}
            <div className="mb-6">
              <div className="flex items-center mb-4">
                <input
                  id="hasDiploma"
                  type="checkbox"
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                  {...register("hasDiploma")}
                />
                <label
                  htmlFor="hasDiploma"
                  className="ml-2 block text-md font-medium text-gray-800"
                >
                  I have completed a Diploma
                </label>
              </div>

              {Boolean(watchHasDiploma) && (
                <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-3 pl-6 border-l-2 border-gray-200">
                  <div>
                    <label
                      htmlFor="diplomaStream"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Diploma Stream
                    </label>
                    <div className="mt-1">
                      <select
                        id="diplomaStream"
                        className={`shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md ${
                          errors.diplomaStream ? "border-red-300" : ""
                        }`}
                        {...register("diplomaStream")}
                      >
                        <option value="">Select Stream</option>
                        {diplomaStreams.map((stream) => (
                          <option key={stream.value} value={stream.value}>
                            {stream.label}
                          </option>
                        ))}
                      </select>
                      {errors.diplomaStream && (
                        <p className="mt-1 text-sm text-red-600">
                          {errors.diplomaStream.message}
                        </p>
                      )}
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="diplomaPassingYear"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Passing Year
                    </label>
                    <div className="mt-1">
                      <select
                        id="diplomaPassingYear"
                        className={`shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md ${
                          errors.diplomaPassingYear ? "border-red-300" : ""
                        }`}
                        {...register("diplomaPassingYear")}
                      >
                        <option value="">Select Year</option>
                        {yearOptions.map((year) => (
                          <option key={year} value={year.toString()}>
                            {year}
                          </option>
                        ))}
                      </select>
                      {errors.diplomaPassingYear && (
                        <p className="mt-1 text-sm text-red-600">
                          {errors.diplomaPassingYear.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="diplomaMarks"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Percentage (%)
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        id="diplomaMarks"
                        className={`shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md ${
                          errors.diplomaMarks ? "border-red-300" : ""
                        }`}
                        placeholder="e.g. 70.5"
                        {...register("diplomaMarks")}
                      />
                      {errors.diplomaMarks && (
                        <p className="mt-1 text-sm text-red-600">
                          {errors.diplomaMarks.message}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
            {/* Graduation Details */}
            <div className="mb-6">
              <h3 className="text-md font-medium text-gray-800 mb-4">
                Graduation Details <span className="text-red-500">*</span>
              </h3>
              <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="graduationStream"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Graduation Stream <span className="text-red-500">*</span>
                  </label>
                  <div className="mt-1">
                    <select
                      id="graduationStream"
                      className={`shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md ${
                        errors.graduationStream ? "border-red-300" : ""
                      }`}
                      {...register("graduationStream")}
                    >
                      <option value="">Select Stream</option>
                      {graduationStreams.map((stream) => (
                        <option key={stream.value} value={stream.value}>
                          {stream.label}
                        </option>
                      ))}
                    </select>
                    {errors.graduationStream && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.graduationStream.message}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="technicalStream"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Technical Stream <span className="text-red-500">*</span>
                  </label>
                  <div className="mt-1">
                    <select
                      id="technicalStream"
                      className={`shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md ${
                        errors.technicalStream ? "border-red-300" : ""
                      }`}
                      {...register("technicalStream")}
                      disabled={!watchGraduationStream}
                    >
                      <option value="">Select Technical Stream</option>
                      {availableTechnicalStreams.map((stream) => (
                        <option key={stream.value} value={stream.value}>
                          {stream.label}
                        </option>
                      ))}
                    </select>
                    {errors.technicalStream && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.technicalStream.message}
                      </p>
                    )}
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="graduationPassingYear"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Passing Year <span className="text-red-500">*</span>
                  </label>
                  <div className="mt-1">
                    <select
                      id="graduationPassingYear"
                      className={`shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md ${
                        errors.graduationPassingYear ? "border-red-300" : ""
                      }`}
                      {...register("graduationPassingYear")}
                    >
                      <option value="">Select Year</option>
                      {yearOptions.map((year) => (
                        <option key={year} value={year.toString()}>
                          {year}
                        </option>
                      ))}
                    </select>
                    {errors.graduationPassingYear && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.graduationPassingYear.message}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="graduationMarks"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Percentage (%) <span className="text-red-500">*</span>
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      id="graduationMarks"
                      className={`shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md ${
                        errors.graduationMarks ? "border-red-300" : ""
                      }`}
                      placeholder="e.g. 65.5"
                      {...register("graduationMarks")}
                    />
                    {errors.graduationMarks && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.graduationMarks.message}
                      </p>
                    )}
                  </div>
                </div>
                <div className="sm:col-span-2">
                  <div className="flex items-center mb-2">
                    <input
                      id="educationGap"
                      type="checkbox"
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                      {...register("educationGap")}
                    />
                    <label
                      htmlFor="educationGap"
                      className="ml-2 block text-sm font-medium text-gray-700"
                    >
                      I have an education gap
                    </label>
                  </div>

                  {Boolean(watchEducationGap) && (
                    <div className="grid grid-cols-1 gap-y-4 gap-x-4 sm:grid-cols-2 pl-6 border-l-2 border-gray-200 mt-2">
                      <div>
                        <label
                          htmlFor="educationGapYears"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Gap Duration (in years)
                        </label>
                        <div className="mt-1">
                          <input
                            type="number"
                            id="educationGapYears"
                            className={`shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md ${
                              errors.educationGapYears ? "border-red-300" : ""
                            }`}
                            min="0"
                            max="20"
                            {...register("educationGapYears")}
                          />
                          {errors.educationGapYears && (
                            <p className="mt-1 text-sm text-red-600">
                              {errors.educationGapYears.message}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="sm:col-span-2">
                        <label
                          htmlFor="educationGapReason"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Reason for Gap
                        </label>
                        <div className="mt-1">
                          <textarea
                            id="educationGapReason"
                            rows={2}
                            className={`shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md ${
                              errors.educationGapReason ? "border-red-300" : ""
                            }`}
                            placeholder="Explain the reason for your education gap"
                            {...register("educationGapReason")}
                          />
                          {errors.educationGapReason && (
                            <p className="mt-1 text-sm text-red-600">
                              {errors.educationGapReason.message}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
            {/* Post Graduation Details */}
            <div className="mb-6">
              <div className="flex items-center mb-4">
                <input
                  id="hasPostGraduation"
                  type="checkbox"
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                  {...register("hasPostGraduation")}
                />
                <label
                  htmlFor="hasPostGraduation"
                  className="ml-2 block text-md font-medium text-gray-800"
                >
                  I have completed Post Graduation
                </label>
              </div>

              {Boolean(watchHasPostGraduation) && (
                <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-3 pl-6 border-l-2 border-gray-200">
                  <div>
                    <label
                      htmlFor="postGraduationStream"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Post Graduation Stream
                    </label>
                    <div className="mt-1">
                      <select
                        id="postGraduationStream"
                        className={`shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md ${
                          errors.postGraduationStream ? "border-red-300" : ""
                        }`}
                        {...register("postGraduationStream")}
                      >
                        <option value="">Select Stream</option>
                        {postGraduationStreams.map((stream) => (
                          <option key={stream.value} value={stream.value}>
                            {stream.label}
                          </option>
                        ))}
                      </select>
                      {errors.postGraduationStream && (
                        <p className="mt-1 text-sm text-red-600">
                          {errors.postGraduationStream.message}
                        </p>
                      )}
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="postGraduationPassingYear"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Passing Year
                    </label>
                    <div className="mt-1">
                      <select
                        id="postGraduationPassingYear"
                        className={`shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md ${
                          errors.postGraduationPassingYear
                            ? "border-red-300"
                            : ""
                        }`}
                        {...register("postGraduationPassingYear")}
                      >
                        <option value="">Select Year</option>
                        {yearOptions.map((year) => (
                          <option key={year} value={year.toString()}>
                            {year}
                          </option>
                        ))}
                      </select>
                      {errors.postGraduationPassingYear && (
                        <p className="mt-1 text-sm text-red-600">
                          {errors.postGraduationPassingYear.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="postGraduationMarks"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Percentage (%)
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        id="postGraduationMarks"
                        className={`shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md ${
                          errors.postGraduationMarks ? "border-red-300" : ""
                        }`}
                        placeholder="e.g. 75.5"
                        {...register("postGraduationMarks")}
                      />
                      {errors.postGraduationMarks && (
                        <p className="mt-1 text-sm text-red-600">
                          {errors.postGraduationMarks.message}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
          {/* Technical Skills Section */}
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-4 border-b pb-2">
              Technical Skills
            </h2>
            <div className="sm:col-span-2">
              <label
                htmlFor="technicalSkills"
                className="block text-sm font-medium text-gray-700"
              >
                Technical Skills <span className="text-red-500">*</span>
              </label>
              <div className="mt-1">
                <textarea
                  id="technicalSkills"
                  rows={3}
                  className={`shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md ${
                    errors.technicalSkills ? "border-red-300" : ""
                  }`}
                  placeholder="List your technical skills (e.g., programming languages, tools, platforms)"
                  {...register("technicalSkills")}
                />
                {errors.technicalSkills && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.technicalSkills.message}
                  </p>
                )}
              </div>
            </div>
          </div>
          {/* Work Experience Section */}
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-4 border-b pb-2">
              Work Experience
            </h2>
            <div className="flex items-center mb-4">
              <input
                id="hasWorkExperience"
                type="checkbox"
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                {...register("hasWorkExperience")}
              />
              <label
                htmlFor="hasWorkExperience"
                className="ml-2 block text-md font-medium text-gray-800"
              >
                I have work experience
              </label>
            </div>
            {Boolean(watchHasWorkExperience) && (
              <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2 pl-6 border-l-2 border-gray-200">
                <div>
                  <label
                    htmlFor="workExperienceMonths"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Duration (in months)
                  </label>
                  <div className="mt-1">
                    <input
                      type="number"
                      id="workExperienceMonths"
                      className={`shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md ${
                        errors.workExperienceMonths ? "border-red-300" : ""
                      }`}
                      min="0"
                      {...register("workExperienceMonths")}
                    />
                    {errors.workExperienceMonths && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.workExperienceMonths.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label
                    htmlFor="workExperienceDetails"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Work Experience Details
                  </label>
                  <div className="mt-1">
                    <textarea
                      id="workExperienceDetails"
                      rows={3}
                      className={`shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md ${
                        errors.workExperienceDetails ? "border-red-300" : ""
                      }`}
                      placeholder="Describe your work experience, companies, roles, and responsibilities"
                      {...register("workExperienceDetails")}
                    />
                    {errors.workExperienceDetails && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.workExperienceDetails.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
          {/* Resume Upload Section */}
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-4 border-b pb-2">
              Resume Upload
            </h2>
            <div className="sm:col-span-2">
              <label
                htmlFor="resumeFile"
                className="block text-sm font-medium text-gray-700"
              >
                Resume (PDF only, max 5MB){" "}
                <span className="text-red-500">*</span>
              </label>
              <div className="mt-1 flex items-center">
                <input
                  type="file"
                  id="resumeFile"
                  accept=".pdf"
                  className="hidden"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Browse
                </button>
                <span className="ml-3 text-sm text-gray-500">
                  {selectedFileName || "No file selected"}
                </span>
              </div>
              {errors.resumeFile && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.resumeFile.message?.toString() || "Invalid file"}
                </p>
              )}
              <p className="mt-1 text-xs text-gray-500">
                Please upload your resume in PDF format. Maximum file size: 5MB.
              </p>
            </div>
          </div>
          {/* Terms and Acknowledgement */}
          <div>
            <div className="flex items-center">
              <input
                id="acknowledge"
                type="checkbox"
                className={`h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded ${
                  errors.acknowledge ? "border-red-300" : ""
                }`}
                {...register("acknowledge")}
              />
              <label
                htmlFor="acknowledge"
                className="ml-2 block text-sm text-gray-900"
              >
                I confirm that all the information provided is accurate and
                complete. I understand that providing false information may
                result in disqualification.
              </label>
            </div>
            {errors.acknowledge && (
              <p className="mt-1 text-sm text-red-600 pl-6">
                {errors.acknowledge.message}
              </p>
            )}
          </div>

          {/* Submit Buttons */}
          <div className="flex items-center justify-end space-x-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate("/student")}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              isLoading={isSubmitting}
              disabled={isSubmitting}
            >
              Submit Application
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default ApplicationForm;
