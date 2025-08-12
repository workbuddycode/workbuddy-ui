import React, { ReactNode } from "react";
import { render, RenderResult } from "@testing-library/react";
import { useForm, FormProvider, SubmitHandler } from "react-hook-form";

interface FormWrapperProps {
  children: ReactNode;
  defaultValues?: Record<string, any>;
  onSubmit?: SubmitHandler<any>;
}

const FormWrapper: React.FC<FormWrapperProps> = ({
  children,
  defaultValues = {},
  onSubmit = () => {}
}) => {
  const methods = useForm({ defaultValues });

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        {React.Children.map(children, (child) =>
          React.isValidElement(child)
            ? React.cloneElement(child as React.ReactElement<any>, {
                register: methods.register,
              })
            : child
        )}
      </form>
    </FormProvider>
  );
};

/**
 * Render a component inside a React Hook Form provider for testing
 */
export function renderWithForm(
  ui: ReactNode,
  defaultValues?: Record<string, any>,
  onSubmit?: SubmitHandler<any>
): RenderResult {
  return render(
    <FormWrapper defaultValues={defaultValues} onSubmit={onSubmit}>
      {ui}
    </FormWrapper>
  );
}
