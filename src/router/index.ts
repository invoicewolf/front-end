import { getAuth } from "firebase/auth";
import { createRouter, createWebHistory } from "vue-router";
import { refreshToken } from "@/utils/helpers/refreshToken";
import UnauthorizedView from "@/views/UnauthorizedView.vue";
import type { roles } from "@/utils/authorizationHelper";
import { getRoles } from "@/utils/authorizationHelper";

export const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: "/login",
			name: "login",
			components: {
				default: () => import("@/views/LoginView.vue"),
				topBar: () => import("@/components/TopBarLogin.vue"),
			},
		},
		{
			path: "/",
			name: "home",
			components: {
				default: () => import("@/views/HomeView.vue"),
				topBar: () => import("@/components/TopBar.vue"),
			},
			meta: { role: ["user", "admin"] },
		},
		{
			path: "/create-invoice",
			name: "create-invoice",
			components: {
				default: () => import("@/views/CreateInvoiceView.vue"),
				topBar: () => import("@/components/TopBar.vue"),
			},
		},
		{
			path: "/admin",
			name: "admin",
			components: {
				default: () => import("@/views/AdminView.vue"),
				topBar: () => import("@/components/TopBar.vue"),
			},
			meta: { role: ["admin"] },
		},
		{
			path: "/profile",
			name: "profile",
			components: {
				default: () => import("@/views/ProfileView.vue"),
				topBar: () => import("@/components/TopBar.vue"),
			},
			meta: { role: ["admin", "user"] },
		},
		{
			path: "/403",
			name: "403",
			component: UnauthorizedView,
		},
	],
});

router.beforeEach(async (to) => {
	const roles = getRoles();
	const auth = getAuth();

	if (auth.currentUser && localStorage.getItem("access_token") && to.path !== "/login") {
		await refreshToken();
	}

	if (to.meta.role) {
		let hasAccess = false;

		roles.forEach((role) => {
			if ((to.meta.role as roles[]).includes(role)) {
				hasAccess = true;
			}
		});

		if (!roles || roles.length === 0) {
			return {
				path: "/login",
				query: { redirect: to.fullPath },
			};
		}

		if (!hasAccess) {
			return {
				path: "/403",
			};
		}
	}
});
