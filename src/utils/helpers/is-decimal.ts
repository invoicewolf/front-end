export function isDecimal(number: number) {
	return (number - Math.floor(number)) !== 0;
}
