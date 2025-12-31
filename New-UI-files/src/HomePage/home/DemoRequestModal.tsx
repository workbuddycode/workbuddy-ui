import React from "react";
import { Modal, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
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

const DemoRequestModal: React.FC<Props> = ({ show, onClose }) => {
  const { register, handleSubmit, formState: { errors } } =
    useForm<DemoForm>();

  const onSubmit = (data: DemoForm) => {
    console.log("Demo Request:", data);
    alert("Demo request submitted!");
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
            label="Company Size"
            name="companySize"
            register={register}
            options={[
              "1-50 employees",
              "51-200 employees",
              "201-500 employees",
              "500+ employees"
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
          >
            Request Demo
          </Button>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default DemoRequestModal;
