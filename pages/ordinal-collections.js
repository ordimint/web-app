import React, { useState } from 'react';
import { Container, Row, Col, Form } from 'react-bootstrap';
import CollectionThumbnail from '../components/CollectionThumbnail';
import Link from 'next/link';
import Pagination from 'react-bootstrap/Pagination';
import { collections } from '/public/data/collections.js';
import Footer from '../components/Footer';
import Head from 'next/head';

const CollectionsCatalog = () => {
    const [search, setSearch] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [collectionsPerPage] = useState(20);

    const filterCollections = (collections, query) => {
        if (!query) {
            return collections;
        }
        return collections.filter((collection) =>
            collection.name.toLowerCase().includes(query.toLowerCase())
        );
    };

    const filteredCollections = filterCollections(collections, search);

    const indexOfLastCollection = currentPage * collectionsPerPage;
    const indexOfFirstCollection = indexOfLastCollection - collectionsPerPage;
    const currentCollections = filteredCollections.slice(
        indexOfFirstCollection,
        indexOfLastCollection
    );

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const pageNumbers = [];
    for (
        let i = 1;
        i <= Math.ceil(filteredCollections.length / collectionsPerPage);
        i++
    ) {
        pageNumbers.push(i);
    }

    return (

        <div className="collections-catalog">
            <Head>
                <title>Ordimint - Ordinal Collections</title>
                <meta name="description" content="Explore Ordimint's comprehensive and searchable database of Bitcoin Ordinal Collections, showcasing Ordinals and their inscriptions in one convenient location." />
                <meta name="keywords" content="Bitcoin, Ordinals, Collections,Inscriptions, Searchable, Digital Assets, Inscriptions, NFT" />
                <meta property="og:title" content="Ordimint - A website to mint, receive, store or send your Ordinals" />
                <meta property="og:type" content="website" />
                <meta property="og:image" content="https://ordimint.com/OrdimintSVGLogo-black.svg" />
                <meta property="og:description" content="A website to mint, receive, store or send your Ordinals. View all new Ordinal Collections, Inscribe or use our wallet." />

                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="Ordimint - A website to mint, receive, store or send your Ordinals" />
                <meta name="twitter:description" content="A website to mint, receive, store or send your Ordinals" />
                <meta name="twitter:image" content="https://ordimint.com/OrdimintSVGLogo-black.svg" />
            </Head>

            <Container fluid>
                <h1 className="text-center py-3">Collections</h1>
                <Form id='onchain-input'>
                    <Form.Control
                        type="search"
                        placeholder="Search collections"
                        className="search-input mb-4 mx-auto"
                        aria-label="Search"
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </Form>
                <Row xs={1} sm={2} md={3} lg={4} className="g-4">
                    {currentCollections.map((collection, index) => (
                        <Col key={index}>
                            <Link href={`/ordinal-collections/${collection.slug}`} passHref>
                                <div className="collection-card">
                                    <CollectionThumbnail collection={collection} />
                                </div>
                            </Link>
                        </Col>
                    ))}
                </Row>
                <Row>
                    <Col className="pagination">
                        <Pagination style={{ background: "#1e1f20" }}>
                            <Pagination.First onClick={() => paginate(1)} />
                            <Pagination.Prev
                                onClick={() => paginate(currentPage - 1)}
                                disabled={currentPage === 1}
                            />
                            {pageNumbers.map((number) => {
                                if (
                                    number === 1 ||
                                    number === currentPage ||
                                    number === pageNumbers.length ||
                                    (number >= currentPage - 1 && number <= currentPage + 1)
                                ) {
                                    return (
                                        <Pagination.Item
                                            key={number}
                                            active={number === currentPage}
                                            onClick={() => paginate(number)}
                                        >
                                            {number}
                                        </Pagination.Item>
                                    );
                                } else if (number === currentPage - 2 || number === currentPage + 2) {
                                    return (
                                        <Pagination.Ellipsis key={number} />
                                    );
                                } else {
                                    return null;
                                }
                            })}
                            <Pagination.Next
                                onClick={() => paginate(currentPage + 1)}
                                disabled={currentPage === pageNumbers.length}
                            />
                            <Pagination.Last onClick={() => paginate(pageNumbers.length)} />
                        </Pagination>
                    </Col>

                </Row>
            </Container>

        </div>
    );
};


export default CollectionsCatalog;
