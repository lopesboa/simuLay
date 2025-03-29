import React from "react";
import {
	FormControl,
	FormDescription,
	FormItem,
	FormLabel,
	FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import {
	Control,
	Controller,
	FieldValue,
	FieldValues,
	Path,
} from "react-hook-form";

type FormFieldProps<T extends FieldValues> = {
	control: Control<T>;
	name: Path<T>;
	label: string;
	placeholder?: string;
	type: "text" | "password" | "email" | "file";
};

export function FormField<T extends FieldValues>({
	control,
	name,
	label,
	placeholder,
	type,
}: FormFieldProps<T>) {
	return (
		<Controller
			name={name}
			control={control}
			render={({ field }) => (
				<FormItem>
					<FormLabel className="label">{label}</FormLabel>
					<FormControl>
						<Input
							className="input"
							placeholder={placeholder}
							type={type}
							{...field}
						/>
					</FormControl>
					<FormMessage />
				</FormItem>
			)}
		/>
	);
}
