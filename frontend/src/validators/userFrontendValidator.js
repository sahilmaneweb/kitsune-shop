import { z } from "zod";

// Regex for password: at least 8 chars, 1 uppercase, 1 lowercase, 1 number, 1 special character
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+={}\[\]:;"'<>,.?/\\|~`]).{8,}$/;
// Regex for names: only alphabets and spaces
const nameRegex = /^[a-zA-Z\s]+$/;

export const userLoginValidatorFrontend = z.object({
  email: z
    .string({ required_error: "Email is required" })
    .email("Invalid email address"),
  password: z
    .string({ required_error: "Password is required" })
    .min(8, "Password must be at least 8 characters long")
    .regex(passwordRegex, "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"),
});

export const userRegisterValidatorFrontend = z.object({
  fname: z
    .string({ required_error: "First Name is required" })
    .min(1, "First Name cannot be empty")
    .regex(nameRegex, "First Name can only contain letters and spaces"),
  lname: z
    .string({ required_error: "Last Name is required" })
    .min(1, "Last Name cannot be empty")
    .regex(nameRegex, "Last Name can only contain letters and spaces"),
  email: z
    .string({ required_error: "Email is required" })
    .email("Invalid email address"),
  password: z
    .string({ required_error: "Password is required" })
    .min(8, "Password must be at least 8 characters long")
    .regex(passwordRegex, "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"),
});