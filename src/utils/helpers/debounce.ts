export function debounce<T extends (...args: any[]) => any>(func: T, wait: number): (...args: Parameters<T>) => void {
	let timeout: ReturnType<typeof setTimeout> | null;

	return function (...args: Parameters<T>) {
		if (timeout !== null) {
			clearTimeout(timeout);
		}
		timeout = setTimeout(() => {
			timeout = null;
			func(...args);
		}, wait);
	};
}
