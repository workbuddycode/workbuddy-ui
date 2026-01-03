import React from "react";
import { Modal, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import TextInput from "../../components/form-controls/TextInput";
import TextAreaInput from "../../components/form-controls/TextAreaInput";
import SelectInput from "../../components/form-controls/SelectInput";

interface DemoForm {
  name: string;
  email: string;
  company: string;
  phone: string;
  companySize: string;
  features: string;
}

interface Props {
  show: boolean;
  onClose: () => void;
}

/* ---------------- Validation Schema ---------------- */
const schema = yup.object({
  name: yup
    .string()
    .required("Name is required")
    .min(2, "Name must be at least 2 characters"),

  email: yup
    .string()
    .email("Enter a valid email")
    .required("Email is required"),

  company: yup
    .string()
    .required("Company name is required"),

  phone: yup
    .string()
    .matches(/^[0-9]{10}$/, "Phone must be 10 digits")
    .required("Phone number is required"),

  companySize: yup
    .string()
    .required("Please select company size"),

  features: yup
    .string()
    .required("Please mention required features")
    .min(10, "Please enter at least 10 characters"),
});

const DemoRequestModal: React.FC<Props> = ({ show, onClose }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<DemoForm>({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: DemoForm) => {
    console.log("Demo Request:", data);
    alert("Demo request submitted successfully!");
    reset();
    onClose();
  };

  return (
    <Modal
      show={show}
      onHide={onClose}
      centered
      size="lg"
      backdropClassName="demo-backdrop"
    >
      <Modal.Body className="p-5">
        <h3 className="text-center mb-2">Get a Personalized Demo</h3>
        <p className="text-center text-muted mb-4">
          See WorkBuddyHR in action. Book your personalized demo today.
        </p>

        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <TextInput
            label="Name"
            name="name"
            register={register}
            error={errors.name?.message}
          />

          <TextInput
            label="Email"
            name="email"
            type="email"
            register={register}
            error={errors.email?.message}
          />

          <TextInput
            label="Company"
            name="company"
            register={register}
            error={errors.company?.message}
          />

          <TextInput
            label="Phone"
            name="phone"
            register={register}
            error={errors.phone?.message}
          />

          <SelectInput
            label="Company Size"
            name="companySize"
            register={register}
            options={[
              "1-50 employees",
              "51-200 employees",
              "201-500 employees",
              "500+ employees",
            ]}
            error={errors.companySize?.message}
          />

          <TextAreaInput
            label="What features are you interested in?"
            name="features"
            register={register}
            error={errors.features?.message}
          />

          <Button
            type="submit"
            className="w-100 mt-3 demo-submit-btn"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Request Demo"}
          </Button>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default DemoRequestModal;
