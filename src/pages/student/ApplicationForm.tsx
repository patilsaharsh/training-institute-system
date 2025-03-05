// src/pages/student/ApplicationForm.tsx
import { useState } from "react";
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
const applicationSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  aadharNumber: z
    .string()
    .length(12, "Aadhar number must be 12 digits")
    .regex(/^\d+$/, "Aadhar number must contain only digits"),
  email: z.string().email("Invalid email address"),
  phone: z
    .string()
    .min(10, "Phone number must be at least 10 digits")
    .regex(/^\d+$/, "Phone number must contain only digits"),
  course: z.enum(["SAP ABAP", "SAP SD", "SAP MM", "SAP CPI", "SAP BASIS"], {
    errorMap: () => ({ message: "Please select a course" }),
  }),
  resumeUrl: z.string().url("Please provide a valid URL to your resume"),
});

type ApplicationFormData = z.infer<typeof applicationSchema>;

const ApplicationForm = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ApplicationFormData>({
    resolver: zodResolver(applicationSchema),
    defaultValues: {
      email: currentUser?.email || "",
      name: currentUser?.displayName || "",
    },
  });

  const onSubmit = async (data: ApplicationFormData) => {
    if (!currentUser) {
      toast.error("You must be logged in to submit an application");
      return;
    }

    try {
      setIsSubmitting(true);

      await submitApplication({
        ...data,
        userId: currentUser.uid,
      });

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
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">
        Apply for Training
      </h1>

      <Card>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Full Name
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

            <div className="sm:col-span-2">
              <label
                htmlFor="aadharNumber"
                className="block text-sm font-medium text-gray-700"
              >
                Aadhar Card Number
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
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
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
                htmlFor="phone"
                className="block text-sm font-medium text-gray-700"
              >
                Phone Number
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

            <div className="sm:col-span-2">
              <label
                htmlFor="course"
                className="block text-sm font-medium text-gray-700"
              >
                Course
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
                </select>
                {errors.course && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.course.message}
                  </p>
                )}
              </div>
            </div>

            <div className="sm:col-span-2">
              <label
                htmlFor="resumeUrl"
                className="block text-sm font-medium text-gray-700"
              >
                Resume URL
              </label>
              <div className="mt-1">
                <input
                  type="url"
                  id="resumeUrl"
                  className={`shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md ${
                    errors.resumeUrl ? "border-red-300" : ""
                  }`}
                  placeholder="https://drive.google.com/your-resume"
                  {...register("resumeUrl")}
                />
                {errors.resumeUrl ? (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.resumeUrl.message}
                  </p>
                ) : (
                  <p className="mt-1 text-xs text-gray-500">
                    Please upload your resume to Google Drive, Dropbox, or any
                    other file hosting service and share the link here.
                  </p>
                )}
              </div>
            </div>
          </div>

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
