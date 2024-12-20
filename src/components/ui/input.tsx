import * as React from "react";

import { cn } from "@/lib/utils";

export interface InputProps
	extends React.InputHTMLAttributes<HTMLInputElement> {
	label?: string;
	errorMessage?: string;
}

const CInput = React.forwardRef<HTMLInputElement, InputProps>(
	({ className, type, label, errorMessage, ...props }, ref) => {
		return (
			<div>
				{label && (
					<label>
						<span className="d-flex align-items-center gap-1">
							{label}
							{props.required && (
								<span data-testid="asterisk" className="text-danger">
									*
								</span>
							)}
						</span>
					</label>
				)}
				<input
					type={type}
					className={cn(
						"!mb-2 flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
						className
					)}
					ref={ref}
					{...props}
				/>
				{errorMessage && (
					<span className="text-pink-700 text-xs ">{errorMessage}</span>
				)}
			</div>
		);
	}
);
CInput.displayName = "CInput";

export { CInput };
