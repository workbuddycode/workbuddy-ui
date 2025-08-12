import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import TextInput from "../components/form/TextInput";
import FormContainer from "../components/form/FormContainer";

interface LoginForm {
  email: string;
  password: string;
}

const schema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().required("Password is required")
});

const Login: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<LoginForm>({
    resolver: yupResolver(schema)
  });

  const onSubmit = (data: LoginForm) => {
    console.log("Login Data", data);
  };

  return (
    <div className="container mt-4">
      <h3 className="mb-4">Login Screen for WorkBuddy</h3>
       <FormContainer>
      <form onSubmit={handleSubmit(onSubmit)} className="shadow p-4 rounded bg-light">
        <TextInput label="Email Address" name="email" type="email" register={register} error={errors.email?.message} />
        <TextInput label="Password" name="password" type="password" register={register} error={errors.password?.message} />

        <div className="d-flex justify-content-between align-items-center">
          <button type="submit" className="btn btn-primary">Login</button>
          <a href="/forgot-password">Forgot Password?</a>
        </div>
      </form>
      ǚ</FormContainer>
    </div>
  );
};

export default Login;
