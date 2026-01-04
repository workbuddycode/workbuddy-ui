import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import TextInput from "../../../components/form-controls/TextInput";
import SelectInput from "../../../components/form-controls/SelectInput";
import API from "../../../api/RestApi";
import { useNavigate } from "react-router-dom";

interface RegistrationForm {
  fullName: string;
  email: string;
  mobile: string;
  password: string;
  confirmPassword: string;
  role: string;
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
  role: yup.string().required("Role is required"),
});

const ROLE_OPTIONS = ["ADMIN", "MANAGER", "ASSOCIATE", "USER"];

const Registration: React.FC = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegistrationForm>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: RegistrationForm) => {
    console.log("Registration Data", data);

    const payload = {
      fullName: data.fullName,
      email: data.email,
      mobile: data.mobile,
      password: data.password,
      confirmPassword: data.confirmPassword,
      role: data.role,
    };

    try {
      const response = await fetch(API.REGISTER_USER, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || "Registration failed");
      }

      const result = await response.json();
      console.log("Registration successful:", result);

      // Backend does NOT send token → create fallback token
      const token =
        result.token ||
        btoa(JSON.stringify({ id: result.id, role: result.role, email: result.email }));

      localStorage.setItem("token", token);
      localStorage.setItem("role", result.role);

      navigate("/profile");
    } catch (error: any) {
      console.error("Registration error:", error.message);
      alert(error.message);
    }
  };

  return (
    <div className="registration-page">
      <div className="form-card shadow p-4 rounded">
        <h3 className="mb-4 text-center">Registration Screen for WorkBuddy</h3>

        <form onSubmit={handleSubmit(onSubmit)}>
          <TextInput
            label="Full Name"
            name="fullName"
            register={register}
            error={errors.fullName?.message}
          />

          <TextInput
            label="Email Address"
            name="email"
            type="email"
            register={register}
            error={errors.email?.message}
          />

          <TextInput
            label="Mobile Number"
            name="mobile"
            register={register}
            error={errors.mobile?.message}
          />

          <TextInput
            label="Password"
            name="password"
            type="password"
            register={register}
            error={errors.password?.message}
          />

          <TextInput
            label="Confirm Password"
            name="confirmPassword"
            type="password"
            register={register}
            error={errors.confirmPassword?.message}
          />

          {/* ROLE SELECT USING YOUR COMPONENT */}
          <SelectInput
            label="Role"
            name="role"
            options={ROLE_OPTIONS}
            register={register}
            error={errors.role?.message}
          />

          <div className="d-flex justify-content-between align-items-center mt-3">
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
