import { Property, View } from '@nativescript/core';

export abstract class PDFViewCommon extends View {
  public static loadEvent = 'load';

  /**
   * Render annotations (such as comments, colors or forms) on Android
   */
  public enableAnnotationRendering: boolean;

  /**
   * the source url of the PDF to show
   */
  public src: string;

  public static notifyOfEvent(
    eventName: string,
    pdfViewRef: WeakRef<PDFViewCommon>,
  ) {
    const viewer = pdfViewRef.get();

    if (viewer) {
      viewer.notify({ eventName, object: viewer });
    }
  }
}

export const enableAnnotationRenderingProperty = new Property<PDFViewCommon, boolean>({
  defaultValue: false,
  name: 'enableAnnotationRendering',
});
enableAnnotationRenderingProperty.register(PDFViewCommon);

export const srcProperty = new Property<PDFViewCommon, string>({
  name: 'src',
});
srcProperty.register(PDFViewCommon);
