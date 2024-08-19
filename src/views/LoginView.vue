<script lang="ts" setup>
import {
	createUserWithEmailAndPassword,
	deleteUser,
	getAuth,
	sendEmailVerification,
	sendPasswordResetEmail,
	signInWithEmailAndPassword,
} from "firebase/auth";
import { useToast } from "primevue/usetoast";
import { ref, watch } from "vue";
import { useI18n } from "vue-i18n";
import { useRoute, useRouter } from "vue-router";
import InvoiceWolfNameLogo from "@/components/InvoiceWolfNameLogo.vue";
import ResizeTransition from "@/components/Transitions/ResizeTransition.vue";
import NewCompanyDetails from "@/components/NewCompanyDetails.vue";
import NewPaymentDetails from "@/components/NewPaymentDetails.vue";
import TextInput from "@/components/TextInput.vue";
import { useCompanyStore } from "@/stores/useCompanyStore";
import { usePaymentStore } from "@/stores/usePaymentDetailsStore";
import { useProfileStore } from "@/stores/useProfileStore";
import { createUser, getUserExistsByEmail } from "@/utils/client";
import { debounce } from "@/utils/helpers/debounce";
import { refreshToken } from "@/utils/helpers/refreshToken";
import { sleep } from "@/utils/helpers/sleep";
import { validateEmail } from "@/utils/helpers/validate-email";

const router = useRouter();
const route = useRoute();

const toast = useToast();
const i18n = useI18n();

const signingIn = ref(false);
const disableForgotPasswordButton = ref(false);

const step = ref<"signIn" | "signUp" | "joinOrCreate" | "companyDetails" | "paymentDetails" | "forgotPassword" | "loading">("signIn");

const email = ref<string>("");

const password = ref<string>("");
const confirmPassword = ref<string>("");

const firstName = ref<string>("");
const lastName = ref<string>("");

const selectedRoles = ref([]);

const incorrect = ref<boolean>(false);

if (localStorage.getItem("access_token")) {
	router.push((route.query.redirect as string) || "/");
}

watch(email, () => (incorrect.value = false));
watch(password, () => (incorrect.value = false));
watch(step, () => (incorrect.value = false));

const invalidPassword = ref(true);

const handlePasswordValidation = debounce(() => {
	invalidPassword.value = password.value === confirmPassword.value;
}, 500);

const auth = getAuth();

const profileStore = useProfileStore();
const companyStore = useCompanyStore();
const paymentStore = usePaymentStore();

async function onSignInClick() {
	signingIn.value = true;

	await userSignIn();

	signingIn.value = false;
}

async function userSignIn() {
	try {
		localStorage.removeItem("access_token");

		const userCredential = await (await signInWithEmailAndPassword(auth, email.value, password.value)).user.getIdToken();

		localStorage.setItem("access_token", userCredential);

		await Promise.all([profileStore.get(), companyStore.get(), paymentStore.get()]);

		await router.push((route.query.redirect as string) || "/");
	}
	catch (error) {
		console.error("API Error:", error);

		localStorage.removeItem("access_token");

		step.value = "signIn";

		incorrect.value = true;
	}
}

async function userSignUp() {
	try {
		if (!invalidPassword.value && selectedRoles.value.length === 0) {
			return;
		}

		const user = await createUserWithEmailAndPassword(auth, email.value, password.value);

		const token = await user.user.getIdToken();

		localStorage.setItem("access_token", token);

		await handlePostSignUp(user.user.uid);
	}
	catch (e) {
		console.error(e);
		incorrect.value = true;
	}
}

async function signInAfterCreation() {
	await sleep(1000);

	step.value = "loading";

	await userSignIn();

	toast.add({
		summary: i18n.t("login.toasts.verifyEmail.summary"),
		detail: i18n.t("login.toasts.verifyEmail.detail"),
		severity: "info",
		group: "br",
	});
}

