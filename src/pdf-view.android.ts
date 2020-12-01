/// <reference path="./AndroidPdfViewer.d.ts" />
import pdfviewer = com.github.barteksc.pdfviewer;
import { Http, knownFolders } from '@nativescript/core';

import { PDFViewCommon, srcProperty } from './pdf-view.common';

@NativeClass
class PDFViewSubclass extends pdfviewer.PDFView {
    static constructorCalled: boolean = false;
    private uri: globalAndroid.net.Uri;
    private enableAnnotationRendering: boolean;
    private onLoadHandler: any;
    constructor(a, b) {
        super(a, b);
        PDFViewSubclass.constructorCalled = true;

        // necessary when extending TypeScript constructors
        return global.__native(this);
    }
    public setUri(uri: globalAndroid.net.Uri) {
      this.uri = uri;
    }

    public setEnableAnnotationRendering(enable: boolean) {
      this.enableAnnotationRendering = enable;
    }

    public setOnLoadHandler(func) {
      this.onLoadHandler = func;
    }

    public drawPdf(): void {
      if (this.uri != null) {
        const defaultSpacingDP = 8;
        this
          .fromUri(this.uri)
          .onLoad(this.onLoadHandler)
          .spacing(defaultSpacingDP)
          .enableAnnotationRendering(this.enableAnnotationRendering)
          .fitEachPage(true)
          .load();
      }
    }


    // mimics the usage of AndroidPdfView and the onAttachedToWindow method in react-native-pdf at
    // https://github.com/wonday/react-native-pdf/blob/master/android/src/main/java/org/wonday/pdf/PdfView.java#L207-L211
    public onAttachedToWindow(): void {
      super.onAttachedToWindow();
      if (this.isRecycled()) {
        this.drawPdf();
      }
    }
}


export class PDFView extends PDFViewCommon {
  private promise: Promise<void>;
  private tempFolder = knownFolders.temp().getFolder('PDFViewer.temp/');

  private onLoadHandler = (() => {
    const pdfViewRef = new WeakRef(this);

    return new pdfviewer.listener.OnLoadCompleteListener({
      loadComplete: numPages => {
        PDFViewCommon.notifyOfEvent(PDFViewCommon.loadEvent, pdfViewRef);
      },
    });
  })();

  public get android() {
    return this.nativeView as PDFViewSubclass;
  }

  public set android(value) {
    this.nativeView = value;
  }

  public createNativeView() {
    return new PDFViewSubclass(this._context, void 0);
  }

  public [srcProperty.setNative](value: string) {
    this.loadPDF(value);
  }

  public loadPDF(src: string) {
    if (!src || !this.android) {
      return;
    }

    // reset any previous promise since we've called loadPDF again
    this.promise = void 0;

    if (src.indexOf('://') === -1) {
      src = 'file://' + src;
    } else if (src.indexOf('file://') !== 0) {
      // AndroidPdfViewer cannot load from remote URLs, download to cache
      this.cacheThenLoad(src);
      return;
    }

    const uri = android.net.Uri.parse(src);

    this.android.setUri(uri);
    this.android.setEnableAnnotationRendering(this.enableAnnotationRendering);
    this.android.setOnLoadHandler(this.onLoadHandler);
    this.android.drawPdf();
  }

  private cacheThenLoad(url: string) {
    // clear everything in cache
    this.tempFolder.clear().then(() => {

      // download to cache
      const promise = this.promise = Http
        .getFile(url, `${this.tempFolder.path}/${Date.now()}.pdf`)
        .then(file => {
          if (this.promise === promise) {  // make sure we haven't switched
            this.loadPDF(file.path);
          }
        }).catch(error => {
          console.error(error);
        });
    });
  }
}
