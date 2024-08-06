'use client';

import { useState } from 'react';
import { pdfjs, Document, Page } from 'react-pdf';
import 'react-pdf/dist/esm/Page/TextLayer.css';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import type { PDFDocumentProxy } from 'pdfjs-dist';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    'pdfjs-dist/build/pdf.worker.min.mjs',
    import.meta.url,
).toString();

type PDFFile = string | File | null;

export default function Sample() {
    const [file, setFile] = useState<PDFFile>('./fwzn.pdf');
    const [numPages, setNumPages] = useState<number>();
    const [scale, setScale] = useState(1.5);

    function onDocumentLoadSuccess({ numPages: nextNumPages }: PDFDocumentProxy): void {
        setNumPages(nextNumPages);
    }

    return (
        <Document className="flex flex-col items-center" file={file} onLoadSuccess={onDocumentLoadSuccess} >
            {Array.from(new Array(numPages), (el, index) => (
                <Page
                    key={`page_${index + 1}`}
                    pageNumber={index + 1}
                    className="w-md mb-8 shadow-xl rounded overflow-hidden"
                    scale={scale}
                />
            ))}
        </Document>
    );
}