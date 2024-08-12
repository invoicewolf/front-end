<script setup lang="ts">
import InvoiceWolfNameLogo from "@/components/InvoiceWolfNameLogo.vue";
</script>

<template>
	<main class="flex flex-col gap-2 p-10">
		<InvoiceWolfNameLogo arrangement="vertical" size="normal" />
		<pv-divider />
		<h1>
			Privacy Policy
		</h1>
		<h2>
			Introduction
		</h2>

		<p>
			At InvoiceWolf, we value your privacy. This policy explains what personal data we collect, why we collect
			it, and how we use it.
		</p>

		<h2>
			Data We Collect
		</h2>

		<h3>
			User Account Information
		</h3>

		<ul>
			<li>
				First Name
			</li>
			<li>
				Last Name
			</li>
			<li>
				Email Address
			</li>
			<li>
				Company (if applicable)
			</li>
		</ul>

		<h3>
			Company Information
		</h3>

		<ul>
			<li>
				Company Name
			</li>
			<li>
				Company Number (if applicable)
			</li>
			<li>
				Company Email
			</li>
			<li>
				Tax Number (if applicable)
			</li>
			<li>
				Company Email
			</li>
			<li>
				Company Email
			</li>
			<li>
				Users
			</li>
		</ul>

		<h3>
			Company Address Details
		</h3>

		<ul>
			<li>
				Zip Code
			</li>
			<li>
				House Number
			</li>
			<li>
				Addition (if applicable)
			</li>
			<li>
				Street Name
			</li>
			<li>
				City
			</li>
			<li>
				Country
			</li>
		</ul>

		<h3>
			Company Payment Details
		</h3>

		<ul>
			<li>
				Chosen Currency
			</li>
			<li>
				IBAN Number
			</li>
		</ul>

		<h3>
			Logging Data (Per API Request)
		</h3>

		<ul>
			<li>
				Timestamp: The time when the request was made.
			</li>
			<li>
				Request IP: The IP address from where the request was sent.
			</li>
			<li>
				Endpoint: The specific part of our service you interacted with.
			</li>
			<li>
				User ID: Your unique identifier within our system (if applicable).
			</li>
		</ul>

		<h2>
			How We Use Your Data
		</h2>

		<ul>
			<li>
				Logging Data: We use this to detect malicious activity and ensure traces of your activity.
			</li>
			<li>
				User Account Information: This is used to manage your account and provide our services.
			</li>
			<li>
				Company Information: We use this to generate the invoices for your company.
			</li>
		</ul>

		<h2>
			Data Security
		</h2>
		<p>
			Authentication is handled by Google Firebase. This means that InvoiceWolf never sees, stores or uses your password.
		</p>

		<p>
			The additional data is stored in a postgresql database. Sensitive details, such as IBAN numbers, are encrypted using
			AES-256-CBC encryption to ensure this data cannot be obtained in case of a breach.
		</p>

		<p>
			InvoiceWolf does not share your additional data with any third parties.
		</p>

		<h2>
			Your Rights
		</h2>

		<p>
			You have the right to access, update, or delete your personal data at any time. Deleting your data can be done via the profile screen on the website. Want to request of your data? Contact us via the contact information below.
		</p>

		<h2>
			Contact Us
		</h2>
		<p>
			If you have any questions or concerns about your privacy, please reach out to Niek via e-mail (<a href="mailto:contact@niek.io" target="_blank" class="text-primary-500">contact@niek.io</a>).
		</p>

		<h2>
			Changes to This Policy
		</h2>

		<p>
			We may update this policy as needed. Any changes will be communicated to you through our service or via email.
		</p>

		<h2>
			Effective Date
		</h2>

		<p>This policy is effective as of August 12th 2024.</p>

		<pv-divider />
		Thank you for trusting InvoiceWolf with your information. If you have any questions and/or remarks, feel free to reach out to us!
	</main>
</template>

<style scoped>
h1 {
    @apply text-4xl font-bold
}

h2 {
    @apply text-2xl font-semibold
}

h3 {
    @apply text-lg font-medium
}

ul {
    @apply list-inside list-dash
}

li {
    @apply list-item
}
</style>
