import PDFDocumentViewer from '@/components/PDFViewer';

export default function Sample() {
    const file = './bllc.pdf';

    return (
        <PDFDocumentViewer file={file} />
    );
}
