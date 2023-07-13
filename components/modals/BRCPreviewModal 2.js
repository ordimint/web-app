import React from 'react'
import { Modal, Button, Alert } from 'react-bootstrap'
import { useState, useEffect } from 'react'



const BRCPreviewModal = (props) => {
    if (!props.show) {
        return null;
    }
    const [brcString, setBrcString] = useState("")

    const constructPreview = () => {
        var brcString = "";
        if (props.brcRadioButton === "deploy") {
            brcString = `{ "p": "brc-20", "op": "deploy", "tick": "${props.tokenTicker}", "max": "${props.tokenSupply}", "lim": "${props.mintLimit}" }`

        }
        else if (props.brcRadioButton === "mint") {
            brcString = `{ "p": "brc-20", "op": "mint", "tick": "${props.tokenTicker}", "amt": "${props.mintAmount}" }`
        }
        else if (props.brcRadioButton === "transfer") {
            brcString = `{ "p": "brc-20", "op": "transfer", "tick": "${props.tokenTicker}", "amt": "${props.transferAmount}" }`
        }
        setBrcString(brcString)
    }

    useEffect(() => {
        constructPreview()
    }, [])

    return (
        <>
            <Modal show={props.show} onHide={props.handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>BRC-20 Preview</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p className='bitcoin-addresse'>{brcString}</p>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => {
                            props.handleClose
                            props.onOK()
                        }}>
                            Ok
                        </Button>
                    </Modal.Footer>
                </Modal.Body>
            </Modal>
        </>
    )
}

export default BRCPreviewModal
