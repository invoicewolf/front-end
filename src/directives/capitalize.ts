function capitalize(e: any) {
	const start = e.target.selectionStart;
	e.target.value = e.target.value.toUpperCase();
	e.target.setSelectionRange(start, start);
	e.dispatchEvent(new Event("keypress"));
	e.dispatchEvent(new Event("input"));
}

export default {
	mounted(el: HTMLElement) {
		el.addEventListener("keypress", capitalize);
		el.addEventListener("input", capitalize);
	},
	unmounted(el: HTMLElement) {
		el.removeEventListener("keypress", capitalize);
		el.removeEventListener("input", capitalize);
	},
};
