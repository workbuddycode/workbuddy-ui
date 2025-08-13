import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import TextInput from "../form-controls/TextInput";
import TextAreaInput from "../form-controls/TextAreaInput";
import SelectInput from "../form-controls/SelectInput";

interface WorkBuddyForm {
  orgName: string;
  contactName: string;
  contactEmail: string;
  contactNumber: string;
  industryType: string;
  companySize: string;
  address: string;
}

const schema = yup.object().shape({
  orgName: yup.string().required("Organisation Name is required"),
  contactName: yup.string().required("Contact Name is required"),
  contactEmail: yup.string().email("Invalid email").required(),
  contactNumber: yup.string().matches(/^[0-9]{10}$/, "Must be 10 digits").required(),
  industryType: yup.string().required(),
  companySize: yup.string().required(),
  address: yup.string().required()
});

const OnboardingWorkBuddy: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<WorkBuddyForm>({
    resolver: yupResolver(schema)
  });

  const onSubmit = (data: WorkBuddyForm) => {
    console.log("WorkBuddy Onboarding Data", data);
  };

  return (
    <div className="onboarding-page">
      <div className="form-card shadow p-4 rounded">
        <h3 className="mb-4">Onboarding Registration (WorkBuddy)</h3>
        <form onSubmit={handleSubmit(onSubmit)} className="shadow p-4 rounded bg-light">
          <TextInput label="Organisation Name" name="orgName" register={register} error={errors.orgName?.message} />
          <TextInput label="Contact Person Name" name="contactName" register={register} error={errors.contactName?.message} />
          <TextInput label="Contact Email" name="contactEmail" type="email" register={register} error={errors.contactEmail?.message} />
          <TextInput label="Contact Number" name="contactNumber" register={register} error={errors.contactNumber?.message} />
          <TextInput label="Industry Type" name="industryType" register={register} error={errors.industryType?.message} />
          <SelectInput label="Company Size" name="companySize" options={["1-50", "51-200", "201-1000", "1000+"]} register={register} error={errors.companySize?.message} />
          <TextAreaInput label="Address" name="address" register={register} error={errors.address?.message} />

          <button type="submit" className="btn btn-primary">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default OnboardingWorkBuddy;
