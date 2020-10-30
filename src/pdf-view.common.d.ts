import { Property, View } from '@nativescript/core';
export declare abstract class PDFViewCommon extends View {
    static loadEvent: string;
    enableAnnotationRendering: boolean;
    src: string;
    static notifyOfEvent(eventName: string, pdfViewRef: WeakRef<PDFViewCommon>): void;
}
export declare const enableAnnotationRenderingProperty: Property<PDFViewCommon, boolean>;
export declare const srcProperty: Property<PDFViewCommon, string>;
