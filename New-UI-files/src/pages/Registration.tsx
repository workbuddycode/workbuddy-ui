import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import TextInput from "../components/form/TextInput";
import FormContainer from "../components/form/FormContainer";

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
  mobile: yup.string().matches(/^[0-9]{10}$/, "Mobile must be 10 digits").required(),
  password: yup.string().min(6, "Password must be at least 6 characters").required(),
  confirmPassword: yup.string().oneOf([yup.ref("password")], "Passwords must match").required()
});

const Registration: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<RegistrationForm>({
    resolver: yupResolver(schema)
  });

  const onSubmit = (data: RegistrationForm) => {
    console.log("Registration Data", data);
  };

  return (
    <div className="container mt-4">
      <h3 className="mb-4">Registration Screen for WorkBuddy</h3>
      <FormContainer>
      <form onSubmit={handleSubmit(onSubmit)} className="shadow p-4 rounded bg-light">
        <TextInput label="Full Name" name="fullName" register={register} error={errors.fullName?.message} />
        <TextInput label="Email Address" name="email" type="email" register={register} error={errors.email?.message} />
        <TextInput label="Mobile Number" name="mobile" register={register} error={errors.mobile?.message} />
        <TextInput label="Password" name="password" type="password" register={register} error={errors.password?.message} />
        <TextInput label="Confirm Password" name="confirmPassword" type="password" register={register} error={errors.confirmPassword?.message} />

        <div className="d-flex justify-content-between align-items-center">
          <button type="submit" className="btn btn-primary">Register</button>
          <a href="/login">Already have an account? Login</a>
        </div>
      </form>
      </FormContainer>
    </div>
  );
};

export default Registration;
