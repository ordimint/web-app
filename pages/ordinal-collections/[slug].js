import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { Button, Figure, Row, Col, Container, Placeholder } from 'react-bootstrap'
import Link from 'next/link'
import { FaTwitterSquare, FaDiscord, FaGlobe } from "react-icons/fa";
import OrdinalThumbnail from '../../components/OrdinalThumbnail'
// import placeholderimage from "../../public/media/text-placeholder.png";
// import SingleOrdinalModal from '../../components/modals/SingleOrdinalModal';
import { getContentType } from '../../public/functions/ordinalFunctions';
import Footer from '../../components/Footer';
import Head from 'next/head';
import { Breadcrumb } from 'react-bootstrap';


const CollectionDetailPage = ({ collectionMeta, collection, slug }) => {
    const router = useRouter();

    // const [collectionMeta, setCollectionMeta] = useState([])
    // const [collection, setCollection] = useState([])
    const [isText, setIsText] = useState(false)
    const [text, setText] = useState("")
    const [isDetailModal, showDetailModal] = useState(false);
    const renderDetailModal = () => showDetailModal(true);
    const hideDetailModal = () => showDetailModal(false);
    const [ordinal, setOrdinal] = useState()


    async function setContentType(inscriptionID) {
        const response = await getContentType(inscriptionID);
        const contentType = response;
        if (contentType && contentType.includes("text")) {
            console.log(contentType);
            setIsText(true);
        }
    }

    useEffect(() => {
        setContentType(collectionMeta.inscription_icon)
    }, [collectionMeta])

    return (
        <div>
            <Head>
                <title>Ordinal Collection - {collectionMeta.name}</title>
                <meta name="description" content={collectionMeta.description} />
                <meta name="keywords" content="Bitcoin, Ordinals,Collections, Minting, Inscription, Wallet, Integrated, Ledger, Alby, Digital Artefacts" />
                {/* Twitter Card meta tags */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:site" content="@ordimint" />

                <meta name="twitter:creator" content="@ordimint" />
                <meta name="twitter:title" content={`Ordinal Collection - ${collectionMeta.name}`} />
                <meta name="twitter:description" content={collectionMeta.description} />
                <meta name="twitter:image" content={`https://explorer.ordimint.com/preview/${collectionMeta.inscription_icon}`} />

                {/* Open Graph (Facebook) meta tags */}
                <meta property="og:title" content={`Ordinal Collection - ${collectionMeta.name}`} />
                <meta property="og:description" content={collectionMeta.description} />
                <meta property="og:url" content={`https://ordimint.com/${slug}`} />
                <meta property="og:image" content={`https://explorer.ordimint.com/preview/${collectionMeta.inscription_icon}`} />
                <meta property="og:type" content="website" />
                <meta property="og:site_name" content="Ordimint" />

            </Head>
            <Container>
                <Breadcrumb>
                    <Breadcrumb.Item href="/ordinal-collections">Collections</Breadcrumb.Item>
                    <Breadcrumb.Item active>{collectionMeta.name}</Breadcrumb.Item>
                </Breadcrumb>
            </Container>

            <div className='main-middle'>
                <h1>{collectionMeta.name}</h1>
                {isText ? (
                    <Figure>

                        <iframe className="ordinal-iframe image-thumbnail"
                            title="ordinal-iframe"

                            src={`https://explorer.ordimint.com/preview/${collectionMeta.inscription_icon}`}
                        >
                        </iframe>
                        <Figure.Caption>
                            <h4>
                                {collection.name}
                            </h4>
                        </Figure.Caption>
                    </Figure>

                ) :
                    (
                        <Figure>
                            <Figure.Image
                                thumbnail
                                width={200}
                                height={200}
                                alt={collectionMeta.name}
                                src={`https://explorer.ordimint.com/content/${collectionMeta.inscription_icon}`}
                            />
                            <Figure.Caption>
                            </Figure.Caption>
                        </Figure>)}
                <Container id='social-icons-collections' >
                    <Row >
                        <h2>
                            {
                                collectionMeta.twitter_link ? (<a href={collectionMeta.twitter_link} target="_blank"
                                    rel="noopener noreferrer"><FaTwitterSquare /></a>

                                ) : (<></>)
                            }
                            {" "}
                            {
                                collectionMeta.discord_link ? (<a href={collectionMeta.discord_link} target="_blank"
                                    rel="noopener noreferrer"><FaDiscord /></a>) : (<></>)
                            }
                            {" "}

                            {
                                collectionMeta.website_link ? (<a href={collectionMeta.website_link} target="_blank"
                                    rel="noopener noreferrer" ><FaGlobe /></a>) : (<></>)
                            }
                        </h2>

                    </Row>
                    <Row>
                        <h4>
                            {
                                collectionMeta.supply ? (<p>{`${collectionMeta.supply}/${collectionMeta.supply}`}</p>) : (<></>)
                            }
                        </h4>
                    </Row>
                    {
                        collectionMeta.description ? <p>{collectionMeta.description}</p> : null
                    }
                </Container>
                <hr />
                <Container >

                    <Row >
                        {
                            collection.map((element, index) => {
                                return (
                                    <Col className='m-1' key={index}>
                                        <div key={index}>
                                            <OrdinalThumbnail
                                                collection={element}
                                                isText={isText}
                                                text={text}
                                            />

                                        </div>

                                    </Col>

                                )

                            })
                        }

                    </Row>
                </Container>

            </div>

            <Footer />
        </div >

    )
}

export async function getServerSideProps(context) {
    const { slug } = context.query;

    const collectionMetaRes = await fetch(`https://raw.githubusercontent.com/ordinals-wallet/ordinals-collections/main/collections/${slug}/meta.json`);
    const collectionMeta = await collectionMetaRes.json();

    const collectionRes = await fetch(`https://raw.githubusercontent.com/ordinals-wallet/ordinals-collections/main/collections/${slug}/inscriptions.json`);
    const collection = await collectionRes.json();

    return {
        props: {
            collectionMeta,
            collection,
            slug
        },
    };
}


export default CollectionDetailPage
