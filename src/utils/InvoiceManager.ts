import fontkit from "@pdf-lib/fontkit";
import * as IBAN from "iban-ts";
import { PDFDocument, rgb } from "pdf-lib";
import { i18n } from "@/main";
import { formatCurrencySymbol } from "@/utils/helpers/format-currency-symbol";
import { formatDate } from "@/utils/helpers/format-date";
import { wrapText } from "@/utils/helpers/wrap-text";
import { type IInvoice, Invoice } from "@/utils/Invoice";

export class InvoiceManager {
	invoice: Invoice;

	constructor() {
		this.invoice = new Invoice();
	}

	new() {
		this.invoice.reset();
	}

	open(data: IInvoice) {
		this.invoice = new Invoice(data);
	}

	getData() {
		return JSON.stringify(this.invoice);
	}

	async createPdf() {
		const regularUrl = `${import.meta.env.VITE_API_URL}/fonts/regular`;
		const regularFontBytes = await fetch(regularUrl).then(res => res.arrayBuffer());

		const boldUrl = `${import.meta.env.VITE_API_URL}/fonts/bold`;
		const boldFontBytes = await fetch(boldUrl).then(res => res.arrayBuffer());

		const pdfDoc = await PDFDocument.create();

		pdfDoc.registerFontkit(fontkit);

		const normalFont = await pdfDoc.embedFont(regularFontBytes);
		const boldFont = await pdfDoc.embedFont(boldFontBytes);

		const titleText = {
			size: 36,
			font: boldFont,
		};

		const normalText = {
			size: 11,
			font: normalFont,
			height: normalFont.heightAtSize(11),
		};

		const boldText = {
			size: 11,
			font: boldFont,
			height: boldFont.heightAtSize(11),
		};

		const page = pdfDoc.addPage();
		const { width, height } = page.getSize();

		let line = 0;

		const drawText = (text: string, textType = normalText) => {
			page.drawText(text, {
				x: 20,
				y: height - line * normalText.height,
				...textType,
			});

			line++;
		};

		page.drawText(i18n.global.t("invoice.invoice"), {
			x: width - (titleText.font.widthOfTextAtSize(i18n.global.t("invoice.invoice"), 36) + titleText.size * 2),
			y: height - 2 * titleText.size,
			...titleText,
		});

		line = 6;
		drawText(this.invoice.companyDetails.companyName);
		if (this.invoice.companyDetails.addition) {
			drawText(`${this.invoice.companyDetails.streetName} ${this.invoice.companyDetails.houseNumber}${this.invoice.companyDetails.addition}`);
		}
		else {
			drawText(`${this.invoice.companyDetails.streetName} ${this.invoice.companyDetails.houseNumber}`);
		}
		drawText(`${this.invoice.companyDetails.zipCode} ${this.invoice.companyDetails.city}`);
		drawText(this.invoice.companyDetails.country);
		if (this.invoice.companyDetails.companyNumber) {
			drawText(`${i18n.global.t("invoice.companyDetails.companyNumber")}: ${this.invoice.companyDetails.companyNumber}`);
		}
		if (this.invoice.companyDetails.taxNumber) {
			drawText(`${i18n.global.t("invoice.companyDetails.taxNumber")}: ${this.invoice.companyDetails.taxNumber}`);
		}

		line++;
		drawText(this.invoice.addresseeDetails.companyName);
		if (this.invoice.addresseeDetails.attention) {
			drawText(`${i18n.global.t("invoice.addresseeDetails.attentionName")} ${this.invoice.addresseeDetails.attention}`);
		}
		if (this.invoice.addresseeDetails.subject) {
			drawText(`${i18n.global.t("invoice.addresseeDetails.subjectName")} ${this.invoice.addresseeDetails.subject}`);
		}
		if (this.invoice.addresseeDetails.addition) {
			drawText(`${this.invoice.addresseeDetails.streetName} ${this.invoice.addresseeDetails.houseNumber}${this.invoice.addresseeDetails.addition}`);
		}
		else {
			drawText(`${this.invoice.addresseeDetails.streetName} ${this.invoice.addresseeDetails.houseNumber}`);
		}
		drawText(`${this.invoice.addresseeDetails.zipCode} ${this.invoice.addresseeDetails.city}`);
		drawText(this.invoice.addresseeDetails.country);

		line++;
		drawText(`${this.invoice.companyDetails.city} ${formatDate(this.invoice.paymentDetails.invoiceDate, i18n.global.t("localeString"))}`);
		drawText(`${i18n.global.t("invoice.regarding")}: ${i18n.global.t("invoice.invoice")} #${this.invoice.paymentDetails.invoiceNumber}`);

		const headerLeft = 20;
		const headerRight = width - 20;

		const headerRowLength = headerRight - headerLeft;

		line += 2;

		page.drawRectangle({
			color: rgb(0.9, 0.9, 0.9),
			x: headerLeft,
			y: height - line * normalText.height - 4,
			width: headerRowLength,
			height: normalText.height + 2,
		});

		const paddedHeaderRowLength = headerRowLength - 10;
		const paddedHeaderLeft = headerLeft + 5;

		const calculatePositions = (totalWidth: number, paddedStart: number, split: number[]) => {
			const positions: number[] = [paddedStart];

			let rowPosition = paddedStart;
			split.forEach((split) => {
				positions.push((split / 100 * totalWidth) + rowPosition);
				rowPosition += split / 100 * totalWidth;
			});

			return positions;
		};

		const paddedHeaderRight = paddedHeaderRowLength;

		const headerRowPositions = calculatePositions(paddedHeaderRowLength, paddedHeaderLeft, [30, 12.5, 12.5, 35]);

		page.drawText(i18n.global.t("invoice.table.description"), {
			x: headerRowPositions[0],
			y: height - line * boldText.height,
			...boldText,
		});

		page.drawText(i18n.global.t("invoice.table.amount"), {
			x: headerRowPositions[1],
			y: height - line * boldText.height,
			...boldText,
		});

		page.drawText(i18n.global.t("invoice.table.tariff"), {
			x: headerRowPositions[2],
			y: height - line * boldText.height,
			...boldText,
		});

		page.drawText(i18n.global.t("invoice.table.taxRate"), {
			x: headerRowPositions[3],
			y: height - line * boldText.height,
			...boldText,
		});

		let max = 0;

		this.invoice.products.forEach((product) => {
			const { cost } = product;

			if (cost > max) {
				max = cost;
			}
		});

		const products = this.invoice.getFormattedProducts();
		const total = this.invoice.calculatePrice().getFormattedPrice(false);

		const currency = formatCurrencySymbol(this.invoice.paymentDetails.currency);

		page.drawText(i18n.global.t("invoice.table.cost"), {
			x: paddedHeaderRight - (boldText.font.widthOfTextAtSize(total.total, boldText.size) + 2) - boldText.font.widthOfTextAtSize(currency, boldText.size),
			y: height - line * boldText.height,
			...boldText,
		});

		line += 1.2;

		products.forEach((product) => {
			let rowHeight = height - line * normalText.height;
			let lineHeight = line;

			if (product.description.length <= 20) {
				page.drawText(product.description, {
					x: headerRowPositions[0],
					y: rowHeight,
					...normalText,
				});
			}
			else {
				const descriptionText = wrapText(product.description, 20);

				rowHeight = rowHeight - (descriptionText.length * normalText.height / descriptionText.length);

				descriptionText.forEach((descriptionLine) => {
					page.drawText(descriptionLine, {
						x: headerRowPositions[0],
						y: height - lineHeight * normalText.height,
						...normalText,
					});

					lineHeight++;
				});
			}

			page.drawText(product.amount, {
				x: headerRowPositions[1],
				y: rowHeight,
				...normalText,
			});

			page.drawText(product.tariff, {
				x: headerRowPositions[2],
				y: rowHeight,
				...normalText,
			});

			page.drawText(product.taxRate, {
				x: headerRowPositions[3],
				y: rowHeight,
				...normalText,
			});

			page.drawText(currency, {
				x: paddedHeaderRight - (boldText.font.widthOfTextAtSize(total.total, boldText.size) + 2) - boldText.font.widthOfTextAtSize(currency, boldText.size),
				y: rowHeight,
				...normalText,
			});

			page.drawText(product.cost.replace(currency, ""), {
				x: paddedHeaderRight - normalText.font.widthOfTextAtSize(product.cost.replace(currency, ""), normalText.size),
				y: rowHeight,
				...normalText,
			});

			line = lineHeight + 1.3;
		});

		const totalRowLeft = 350;
		const totalRowRight = width - 20;

		const totalRowLength = totalRowRight - totalRowLeft;

		page.drawRectangle({
			color: rgb(0.6, 0.6, 0.6),
			x: totalRowLeft,
			y: height - line * normalText.height,
			width: totalRowLength,
			height: 0.5,
		});

		line += 1;

		page.drawText(i18n.global.t("invoice.table.subtotal"), {
			x: paddedHeaderRight - (normalText.font.widthOfTextAtSize(i18n.global.t("invoice.table.subtotal"), normalText.size) + 10) - normalText.font.widthOfTextAtSize(total.total, normalText.size) - boldText.font.widthOfTextAtSize(currency, normalText.size),
			y: height - line * normalText.height,
			...normalText,
		});

		page.drawText(currency, {
			x: paddedHeaderRight - (boldText.font.widthOfTextAtSize(total.total, boldText.size) + 2) - boldText.font.widthOfTextAtSize(currency, boldText.size),
			y: height - line * normalText.height,
			...normalText,
		});

		page.drawText(total.subtotal, {
			x: paddedHeaderRight - normalText.font.widthOfTextAtSize(total.subtotal.replace(currency, ""), normalText.size),
			y: height - line * normalText.height,
			...normalText,
		});

		line++;

		page.drawText(i18n.global.t("invoice.table.taxAmount"), {
			x: paddedHeaderRight - (normalText.font.widthOfTextAtSize(i18n.global.t("invoice.table.taxAmount"), normalText.size) + 10) - normalText.font.widthOfTextAtSize(total.total, normalText.size) - boldText.font.widthOfTextAtSize(currency, normalText.size),
			y: height - line * normalText.height,
			...normalText,
		});

		page.drawText(currency, {
			x: paddedHeaderRight - (boldText.font.widthOfTextAtSize(total.total, boldText.size) + 2) - boldText.font.widthOfTextAtSize(currency, boldText.size),
			y: height - line * normalText.height,
			...normalText,
		});

		page.drawText(total.taxAmount, {
			x: paddedHeaderRight - normalText.font.widthOfTextAtSize(total.taxAmount, normalText.size),
			y: height - line * normalText.height,
			...normalText,
		});

		line += 1.2;

		page.drawRectangle({
			color: rgb(0.9, 0.9, 0.9),
			x: totalRowLeft,
			y: height - line * normalText.height - 4,
			width: totalRowLength,
			height: normalText.height + 2,
		});

		page.drawText(i18n.global.t("invoice.table.totalIncludingTax"), {
			x: paddedHeaderRight - (normalText.font.widthOfTextAtSize(i18n.global.t("invoice.table.totalIncludingTax"), normalText.size) + 10) - normalText.font.widthOfTextAtSize(total.total, normalText.size) - boldText.font.widthOfTextAtSize(currency, normalText.size),
			y: height - line * boldText.height,
			...boldText,
		});

		page.drawText(currency, {
			x: paddedHeaderRight - (boldText.font.widthOfTextAtSize(total.total, boldText.size) + 2) - boldText.font.widthOfTextAtSize(currency, boldText.size),
			y: height - line * boldText.height,
			...boldText,
		});

		page.drawText(total.total, {
			x: paddedHeaderRight - boldText.font.widthOfTextAtSize(total.total, boldText.size),
			y: height - line * boldText.height,
			...boldText,
		});

		line += 4;

		const date1 = this.invoice.paymentDetails.invoiceDate;
		const date2 = this.invoice.paymentDetails.dueDate;

		const differenceInTime = date2.getTime() - date1.getTime();

		const differenceInDays = Math.round(differenceInTime / (1000 * 3600 * 24));

		drawText(i18n.global.t("invoice.termsAndConditions"), boldText);
		drawText(i18n.global.t("invoice.allPricesExcludeVAT"));
		drawText(`${i18n.global.t("invoice.paymentTerm", { days: differenceInDays })} (${formatDate(this.invoice.paymentDetails.dueDate, i18n.global.t("localeString"))})`);

		line++;

		page.drawText(`${i18n.global.t("invoice.paymentTo")} `, {
			x: 20,
			y: height - line * normalText.height,
			...normalText,
		});

		page.drawText(IBAN.printFormat(this.invoice.paymentDetails.iban, " "), {
			x: 20 + normalText.font.widthOfTextAtSize(`${i18n.global.t("invoice.paymentTo")} `, normalText.size),
			y: height - line * normalText.height,
			...boldText,
		});

		line += 2;

		page.drawText(`${i18n.global.t("invoice.questionsOrRemarksContact")} `, {
			x: 20,
			y: height - line * normalText.height,
			...normalText,
		});

		page.drawText(`${this.invoice.companyDetails.companyEmail}`, {
			x: 20 + normalText.font.widthOfTextAtSize(`${i18n.global.t("invoice.questionsOrRemarksContact")} `, normalText.size),
			y: height - line * normalText.height,
			...boldText,
		});

		const pdfBytes = await pdfDoc.save();
		return pdfBytes;
	}
}
