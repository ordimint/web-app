import React from 'react'
import { Container, Row, Col, Card } from 'react-bootstrap';
import OrdinalGrid from '../components/OrdinalExplorer/OrdinalGrid';
import TagCloud from '../components/OrdinalExplorer/TagCloud';
import Head from 'next/head';
import { useState } from 'react';

const explorerURL = process.env.REACT_APP_MAINNET_URL;


export async function getOrdinalsList() {
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
            // console.log('Data in getOrdinalsList:', data.inscriptions); // Check the data
            return data.inscriptions

        }
    } catch (error) {
        console.error('Fetch error:', error);
        return {
            props: {},
        };
    }
}

export async function fetchOrdinalData(ordinalId) {
    // console.log('Fetching data for ordinal ID:', ordinalId); // Check the ordinal ID
    try {
        const response = await fetch(`${explorerURL}/inscription/${ordinalId}`, {
            headers: {
                'Accept': 'application/json'
            }
        });
        // console.log('Response:', response);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        if (response.headers.get('content-type').includes('application/json')) {
            const responseJSON = await response.json();
            return {
                ordinalData: responseJSON,
                timestamp: responseJSON.timestamp,
                inscription_id: responseJSON.inscription_id,
                inscription_number: responseJSON.inscription_number,
                content_type: responseJSON.content_type
            };
        }
    } catch (error) {
        console.error(error);
    }
}

async function fetchAllOrdinalsData(ordinals) {
    // console.log('Ordinals in fetchAllOrdinalsData:', ordinals); // Check the ordinals array
    const data = await Promise.all(ordinals.map(fetchOrdinalData));
    // console.log('Data in fetchAllOrdinalsData:', data); // Check the fetched data
    return data;
}

export async function getServerSideProps(context) {
    const inscriptionsList = await getOrdinalsList();
    // console.log('Inscriptions list in getServerSideProps:', inscriptionsList); // Check the inscriptions list
    const ordinalsData = await fetchAllOrdinalsData(inscriptionsList);
    // console.log('Ordinals data in getServerSideProps:', ordinalsData); // Check the ordinals data
    return { props: { ordinalsData } };
}


// Explorer component
const explorer = ({ ordinalsData }) => {

    // const [ordinals, setOrdinals] = useState(inscriptionsList);
    // const [selectedTags, setSelectedTags] = useState([]);
    return (
        <div>
            <Head>
                <title>Ordimint - Ordinals Explorer</title>
                <meta name="description" content="Explore Ordimint's comprehensive and searchable database of Bitcoin Ordinal Collections, showcasing Ordinals and their inscriptions in one convenient location." />
                <meta name="keywords" content="Bitcoin, Ordinals, Collections,Inscriptions, Searchable, Digital Assets, Inscriptions, NFT" />
                <meta property="og:title" content="Ordimint - A website to mint, receive, store or send your Ordinals" />
                <meta property="og:type" content="website" />
                <meta property="og:image" content="https://ordimint.com/Ordimint-Twitter-card.jpeg" />
                <meta property="og:description" content="A website to mint, receive, store or send your Ordinals. View all new Ordinal Collections, Inscribe or use our wallet." />

                <meta name="twitter:card" content="https://ordimint.com/Ordimint-Twitter-card.jpeg" />
                <meta name="twitter:title" content="Ordimint - A website to mint, receive, store or send your Ordinals" />
                <meta name="twitter:description" content="A website to mint, receive, store or send your Ordinals" />
                <meta name="twitter:image" content="https://ordimint.com/Ordimint-Twitter-card.jpeg" />
            </Head>
            <div className="main-middle">
                <h1 className='m-4'>Latest Inscriptions</h1>

                <Container fluid>
                    {/* <TagCloud selectedTags={selectedTags} setSelectedTags={setSelectedTags} /> */}

                    <OrdinalGrid ordinalsData={ordinalsData} />
                </Container>



            </div>
        </div >)

}


export default explorer
