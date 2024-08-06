'use client';

import { useState } from 'react';
import { pdfjs, Document, Page } from 'react-pdf';

import type { PDFDocumentProxy } from 'pdfjs-dist';
type PDFFile = string | File | null;

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    'pdfjs-dist/build/pdf.worker.min.mjs',
    import.meta.url,
).toString();

export default function PublicDisclosure() {
    const [numPages, setNumPages] = useState<number>();
    const [scale, setScale] = useState(1.5);
    const file: PDFFile = './fwzn.pdf'

    function onDocumentLoadSuccess({ numPages: nextNumPages }: PDFDocumentProxy): void {
        setNumPages(nextNumPages);
    }

    return (
        <div className="flex justify-center px-4 py-8">
            <div className="w-full max-w-6xl">
                <Document
                    className="flex flex-col items-center"
                    file={file}
                    onLoadSuccess={onDocumentLoadSuccess}
                >
                    {Array.from(new Array(numPages), (el, index) => (
                        <Page
                            key={`page_${index + 1}`}
                            pageNumber={index + 1}
                            scale={scale}
                            className="mb-8 shadow-xl rounded overflow-hidden"
                            renderTextLayer={false}
                            renderAnnotationLayer={false}
                        />
                    ))}
                </Document>
            </div>
        </div>
    );
}