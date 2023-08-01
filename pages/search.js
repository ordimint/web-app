import React from 'react'
import { useState, useEffect } from 'react'
import { Form, InputGroup, Row, Col, Tabs, Tab, Button } from 'react-bootstrap'
import Head from 'next/head';

const Search = () => {

    const [searchIndex, setSearchIndex] = useState([])
    const [tabKey, setTabKey] = useState('sats')
    const [searchInput, setSearchInput] = useState('')
    const [searchRequest, setSearchRequest] = useState(false)
    // const [domainAvailable, setDomainAvailable] = useState(false)

    // useEffect(() => {

    //     // switch (tabKey) {
    //     //     case 'all':
    //     //         checkIndex(searchInput)
    //     //         break;
    //     //     case 'brc-20':
    //     //         checkIndex(searchInput)
    //     //         break;
    //     //     case 'sats':
    //     checkSatsName(searchInput)
    //     //         break;
    //     //     case 'numbers':
    //     //         checkIndex(searchInput)
    //     //         break;
    //     //     case 'news':
    //     //         checkIndex(searchInput)
    //     //         break;
    //     //     default:
    //     //         console.log('default')
    //     //         break;
    //     // }
    // }, [searchInput])

    async function checkSatsName(domain) {
        try {
            const response = await fetch(`https://api.sats.id/names/${domain}.sats`)
            const responseJSON = await response.json()
            console.log(responseJSON)
            setSearchIndex(responseJSON)
        } catch (error) {
            console.log(error)
            setSearchIndex([])
        }

    }
    async function checkIndex(domain) {
        try {
            const response = await fetch(`https://api.sats.id/names/${domain}`)
            const responseJSON = await response.json()
            if (responseJSON) {
                setSearchIndex(responseJSON)
            }
        } catch (error) {
            console.log(error)
            setSearchIndex([])
        }
    }

    return (
        <div>
            <Head>
                <title>Ordimint - Search</title>
                <meta name="description" content="Seach for .sats Names" />
                <meta name="keywords" content="Bitcoin, .sats names, inscriptions, Ordinals" /> {/* Add this line */}
            </Head>
            <div className="main-middle">
                <h4 className='pb-4'>Search for an inscription</h4>
                <div id="tab-container">
                    <Tabs
                        transition={false}
                        activeKey={tabKey}
                        onSelect={(k) => setTabKey(k)}
                        justify
                        fill
                    >

                        <Tab eventKey="all" title="All" disabled>
                            <InputGroup className="m-4" id='domain-input-field' >
                                <Form.Control
                                    placeholder="your domain name"
                                    value={searchInput}
                                    onInput={

                                        (e) => {
                                            setSearchInput(e.target.value);
                                        }

                                    }
                                />
                                {/* <InputGroup.Text id="basic-addon2">.sats</InputGroup.Text> */}

                            </InputGroup>

                        </Tab>
                        <Tab eventKey="brc-20" title="BRC-20" disabled>
                            <InputGroup className="m-4" id='domain-input-field'>
                                <Form.Control
                                    placeholder="your domain name"
                                    value={searchInput}
                                    onInput={

                                        (e) => {
                                            setSearchInput(e.target.value);
                                        }

                                    }
                                />
                                {/* <InputGroup.Text id="basic-addon2">.sats</InputGroup.Text> */}
                            </InputGroup>
                        </Tab>
                        <Tab eventKey="sats" title=".sats">
                            <InputGroup className="m-4" id='domain-input-field'>
                                <Form.Control
                                    placeholder="your domain name"
                                    onChange={
                                        (e) => {
                                            setSearchInput(e.target.value);
                                        }
                                    }
                                    value={searchInput}
                                />
                                <InputGroup.Text id="basic-addon2" style={{ background: "#1E1F20", color: "#FFF", border: "2px solid #6a6b6b" }}>.sats</InputGroup.Text>

                            </InputGroup>
                            <button type="submit" className='connect_button' onClick={
                                () => {
                                    checkSatsName(searchInput)
                                    setSearchRequest(true)
                                }

                            }>Search</button>
                            {searchRequest &&
                                <>
                                    <h4 className='m-3'>

                                        {!searchIndex.owner ? <div className='available'>Domain is available</div> : <div className='not-available'>Domain is not available</div>}

                                    </h4>
                                    <p>Don't trust, verify!</p>
                                    <Row >
                                        {
                                            searchIndex.owner ?
                                                <>
                                                    <Row><h4>Owner:</h4></Row>

                                                    <Col className='index-search-result' >
                                                        <div >
                                                            <a href={`https://explorer.ordimint.com/inscription/${searchIndex.inscriptionId}`} target="_blank" rel="noreferrer noopener">
                                                                <h4>Inscription: {searchIndex.inscriptionIndex}</h4>
                                                            </a>
                                                            <p>{searchIndex.name}</p>
                                                        </div>

                                                    </Col>

                                                </> :
                                                <>

                                                </>}

                                    </Row>
                                </>
                            }
                        </Tab>
                        <Tab eventKey="number" title="Number" disabled>
                            <InputGroup className="m-4" id='domain-input-field'>
                                <Form.Control
                                    placeholder="your domain name"
                                    value={searchInput}
                                    onInput={

                                        (e) => {
                                            setSearchInput(e.target.value);
                                        }

                                    }
                                />
                                {/* <InputGroup.Text id="basic-addon2">.sats</InputGroup.Text> */}
                            </InputGroup>

                        </Tab>
                        <Tab eventKey="news" title="News" disabled>
                            <InputGroup className="m-4" id='domain-input-field'>
                                <Form.Control
                                    placeholder="your domain name"
                                    value={searchInput}
                                    onInput={

                                        (e) => {
                                            setSearchInput(e.target.value);

                                        }

                                    }
                                />
                                {/* <InputGroup.Text id="basic-addon2">.sats</InputGroup.Text> */}
                            </InputGroup>
                        </Tab>
                    </Tabs>
                </div>
            </div>
        </div >
    )
}

export default Search
