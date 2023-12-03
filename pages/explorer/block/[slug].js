import React from 'react'
import { Container, Row, Col } from 'react-bootstrap';
import OrdinalGrid from '../../../components/OrdinalExplorer/OrdinalGrid';
// import TagCloud from '../../components/OrdinalExplorer/TagCloud';
import BlockCloud from '../../../components/OrdinalExplorer/BlockCloud';
import Head from 'next/head';
// import BlockStats from '../../components/OrdinalExplorer/BlockStats';


const explorerURL = process.env.REACT_APP_MAINNET_URL;

export async function getBlockHeight() {
    try {
        const blockHeight = await fetch('https://mempool.space/api/blocks/tip/height');
        const blockHeightJSON = await blockHeight.json();
        return blockHeightJSON;
    } catch (error) {
        console.error(error);
    }
}



export async function getOrdinalsList(block) {


    try {
        const response = await fetch(`${explorerURL}/inscriptions/block/${block}`, {
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
    const { slug } = context.params;
    const newestBlockHeight = await getBlockHeight();
    let ordinalsData = null, inscriptionsList = null, errorMessage = null;
    try {
        inscriptionsList = await getOrdinalsList(slug);
        ordinalsData = await fetchAllOrdinalsData(inscriptionsList);
    }
    catch (error) {
        errorMessage = error.message;
    }

    return { props: { ordinalsData, blockHeight: newestBlockHeight, slug, errorMessage } };
}


// Explorer component
const BlockDetailPage = ({ ordinalsData, blockHeight, slug, errorMessage }) => {

    if (errorMessage) {
        return <div className="main-middle">
            <h1 className='m-4'>No Ordinals could be found here. Nothing to see here. Please move on!</h1>

        </div>;

    }

    return (
        <div>
            <Head>
                <title>Ordimint Explorer - Block {slug}</title>
                <meta name="description" content="Explore Ordimint's comprehensive and searchable database of Bitcoin Ordinal Collections, showcasing Ordinals and their inscriptions in one convenient location." />
                <meta name="keywords" content="Bitcoin, Ordinals, Collections,Inscriptions, Searchable, Digital Assets, Inscriptions, NFT" />
                <meta property="og:title" content="Ordimint - A website to mint, receive, store or send your Ordinals" />
                <meta property="og:type" content="website" />
                <meta property="og:image" content="https://ordimint.com/Ordimint-Twitter-card.png" />
                <meta property="og:description" content="A website to mint, receive, store or send your Ordinals. View all new Ordinal Collections, Inscribe or use our wallet." />

                <meta name="twitter:card" content="https://ordimint.com/Ordimint-Twitter-card.png" />
                <meta name="twitter:title" content="Ordimint - The Forever Machine" />
                <meta name="twitter:description" content="The Forever Machine" />
                <meta name="twitter:image" content="https://ordimint.com/Ordimint-Twitter-card.png" />
            </Head>
            <div className="main-middle">
                <Row>
                    <Col>
                        <h1 className="text-center">Ordinals Explorer</h1>
                    </Col>

                </Row>
                <Container fluid>
                    <hr />
                    <BlockCloud selectedBlock={slug} blockHeight={blockHeight} />
                    <hr />
                    {/* <BlockStats blockHeight={slug} /> */}

                    {/* <TagCloud selectedTags={selectedTags} setSelectedTags={setSelectedTags} /> */}

                    <OrdinalGrid key={slug} ordinalsData={ordinalsData} />

                </Container>



            </div>
        </div >)

}


export default BlockDetailPage
