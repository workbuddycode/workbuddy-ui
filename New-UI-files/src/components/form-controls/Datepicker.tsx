import React from "react";

type DatepickerProps = {
  label: string;
  selectedDate: string | null; // Use string to ensure the date is always formatted
  onChange: (date: string | null) => void; // Ensure the onChange handler receives a formatted string
};

const Datepicker: React.FC<DatepickerProps> = ({ label, selectedDate, onChange }) => {
  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    const formattedDate = value ? new Date(value).toISOString().split("T")[0] : null; // Format the date as yyyy-mm-dd
    onChange(formattedDate); // Pass the formatted date string or null
  };

  return (
    <div className="form-group">
      <label>{label}</label>
      <input
        type="date"
        className="form-control"
        value={selectedDate || ""} // Ensure the value is a formatted string
        onChange={handleDateChange}
      />
    </div>
  );
};

export default Datepicker;
