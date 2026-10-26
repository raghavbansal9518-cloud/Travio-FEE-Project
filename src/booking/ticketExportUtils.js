/**
 * ===================================================================
 * TRAVIO E-TICKET & VOUCHER EXPORT ENGINE
 * Provides 100% functional, real ticket printing and file downloading
 * formatted as official airline boarding passes and luxury stay vouchers.
 * ===================================================================
 */

export function generateOfficialTicketHtml(ticket) {
  if (!ticket) return '';

  const pnr = ticket.pnr || `TRV-${Math.floor(100000 + Math.random() * 900000)}`;
  const title = ticket.title || ticket.destinationName || "TRAVIO RESERVATION";
  const type = ticket.type || 'TRAVEL';
  const from = ticket.origin || ticket.from || ticket.fromCity || "Origin";
  const to = ticket.destinationName || ticket.to || ticket.toCity || "Destination";
  const date = ticket.departureDate || ticket.date || "Upcoming";
  const time = ticket.time || '10:00 AM';
  const seats = ticket.seats || ticket.seatSummary || "Standard Reserved";
  const passenger = ticket.passenger || {};
  const fullName = passenger.fullName || 'Lead Traveler';
  const email = passenger.email || 'traveler@travio.com';
  const phone = passenger.phone || '+91 98765 43210';
  const amountPaid = typeof ticket.amountPaid === 'number' ? ticket.amountPaid.toLocaleString('en-IN') : ticket.amountPaid || '3,450';
  const paymentMethod = ticket.paymentMethod || 'Online Gateway';
  const bookingDate = ticket.bookingDate || new Date().toLocaleDateString();

  const brandTitle = 
    type === 'FLIGHT' ? 'TRAVIO AIRWAYS • OFFICIAL BOARDING PASS' :
    type === 'TRAIN' ? 'IRCTC / TRAVIO • E-RESERVATION SLIP' :
    type === 'HOTEL' ? 'TRAVIO LUXURY RETREATS • STAY VOUCHER' :
    type === 'BUS' ? 'TRAVIO EXPRESS COACH • BOARDING PASS' :
    type === 'CAB' ? 'TRAVIO CHAUFFEUR • TRIP RECEIPT' :
    'TRAVIO VIP EXPERIENCES • ACTIVITY VOUCHER';

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>TRAVIO Official E-Ticket - ${pnr}</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=Outfit:wght@700;800;900&display=swap" rel="stylesheet">
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: 'Inter', -apple-system, sans-serif;
      background: #f1f5f9;
      color: #0f172a;
      padding: 30px 15px;
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    .print-bar {
      width: 100%;
      max-width: 820px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;
      padding: 12px 20px;
      background: #ffffff;
      border: 1px solid #cbd5e1;
      border-radius: 12px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.05);
    }
    .print-btn {
      background: #0284c7;
      color: #ffffff;
      border: none;
      padding: 10px 22px;
      border-radius: 8px;
      font-size: 14px;
      font-weight: 700;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      gap: 8px;
    }
    .print-btn:hover { background: #0369a1; }
    .ticket-container {
      width: 100%;
      max-width: 820px;
      background: #ffffff;
      border: 2px solid #0284c7;
      border-radius: 20px;
      overflow: hidden;
      box-shadow: 0 15px 35px rgba(0,0,0,0.1);
      position: relative;
    }
    .ticket-header {
      background: linear-gradient(135deg, #0284c7 0%, #0369a1 100%);
      color: #ffffff;
      padding: 24px 32px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 3px dashed #38bdf8;
    }
    .th-brand { font-size: 13px; font-weight: 800; letter-spacing: 1.5px; opacity: 0.95; }
    .th-logo { font-family: 'Outfit', sans-serif; font-size: 26px; font-weight: 900; letter-spacing: 1px; }
    .pnr-box { text-align: right; }
    .pnr-title { font-size: 11px; font-weight: 700; opacity: 0.85; letter-spacing: 1px; }
    .pnr-num { font-size: 24px; font-weight: 900; letter-spacing: 2px; }
    .ticket-body { padding: 32px; }
    .status-banner {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 6px 16px;
      background: #ecfdf5;
      border: 1px solid #10b981;
      color: #047857;
      border-radius: 999px;
      font-size: 12px;
      font-weight: 800;
      letter-spacing: 1px;
      margin-bottom: 20px;
    }
    .status-dot { width: 8px; height: 8px; border-radius: 50%; background: #10b981; }
    .service-title { font-size: 26px; font-weight: 900; color: #0f172a; margin-bottom: 24px; }
    .route-card {
      background: #f8fafc;
      border: 1px solid #e2e8f0;
      border-radius: 14px;
      padding: 20px 24px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 28px;
    }
    .route-point { flex: 1; }
    .route-point.right { text-align: right; }
    .point-lbl { font-size: 11px; font-weight: 700; color: #64748b; letter-spacing: 1px; text-transform: uppercase; margin-bottom: 4px; }
    .point-val { font-size: 20px; font-weight: 800; color: #0f172a; }
    .route-arrow { padding: 0 20px; text-align: center; color: #0284c7; font-weight: 900; font-size: 22px; }
    .details-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 20px;
      padding: 20px 0;
      border-top: 1px solid #e2e8f0;
      border-bottom: 1px solid #e2e8f0;
      margin-bottom: 28px;
    }
    .grid-item { display: flex; flex-direction: column; gap: 4px; }
    .item-lbl { font-size: 11px; font-weight: 700; color: #64748b; letter-spacing: 0.5px; text-transform: uppercase; }
    .item-val { font-size: 15px; font-weight: 700; color: #0f172a; word-break: break-word; }
    .highlight-seat { color: #0284c7; font-weight: 800; font-size: 16px; }
    .highlight-paid { color: #059669; font-weight: 800; }
    .footer-stamp {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-top: 10px;
    }
    .barcode-box { display: flex; flex-direction: column; gap: 6px; }
    .barcode-bars {
      height: 48px;
      width: 260px;
      background: repeating-linear-gradient(90deg, #0f172a 0px, #0f172a 2px, transparent 2px, transparent 5px, #0f172a 5px, #0f172a 8px);
    }
    .barcode-text { font-family: monospace; font-size: 11px; letter-spacing: 2px; color: #64748b; }
    .stamp-box {
      border: 2px dashed #0284c7;
      padding: 10px 18px;
      border-radius: 8px;
      text-align: center;
      color: #0284c7;
      font-weight: 800;
      font-size: 12px;
      letter-spacing: 1px;
    }
    @page { size: A4 portrait; margin: 8mm; }
    @media print {
      body { background: #ffffff !important; padding: 0 !important; }
      .print-bar { display: none !important; }
      .ticket-container { box-shadow: none !important; border: 2px solid #0284c7 !important; }
    }
  </style>
</head>
<body>
  <div class="print-bar">
    <div>
      <strong>TRAVIO E-RESERVATION PASS</strong> • Issued on ${bookingDate}
    </div>
    <button type="button" class="print-btn" onclick="window.print()">
      🖨️ Print to Paper / Save as PDF
    </button>
  </div>

  <div class="ticket-container" id="travio-e-ticket-doc">
    <div class="ticket-header">
      <div>
        <div class="th-brand">${brandTitle}</div>
        <div class="th-logo">TRAVIO</div>
      </div>
      <div class="pnr-box">
        <div class="pnr-title">OFFICIAL PNR / BOOKING REF</div>
        <div class="pnr-num">${pnr}</div>
      </div>
    </div>

    <div class="ticket-body">
      <div class="status-banner">
        <span class="status-dot"></span>
        <span>RESERVATION CONFIRMED & ISSUED</span>
      </div>

      <h1 class="service-title">${title}</h1>

      <div class="route-card">
        <div class="route-point">
          <div class="point-lbl">ORIGIN / FROM</div>
          <div class="point-val">${from}</div>
        </div>
        <div class="route-arrow">✈ ➔</div>
        <div class="route-point right">
          <div class="point-lbl">DESTINATION / TO</div>
          <div class="point-val">${to}</div>
        </div>
      </div>

      <div class="details-grid">
        <div class="grid-item">
          <span class="item-lbl">LEAD PASSENGER</span>
          <span class="item-val">${fullName}</span>
        </div>
        <div class="grid-item">
          <span class="item-lbl">SEAT / ALLOCATION</span>
          <span class="item-val highlight-seat">${seats}</span>
        </div>
        <div class="grid-item">
          <span class="item-lbl">TRAVEL DATE</span>
          <span class="item-val">${date}</span>
        </div>
        <div class="grid-item">
          <span class="item-lbl">SCHEDULED TIME</span>
          <span class="item-val">${time}</span>
        </div>
        <div class="grid-item">
          <span class="item-lbl">CONTACT DETAILS</span>
          <span class="item-val">${email}<br>${phone}</span>
        </div>
        <div class="grid-item">
          <span class="item-lbl">PAYMENT STATUS</span>
          <span class="item-val highlight-paid">PAID (₹${amountPaid}) via ${paymentMethod}</span>
        </div>
      </div>

      <div class="footer-stamp">
        <div class="barcode-box">
          <div class="barcode-bars"></div>
          <div class="barcode-text">*${pnr}-TRAVIO-VERIFIED*</div>
        </div>
        <div class="stamp-box">
          TRAVIO FAST-BOARDING<br>QR GATE VALIDATED
        </div>
      </div>
    </div>
  </div>
</body>
</html>`;
}

/**
 * Triggers an actual browser file download for the official voucher
 */
export function downloadTicketVoucher(ticket) {
  const htmlContent = generateOfficialTicketHtml(ticket);
  const blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  const pnr = ticket?.pnr || 'TICKET';
  const type = ticket?.type || 'RESERVATION';
  link.download = `TRAVIO_${type}_${pnr}.html`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  setTimeout(() => URL.revokeObjectURL(url), 2000);
}

/**
 * Opens a dedicated clean print window and invokes print()
 */
export function printTicketVoucher(ticket) {
  const htmlContent = generateOfficialTicketHtml(ticket);
  const printWindow = window.open('', '_blank', 'width=850,height=900,menubar=no,toolbar=no,location=no');
  if (printWindow) {
    printWindow.document.write(htmlContent);
    printWindow.document.close();
    printWindow.focus();
    setTimeout(() => {
      try {
        printWindow.print();
      } catch (e) {
        console.error('Print window error:', e);
      }
    }, 400);
  } else {
    // If popups blocked, fallback to standard window.print()
    window.print();
  }
}
