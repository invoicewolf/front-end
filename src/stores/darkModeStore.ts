import { ref } from "vue";

export const darkmode = ref<boolean>(false);

const root = document.getElementsByTagName("html")[0];

export function checkMode() {
	const mode = localStorage.getItem("mode");

	const cookie = getCookie();

	if (cookie) {
		if (cookie === "dark") {
			return setDark();
		}
		else {
			return setLight();
		}
	}
	else if (!mode) {
		if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
			return setDark();
		}
		else {
			return setLight();
		}
	}
	else if (mode === "dark") {
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

export function setDark() {
	root.classList.add("dark");

	setCookie("dark");

	localStorage.setItem("mode", "dark");
	darkmode.value = true;
}

export function setLight() {
	root.classList.remove("dark");

	setCookie("light");

	localStorage.setItem("mode", "light");
	darkmode.value = false;
}

function getCookie() {
	const value = `; ${document.cookie}`;

	const parts = value.split("; " + "theme" + "=");

	if (parts.length === 2) {
		return parts.pop()!.split(";").shift();
	}
}

export function setCookie(val: string) {
	document.cookie = `theme` + `=${val}; expires=${new Date(new Date().setFullYear(3000))}; path=/; domain=invoicewolf.net`;
}
