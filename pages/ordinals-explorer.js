import React from 'react'
import { Container, Row, Col, Card } from 'react-bootstrap';
import OrdinalGrid from '../components/OrdinalExplorer/OrdinalGrid';
import TagCloud from '../components/OrdinalExplorer/TagCloud';
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
            <div className="main-middle">
                <h1>Explorer</h1>
                <h4 className='mb-4'>The 100 latest inscriptions</h4>
                <Container fluid>
                    <TagCloud selectedTags={selectedTags} setSelectedTags={setSelectedTags} />

                    <OrdinalGrid ordinals={ordinals} />
                </Container>



            </div>
        </div>)

}


export default explorer
