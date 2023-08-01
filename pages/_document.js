import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
    static async getInitialProps(ctx) {
        const initialProps = await Document.getInitialProps(ctx)
        return { ...initialProps }
    }

    render() {
        const GA_ID = process.env.REACT_APP_GA_ID; // Get Google Analytics ID

        return (
            <Html>
                <Head>
                    <meta charSet="utf-8" />
                    <link rel="shortcut icon" href="/favicon.ico" />
                    <meta name="theme-color" content="#000000" />
                    <link rel="apple-touch-icon" href="/favicon.ico" />
                    <link rel="manifest" href="/manifest.json" />
                    <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
                    {/* <script src='/jquery-3.6.0.min.js'></script>
                    <script src='/bootstrap.bundle.min.js'></script> */}

                    {GA_ID && (
                        <>
                            <script async src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} />

                            <script
                                dangerouslySetInnerHTML={{
                                    __html: `
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());

                    gtag('config', '${GA_ID}');
                  `,
                                }}
                            />
                        </>
                    )}
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
