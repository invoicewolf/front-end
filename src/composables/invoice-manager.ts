import { reactive } from "vue";
import { InvoiceManager } from "@/utils/InvoiceManager";

const invoiceManager = reactive(new InvoiceManager());

export function useInvoiceManager() {
	return invoiceManager;
}
