import React, { useState } from "react";
import { UseFormRegister } from "react-hook-form";

interface FileInputProps {
  label: string;
  name: string;
  register: UseFormRegister<any>;
  error?: string;
}

const FileInput: React.FC<FileInputProps> = ({ label, name, register, error }) => {
  const [preview, setPreview] = useState<string | null>(null);

  const handlePreview = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result as string);
      reader.readAsDataURL(file);
    } else {
      setPreview(null);
    }
  };

  return (
    <div className="mb-3">
      <label htmlFor={name} className="form-label">{label}</label>
      <input
        type="file"
        id={name}
        className={`form-control ${error ? "is-invalid" : ""}`}
        {...register(name)}
        onChange={(e) => {
          handlePreview(e);
          register(name).onChange(e);
        }}
      />
      {error && <div className="invalid-feedback">{error}</div>}
      {preview && (
        <div className="mt-2">
          <img src={preview} alt="Preview" className="img-thumbnail" style={{ maxWidth: "150px" }} />
        </div>
      )}
    </div>
  );
};

export default FileInput;
