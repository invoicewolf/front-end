<script lang="ts" setup>
import { ref } from "vue";
import SlideTransition from "@/components/Transitions/SlideTransition.vue";
import AdminCompanyDetails from "@/components/AdminTabs/AdminCompanyDetails.vue";
import AdminCompanyDetailsSkeleton from "@/components/AdminTabs/AdminCompanyDetailsSkeleton.vue";
import AdminPaymentDetails from "@/components/AdminTabs/AdminPaymentDetails.vue";
import AdminPaymentDetailsSkeleton from "@/components/AdminTabs/AdminPaymentDetailsSkeleton.vue";
import AdminUserDetails from "@/components/AdminTabs/AdminUserDetails.vue";
import AdminUserDetailsSkeleton from "@/components/AdminTabs/AdminUserDetailsSkeleton.vue";

const activeTab = ref("0");
</script>

<template>
	<main>
		<pv-tabs v-model:value="activeTab">
			<pv-tab-list>
				<pv-tab value="0">
					{{ $t('admin.tabs.companyDetails') }}
				</pv-tab>
				<pv-tab value="1">
					{{ $t('admin.tabs.paymentDetails') }}
				</pv-tab>
				<pv-tab value="2">
					{{ $t('admin.tabs.users') }}
				</pv-tab>
			</pv-tab-list>
			<pv-tab-panels>
				<pv-tab-panel value="0">
					<SlideTransition>
						<div v-show="activeTab === '0'">
							<Suspense>
								<template #fallback>
									<AdminCompanyDetailsSkeleton />
								</template>
								<AdminCompanyDetails />
							</Suspense>
						</div>
					</SlideTransition>
				</pv-tab-panel>
				<pv-tab-panel value="1">
					<SlideTransition>
						<div v-show="activeTab === '1'">
							<Suspense>
								<template #fallback>
									<AdminPaymentDetailsSkeleton />
								</template>
								<AdminPaymentDetails />
							</Suspense>
						</div>
					</SlideTransition>
				</pv-tab-panel>
				<pv-tab-panel value="2">
					<SlideTransition>
						<div v-show="activeTab === '2'">
							<Suspense>
								<template #fallback>
									<AdminUserDetailsSkeleton />
								</template>
								<AdminUserDetails />
							</Suspense>
						</div>
					</SlideTransition>
				</pv-tab-panel>
			</pv-tab-panels>
		</pv-tabs>
	</main>
</template>
