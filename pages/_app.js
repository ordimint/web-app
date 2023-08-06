import '../public/index.css'
import '../public/font.css'
import '../public/theme.css'

import { SSRProvider } from 'react-bootstrap';
import Header from '../components/Header.js';
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { TestnetProvider } from '../contexts/TestnetContext.js'
import Footer from '../components/Footer';

export default function MyApp({ Component, pageProps }) {
    const router = useRouter()
    const GA_ID = process.env.REACT_APP_GA_ID;

    useEffect(() => {
        if (!GA_ID) return;

        const handleRouteChange = (url) => {
            window.gtag('config', GA_ID, {
                page_path: url,
            })
        }

        router.events.on('routeChangeComplete', handleRouteChange)

        return () => {
            router.events.off('routeChangeComplete', handleRouteChange)
        }
    }, [router.events])

    return (
        <div className='app_bg'>
            <Header />
            <SSRProvider>
                <TestnetProvider>
                    <div style={{ minHeight: "100vh", }}>
                        <Component {...pageProps} />
                    </div>
                </TestnetProvider>
            </SSRProvider>
            <Footer />
        </div>
    )
}
