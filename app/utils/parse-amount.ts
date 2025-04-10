export function parseAmount(input: string | number) {
	if (typeof input === "number") {
		return input;
	}

	const numericValue = input.replace(/\D/g, "");
	const parsedNumber = Number.parseInt(numericValue, 10);

	return Number.isNaN(parsedNumber) ? 1 : parsedNumber;
}
