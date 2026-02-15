import { jsPDF } from "jspdf";

interface ReceiptData {
  amount: string;
  refNumber: string;
  date: string;
  method: string;
  senderName: string;
  recipientName?: string;
  recipientBank?: string;
  recipientAccount?: string;
  logoSrc: string;
}

export const generateReceiptPDF = async (data: ReceiptData) => {
  const { amount, refNumber, date, method, senderName, recipientName, recipientBank, recipientAccount, logoSrc } = data;

  const pdfHeight = 540;
  const doc = new jsPDF({
    orientation: "portrait",
    unit: "pt",
    format: [380, pdfHeight],
  });

  const pageWidth = 380;
  const margin = 20;
  const cardWidth = pageWidth - margin * 2;
  const cardX = margin;
  const cardHeight = 440;
  const startY = 60;
  const cornerRadius = 24;

  doc.setFillColor(255, 255, 255);
  doc.roundedRect(
    cardX,
    startY,
    cardWidth,
    cardHeight,
    cornerRadius,
    cornerRadius,
    "F",
  );

  doc.setFillColor(255, 255, 255);
  doc.rect(
    cardX,
    startY + cardHeight - cornerRadius,
    cardWidth,
    cornerRadius,
    "F",
  );

  doc.setDrawColor(230, 230, 230);
  doc.setLineWidth(1.5);

  const arcPoints = 20;
  for (let i = 0; i <= arcPoints; i++) {
    const angle = (Math.PI / 2) * (i / arcPoints);
    const x1 = cardX + cornerRadius - Math.cos(angle) * cornerRadius;
    const y1 = startY + cornerRadius - Math.sin(angle) * cornerRadius;
    const x2 =
      cardX + cardWidth - cornerRadius + Math.cos(angle) * cornerRadius;
    const y2 = startY + cornerRadius - Math.sin(angle) * cornerRadius;

    if (i === 0) {
      doc.line(cardX, startY + cornerRadius, x1, y1);
      doc.line(cardX + cardWidth, startY + cornerRadius, x2, y2);
    } else {
      const prevAngle = (Math.PI / 2) * ((i - 1) / arcPoints);
      const prevX1 = cardX + cornerRadius - Math.cos(prevAngle) * cornerRadius;
      const prevY1 = startY + cornerRadius - Math.sin(prevAngle) * cornerRadius;
      const prevX2 =
        cardX + cardWidth - cornerRadius + Math.cos(prevAngle) * cornerRadius;
      const prevY2 = startY + cornerRadius - Math.sin(prevAngle) * cornerRadius;

      doc.line(prevX1, prevY1, x1, y1);
      doc.line(prevX2, prevY2, x2, y2);
    }
  }

  doc.line(
    cardX + cornerRadius,
    startY,
    cardX + cardWidth - cornerRadius,
    startY,
  );
  doc.line(cardX, startY + cornerRadius, cardX, startY + cardHeight);
  doc.line(
    cardX + cardWidth,
    startY + cornerRadius,
    cardX + cardWidth,
    startY + cardHeight,
  );
  doc.line(cardX, startY + cardHeight, cardX + cardWidth, startY + cardHeight);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const gState = (doc as any).GState;
  if (gState) {
    doc.setGState(new gState({ opacity: 0.05 }));
  }

  const logoW = 60;
  const logoH = 30;
  const padding = 10; // Add padding from edges

  // Only draw watermarks that fit within the card boundaries
  for (
    let x = cardX + padding;
    x < cardX + cardWidth - logoW - padding;
    x += 100
  ) {
    for (
      let y = startY + padding;
      y < startY + cardHeight - logoH - padding;
      y += 60
    ) {
      // Check if the entire logo fits within the card
      if (
        x + logoW <= cardX + cardWidth - padding &&
        y + logoH <= startY + cardHeight - padding
      ) {
        doc.addImage(
          logoSrc,
          "PNG",
          x,
          y,
          logoW,
          logoH,
          undefined,
          "FAST",
          -15,
        );
      }
    }
  }

  if (gState) {
    doc.setGState(new gState({ opacity: 1 }));
  }

  const iconY = startY;

  doc.setFillColor(255, 255, 255);
  doc.circle(pageWidth / 2, iconY, 48, "F");

  doc.setFillColor(35, 162, 109);
  doc.circle(pageWidth / 2, iconY, 40, "F");

  doc.setDrawColor(255, 255, 255);
  doc.setLineWidth(4);
  doc.line(pageWidth / 2 - 15, iconY, pageWidth / 2 - 5, iconY + 10);
  doc.line(pageWidth / 2 - 5, iconY + 10, pageWidth / 2 + 15, iconY - 10);

  const headerY = startY + 55;

  doc.addImage(logoSrc, "PNG", cardX + 10, headerY - 8, 100, 45);

  doc.setTextColor(17, 21, 40);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.text("TRANSACTION RECEIPT", cardX + cardWidth - 25, headerY + 16, {
    align: "right",
  });

  const amountY = headerY + 65;

  doc.setTextColor(18, 18, 18);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(14);
  doc.text("Payment Success!", pageWidth / 2, amountY, { align: "center" });

  const cleanAmount = amount.replace(/[^\d.,]/g, "");

  const drawNairaSymbol = (x: number, y: number, size: number) => {
    const scale = size / 40;

    doc.setLineWidth(3 * scale);
    doc.setDrawColor(0, 23, 79);

    doc.line(x, y - 12 * scale, x, y + 8 * scale);
    doc.line(x, y - 12 * scale, x + 12 * scale, y + 8 * scale);
    doc.line(x + 12 * scale, y - 12 * scale, x + 12 * scale, y + 8 * scale);

    doc.setLineWidth(2 * scale);
    doc.line(x - 2 * scale, y - 6 * scale, x + 14 * scale, y - 6 * scale);
    doc.line(x - 2 * scale, y + 2 * scale, x + 14 * scale, y + 2 * scale);
  };

  doc.setFont("helvetica", "bold");
  doc.setFontSize(44);
  const amountTextWidth = doc.getTextWidth(cleanAmount);

  const nairaSymbolWidth = 20;
  const spacing = 8;
  const totalWidth = nairaSymbolWidth + spacing + amountTextWidth;
  const startX = (pageWidth - totalWidth) / 2;

  drawNairaSymbol(startX + nairaSymbolWidth / 2 - 2, amountY + 35, 40);

  doc.setFontSize(44);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(0, 23, 79);
  doc.text(cleanAmount, startX + nairaSymbolWidth + spacing, amountY + 45);

  doc.setTextColor(90, 95, 115);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.text(date, pageWidth / 2, amountY + 72, { align: "center" });

  const listStartY = amountY + 125;

  doc.setDrawColor(249, 250, 251);
  doc.setLineWidth(1);
  doc.line(
    cardX + 20,
    listStartY - 20,
    cardX + cardWidth - 20,
    listStartY - 20,
  );

  const drawRow = (
    y: number,
    label: string,
    value: string,
    subValue?: string,
  ) => {
    doc.setTextColor(156, 163, 175);
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.text(label, cardX + 20, y);

    doc.setTextColor(17, 21, 40);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    doc.text(value, cardX + cardWidth - 20, y, { align: "right" });

    if (subValue) {
      doc.setTextColor(90, 95, 115);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(9);
      doc.text(subValue, cardX + cardWidth - 20, y + 13, { align: "right" });
    }
  };

  const recipientDetails = recipientName || 'N/A';
  const recipientSubDetails = (recipientBank && recipientAccount) 
    ? `${recipientBank} | ${recipientAccount}`
    : recipientBank || recipientAccount || '';

  drawRow(
    listStartY,
    "Recipient Details",
    recipientDetails,
    recipientSubDetails || undefined,
  );
  drawRow(
    listStartY + 42,
    "Sender Details",
    senderName,
    `${method} | ${refNumber.slice(0, 10)}`,
  );
  drawRow(listStartY + 78, "Transaction Id", refNumber);

  doc.setDrawColor(249, 250, 251);
  doc.line(
    cardX + 20,
    listStartY + 100,
    cardX + cardWidth - 20,
    listStartY + 100,
  );

  const cardBottom = startY + cardHeight;
  const footerY = cardBottom - 30;

  doc.setFontSize(10);
  doc.setTextColor(156, 163, 175);
  doc.setFont("helvetica", "bold");

  const poweredText = "Powered by ";
  const brandText = "Chainpaye";
  const separatorText = " | ";
  const helpText = "help";

  const totalFooterWidth = doc.getTextWidth(
    poweredText + brandText + separatorText + helpText,
  );
  const footerStartX = (pageWidth - totalFooterWidth) / 2;

  doc.text(poweredText, footerStartX, footerY);

  doc.setTextColor(17, 21, 40);
  doc.setFont("helvetica", "bold");
  doc.text(brandText, footerStartX + doc.getTextWidth(poweredText), footerY);

  doc.setTextColor(156, 163, 175);
  doc.setFont("helvetica", "bold");
  doc.text(
    separatorText + helpText,
    footerStartX + doc.getTextWidth(poweredText + brandText),
    footerY,
  );

  const scallopSize = 20;
  const scallopStartY = cardBottom;

  doc.setFillColor(255, 255, 255);
  doc.rect(cardX, scallopStartY, cardWidth, 15, "F");

  doc.setFillColor(255, 255, 255);
  const numScallops = Math.ceil(cardWidth / scallopSize) + 2;
  for (let i = -1; i < numScallops; i++) {
    const xPos = cardX + i * scallopSize + scallopSize / 2;
    doc.circle(xPos, scallopStartY + 2, scallopSize / 2, "F");
  }

  doc.save(`receipt-${refNumber}.pdf`);
};