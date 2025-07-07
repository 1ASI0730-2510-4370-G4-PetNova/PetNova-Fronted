import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

export function generatePetHistoryPDF(petInfo, historyData) {
    const doc = new jsPDF('p', 'pt', 'a4');
    const darkGray = 50;
    const lightGray = 230;
    const pageWidth = doc.internal.pageSize.getWidth();

    // luciana's comment: Generates the PDF header with clinic name and a horizontal line
    function header() {
        doc.setFontSize(14);
        doc.setTextColor(darkGray);
        doc.setFont('times', 'bold');
        doc.text('Pet Nova Veterinary', 40, 40);
        doc.setDrawColor(darkGray);
        doc.setLineWidth(0.5);
        doc.line(40, 45, pageWidth - 40, 45);
    }

    // luciana's comment: Adds a footer with the page number and a horizontal line
    function footer() {
        const str = `Page ${doc.internal.getNumberOfPages()}`;
        doc.setFontSize(10);
        doc.setTextColor(darkGray);
        doc.setFont('times', 'normal');
        doc.text(str, pageWidth - 60, doc.internal.pageSize.getHeight() - 30);
        doc.setDrawColor(darkGray);
        doc.setLineWidth(0.5);
        doc.line(40, doc.internal.pageSize.getHeight() - 40, pageWidth - 40, doc.internal.pageSize.getHeight() - 40);
    }

    // luciana's comment: Start by drawing the header
    header();

    const body = [];

    // luciana's comment: Add the main title of the report
    body.push([
        { content: 'PET MEDICAL HISTORY REPORT', colSpan: 4, styles: { halign: 'center', fillColor: lightGray, fontStyle: 'bold', fontSize: 16, cellPadding: 10 } }
    ]);

    // luciana's comment: Add an introductory paragraph explaining the purpose of the report
    const introText = `This document is an official record of the medical history of the pet listed below. It contains details about clinical management, preventive care, and observations registered by Pet Nova Veterinary professionals. All information is confidential and intended for veterinary use only.`;

    body.push([
        { content: introText, colSpan: 4, styles: { fontSize: 11, cellPadding: 8, halign: 'justify', textColor: darkGray } }
    ]);

    // luciana's comment: Add a separating line
    body.push([
        { content: '', colSpan: 4, styles: { lineWidth: 0.5, lineColor: darkGray, cellPadding: 0, minCellHeight: 12 } }
    ]);

    // luciana's comment: Add general information about the pet and owner
    const generalRows = [
        ['Pet Name', petInfo.petName || '-', 'Owner Name', petInfo.ownerName || '-'],
        ['Species', petInfo.petSpecies || '-', 'Breed', petInfo.petBreed || '-'],
        ['Age', petInfo.petAge || '-', 'Sex', petInfo.petSex || '-'],
        ['Microchip ID', petInfo.microchipId || '-', 'Report Date', petInfo.reportDate || '-'],
    ];
    generalRows.forEach(row => {
        body.push([
            { content: row[0], styles: { fillColor: lightGray, fontStyle: 'bold', cellPadding: 6 } },
            { content: row[1], styles: { cellPadding: 6 } },
            { content: row[2], styles: { fillColor: lightGray, fontStyle: 'bold', cellPadding: 6 } },
            { content: row[3], styles: { cellPadding: 6 } },
        ]);
    });

    // luciana's comment: Add veterinarian and clinic contact information
    body.push([
        { content: 'Veterinarian Name', styles: { fillColor: lightGray, fontStyle: 'bold', cellPadding: 6 } },
        { content: petInfo.vetName || '-', styles: { cellPadding: 6 } },
        { content: 'Clinic Contact', styles: { fillColor: lightGray, fontStyle: 'bold', cellPadding: 6 } },
        { content: petInfo.vetContact || '-', styles: { cellPadding: 6 } },
    ]);

    // luciana's comment: Add another separating line
    body.push([
        { content: '', colSpan: 4, styles: { lineWidth: 0.5, lineColor: darkGray, cellPadding: 0, minCellHeight: 12 } }
    ]);

    // luciana's comment: Add section title for medical history
    body.push([
        { content: 'Medical History Timeline', colSpan: 4, styles: { halign: 'center', fillColor: lightGray, fontStyle: 'bold', fontSize: 14, cellPadding: 8 } }
    ]);

    // luciana's comment: Add table header for history entries
    body.push([
        { content: '#', styles: { fillColor: lightGray, fontStyle: 'bold', halign: 'center', cellPadding: 6 } },
        { content: 'Date', styles: { fillColor: lightGray, fontStyle: 'bold', halign: 'center', cellPadding: 6 } },
        { content: 'Type', styles: { fillColor: lightGray, fontStyle: 'bold', halign: 'center', cellPadding: 6 } },
        { content: 'Description', styles: { fillColor: lightGray, fontStyle: 'bold', halign: 'center', cellPadding: 6 } },
    ]);

    const maxEntries = 14;

    // luciana's comment: Fill history data or show placeholders if fewer than 14 entries
    for (let i = 0; i < maxEntries; i++) {
        if (i < historyData.length) {
            const entry = historyData[i];
            body.push([
                { content: String(i + 1), styles: { cellPadding: 6, halign: 'center' } },
                { content: entry.date || '-', styles: { cellPadding: 6, halign: 'center' } },
                { content: entry.type || '-', styles: { cellPadding: 6, halign: 'center' } },
                { content: entry.description || '-', styles: { cellPadding: 6, halign: 'left' } },
            ]);
        } else {
            body.push([
                { content: String(i + 1), styles: { cellPadding: 6, halign: 'center', textColor: 220 } },
                { content: '-', styles: { cellPadding: 6, halign: 'center', textColor: 220 } },
                { content: '-', styles: { cellPadding: 6, halign: 'center', textColor: 220 } },
                { content: '-', styles: { cellPadding: 6, halign: 'left', textColor: 220 } },
            ]);
        }
    }
    body.push([
        { content: '', colSpan: 4, styles: { minCellHeight: 20 } }
    ]);

    // luciana's comment: Add observations section
    body.push([
        { content: 'General Observations:', colSpan: 4, styles: { fillColor: lightGray, fontStyle: 'bold', cellPadding: 6 } }
    ]);
    body.push([
        { content: petInfo.generalObservations || 'No observations recorded.', colSpan: 4, styles: { cellPadding: 8, fontSize: 11, halign: 'justify' } }
    ]);

    // luciana's comment: Render the full table with header/footer on each page
    autoTable(doc, {
        startY: 60,
        theme: 'grid',
        styles: {
            font: 'times',
            fontSize: 11,
            textColor: darkGray,
            lineColor: darkGray,
            lineWidth: 0.5,
            overflow: 'linebreak',
            cellPadding: 2,
        },
        body: body,
        margin: { left: 40, right: 40 },
        didDrawPage: (data) => {
            header();
            footer();
        }
    });

    // luciana's comment: Save the generated PDF with a dynamic filename
    doc.save(`${petInfo.petName || 'pet'}_medical_history.pdf`);
}
