import Document, { Html, Head, Main, NextScript } from 'next/document'
import { Favicon } from 'seo/Favicon'

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <Favicon />
          <link
            href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500;1,600;1,700&display=swap"
            rel="stylesheet"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
