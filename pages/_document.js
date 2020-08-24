import Document, { Head, Main, NextScript } from 'next/document'
import React from "react";

export default class MyDocument extends Document {
    render() {
    return (
      <html>
        <Head />
        <body>
          <Main />
          {/* Here we will mount our portal */}
          <div id="root" />
          <NextScript />
        </body>
      </html>
    )
  }
}

