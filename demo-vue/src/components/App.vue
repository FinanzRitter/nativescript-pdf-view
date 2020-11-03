<template>
<Page>
  <ActionBar title="Show Another!" @tap="changePdf" />
  <GridLayout columns="*" rows="*">
    <PDFView :src="pdfUrl" row="0" col="0" :enableAnnotationRendering="true" />
  </GridLayout>
</Page>
</template>

<script lang="ts">
export default {
  data() {
    return {
      currentPdf: 0,
      pdfUrls: [
        'https://www.princexml.com/samples/flyer/flyer.pdf',
        'https://www.princexml.com/howcome/2016/samples/magic8/index.pdf',
        'https://www.princexml.com/samples/invoice/invoicesample.pdf',
      ],
    }
  },
  computed: {
    pdfUrl() {
      return this.pdfUrls[this.currentPdf % this.pdfUrls.length];
    },
  },
  methods: {
    changePdf() {
      this.currentPdf += 1
      console.log('ABC ' + this.pdfUrl)
    }
  },
}
</script>

<style scoped>
  ActionBar {
    background-color: #53ba82;
    color: #ffffff;
  }

  .message {
    vertical-align: center;
    text-align: center;
    font-size: 20;
    color: #333333;
  }
</style>
