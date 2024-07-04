export function validateIban(value: string) {
	const step1 = value.replace(/\s/g, "");

	// Move the BANK code
	const step2 = step1.substring(4) + step1.substring(0, 4);

	const getCharCode = (char: string) => {
		return char.charCodeAt(0) - 55;
	};

	let step3 = "";

	Array.from(step2).forEach((char) => {
		if (Number.isNaN(Number(char))) {
			step3 += getCharCode(char);
		}
		else {
			step3 += char;
		}
	});

	return BigInt(step3) % 97n === 1n;
}
