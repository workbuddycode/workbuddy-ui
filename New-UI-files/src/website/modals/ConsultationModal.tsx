import React from "react";
import { Modal, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import TextInput from "../../components/form-controls/TextInput";
import TextAreaInput from "../../components/form-controls/TextAreaInput";

interface ConsultationForm {
  name: string;
  email: string;
  company: string;
  phone: string;
  message: string;
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

  message: yup
    .string()
    .required("Please describe your requirement")
    .min(10, "Message must be at least 10 characters"),
});

const ConsultationModal: React.FC<Props> = ({ show, onClose }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ConsultationForm>({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: ConsultationForm) => {
    console.log("Consultation Request:", data);
    alert("Consultation request submitted successfully!");
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
        <h3 className="text-center mb-2">Book a Consultation</h3>
        <p className="text-center text-muted mb-4">
          Talk to our HR experts and get guidance tailored to your business.
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

          <TextAreaInput
            label="Tell us about your requirement"
            name="message"
            register={register}
            error={errors.message?.message}
          />

          <Button
            type="submit"
            className="w-100 mt-3 demo-submit-btn"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Book Consultation"}
          </Button>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default ConsultationModal;
