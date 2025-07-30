import Papa from 'papaparse';


export function exportCampaignsToCSV(data: any[], filenamePrefix = 'campaigns_report') {
  const csv = Papa.unparse(data);
  const now = new Date();
  const dateStr = now.toISOString().slice(0, 10) + '_' + now.toTimeString().slice(0,5).replace(':','');
  const filename = `${filenamePrefix}_${dateStr}.csv`;
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.setAttribute('download', filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

export async function exportCampaignsToPDF(tableElement: HTMLElement, filenamePrefix = 'campaigns_report') {
  const now = new Date();
  const dateStr = now.toISOString().slice(0, 10) + '_' + now.toTimeString().slice(0,5).replace(':','');
  const filename = `${filenamePrefix}_${dateStr}.pdf`;

  // Dynamically import html2canvas and jspdf
  const html2canvas = (await import('html2canvas')).default;
  const jsPDF = (await import('jspdf')).default;

  // Render table to canvas
  const canvas = await html2canvas(tableElement, { scale: 2 });
  const imgData = canvas.toDataURL('image/png');

  // Create PDF
  const pdf = new jsPDF({ orientation: 'landscape', unit: 'pt', format: 'a4' });
  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();

  // Branding
  pdf.setFontSize(18);
  pdf.text('Luminous Stats – Campaign Report', 40, 40);
  pdf.setFontSize(12);
  pdf.text(`Exported: ${now.toLocaleString()}`, 40, 60);

  // Table image
  const imgProps = {
    x: 40,
    y: 80,
    width: pageWidth - 80,
    height: (canvas.height * (pageWidth - 80)) / canvas.width,
  };
  pdf.addImage(imgData, 'PNG', imgProps.x, imgProps.y, imgProps.width, imgProps.height);

  pdf.save(filename);
}