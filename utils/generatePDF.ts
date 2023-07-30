import jsPDF from 'jspdf';

interface Service {
  id: number;
  sub_service_name: string;
  starting_price: number;
}

const generatePDF = (selectedServices: Service[]) => {
  const pdf = new jsPDF();

  // Add content to the PDF
  let yPosition = 20;
  selectedServices.forEach((service) => {
    pdf.text(service.sub_service_name, 20, yPosition);
    pdf.text(`Rs ${service.starting_price.toString()}`, 80, yPosition); // Convert number to string
    yPosition += 10;
  });

  // Save the PDF as a file
  pdf.save('selected_services.pdf');
};

export default generatePDF;
