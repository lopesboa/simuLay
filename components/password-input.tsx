import { forwardRef, useId, useState } from "react";

import { cn } from "@/lib/utils";
import { Label } from "./ui/label";
import { Button } from "@/components/ui/button";
import { EyeCloseIcon, EyeOpenIcon } from "./icons";
import { ErrorList, type ListOfErrors } from "./forms";
import { Input, type InputProps } from "@/components/ui/input";

type PasswordInputProps = {
	onClick?: () => void;
	labelProps: React.LabelHTMLAttributes<HTMLLabelElement>;
	inputProps: React.InputHTMLAttributes<HTMLInputElement>;
	errors?: ListOfErrors;
	className?: string;
};

const PasswordInputComponent = forwardRef<HTMLInputElement, PasswordInputProps>(
	({ labelProps, inputProps, errors, className }, ref) => {
		const [showPassword, setShowPassword] = useState(false);
		const fallbackId = useId();
		const id = inputProps.id ?? fallbackId;
		const errorId = errors?.length ? `${id}-error` : undefined;

		const handleOnClick = () => {
			setShowPassword((prev) => !prev);
		};

		const type =
			inputProps.type === "password" && !showPassword ? "password" : "text";

		console.log("rendering password input", type);
		return (
			<div className="relative">
				<Label htmlFor={id} className="mb-3" {...labelProps} />
				<Input
					id={id}
					aria-invalid={errorId ? true : undefined}
					aria-label={type}
					aria-describedby={errorId}
					type={!showPassword ? "text" : "password"}
					className={cn("pr-10 input", errorId ? "border-red-700" : undefined)}
					ref={ref}
					{...inputProps}
				/>
				<Button
					type="button"
					variant="ghost"
					size="sm"
					className="absolute right-0 top-[13px] h-full px-3"
					onClick={handleOnClick}
					disabled={inputProps.disabled}
				>
					{showPassword ? (
						<EyeCloseIcon className="h-4 w-4" aria-hidden="true" />
					) : (
						<EyeOpenIcon className="h-4 w-4" aria-hidden="true" />
					)}
					<span className="sr-only">
						{showPassword ? "Hide password" : "Show password"}
					</span>
				</Button>
				{errorId ? (
					<div className="min-h-[32px] px-4 pb-3 pt-1">
						<ErrorList id={errorId} errors={errors} />
					</div>
				) : null}
			</div>
		);
	},
);
PasswordInputComponent.displayName = "PasswordInput";

export const PasswordInput = PasswordInputComponent;
