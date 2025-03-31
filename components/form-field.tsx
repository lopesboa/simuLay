import {
	Controller,
	type Path,
	type Control,
	type FieldValue,
	type FieldValues,
} from "react-hook-form";
import React from "react";

import {
	FormItem,
	FormLabel,
	FormControl,
	FormMessage,
	FormDescription,
} from "./ui/form";
import { Input } from "./ui/input";

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
