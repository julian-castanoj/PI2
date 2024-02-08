import React, { useState, useEffect } from 'react';
import { Document, Page } from 'react-pdf';

const Reportes = () => {
  const [data, setData] = useState([]);
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://tu-api.com/tu-endpoint');
        const dataFromAPI = await response.json();
        setData(dataFromAPI);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  return (
    <div>
      <h1>Información en PDF</h1>
      <div style={{ width: '600px' }}>
        <Document file={{ data: data, }}
          onLoadSuccess={onDocumentLoadSuccess}>
          <Page pageNumber={pageNumber} />
        </Document>
        <p>
          Página {pageNumber} de {numPages}
        </p>
        <button
          onClick={() => setPageNumber(pageNumber - 1)}
          disabled={pageNumber <= 1}
        >
          Anterior
        </button>
        <button
          onClick={() => setPageNumber(pageNumber + 1)}
          disabled={pageNumber >= numPages}
        >
          Siguiente
        </button>
        <button
          onClick={() => {
            // Descargar el PDF
            const pdfData = new Blob([data], { type: 'application/pdf' });
            const pdfUrl = URL.createObjectURL(pdfData);
            const a = document.createElement('a');
            a.href = pdfUrl;
            a.download = 'archivo.pdf';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
          }}
        >
          Descargar
        </button>
      </div>
    </div>
  );
};

export default Reportes;
