import React from 'react'
import { useState, useEffect } from 'react'
import { Form, InputGroup, Container } from 'react-bootstrap'

const NewsInput = (props) => {
    return (

        <div id="news-input-container" >
            <InputGroup className='news-input-group'>
                <InputGroup.Text htmlFor="basic-url" required>Title</InputGroup.Text>
                <Form.Control
                    placeholder="The main headline"
                    aria-label="news-title"
                    aria-describedby="basic-addon1"
                    onInput={
                        (e) => {
                            props.setNewsTitle(e.target.value);
                        }
                    }
                />
            </InputGroup>
            <InputGroup className='news-input-group'>
                <InputGroup.Text htmlFor="basic-url">URL</InputGroup.Text>
                <Form.Control
                    placeholder="Add a link (optional)"
                    aria-label="Username"
                    aria-describedby="basic-addon1"
                    onInput={
                        (e) => {
                            props.setNewsUrl(e.target.value);
                        }
                    }
                />
            </InputGroup>
            <InputGroup className='news-input-group'>
                <InputGroup.Text htmlFor="basic-url">Author</InputGroup.Text>
                <Form.Control
                    placeholder="Add an author (optional)"
                    aria-label="Username"
                    aria-describedby="basic-addon1"
                    onInput={
                        (e) => {
                            props.setNewsAuthor(e.target.value);
                        }
                    }
                />
            </InputGroup>
            <InputGroup className='news-input-group'>
                <InputGroup.Text htmlFor="basic-url">Body</InputGroup.Text>
                <Form.Control as="textarea"
                    placeholder="Plain text or markdown (optional)"
                    onInput={

                        (e) => {
                            props.setNewsText(e.target.value);
                            props.setFileSize(((e.target.value.length) + 1000));
                        }

                    }
                    autoFocus={true}
                    id="exampleFormControlTextarea1"
                    rows="12" />
            </InputGroup>
            <p><a href="https://docs.inscribe.news/" target="_blank" rel="noopener noreferrer" >Read more about Ordinals News Standard</a></p>
        </div>



    )
}

export default NewsInput
