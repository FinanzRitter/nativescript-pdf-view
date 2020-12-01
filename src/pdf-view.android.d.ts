/// <reference types="androidpdfviewer" />
import pdfviewer = com.github.barteksc.pdfviewer;
import { PDFViewCommon } from './pdf-view.common';
declare class PDFViewSubclass extends pdfviewer.PDFView {
    static constructorCalled: boolean;
    private uri;
    constructor(a: any, b: any);
    setUri(uri: globalAndroid.net.Uri): void;
    drawPdf(): void;
    onAttachedToWindow(): void;
}
export declare class PDFView extends PDFViewCommon {
    private promise;
    private tempFolder;
    private onLoadHandler;
    get android(): PDFViewSubclass;
    set android(value: PDFViewSubclass);
    createNativeView(): PDFViewSubclass;
    loadPDF(src: string): void;
    private cacheThenLoad;
}
export {};
