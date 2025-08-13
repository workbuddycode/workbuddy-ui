import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import TextInput from "../components/form/TextInput";
import "../assets/css/styles.css"; // same file as login page

interface RegistrationForm {
  fullName: string;
  email: string;
  mobile: string;
  password: string;
  confirmPassword: string;
}

const schema = yup.object().shape({
  fullName: yup.string().required("Full Name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  mobile: yup
    .string()
    .matches(/^[0-9]{10}$/, "Mobile must be 10 digits")
    .required("Mobile is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match")
    .required("Confirm Password is required"),
});

const Registration: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegistrationForm>({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: RegistrationForm) => {
    console.log("Registration Data", data);
  };

  return (
    <div className="registration-page">
      <div className="form-card shadow p-4 rounded">
        <h3 className="mb-4 text-center">Registration Screen for WorkBuddy</h3>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-3">
            <TextInput
              label="Full Name"
              name="fullName"
              register={register}
              error={errors.fullName?.message}
            />
          </div>
          <div className="mb-3">
            <TextInput
              label="Email Address"
              name="email"
              type="email"
              register={register}
              error={errors.email?.message}
            />
          </div>
          <div className="mb-3">
            <TextInput
              label="Mobile Number"
              name="mobile"
              register={register}
              error={errors.mobile?.message}
            />
          </div>
          <div className="mb-3">
            <TextInput
              label="Password"
              name="password"
              type="password"
              register={register}
              error={errors.password?.message}
            />
          </div>
          <div className="mb-4">
            <TextInput
              label="Confirm Password"
              name="confirmPassword"
              type="password"
              register={register}
              error={errors.confirmPassword?.message}
            />
          </div>

          <div className="d-flex justify-content-between align-items-center">
            <button type="submit" className="btn btn-primary">
              Register
            </button>
            <a href="/login">Already have an account? Login</a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Registration;
