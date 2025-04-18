import React, { useId } from "react";
import { useInputControl } from "@conform-to/react";

import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { PasswordInput } from "./password-input";
import { cn } from "@/lib/utils";

export type ListOfErrors = Array<string | null | undefined> | null | undefined;

export function ErrorList({
	id,
	errors,
}: {
	errors?: ListOfErrors;
	id?: string;
}) {
	const errorsToRender = errors?.filter(Boolean);
	if (!errorsToRender?.length) return null;
	return (
		<ul id={id} className="flex flex-col gap-1">
			{errorsToRender.map((e) => (
				<li
					key={e}
					className="text-[10px] text-foreground-destructive text-red-700"
				>
					{e}
				</li>
			))}
		</ul>
	);
}

export function Field({
	labelProps,
	inputProps,
	errors,
	className,
}: {
	labelProps: React.LabelHTMLAttributes<HTMLLabelElement>;
	inputProps: React.InputHTMLAttributes<HTMLInputElement>;
	errors?: ListOfErrors;
	className?: string;
}) {
	const fallbackId = useId();
	const id = inputProps.id ?? fallbackId;
	const errorId = errors?.length ? `${id}-error` : undefined;
	return (
		<div className={className}>
			<Label htmlFor={id} className="mb-3" {...labelProps} />
			<Input
				id={id}
				aria-invalid={errorId ? true : undefined}
				aria-describedby={errorId}
				className={cn("input", errorId ? "border-red-400" : undefined)}
				{...inputProps}
			/>
			{errorId ? (
				<div className="min-h-[32px] px-4 pb-3 pt-1 text-orange-950">
					<ErrorList id={errorId} errors={errors} />
				</div>
			) : null}
		</div>
	);
}
