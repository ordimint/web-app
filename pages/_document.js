import { Html, Head, Main, NextScript } from 'next/document';
import Script from 'next/script'

export default function MyDocument() {
    return (
        <Html>
            <Head>
                <meta charSet="utf-8" />
                <link rel="shortcut icon" href="/favicon.ico" />
                <meta name="theme-color" content="#000000" />
                <link rel="apple-touch-icon" href="/favicon.ico" />
                <link rel="manifest" href="/manifest.json" />

                <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
                <title>Ordimint - Bitcoin Ordinals Minting & Integrated Wallet</title>

                {/* Social media tags for Facebook (Open Graph) */}
                <meta property="og:title" content="Ordimint - Bitcoin Ordinals Minting Service & Integrated Wallet" />
                <meta property="og:description" content="Easily mint Bitcoin Ordinals and securely manage your assets with Ordimint's integrated wallet featuring Ledger and Alby integration." />
                <meta property="og:image" content="https://ordimint.com/logo-dark.jpeg" />
                <meta property="og:url" content="https://ordimint.com" />
                <meta property="og:type" content="website" />
                <meta property="og:site_name" content="Ordimint" />

                {/* Social media tags for Twitter (Twitter Cards) */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="Ordimint - Bitcoin Ordinals Minting Service & Integrated Wallet" />
                <meta name="twitter:description" content="Easily mint Bitcoin Ordinals and securely manage your assets with Ordimint's integrated wallet featuring Ledger and Alby integration." />
                <meta name="twitter:image" content="https://ordimint.com/logo-dark.jpeg" />
                <meta name="twitter:site" content="@ordimint" />
                <meta name="twitter:creator" content="@ordimint" />
                <meta name="keywords" content="Bitcoin, Ordinals, Minting, Inscription, Wallet, Integrated, Ledger, Alby, Digital Artefacts" />


                <Script src='/jquery-3.6.0.min.js'></Script>
                <Script src='/bootstrap.bundle.min.js'></Script>
            </Head>

            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    )
}