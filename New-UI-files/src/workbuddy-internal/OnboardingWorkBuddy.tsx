import React from "react";
import { useForm, Resolver } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import FormLayout from "../components/form-controls/FormLayout";
import TextInput from "../components/form-controls/TextInput";
import SelectInput from "../components/form-controls/SelectInput";
import Datepicker from "../components/form-controls/Datepicker";
import MultiSelectInput from "../components/form-controls/MultiSelectInput";
import TextAreaInput from "../components/form-controls/TextAreaInput";
import FileInput from "../components/form-controls/FileInput";

import API from "../api/RestApi";

/* ======================= VALIDATION ======================= */
const schema = yup.object().shape({
  orgName: yup.string().required("Organisation Name is required"),
  contactName: yup.string().required("Contact Name is required"),
  contactEmail: yup.string().email("Invalid email").required(),
  contactNumber: yup
    .string()
    .matches(/^[0-9]{10}$/, "Must be 10 digits")
    .required(),
  companySortName: yup.string().required("Company Short Name is required"),

  industryType: yup.string().required(),
  companySize: yup.string().required(),

  services: yup
    .array()
    .of(yup.string())
    .min(1, "Select at least one service")
    .required(),

  subscriptionType: yup.string().required(),
  billingCycle: yup.string().required(),

  fromDate: yup.date().nullable().when("billingCycle", {
    is: "Custom",
    then: (s) => s.required("From Date is required"),
    otherwise: (s) => s.nullable(),
  }),

  toDate: yup.date().nullable().when("billingCycle", {
    is: "Custom",
    then: (s) => s.required("To Date is required"),
    otherwise: (s) => s.nullable(),
  }),

  gst: yup.string().required(),
  address: yup.string().required(),

  logo: yup.mixed().nullable(),
  heroImage: yup.mixed().nullable(),
});

type WorkBuddyForm = yup.InferType<typeof schema> & {
  logo?: FileList;
  heroImage?: FileList;
};

