const { PDFDocument } = require("pdfkit");
const fs = require("fs");
const path = require("path");

function generateInvoice(payment) {
  const invoicesFolder = path.join(__dirname, "../../invoices");

  if (!fs.existsSync(invoicesFolder)) {
    fs.mkdirSync(invoicesFolder, { recursive: true });
  }

  const fileName = `invoice_${payment._id}.pdf`;
  const filePath = path.join(invoicesFolder, fileName);

  const doc = new PDFDocument({
    size: "A4",
    margin: 50
  });

  doc.pipe(fs.createWriteStream(filePath));

  doc
    .fontSize(24)
    .font("Helvetica-Bold")
    .text("UNFAZED");

  doc
    .fontSize(12)
    .font("Helvetica")
    .text("GST-Style Payment Invoice");

  doc.moveDown();

  doc
    .fontSize(14)
    .font("Helvetica-Bold")
    .text("Invoice");

  doc.moveDown();

  doc
    .fontSize(11)
    .font("Helvetica")
    .text(`Invoice ID: ${payment._id}`)
    .text(`Transaction ID: ${payment.gateway_transaction_id || "N/A"}`)
    .text(`Date: ${new Date(payment.createdAt).toLocaleDateString()}`);

  doc.moveDown();

  doc
    .font("Helvetica-Bold")
    .text("Payment Details");

  doc.moveDown(0.5);

  doc
    .font("Helvetica")
    .text(`Amount: ₹${payment.amount}`)
    .text(`Platform Fee: ₹${payment.platform_fee}`)
    .text(`Net Amount: ₹${payment.net_amount}`)
    .text(`Status: ${payment.status}`);

  doc.moveDown();

  doc
    .font("Helvetica-Bold")
    .text("Thank you for using Unfazed.");

  doc.end();

  return filePath;
}

module.exports = generateInvoice;