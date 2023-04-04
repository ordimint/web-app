import React, { useState } from 'react';
import { Container, Row, Col, Form } from 'react-bootstrap';
import CollectionThumbnail from '../Components/CollectionThumbnail';
import { Link } from 'react-router-dom';
import Pagination from 'react-bootstrap/Pagination';
import { collections } from '../data/collections.js';

const CollectionsCatalog = () => {
    const [search, setSearch] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [collectionsPerPage] = useState(12);

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
        <div className="main-middle">
            <h1>Collections</h1>
            <Container>
                <Row>
                    <Col>
                        <Form>
                            <Form.Control
                                type="search"
                                placeholder="Search collections"
                                className="m-2 mb-4"
                                aria-label="Search"
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        </Form>
                    </Col>
                    <Col className="d-flex justify-content-end align-items-center">
                        <Pagination>
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
                <hr />
                <Row xs={1} sm={2} md={3} lg={4}>
                    {currentCollections.map((collection, index) => {
                        return (
                            <Link to={`${collection.slug}`} key={index}>
                                <Col className="m-2 collection-column" key={index}>
                                    <div key={index}>
                                        <CollectionThumbnail collection={collection} />
                                    </div>
                                </Col>
                            </Link>
                        );
                    })}
                </Row>
            </Container>
        </div>
    );
};

export default CollectionsCatalog;













// import React from 'react'
// import { useState } from 'react'
// import { Container, Row, Col, Form } from 'react-bootstrap'
// import CollectionThumbnail from '../Components/CollectionThumbnail'
// import { LinkContainer } from 'react-router-bootstrap'
// import { collections } from '../data/collections.js'
// import { Link, Outlet } from 'react-router-dom'

// const CollectionsCatalog = (props) => {
//     const [search, setSearch] = useState('')
//     // const [filteredCollections, setFilteredCollections] = useState(collections)

//     const filterCollections = (collections, query) => {
//         if (!query) {
//             return collections
//         }
//         return collections.filter((collection) =>
//             collection.name.toLowerCase().includes(query.toLowerCase())
//         )
//     }
//     const filteredCollections = filterCollections(collections, search)
//     return (

//         <div className='main-middle'>
//             <h1>Collections</h1>
//             <Container>
//                 <Row xs={1} sm={2} md={3} lg={4} id="collection-search-field">
//                     <Col>
//                         <Form>
//                             <Form.Control
//                                 type="search"
//                                 placeholder="Search collections"
//                                 className="m-2 mb-4"
//                                 aria-label="Search"
//                                 onChange={(e) => setSearch(e.target.value)}
//                             />
//                         </Form>
//                     </Col>
//                 </Row>
//                 <hr />
//                 <Row xs={2} sm={2} md={3} lg={5}>
//                     {
//                         filteredCollections.map((collection, index) => {
//                             return (
//                                 <Link to={`${collection.slug}`} key={index}>
//                                     <Col className='m-2 collection-column' key={index} >
//                                         <div key={index}>
//                                             <CollectionThumbnail collection={collection} />
//                                         </div>
//                                     </Col>
//                                 </Link>
//                             )
//                         })
//                     }
//                 </Row>
//             </Container>

//         </div >




//     )
// }

// export default CollectionsCatalog
