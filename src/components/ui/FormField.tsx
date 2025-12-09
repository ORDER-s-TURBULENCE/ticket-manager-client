import { Field } from "@chakra-ui/react";
import React from "react";

const FormField = ({
    label,
    isRequired = false,
    children,
    errorMessage,
    helperText,
}: {
    label: string;
    isRequired?: boolean;
    children: React.ReactNode;
    errorMessage?: string;
    helperText?: string;
}) => (
    <Field.Root required={isRequired} invalid={!!errorMessage}>
        <Field.Label>
        {label}  <Field.RequiredIndicator />
        </Field.Label>
        {helperText && <Field.HelperText>{helperText}</Field.HelperText>}
        {children}
        <Field.ErrorText>{errorMessage}</Field.ErrorText>
    </Field.Root>
);

export default FormField;
