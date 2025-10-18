import type { Order, User } from '../types';

// Let TypeScript know that jsPDF is available on the window object from the CDN script
declare const jspdf: any;

export const generateInvoicePDF = (order: Order, user: User) => {
  const { jsPDF } = jspdf;
  const doc = new jsPDF();

  // Add custom fonts if they are available to jsPDF, otherwise it will default.
  // For this environment, we assume default fonts.

  // Header
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(28);
  doc.text('CHRONOVAULT', 14, 22);
  
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(18);
  doc.text('Invoice', 14, 32);

  doc.setFontSize(10);
  doc.text(`Order ID: ${order.id}`, 14, 42);
  doc.text(`Date: ${order.date}`, 14, 47);

  // Customer Information
  doc.setFontSize(12);
  doc.text('Bill To:', 14, 60);
  doc.setFontSize(10);
  doc.text(user.name, 14, 66);
  doc.text(user.address.street, 14, 71);
  doc.text(`${user.address.city}, ${user.address.state} ${user.address.zip}`, 14, 76);
  doc.text(user.address.country, 14, 81);

  // Items Table
  const tableColumn = ["Item", "Description", "Qty", "Unit Price", "Total"];
  const tableRows: (string | number)[][] = [];

  order.items.forEach(item => {
    const itemData = [
      item.product.name,
      `Strap: ${item.selectedStrap.type}, Dial: ${item.selectedDialColor.type}`,
      item.quantity,
      `$${item.product.price.toLocaleString()}`,
      `$${(item.product.price * item.quantity).toLocaleString()}`
    ];
    tableRows.push(itemData);
  });

  doc.autoTable({
    startY: 90,
    head: [tableColumn],
    body: tableRows,
    theme: 'striped',
    headStyles: { fillColor: [212, 175, 55] } // Gold color for header
  });

  // Totals Section
  const finalY = (doc as any).autoTable.previous.finalY;
  const subtotal = order.items.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const shipping = order.total - subtotal;

  const rightAlignX = doc.internal.pageSize.width - 14;

  doc.setFontSize(10);
  doc.text(`Subtotal: $${subtotal.toLocaleString()}`, rightAlignX, finalY + 10, { align: 'right' });
  doc.text(`Shipping: $${shipping.toLocaleString()}`, rightAlignX, finalY + 16, { align: 'right' });
  
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.text(`Total: $${order.total.toLocaleString()}`, rightAlignX, finalY + 24, { align: 'right' });

  // Footer
  doc.setFont('helvetica', 'italic');
  doc.setFontSize(10);
  doc.text('Thank you for your purchase!', 14, doc.internal.pageSize.height - 10);

  // Save the PDF
  doc.save(`Chronovault-Invoice-${order.id}.pdf`);
};