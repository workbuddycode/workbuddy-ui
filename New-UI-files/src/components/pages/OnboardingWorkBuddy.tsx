import React from "react";
import { useForm, Resolver } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import TextInput from "../form-controls/TextInput";
import TextAreaInput from "../form-controls/TextAreaInput";
import MultiSelectInput from "../form-controls/MultiSelectInput";
import FormLayout from "../form-controls/FormLayout";
import Datepicker from "../form-controls/Datepicker";
import API from "../../api/RestApi";
import FileInput from "../form-controls/FileInput";
import SelectInput from "../form-controls/SelectInput";

// ---------------- Validation Schema ----------------
const schema = yup.object().shape({
  orgName: yup.string().required("Organisation Name is required"),
  contactName: yup.string().required("Contact Name is required"),
  contactEmail: yup.string().email("Invalid email").required(),
  contactNumber: yup.string().matches(/^[0-9]{10}$/, "Must be 10 digits").required(),
  companySortName: yup.string().required("Company Sort Name is required"),
  industryType: yup.string().required(),
  companySize: yup.string().required(),

  services: yup
    .array()
    .of(yup.string())
    .min(1, "Select at least one service")
    .required(),

  subscriptionType: yup.string().required("Subscription Type is required"),
  billingCycle: yup.string().required("Billing cycle is required"),

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

  gst: yup.string().required("GST is required"),
  address: yup.string().required(),

  // allow but don't enforce files
  logo: yup.mixed().nullable(),
  heroImage: yup.mixed().nullable(),
});

type WorkBuddyForm = yup.InferType<typeof schema>;

// ---------------- Component ----------------
const OnboardingWorkBuddy: React.FC = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    setValue,
    watch,
  } = useForm<WorkBuddyForm>({
    resolver: yupResolver(schema) as unknown as Resolver<WorkBuddyForm>,
    mode: "onSubmit",
  });

  // keep local controlled state for selects and dates (optional)
  const [subscriptionType, setSubscriptionType] = React.useState("");
  const [billingCycle, setBillingCycle] = React.useState("");
  const [fromDate, setFromDate] = React.useState<Date | null>(null);
  const [toDate, setToDate] = React.useState<Date | null>(null);

  // Watch important fields (helps to debug)
  // console.log("watch subscriptionType", watch("subscriptionType"), subscriptionType);
  // console.log("watch billingCycle", watch("billingCycle"), billingCycle);

  // onError will show validation errors in console
  const onError = (errs: any) => {
    console.error("Validation errors:", errs);
  };

  // ---------------- Submit Handler ----------------
