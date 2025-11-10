import React from "react";

interface FormLayoutProps {
  title: string;
  children: React.ReactNode;
}

const FormLayout: React.FC<FormLayoutProps> = ({ title, children }) => {
  return (
    <div className="form-layout">
      <h2 className="form-layout-title text-center mb-4">{title}</h2>
      <div className="form-layout-content">{children}</div>
    </div>
  );
};

export default FormLayout;