/* ======================= COMPONENT ======================= */
const OnboardingWorkBuddy: React.FC = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    setValue,
  } = useForm<WorkBuddyForm>({
    resolver: yupResolver(schema) as unknown as Resolver<WorkBuddyForm>,
  });

  const [subscriptionType, setSubscriptionType] = React.useState("");
  const [billingCycle, setBillingCycle] = React.useState("");
  const [fromDate, setFromDate] = React.useState<Date | null>(null);
  const [toDate, setToDate] = React.useState<Date | null>(null);

  /* ======================= SUBMIT ======================= */
  const onSubmit = async (data: WorkBuddyForm) => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    const formData = new FormData();

    const shortName = data.companySortName || "ORG";

    if (data.logo?.[0]) {
      const file = data.logo[0];
      formData.append("logo", file, `${shortName}_logo_${file.name}`);
    }

    if (data.heroImage?.[0]) {
      const file = data.heroImage[0];
      formData.append("heroImage", file, `${shortName}_hero_${file.name}`);
    }

    formData.append(
      "payload",
      JSON.stringify({
        ...data,
        subscriptionType,
        billingCycle,
        fromDate: billingCycle === "Custom" ? fromDate : null,
        toDate: billingCycle === "Custom" ? toDate : null,
        WB_Associate: user?.id || null,
        status: "PENDING",
      })
    );

    try {
      const res = await fetch(API.CREATE_CLIENT, {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Submission failed");

      alert("Client onboarding submitted successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to submit onboarding data");
    }
  };

  /* ======================= UI ======================= */
  return (
    <FormLayout title="Onboarding Registration (WorkBuddy)">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="card shadow-sm p-4"
        style={{ maxWidth: "1100px", margin: "0 auto" }}
      >
        {/* ===== ORGANIZATION DETAILS ===== */}
        <h5 className="mb-3 text-primary">Organization Details</h5>
        <div className="row">
          <div className="col-md-6">
            <TextInput label="Organisation Name" name="orgName" register={register} error={errors.orgName?.message} />
            <TextInput label="Company Short Name" name="companySortName" register={register} error={errors.companySortName?.message} />
            <SelectInput label="Industry Type" name="industryType" register={register} error={errors.industryType?.message} options={["IT", "Manufacturing", "Healthcare", "Education"]} />
            <SelectInput label="Company Size" name="companySize" register={register} error={errors.companySize?.message} options={["Small", "Medium", "Large"]} />
          </div>

          <div className="col-md-6">
            <TextInput label="Contact Person Name" name="contactName" register={register} error={errors.contactName?.message} />
            <TextInput label="Contact Email" name="contactEmail" type="email" register={register} error={errors.contactEmail?.message} />
            <TextInput label="Contact Number" name="contactNumber" register={register} error={errors.contactNumber?.message} />
          </div>
        </div>

        <hr />

        {/* ===== SUBSCRIPTION ===== */}
        <h5 className="mb-3 text-primary">Subscription & Billing</h5>
        <div className="row">
          <div className="col-md-6">
            <label className="form-label">Subscription Type</label>
            <select
              {...register("subscriptionType")}
              className={`form-control ${errors.subscriptionType ? "is-invalid" : ""}`}
              value={subscriptionType}
              onChange={(e) => {
                setSubscriptionType(e.target.value);
                setValue("subscriptionType", e.target.value);
              }}
            >
              <option value="">Select...</option>
              <option value="New Client">New Client</option>
              <option value="Free Trial">Free Trial</option>
            </select>
          </div>

          <div className="col-md-6">
            <label className="form-label">Billing Cycle</label>
            <select
              {...register("billingCycle")}
              className={`form-control ${errors.billingCycle ? "is-invalid" : ""}`}
              value={billingCycle}
              onChange={(e) => {
                setBillingCycle(e.target.value);
                setValue("billingCycle", e.target.value);
              }}
            >
              <option value="">Select...</option>
              <option value="Monthly">Monthly</option>
              <option value="Yearly">Yearly</option>
              <option value="Custom">Custom</option>
            </select>
          </div>
        </div>

        {billingCycle === "Custom" && (
          <div className="row mt-3">
            <div className="col-md-6">
              <Datepicker
                label="From Date"
                selectedDate={fromDate ? fromDate.toISOString().slice(0, 10) : null}
                onChange={(d) => {
                  const date = d ? new Date(d) : null;
                  setFromDate(date);
                  setValue("fromDate", date);
                }}
              />
            </div>
            <div className="col-md-6">
              <Datepicker
                label="To Date"
                selectedDate={toDate ? toDate.toISOString().slice(0, 10) : null}
                onChange={(d) => {
                  const date = d ? new Date(d) : null;
                  setToDate(date);
                  setValue("toDate", date);
                }}
              />
            </div>
          </div>
        )}

        <hr />

        {/* ===== SERVICES ===== */}
        <h5 className="mb-3 text-primary">Services & Compliance</h5>
        <div className="row mt-3">
          <div className="col-md-6">
            <MultiSelectInput
              label="Services to Opt"
              name="services"
              control={control}
              error={errors.services?.message as string}
              options={[
                { label: "Attendance Management", value: "Attendance Management" },
                { label: "Leave Management", value: "Leave Management" },
                { label: "Payroll Management", value: "Payroll Management" },
              ]}
            />
          </div>
          <div className="col-md-6">
            <TextInput label="GST No / Registration No" name="gst" register={register} error={errors.gst?.message} />
          </div>
        </div>
        <TextAreaInput label="Address" name="address" register={register} error={errors.address?.message} />

        <hr />

        {/* ===== FILE UPLOADS ===== */}
        <h5 className="mb-3 text-primary">Branding</h5>
        <div className="row">
          <div className="col-md-6">
            <FileInput label="Logo Upload" name="logo" register={register} error={errors.logo?.message} />
          </div>
          <div className="col-md-6">
            <FileInput label="Hero Image Upload" name="heroImage" register={register} error={errors.heroImage?.message} />
          </div>
        </div>

        {/* ===== SUBMIT ===== */}
        <div className="text-end mt-4">
          <button type="submit" className="btn btn-primary px-4">
            Submit Onboarding
          </button>
        </div>
      </form>
    </FormLayout>
  );
};

export default OnboardingWorkBuddy;
