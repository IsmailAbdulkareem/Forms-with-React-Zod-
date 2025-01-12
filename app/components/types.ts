import { FieldError, UseFormRegister } from "react-hook-form";
import { z, ZodType } from "zod"; // Add new import

export const UserSchema: ZodType<FormData> = z
  .object({
    FirstName: z.string().min(1, { message: "First name is required" }),
    lastName: z.string().min(1, { message: "Last name is required" }),
    email: z.string().email({ message: "Invalid email address" }),
    githubUrl: z
      .string()
      .url({ message: "Invalid URL" })
      .includes("github.com", { message: "Invalid GitHub URL" }),
    yearsOfExperience: z
      .number({
        required_error: "Years of Experience is required",
        invalid_type_error: "Years of Experience must be a number",
      })
      .min(1, { message: "Minimum 1 year of experience required" })
      .max(10, { message: "Maximum 10 years of experience allowed" }),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters long" })
      .max(20, { message: "Password must not exceed 20 characters" }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type FormData = {
    FirstName: string;
    lastName: string; 
    email: string;
    githubUrl: string;
    yearsOfExperience: number;
    password: string;
    confirmPassword: string;
};

export type FormFieldProps = {
    type: string;
    placeholder: string;
    name: ValidFieldNames;
    register: UseFormRegister<FormData>;
    error: FieldError | undefined;
    valueAsNumber?: boolean;
    className?: string; // Add this for custom class names
    style?: React.CSSProperties; // Add this for inline styles
};

export type ValidFieldNames =
    | "FirstName"
    | "lastName"
    | "email"
    | "githubUrl"
    | "yearsOfExperience"
    | "password"
    | "confirmPassword";
