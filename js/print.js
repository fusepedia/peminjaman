// ============================================================
// PRINT.JS - Print / PDF Generation
// ============================================================

function printBukti() {
  const printArea = document.getElementById("print-area");
  if (!printArea) {
    showToast("Preview belum dibuat", "error");
    return;
  }

  // Create print window with the preview content
  const printContent = `
    <!DOCTYPE html>
    <html lang="id">
    <head>
      <meta charset="UTF-8">
      <title>Bukti Peminjaman - BPVP Sorong</title>
      <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          color: #111;
          padding: 20px;
          font-size: 11pt;
          line-height: 1.5;
        }
        
        .preview-header {
          text-align: center;
          padding-bottom: 12px;
          border-bottom: 3px double #333;
          margin-bottom: 16px;
        }
        
        .preview-header h2 {
          font-size: 13pt;
          font-weight: 700;
          color: #111;
          text-transform: uppercase;
        }
        
        .preview-header h3 {
          font-size: 11pt;
          font-weight: 600;
          color: #333;
          margin-top: 4px;
        }
        
        .preview-header p {
          font-size: 9pt;
          color: #666;
        }
        
        .preview-info {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 8px;
          margin-bottom: 16px;
        }
        
        .preview-info-item {
          display: flex;
          gap: 8px;
          font-size: 10pt;
        }
        
        .preview-info-label {
          color: #666;
          min-width: 110px;
          font-weight: 500;
        }
        
        .preview-info-value {
          color: #111;
          font-weight: 600;
        }
        
        .preview-table {
          width: 100%;
          border-collapse: collapse;
          font-size: 9.5pt;
          margin-bottom: 16px;
        }
        
        .preview-table th {
          background: #f0f0f0 !important;
          -webkit-print-color-adjust: exact;
          print-color-adjust: exact;
          padding: 6px 8px;
          text-align: left;
          font-weight: 600;
          border: 1px solid #ccc;
          font-size: 9pt;
          color: #333;
        }
        
        .preview-table td {
          padding: 5px 8px;
          border: 1px solid #ccc;
          color: #333;
        }
        
        .preview-signatures {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
          margin-top: 40px;
          text-align: center;
        }
        
        .preview-signature-item p {
          font-size: 10pt;
          color: #333;
        }
        
        .preview-signature-line {
          height: 70px;
          border-bottom: 1px solid #333;
          margin: 12px 24px;
        }
        
        .preview-signature-name {
          font-weight: 600;
          font-size: 10pt;
          color: #111;
        }
        
        hr {
          border: 1px solid #333;
          margin: 8px 0;
        }
        
        ol {
          padding-left: 20px;
        }
        
        ol li {
          margin-bottom: 3px;
          font-size: 9.5pt;
        }
        
        @media print {
          body { padding: 0; }
          @page { margin: 15mm; }
        }
      </style>
    </head>
    <body>
      ${printArea.innerHTML}
      <script>
        window.onload = function() {
          setTimeout(function() {
            window.print();
          }, 300);
        };
      <\/script>
    </body>
    </html>
  `;

  const printWindow = window.open("", "_blank");
  if (printWindow) {
    printWindow.document.write(printContent);
    printWindow.document.close();
  } else {
    showToast("Popup terblokir. Izinkan popup untuk mencetak.", "error");
  }
}
