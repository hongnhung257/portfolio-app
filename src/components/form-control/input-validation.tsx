import * as React from "react";
import { Controller, useFormContext } from "react-hook-form";
import { CInput } from "@/components/ui/input";

export interface InputProps
	extends React.InputHTMLAttributes<HTMLInputElement> {
	name: string;
	label?: string;
}

const CInputValidation = React.forwardRef<HTMLInputElement, InputProps>(
	({ name, ...props }) => {
		const {
			control,
			formState: { errors },
		} = useFormContext();

		return (
			<Controller
				control={control}
				name={name}
				render={({ field }) => (
					<CInput
						errorMessage={
							errors[name]?.message ? errors[name].message.toString() : ""
						}
						{...field}
						{...props}
					/>
				)}
			/>
		);
	}
);
CInputValidation.displayName = "CInputValidation";

export { CInputValidation };
