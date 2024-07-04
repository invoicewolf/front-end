import { PDFDocument, StandardFonts, rgb } from "pdf-lib";
import { i18n } from "@/main";
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
		const pdfDoc = await PDFDocument.create();
		const normalFont = await pdfDoc.embedFont(StandardFonts.Helvetica);
		const boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

		const titleText = {
			size: 36,
			font: boldFont,
		};

		const normalText = {
			size: 11,
			font: normalFont,
			height: normalFont.heightAtSize(11) + 5,
		};

		const boldText = {
			size: 11,
			font: boldFont,
			height: boldFont.heightAtSize(11) + 5,
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
		drawText(this.invoice.companyDetails.representativeName);
		drawText(this.invoice.companyDetails.companyName);
		drawText(`${this.invoice.companyDetails.streetName} ${this.invoice.companyDetails.houseNumber}`);
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
		drawText(`${this.invoice.addresseeDetails.streetName} ${this.invoice.addresseeDetails.houseNumber}`);
		drawText(`${this.invoice.addresseeDetails.zipCode} ${this.invoice.addresseeDetails.city}`);
		drawText(this.invoice.addresseeDetails.country);

		line++;
		drawText(`${this.invoice.companyDetails.city} ${formatDate(this.invoice.paymentDetails.invoiceDate, i18n.global.locale.value)}`);
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

		page.drawText(i18n.global.t("invoice.table.cost"), {
			x: headerRowPositions[4],
			y: height - line * boldText.height,
			...boldText,
		});

		line += 1.2;

		const products = this.invoice.getFormattedProducts();
		const total = this.invoice.calculatePrice().getFormattedPrice();

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

			page.drawText(product.cost, {
				x: headerRowPositions[4],
				y: rowHeight,
				...normalText,
			});

			line = lineHeight + 1.2;
		});

		const totalRowLeft = 350;
		const totalRowRight = width - 20;

		const totalRowLength = totalRowRight - totalRowLeft;

		const paddedTotalRowLeft = totalRowLeft + 5;
		const totalRowTextRightAnchor = paddedTotalRowLeft + (totalRowLength / 2);

		const totalRowUnitAnchor = totalRowTextRightAnchor + 10;

		page.drawText(i18n.global.t("invoice.table.subtotal"), {
			x: totalRowTextRightAnchor - normalText.font.widthOfTextAtSize(i18n.global.t("invoice.table.subtotal"), normalText.size),
			y: height - line * normalText.height,
			...normalText,
		});

		page.drawText(this.invoice.paymentDetails.currency, {
			x: totalRowUnitAnchor,
			y: height - line * normalText.height,
			...normalText,
		});

		page.drawText(total.subtotal, {
			x: headerRowPositions[4],
			y: height - line * normalText.height,
			...normalText,
		});

		line++;

		page.drawText(i18n.global.t("invoice.table.taxAmount"), {
			x: totalRowTextRightAnchor - normalText.font.widthOfTextAtSize(i18n.global.t("invoice.table.taxAmount"), normalText.size),
			y: height - line * normalText.height,
			...normalText,
		});

		page.drawText(this.invoice.paymentDetails.currency, {
			x: totalRowUnitAnchor,
			y: height - line * normalText.height,
			...normalText,
		});

		page.drawText(total.taxAmount, {
			x: headerRowPositions[4],
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
			x: totalRowTextRightAnchor - boldText.font.widthOfTextAtSize(i18n.global.t("invoice.table.totalIncludingTax"), boldText.size),
			y: height - line * boldText.height,
			...boldText,
		});

		page.drawText(this.invoice.paymentDetails.currency, {
			x: totalRowUnitAnchor,
			y: height - line * boldText.height,
			...boldText,
		});

		page.drawText(total.total, {
			x: headerRowPositions[4],
			y: height - line * boldText.height,
			...boldText,
		});

		line += 4;

		const date1 = this.invoice.paymentDetails.invoiceDate;
		const date2 = this.invoice.paymentDetails.dueDate;

		const Difference_In_Time
            = date2.getTime() - date1.getTime();

		const Difference_In_Days
            = Math.round
            (Difference_In_Time / (1000 * 3600 * 24));

		drawText(i18n.global.t("invoice.termsAndConditions"), boldText);
		drawText(i18n.global.t("invoice.allPricesExcludeVAT"));
		drawText(`${i18n.global.t("invoice.paymentTerm", { days: Difference_In_Days })} (${formatDate(this.invoice.paymentDetails.dueDate, i18n.global.locale.value)})`);

		line++;

		page.drawText(`${i18n.global.t("invoice.paymentTo")} `, {
			x: 20,
			y: height - line * normalText.height,
			...normalText,
		});

		page.drawText(this.invoice.paymentDetails.iban, {
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

		page.drawText(`${this.invoice.companyDetails.representativeName}, ${this.invoice.companyDetails.representativeEmail}`, {
			x: 20 + normalText.font.widthOfTextAtSize(`${i18n.global.t("invoice.questionsOrRemarksContact")} `, normalText.size),
			y: height - line * normalText.height,
			...boldText,
		});

		const pdfBytes = await pdfDoc.save();
		return pdfBytes;
	}
}
