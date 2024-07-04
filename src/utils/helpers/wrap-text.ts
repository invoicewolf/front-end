export function wrapText(text: string, maxWidth: number): string[] {
	const words = text.split(" ");
	const lines: string[] = [];
	let currentLine = "";

	for (const word of words) {
		if ((currentLine + word).length <= maxWidth) {
			if (currentLine.length > 0) {
				currentLine += " ";
			}
			currentLine += word;
		}
		else {
			if (currentLine.length > 0) {
				lines.push(currentLine);
			}
			currentLine = word;
		}
	}

	if (currentLine.length > 0) {
		lines.push(currentLine);
	}

	return lines;
}
