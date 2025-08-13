import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import TextInput from "../components/form/TextInput";
import TextAreaInput from "../components/form/TextAreaInput";
import FileInput from "../components/form/FileInput";
import FormContainer from "../components/form/FormContainer";

// Validation Schema
const schema = yup.object({
  additionalContactPerson: yup.string().required("Contact Person is required"),
  additionalContactEmail: yup.string().email("Invalid email").required("Email is required"),
  additionalContactNumber: yup
    .string()
    .matches(/^[0-9]{10}$/, "Must be 10 digits")
    .required("Contact Number is required"),
  gst: yup.string().required("GST is required"),
  servicesToOpt: yup.string().required("Please enter services"),
  logo: yup
    .mixed<FileList>()
    .test("required", "Logo is required", (value) => value && value.length > 0)
    .test("fileType", "Only image files allowed", (value) => value && value[0]?.type.startsWith("image/")),
  heroImage: yup
    .mixed<FileList>()
    .test("required", "Hero Image is required", (value) => value && value.length > 0)
    .test("fileType", "Only image files allowed", (value) => value && value[0]?.type.startsWith("image/")),
});

type ClientForm = yup.InferType<typeof schema>; // 👈 This becomes the source of truth

const OnboardingClient: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<ClientForm>({
    resolver: yupResolver(schema) as any // 👈 small cast to silence mismatch warnings
  });

  const onSubmit = (data: ClientForm) => {
    console.log("Client Onboarding Data", data);
    alert("Form submitted successfully!");
  };

  return (
    <div className="onboarding-page">
      <div className="form-card shadow p-4 rounded">
        <h3 className="mb-4">Onboarding Registration (Client)</h3>
        <form onSubmit={handleSubmit(onSubmit)} className="shadow p-4 rounded bg-light">

          <TextInput label="Additional Contact Person" name="additionalContactPerson" register={register} error={errors.additionalContactPerson?.message} />
          <TextInput label="Additional Contact Email" name="additionalContactEmail" type="email" register={register} error={errors.additionalContactEmail?.message} />
          <TextInput label="Additional Contact Number" name="additionalContactNumber" register={register} error={errors.additionalContactNumber?.message} />
          <TextInput label="GST No / Registration No" name="gst" register={register} error={errors.gst?.message} />

          <TextAreaInput label="Services to Opt For" name="servicesToOpt" register={register} error={errors.servicesToOpt?.message} />

          <FileInput label="Logo Upload" name="logo" register={register} error={errors.logo?.message} />
          <FileInput label="Hero Image Upload" name="heroImage" register={register} error={errors.heroImage?.message} />

          <button type="submit" className="btn btn-primary">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default OnboardingClient;
