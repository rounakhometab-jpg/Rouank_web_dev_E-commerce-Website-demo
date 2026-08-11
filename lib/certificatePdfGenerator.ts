import { jsPDF } from 'jspdf';
import { Certificate } from './types';

export function generateCertificatePDF(cert: Certificate): void {
  // Create A4 Landscape PDF (297mm x 210mm)
  const doc = new jsPDF({
    orientation: 'landscape',
    unit: 'mm',
    format: 'a4'
  });

  const width = 297;
  const height = 210;

  // Background
  doc.setFillColor(10, 15, 30); // Dark Navy background
  doc.rect(0, 0, width, height, 'F');

  // Outer Gold Decorative Border
  doc.setDrawColor(217, 119, 6); // Gold / Amber
  doc.setLineWidth(2);
  doc.rect(8, 8, width - 16, height - 16, 'S');

  // Inner Fine Gold Border
  doc.setDrawColor(245, 158, 11);
  doc.setLineWidth(0.5);
  doc.rect(12, 12, width - 24, height - 24, 'S');

  // Corner Accents (Gold Rectangles)
  doc.setFillColor(217, 119, 6);
  doc.rect(10, 10, 10, 10, 'F');
  doc.rect(width - 20, 10, 10, 10, 'F');
  doc.rect(10, height - 20, 10, 10, 'F');
  doc.rect(width - 20, height - 20, 10, 10, 'F');

  // Header Title
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(22);
  doc.setTextColor(245, 158, 11); // Amber gold text
  doc.text('ZENFOTECH AI ACADEMY', width / 2, 32, { align: 'center' });

  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(148, 163, 184); // Slate 400
  doc.text('CENTER FOR ADVANCED AI RESEARCH & PROFESSIONAL CERTIFICATION', width / 2, 39, { align: 'center' });

  // Divider Line
  doc.setDrawColor(217, 119, 6);
  doc.setLineWidth(0.8);
  doc.line(60, 44, width - 60, 44);

  // Certificate Sub-header
  doc.setFontSize(24);
  doc.setFont('times', 'bold');
  doc.setTextColor(255, 255, 255);
  doc.text('CERTIFICATE OF ACCOMPLISHMENT', width / 2, 58, { align: 'center' });

  doc.setFontSize(12);
  doc.setFont('helvetica', 'italic');
  doc.setTextColor(203, 213, 225); // Slate 300
  doc.text('This is proudly presented and awarded to', width / 2, 70, { align: 'center' });

  // Student Name
  doc.setFontSize(30);
  doc.setFont('times', 'bold');
  doc.setTextColor(245, 158, 11); // Amber 400
  doc.text(cert.studentName.toUpperCase(), width / 2, 86, { align: 'center' });

  // Underline for Student Name
  doc.setDrawColor(217, 119, 6);
  doc.setLineWidth(0.5);
  const nameWidth = doc.getTextWidth(cert.studentName.toUpperCase());
  doc.line(width / 2 - nameWidth / 2 - 10, 89, width / 2 + nameWidth / 2 + 10, 89);

  // Body Text
  doc.setFontSize(12);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(226, 232, 240);
  doc.text(
    `for successfully fulfilling all academic curriculum requirements, practical evaluations, and passing the`,
    width / 2,
    100,
    { align: 'center' }
  );
  doc.text(`national final evaluation examination for the certification program:`, width / 2, 107, { align: 'center' });

  // Course Title
  doc.setFontSize(20);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(255, 255, 255);
  doc.text(cert.courseTitle, width / 2, 122, { align: 'center' });

  // Score Badge Text
  doc.setFontSize(11);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(52, 211, 153); // Emerald 400
  doc.text(`FINAL EVALUATION SCORE: ${cert.scorePercentage}% | EXCELLENCE DISTINCTION`, width / 2, 132, { align: 'center' });

  // Bottom Box - Verification & ID Info
  doc.setFillColor(15, 23, 42); // Slate 900
  doc.rect(20, 148, width - 40, 42, 'F');
  doc.setDrawColor(51, 65, 85);
  doc.rect(20, 148, width - 40, 42, 'S');

  // Left Column - Details
  doc.setFontSize(9);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(148, 163, 184);
  doc.text('CERTIFICATE DETAILS', 28, 157);

  doc.setFont('helvetica', 'normal');
  doc.setTextColor(226, 232, 240);
  doc.text(`Certificate ID: ${cert.id}`, 28, 164);
  doc.text(`Issue Date: ${cert.issueDate}`, 28, 171);
  doc.text(`Status: ${cert.status.toUpperCase()}`, 28, 178);

  // Right Column - Verification URL & QR Info
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(148, 163, 184);
  doc.text('OFFICIAL VERIFICATION', width - 110, 157);

  doc.setFont('helvetica', 'normal');
  doc.setTextColor(245, 158, 11);
  doc.text(`Verify Online: ${cert.verificationUrl}/${cert.id}`, width - 110, 164);

  doc.setFontSize(8);
  doc.setTextColor(148, 163, 184);
  doc.text('This digital credential is cryptographically verified and tamper-proof.', width - 110, 172);

  // Signatures
  doc.setDrawColor(148, 163, 184);
  doc.setLineWidth(0.3);
  doc.line(width / 2 - 35, 176, width / 2 + 35, 176);

  doc.setFontSize(9);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(255, 255, 255);
  doc.text('Academic Director', width / 2, 181, { align: 'center' });
  doc.setFontSize(8);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(148, 163, 184);
  doc.text('Zenfotech AI Academy Evaluation Board', width / 2, 186, { align: 'center' });

  // Save PDF file
  const fileName = `Zenfotech_Certificate_${cert.id}.pdf`;
  doc.save(fileName);
}
