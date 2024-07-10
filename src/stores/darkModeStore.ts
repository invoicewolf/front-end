import { ref } from "vue";

export const darkmode = ref<boolean>(false);

const root = document.getElementsByTagName("html")[0];

export function checkMode() {
	const mode = localStorage.getItem("mode");

	if (!mode) {
		if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
			return setDark();
		}
		else {
			return setLight();
		}
	}

	if (mode === "dark") {
		return setDark();
	}
	else {
		return setLight();
	}
}

export function toggleMode() {
	const mode = localStorage.getItem("mode");

	if (mode === "dark") {
		setLight();
	}
	else {
		setDark();
	}
}

function setDark() {
	root.classList.add("dark");

	localStorage.setItem("mode", "dark");
	darkmode.value = true;
}

function setLight() {
	root.classList.remove("dark");

	localStorage.setItem("mode", "light");
	darkmode.value = false;
}
