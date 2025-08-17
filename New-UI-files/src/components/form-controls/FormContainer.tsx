import React from "react";

interface FormContainerProps {
  children: React.ReactNode;
}

const FormContainer: React.FC<FormContainerProps> = ({ children }) => {
  return (
    <div className="form-container d-flex justify-content-center align-items-center min-vh-100">
      <div className="w-50"> {/* 50% width */}
        {children}
      </div>
    </div>
  );
};

export default FormContainer;
