import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import TextInput from "../components/form/TextInput";
import "../assets/css/styles.css"; // Keep your global styles

interface LoginForm {
  email: string;
  password: string;
}

const schema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().required("Password is required"),
});

const Login: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: LoginForm) => {
    console.log("Login Data", data);
  };

  return (
    <div className="login-page">
      <div className="form-card shadow p-4 rounded">
        <h3 className="mb-4 text-center">Login to WorkBuddy</h3>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextInput
            label="Email Address"
            name="email"
            type="email"
            register={register}
            error={errors.email?.message}
          />
          <TextInput
            label="Password"
            name="password"
            type="password"
            register={register}
            error={errors.password?.message}
          />

          <div className="d-flex justify-content-between align-items-center mt-3">
            <button type="submit" className="btn btn-primary">
              Login
            </button>
            <a href="/register">New User? Signup</a>
            <a href="/forgot-password">Forgot Password?</a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
