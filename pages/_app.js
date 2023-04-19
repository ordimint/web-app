import '../public/index.css'
import '../public/font.css'
import '../public/theme.css'
import { SSRProvider } from 'react-bootstrap';
import Header from '../components/Header.js';
import Head from 'next/head';


export default function MyApp({ Component, pageProps }) {
    return (
        <div>
            <Head>
                <meta property="og:title" content="Ordimint - A website to mint, receive, store or send your Ordinals" />
                <meta property="og:type" content="website" />
                <meta property="og:image" content="https://ordimint.com/logo.png" />
                <meta property="og:description" content="A website to mint, receive, store or send your Ordinals" />

                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="Ordimint - A website to mint, receive, store or send your Ordinals" />
                <meta name="twitter:description" content="A website to mint, receive, store or send your Ordinals" />
                <meta name="twitter:image" content="https://ordimint.com/logo.png" />
            </Head>

            <Header />
            <SSRProvider>
                <Component {...pageProps} />
            </SSRProvider>
        </div>
    )
}
