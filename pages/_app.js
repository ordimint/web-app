import '../public/index.css'
import '../public/font.css'
import '../public/theme.css'
import { SSRProvider } from 'react-bootstrap';
import Header from '../components/Header.js';
import Head from 'next/head';


export default function MyApp({ Component, pageProps }) {
    return (
        <div>
            <Header />
            <SSRProvider>
                <Component {...pageProps} />
            </SSRProvider>
        </div>
    )
}