async function handlePostSignUp(id: string) {
	if (!auth.currentUser) {
		return;
	}

	try {
		await createUser({
			body: {
				firstName: firstName.value,
				lastName: lastName.value,
				email: email.value,
				id,
			},
		});
	}
	catch {
		return await deleteUser(auth.currentUser);
	}

	await refreshToken();

	await sendEmailVerification(auth.currentUser);

	step.value = "joinOrCreate";
}

const passwordEmailSent = ref(false);
const userNotFound = ref(false);

async function forgotPassword() {
	disableForgotPasswordButton.value = true;
	userNotFound.value = false;

	const userExists = await getUserExistsByEmail({ path: { email: email.value } });

	if (!userExists.data) {
		disableForgotPasswordButton.value = false;

		return userNotFound.value = true;
	}

	await sendPasswordResetEmail(auth, email.value);

	await sleep(2000);

	toast.add({
		summary: i18n.t("login.forgotPassword.toasts.emailSent.summary"),
		detail: i18n.t("login.forgotPassword.toasts.emailSent.detail"),
		severity: "info",
		life: 5000,
	});

	passwordEmailSent.value = true;
}
</script>

<template>
	<main class="flex flex-col items-center justify-center">
		<ResizeTransition>
			<div v-if="step === 'signIn'" class="flex flex-col items-center justify-center gap-4 px-6 py-8 lg:py-0">
				<pv-card class="w-[28rem]">
					<template #header>
						<div class="flex h-40 items-center justify-center rounded-t-lg bg-primary-100 p-4 dark:bg-primary-900">
							<InvoiceWolfNameLogo arrangement="vertical" size="large" no-logo />
						</div>
						<pv-progress-bar
							v-if="signingIn" mode="indeterminate"
							style="height: 6px; border-radius: 0; background-color: var(--pv-card-background)"
						/>
					</template>
					<template #title>
						{{ $t("login.login.signInToYourAccount") }}
					</template>
					<template #content>
						<form class="mt-8 space-y-4 md:space-y-6">
							<div class="flex flex-col gap-6">
								<TextInput id="email" v-model="email" :disabled="signingIn" :label="$t('login.login.labels.email')" />

								<TextInput
									id="password" v-model="password" :disabled="signingIn"
									:label="$t('login.login.labels.password')" password input-class="w-full"
								/>

								<pv-message v-if="incorrect" icon="pi pi-times-circle" severity="error">
									{{ $t("login.login.messages.emailOrPasswordIncorrect") }}
								</pv-message>

								<div class="flex items-center justify-between">
									<a
										class="text-sm font-medium text-primary-500 hover:underline"
										@click="step = 'forgotPassword'"
									>{{ $t("login.login.forgotPassword") }}</a>
								</div>

								<pv-button
									:disabled="signingIn" :label="$t('login.login.buttons.signIn')"
									@click="onSignInClick"
								/>

								<p class="text-sm">
									{{ $t("login.login.dontHaveAnAccount") }}
									<a class="text-sm text-primary-500 hover:underline" @click="step = 'signUp'">
										{{ $t("login.login.signUp") }}</a>
								</p>

								<p class="text-sm">
									{{ $t("login.dontWantToUseAccount") }}
									<router-link to="/create-invoice" class="text-sm text-primary-500 hover:underline">
										{{ $t("login.useFreeVersion") }}
									</router-link>
								</p>

								<p class="text-sm">
									{{ $t("login.agreeBySignIn") }}
									<a href="https://invoicewolf.net/privacy-policy" class="text-sm text-primary-500 hover:underline">
										{{ $t("login.privacyPolicy") }}
									</a>
								</p>
							</div>
						</form>
					</template>
				</pv-card>
			</div>

			<div v-else-if="step === 'signUp'" class="flex flex-col items-center justify-center gap-4 px-6 py-8 lg:py-0">
				<pv-card class="w-[28rem]">
					<template #header>
						<div class="flex h-40 items-center justify-center rounded-t-lg bg-primary-100 p-4 dark:bg-primary-900">
							<InvoiceWolfNameLogo arrangement="vertical" size="large" no-logo />
						</div>
					</template>
					<template #title>
						{{ $t("login.signUp.createNewAccount") }}
					</template>
					<template #content>
						<div class="mt-8 space-y-4 md:space-y-6">
							<form class="space-y-4 md:space-y-6" @submit.prevent="userSignUp">
								<div class="grid grid-cols-2 gap-4">
									<TextInput id="firstName" v-model="firstName" :label="$t('login.signUp.labels.firstName')" />
									<TextInput
										id="lastName" v-model="lastName" :label="$t('login.signUp.labels.lastName')"
										class="text-right"
									/>
								</div>

								<TextInput
									id="email" v-model="email" :label="$t('login.signUp.labels.email')" enable-group
									:invalid="!validateEmail(email)"
								/>

								<TextInput
									id="password" v-model="password" :label="$t('login.signUp.labels.password')"
									input-class="w-full" password password-feedback
									@update:model-value="handlePasswordValidation"
								/>

								<TextInput
									id="confirmPassword" v-model="confirmPassword"
									:label="$t('login.signUp.labels.confirmPassword')" input-class="w-full"
									:invalid="!invalidPassword" password
									@update:model-value="handlePasswordValidation"
								/>

								<pv-message v-if="!invalidPassword" icon="pi pi-times-circle" severity="error">
									{{ $t("login.signUp.messages.passwordsNotMatching") }}
								</pv-message>

								<pv-message v-if="incorrect" icon="pi pi-times-circle" severity="error">
									{{ $t("login.signUp.messages.invalidLogin") }}
								</pv-message>

								<pv-button class="w-full" :label="$t('login.signUp.buttons.signUp')" @click="userSignUp" />

								<p class="text-sm">
									{{ $t("login.signUp.alreadyHaveAnAccount") }}
									<a class="text-sm text-primary-500 hover:underline" @click="step = 'signIn'">
										{{ $t("login.signUp.signIn") }}</a>
								</p>

								<p class="text-sm">
									{{ $t("login.dontWantToUseAccount") }}
									<router-link to="/create-invoice" class="text-sm text-primary-500 hover:underline">
										{{ $t("login.useFreeVersion") }}
									</router-link>
								</p>

								<p class="text-sm">
									{{ $t("login.agreeBySignIn") }}
									<a href="https://invoicewolf.net/privacy-policy" class="text-sm text-primary-500 hover:underline">
										{{ $t("login.privacyPolicy") }}
									</a>
								</p>
							</form>
						</div>
					</template>
				</pv-card>
			</div>

			<div
				v-else-if="step === 'forgotPassword'"
				class="flex flex-col items-center justify-center gap-4 px-6 py-8 lg:py-0"
			>
				<pv-card class="w-[28rem]">
					<template #header>
						<div class="flex h-40 items-center justify-center rounded-t-lg bg-primary-100 p-4 dark:bg-primary-900">
							<InvoiceWolfNameLogo arrangement="vertical" size="large" no-logo />
						</div>
					</template>
					<template #title>
						{{ $t("login.forgotPassword.resetPassword") }}
					</template>
					<template #content>
						<div class="mt-8 space-y-4 md:space-y-6">
							<form class="space-y-4 md:space-y-6" @submit.prevent="userSignUp">
								<TextInput id="email" v-model="email" :label="$t('login.forgotPassword.labels.email')" />

								<pv-button
									v-if="!passwordEmailSent"
									class="w-full"
									:label="$t('login.forgotPassword.buttons.resetPassword')"
									:disabled="disableForgotPasswordButton"
									:loading="disableForgotPasswordButton"
									@click="forgotPassword"
								/>

								<pv-button
									v-else
									class="w-full"
									:label="$t('login.forgotPassword.buttons.backToSignIn')"
									@click="step = 'signIn'; passwordEmailSent = false; disableForgotPasswordButton = false;"
								/>

								<pv-message v-if="userNotFound" icon="pi pi-times-circle" severity="error">
									{{ $t("login.forgotPassword.messages.emailDoesNotExist") }}
								</pv-message>

								<p class="text-sm">
									{{ $t("login.forgotPassword.rememberPassword") }}
									<a class="text-sm text-primary-500 hover:underline" @click="step = 'signIn'">
										{{ $t("login.signUp.signIn") }}</a>
								</p>

								<p class="text-sm">
									{{ $t("login.dontWantToUseAccount") }}
									<router-link to="/create-invoice" class="text-sm text-primary-500 hover:underline">
										{{ $t("login.useFreeVersion") }}
									</router-link>
								</p>
							</form>
						</div>
					</template>
				</pv-card>
			</div>

			<div
				v-else-if="step === 'joinOrCreate'"
				class="flex flex-col items-center justify-center gap-4 px-6 py-8 lg:py-0"
			>
				<pv-card class="w-[28rem]">
					<template #header>
						<div class="flex h-40 items-center justify-center rounded-t-lg bg-primary-100 p-4 dark:bg-primary-900">
							<InvoiceWolfNameLogo arrangement="vertical" size="large" no-logo />
						</div>
					</template>
					<template #title>
						{{ $t("login.pick.makeAChoice") }}
					</template>
					<template #content>
						<div class="space-y-4 p-6 sm:p-8 md:space-y-6">
							<div class="flex flex-col gap-4">
								<pv-button
									:label="$t('login.pick.buttons.haveCompany')" icon="pi pi-briefcase"
									@click="step = 'companyDetails'"
								/>
								<pv-button
									:label="$t('login.pick.buttons.workForCompany')" icon="pi pi-users"
									@click="userSignIn"
								/>
							</div>
						</div>
					</template>
				</pv-card>
			</div>

			<div
				v-else-if="step === 'companyDetails'"
				class="flex flex-col items-center justify-center gap-4 px-6 py-8 lg:py-0"
			>
				<pv-card class="w-[28rem]">
					<template #header>
						<div class="flex h-40 items-center justify-center rounded-t-lg bg-primary-100 p-4 dark:bg-primary-900">
							<InvoiceWolfNameLogo arrangement="vertical" size="large" no-logo />
						</div>
					</template>
					<template #title>
						{{ $t("login.companyDetails.fillInDetails") }}
					</template>
					<template #content>
						<NewCompanyDetails @success="step = 'paymentDetails'" />
					</template>
				</pv-card>
			</div>

			<div
				v-else-if="step === 'paymentDetails'"
				class="flex flex-col items-center justify-center gap-4 px-6 py-8 lg:py-0"
			>
				<pv-card class="w-[28rem]">
					<template #header>
						<div class="flex h-40 items-center justify-center rounded-t-lg bg-primary-100 p-4 dark:bg-primary-900">
							<InvoiceWolfNameLogo arrangement="vertical" size="large" no-logo />
						</div>
					</template>
					<template #title>
						{{ $t('login.paymentDetails.fillInDetails') }}
					</template>
					<template #content>
						<NewPaymentDetails @success="signInAfterCreation" />
					</template>
				</pv-card>
			</div>

			<div v-else-if="step === 'loading'" class="flex flex-col items-center justify-center gap-4 px-6 py-8 lg:py-0">
				<pv-progress-spinner
					:dt="{
						color: {
							1: 'var(--pv-primary-500)',
							2: 'var(--pv-primary-500)',
							3: 'var(--pv-primary-500)',
							4: 'var(--pv-primary-500)',
						},
					}"
					stroke-width="3"
					style="width: 10rem; height: 10rem"
				/>
			</div>
		</ResizeTransition>
	</main>
</template>
