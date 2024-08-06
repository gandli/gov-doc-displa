import PDFDocumentViewer from '@/components/PDFViewer';

export default function Sample() {
    const file = './fwzn.pdf'; 

    return (
        <PDFDocumentViewer file={file} />
    );
}
