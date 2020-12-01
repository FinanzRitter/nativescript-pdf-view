# NativeScript PDFView

[![npm](https://img.shields.io/npm/v/@finanzritter/nativescript-pdf-view.svg)](https://www.npmjs.com/package/@finanzritter/nativescript-pdf-view)
[![npm](https://img.shields.io/npm/dt/@finanzritter/nativescript-pdf-view.svg?label=npm%20downloads)](https://www.npmjs.com/package/@finanzritter/nativescript-pdf-view)

:construction: **Work in progress**

This package was forked from the unmaintained package
[madmas/nativescript-pdf-view](https://github.com/madmas/nativescript-pdf-view) which in turn is a
fork of [Merott/nativescript-pdf-view](https://github.com/Merott/nativescript-pdf-view). We are
currently cleaning up and updating the code.

---

A minimal PDF view implementation that does only one thing, and that is to display PDF files in the simplest way possible. It conveniently uses the iOS `WKWebView`, and for Android it uses [`AndroidPdfViewer`](https://github.com/barteksc/AndroidPdfViewer).

This plugin does the bare minimum required to render the PDF, no configuration options, and no error handling have been built yet. I welcome all Pull Requests!

My aim is to keep the features consistent across iOS and Android.

## Installation

```
tns plugin add @finanzritter/nativescript-pdf-view
```

## Usage

### Vanilla NativeScript

```xml
<Page
  xmlns="http://schemas.nativescript.org/tns.xsd"
  xmlns:pdf="@finanzritter/nativescript-pdf-view"
  loaded="pageLoaded">
  <pdf:PDFView src="{{ pdfUrl }}" load="{{ onLoad }}" />
</Page>
```

### Angular NativeScript

```ts
import { PDFView } from '@finanzritter/nativescript-pdf-view';
import { registerElement } from 'nativescript-angular';
registerElement('PDFView', () => PDFView);
```

```html
<PDFView [src]="src" (load)="onLoad()"></PDFView>
```

### Vue.js NativeScript

```ts
import Vue from 'nativescript-vue';
Vue.registerElement('PDFView', () => require('@finanzritter/nativescript-pdf-view').PDFView)
```

```html
<PDFView :src="pdfUrl" :enableAnnotationRendering="true" />
```

## Demo

Check out the [demo](./demo) folder for a demo application using this plugin. You can run the demo by executing `npm run demo.ios` and `npm run demo.android` from the root directory of the project.

## Demo Vue

Check out the [demo-vue](./demo-vue) folder for a demo application built with Vue.js using this plugin. You can run the demo by executing `npm run demo-vue.ios` and `npm run demo-vue.android` from the root directory of the project.

## Credits

- **@Merott**: for being the original author of this plugin [Merott/nativescript-pdf-view](https://github.com/Merott/nativescript-pdf-view)
- **@madmas**: for maintaining it [madmas/nativescript-pdf-view](https://github.com/madmas/nativescript-pdf-view)
