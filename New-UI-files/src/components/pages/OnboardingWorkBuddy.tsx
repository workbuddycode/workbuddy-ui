import React from "react";
import { useForm, Resolver } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import TextInput from "../form-controls/TextInput";
import TextAreaInput from "../form-controls/TextAreaInput";
import SelectInput from "../form-controls/SelectInput";
import MultiSelectInput from "../form-controls/MultiSelectInput";
import FileInput from "../form-controls/FileInput";
import FormLayout from "../form-controls/FormLayout";
import Datepicker from "../form-controls/Datepicker";

const schema = yup.object().shape({
  orgName: yup.string().required("Organisation Name is required"),
  contactName: yup.string().required("Contact Name is required"),
  contactEmail: yup.string().email("Invalid email").required(),
  contactNumber: yup.string().matches(/^[0-9]{10}$/, "Must be 10 digits").required(),
  industryType: yup.string().required(),
  companySize: yup.string().required(),
  services: yup.array().of(yup.string()).min(1, "Select at least one service").required(),
  gst: yup.string().required("GST is required"),
  address: yup.string().required(),
  logo: yup.mixed().nullable(),
  heroImage: yup.mixed().nullable(),
  fromDate: yup.date().nullable().when("clientType", (clientType, schema) => {
    const clientTypeValue = Array.isArray(clientType) ? clientType[0] : clientType;
    return clientTypeValue === "Free Trial" ? schema.required("From Date is required for Free Trial") : schema;
  }),
  toDate: yup.date().nullable().when("clientType", (clientType, schema) => {
    const clientTypeValue = Array.isArray(clientType) ? clientType[0] : clientType;
    return clientTypeValue === "Free Trial" ? schema.required("To Date is required for Free Trial") : schema;
  }),
  clientType: yup.string().required("Client Type is required"),
});

type WorkBuddyForm = yup.InferType<typeof schema>;

const OnboardingWorkBuddy: React.FC = () => {
  const { register, handleSubmit, control, formState: { errors }, setValue, watch } = useForm<WorkBuddyForm>({
    resolver: yupResolver(schema) as unknown as Resolver<WorkBuddyForm>
  });

  const [selectedOption, setSelectedOption] = React.useState("");
  const [fromDate, setFromDate] = React.useState<Date | null>(null);
  const [toDate, setToDate] = React.useState<Date | null>(null);

  const onSubmit = (data: WorkBuddyForm) => {
    const updatedData = { ...data, clientType: selectedOption };

    if (selectedOption === "Free Trial") {
      updatedData.fromDate = fromDate;
      updatedData.toDate = toDate;
    }
    console.log(data);
    
    console.log("WorkBuddy Onboarding Data", updatedData);
  };

  return (
    <FormLayout title="Onboarding Registration (WorkBuddy)">
      <form onSubmit={handleSubmit(onSubmit)} className="shadow p-4 rounded bg-light" style={{ maxWidth: "80%", margin: "0 auto" }}>
        <div className="row">
          <div className="col-md-6">
            <TextInput label="Organisation Name" name="orgName" register={register} error={errors.orgName?.message} />
            <TextInput label="Contact Person Name" name="contactName" register={register} error={errors.contactName?.message} />
            <TextInput label="Contact Email" name="contactEmail" type="email" register={register} error={errors.contactEmail?.message} />
            <TextInput label="Contact Number" name="contactNumber" register={register} error={errors.contactNumber?.message} />
            <div className="form-group">
              <label>Client Type</label>
              <select
                className={`form-control ${errors.clientType ? 'is-invalid' : ''}`}
                value={selectedOption}
                onChange={(e) => {
                  setSelectedOption(e.target.value);
                  setValue("clientType", e.target.value, { shouldValidate: true });
                }}
              >
                <option value="">Select...</option>
                <option value="New Client">New Client</option>
                <option value="Free Trial">Free Trial</option>
              </select>
              {errors.clientType && <div className="invalid-feedback">{errors.clientType.message}</div>}
            </div>

            {selectedOption === "Free Trial" && (
              <>
                <Datepicker
                  label="From Date"
                  selectedDate={fromDate ? fromDate.toISOString().slice(0,10) : null}
                  onChange={(date) => {
                    setFromDate(date ? new Date(date) : null);
                    setValue("fromDate", date ? new Date(date) : null, { shouldValidate: true });
                  }}
                />
                <Datepicker
                  label="To Date"
                  selectedDate={toDate ? toDate.toISOString().slice(0,10): null}
                  onChange={(date) => {
                    setToDate(date ? new Date(date) : null);
                    setValue("toDate", date ? new Date(date) : null, { shouldValidate: true });
                  }}
                />
              </>
            )}

            <SelectInput
              label="Industry Type"
              name="industryType"
              options={["IT", "Finance", "Healthcare"]}
              register={register}
              error={errors.industryType?.message}
            />
            <SelectInput
              label="Company Size"
              name="companySize"
              options={["Small", "Medium", "Large"]}
              register={register}
              error={errors.companySize?.message}
            />
          </div>
          <div className="col-md-6">
            <MultiSelectInput
              label="Services to Opt"
              name="services"
              options={[
                { label: "Attendance Management", value: "Attendance Management" },
                { label: "Leave Management", value: "Leave Management" },
                { label: "Payroll Management", value: "Payroll Management" }
              ]}
              control={control}
              error={errors.services?.message as string}
            />
            <TextInput label="GST No/ Regn No" name="gst" register={register} error={errors.gst?.message} />
            <TextAreaInput label="Address" name="address" register={register} error={errors.address?.message} />
            <FileInput label="Logo Upload" name="logo" register={register} error={errors.logo?.message} />
            <FileInput label="Hero Image Upload" name="heroImage" register={register} error={errors.heroImage?.message} />
          </div>
        </div>
        <button type="submit" className="btn btn-primary mt-3">Submit</button>
      </form>
    </FormLayout>
  );
};

export default OnboardingWorkBuddy;
