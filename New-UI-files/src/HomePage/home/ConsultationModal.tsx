import React from "react";
import { Modal, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import TextInput from "../../components/form-controls/TextInput";
import TextAreaInput from "../../components/form-controls/TextAreaInput";
import SelectInput from "../../components/form-controls/SelectInput";

interface ConsultationForm {
  name: string;
  email: string;
  company: string;
  phone: string;
  consultationType: string;
  message: string;
}

interface Props {
  show: boolean;
  onClose: () => void;
}

const ConsultationModal: React.FC<Props> = ({ show, onClose }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ConsultationForm>();

  const onSubmit = (data: ConsultationForm) => {
    console.log("Consultation Request:", data);
    alert("Consultation request submitted!");
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

        <form onSubmit={handleSubmit(onSubmit)}>
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
            label="Consultation Type"
            name="consultationType"
            register={register}
            options={[
              "HR Process Setup",
              "Payroll & Compliance",
              "HRMS Implementation",
              "Custom Requirement",
            ]}
            error={errors.consultationType?.message}
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
          >
            Book Consultation
          </Button>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default ConsultationModal;
