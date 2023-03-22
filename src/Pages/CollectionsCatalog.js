import React from 'react'
import { useState } from 'react'
import { Container, Row, Col, Form } from 'react-bootstrap'
import CollectionThumbnail from '../Components/CollectionThumbnail'
import { LinkContainer } from 'react-router-bootstrap'
import { collections } from '../data/collections.js'
import { Link, Outlet } from 'react-router-dom'

const CollectionsCatalog = (props) => {
    const [search, setSearch] = useState('')
    // const [filteredCollections, setFilteredCollections] = useState(collections)

    const filterCollections = (collections, query) => {
        if (!query) {
            return collections
        }
        return collections.filter((collection) =>
            collection.name.toLowerCase().includes(query.toLowerCase())
        )
    }
    const filteredCollections = filterCollections(collections, search)
    return (

        <div className='main-middle'>
            <h1>Collections</h1>
            <Container>
                <Row xs={1} sm={2} md={3} lg={4} id="collection-search-field">
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
                </Row>
                <hr />
                <Row xs={2} sm={2} md={3} lg={5}>
                    {
                        filteredCollections.map((collection, index) => {
                            return (
                                <Link to={`${collection.slug}`} key={index}>
                                    <Col className='m-2 collection-column' key={index} >
                                        <div key={index}>
                                            <CollectionThumbnail collection={collection} />
                                        </div>
                                    </Col>
                                </Link>
                            )



                        })
                    }

                </Row>
            </Container>

        </div >




    )
}

export default CollectionsCatalog