const onSubmit = async (data: any) => {
const userData = JSON.parse(localStorage.getItem("user") || "{}");

const formData = new FormData();

const clientShort = data.companySortName || "ORG";

if (data.logo && data.logo[0]) {
const file = data.logo[0];
const newName = `${clientShort}_logo_${file.name}`;
formData.append("logo", file, newName);
}

if (data.heroImage && data.heroImage[0]) {
const file = data.heroImage[0];
const newName = `${clientShort}_hero_${file.name}`;
formData.append("heroImage", file, newName);
}

formData.append("payload", JSON.stringify({
...data,
subscriptionType,
billingCycle,
fromDate: billingCycle === "Custom" ? fromDate : null,
toDate: billingCycle === "Custom" ? toDate : null,
WB_Associate: userData?.id || null,
}));

try {
const response = await fetch(API.CREATE_CLIENT, {
method: "POST",
body: formData,
});

if (!response.ok) throw new Error("Upload failed");

alert("Client onboarding submitted successfully!");
} catch (e) {
console.error(e);
alert("Failed to submit onboarding data");
}
};

  return (
    <FormLayout title="Onboarding Registration (WorkBuddy)">
      <form
        onSubmit={handleSubmit(onSubmit, onError)}
        className="shadow p-4 rounded bg-light"
        style={{ maxWidth: "80%", margin: "0 auto" }}
      >
        <div className="row">
          {/* LEFT SIDE */}
          <div className="col-md-6">
            <TextInput label="Organisation Name" name="orgName" register={register} error={errors.orgName?.message} />

            <TextInput label="Contact Person Name" name="contactName" register={register} error={errors.contactName?.message} />

            <TextInput label="Contact Email" name="contactEmail" type="email" register={register} error={errors.contactEmail?.message} />

            <TextInput label="Contact Number" name="contactNumber" register={register} error={errors.contactNumber?.message} />

            <TextInput label="Company Short Name" name="companySortName" register={register} error={errors.companySortName?.message} />

            <SelectInput
              label="Industry Type"
              name="industryType"
              register={register}
              error={errors.industryType?.message}
              options={["IT", "Manufacturing", "Healthcare", "Education"]}
            />

            <SelectInput
              label="Company Size"
              name="companySize"
              register={register}
              error={errors.companySize?.message}
              options={["Small", "Medium", "Large"]}
            />

            {/* SUBSCRIPTION TYPE (REGISTERED) */}
            <div className="form-group mt-2">
              <label>Subscription Type</label>
              <select
                {...register("subscriptionType")}
                className={`form-control ${errors.subscriptionType ? "is-invalid" : ""}`}
                value={subscriptionType}
                onChange={(e) => {
                  setSubscriptionType(e.target.value);
                  setValue("subscriptionType", e.target.value, { shouldValidate: true });
                }}
              >
                <option value="">Select...</option>
                <option value="New Client">New Client</option>
                <option value="Free Trial">Free Trial</option>
              </select>
              {errors.subscriptionType && <div className="invalid-feedback">{errors.subscriptionType.message}</div>}
            </div>

            {/* BILLING CYCLE (REGISTERED) */}
            <div className="form-group mt-3">
              <label>Billing Cycle</label>
              <select
                {...register("billingCycle")}
                className={`form-control ${errors.billingCycle ? "is-invalid" : ""}`}
                value={billingCycle}
                onChange={(e) => {
                  setBillingCycle(e.target.value);
                  setValue("billingCycle", e.target.value, { shouldValidate: true });
                }}
              >
                <option value="">Select...</option>
                <option value="Monthly">Monthly</option>
                <option value="Yearly">Yearly</option>
                <option value="Custom">Custom</option>
              </select>
              {errors.billingCycle && <div className="invalid-feedback">{errors.billingCycle.message}</div>}
            </div>

            {/* CUSTOM DATE RANGE */}
            {billingCycle === "Custom" && (
              <>
                <Datepicker
                  label="From Date"
                  selectedDate={fromDate ? fromDate.toISOString().slice(0, 10) : null}
                  onChange={(date) => {
                    const d = date ? new Date(date) : null;
                    setFromDate(d);
                    setValue("fromDate", d, { shouldValidate: true });
                  }}
                />

                <Datepicker
                  label="To Date"
                  selectedDate={toDate ? toDate.toISOString().slice(0, 10) : null}
                  onChange={(date) => {
                    const d = date ? new Date(date) : null;
                    setToDate(d);
                    setValue("toDate", d, { shouldValidate: true });
                  }}
                />
              </>
            )}
          </div>

          {/* RIGHT SIDE */}
          <div className="col-md-6">
            <MultiSelectInput
              label="Services to Opt"
              name="services"
              options={[
                { label: "Attendance Management", value: "Attendance Management" },
                { label: "Leave Management", value: "Leave Management" },
                { label: "Payroll Management", value: "Payroll Management" },
              ]}
              control={control}
              error={errors.services?.message as string}
            />

            <TextInput label="GST No/ Regn No" name="gst" register={register} error={errors.gst?.message} />

            <TextAreaInput label="Address" name="address" register={register} error={errors.address?.message} />

            {/* FileInputs (we still allow them but will send static strings) */}
            <FileInput label="Logo Upload" name="logo" register={register} error={errors.logo?.message} />
            <FileInput label="Hero Image Upload" name="heroImage" register={register} error={errors.heroImage?.message} />
          </div>
        </div>

        <button type="submit" className="btn btn-primary mt-3">
          Submit
        </button>
      </form>
    </FormLayout>
  );
};

export default OnboardingWorkBuddy;
