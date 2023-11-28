import React from 'react'
import { Container, Row, Col, Card } from 'react-bootstrap';
import OrdinalGrid from '../components/OrdinalExplorer/OrdinalGrid';
import TagCloud from '../components/OrdinalExplorer/TagCloud';
import Head from 'next/head';
import { useState } from 'react';


export async function getServerSideProps(context) {
    const explorerURL = process.env.REACT_APP_MAINNET_URL;

    try {
        const response = await fetch(`${explorerURL}/inscriptions`, {
            headers: {
                'Accept': 'application/json'
            }

        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        if (response.headers.get('content-type').includes('application/json')) {
            const data = await response.json();
            return {
                props: { inscriptionsList: data.inscriptions }, // Will be passed to the page component as props
            };
        } else {
            return {
                props: {},
            };
        }
    } catch (error) {
        console.error('Fetch error:', error);
        return {
            props: {},
        };
    }
}


// Explorer component
const explorer = ({ inscriptionsList }) => {

    const [ordinals, setOrdinals] = useState(inscriptionsList);
    const [selectedTags, setSelectedTags] = useState([]);
    return (
        <div>
            <Head>
                <title>Ordimint - Ordinals Explorer</title>
                <meta name="description" content="Explore Ordimint's comprehensive and searchable database of Bitcoin Ordinal Collections, showcasing Ordinals and their inscriptions in one convenient location." />
                <meta name="keywords" content="Bitcoin, Ordinals, Collections,Inscriptions, Searchable, Digital Assets, Inscriptions, NFT" />
                <meta property="og:title" content="Ordimint - A website to mint, receive, store or send your Ordinals" />
                <meta property="og:type" content="website" />
                <meta property="og:image" content="https://ordimint.com/Ordimint-Twitter-card.svg" />
                <meta property="og:description" content="A website to mint, receive, store or send your Ordinals. View all new Ordinal Collections, Inscribe or use our wallet." />

                <meta name="twitter:card" content="https://ordimint.com/Ordimint-Twitter-card.svg" />
                <meta name="twitter:title" content="Ordimint - A website to mint, receive, store or send your Ordinals" />
                <meta name="twitter:description" content="A website to mint, receive, store or send your Ordinals" />
                <meta name="twitter:image" content="https://ordimint.com/Ordimint-Twitter-card.svg" />
            </Head>
            <div className="main-middle">
                <h1 className='m-4'>Latest Inscriptions</h1>

                <Container fluid>
                    {/* <TagCloud selectedTags={selectedTags} setSelectedTags={setSelectedTags} /> */}

                    <OrdinalGrid ordinals={ordinals} />
                </Container>



            </div>
        </div >)

}


export default explorer
