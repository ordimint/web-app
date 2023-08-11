import React from 'react'
import { Modal, Button, Row } from 'react-bootstrap'
import { useState, useEffect } from 'react'



const PreviewModal = (props) => {
    if (!props.show) {
        return null;
    }
    const [brcString, setBrcString] = useState("")

    const constructPreview = () => {
        console.log(props.tokenStandard)
        console.log(props.brcRadioButton)
        if (props.tokenStandard === "brc") {
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
            const jsonObj = JSON.parse(brcString);
            const prettyJsonString = JSON.stringify(jsonObj, null, 2);
            setBrcString(prettyJsonString)

        }
        else if (props.tokenStandard === "tap") {
            var tapString = "";
            if (props.brcRadioButton === "deploy") {
                tapString = `{ "p": "tap", "op": "token-deploy", "tick": "${props.tokenTicker}", "max": "${props.tokenSupply}", "lim": "${props.mintLimit}" }`

            }
            else if (props.brcRadioButton === "mint") {
                tapString = `{ "p": "tap", "op": "token-mint", "tick": "${props.tokenTicker}", "amt": "${props.mintAmount}" }`
            }
            else if (props.brcRadioButton === "transfer") {
                tapString = `{ "p": "tap", "op": "token-transfer", "tick": "${props.tokenTicker}", "amt": "${props.transferAmount}" }`
            }
            else if (props.brcRadioButton === "token-send") {

                const items = props.btcItems.map(item => (

                    {
                        tick: item.tick,
                        amt: item.amt,
                        address: item.address
                    }));
                tapString = JSON.stringify({
                    p: "tap",
                    op: "token-send",
                    items: items
                });
            }
            const jsonObj = JSON.parse(tapString);
            const prettyJsonString = JSON.stringify(jsonObj, null, 2);
            setBrcString(prettyJsonString)

        }
    }
    useEffect(() => {
        console.log(brcString)
        constructPreview()
    }, [props.tokenStandard, props.brcRadioButton, props.tokenTicker, props.tokenSupply, props.mintLimit, props.mintAmount, props.transferAmount, props.tapRadioButton])


    return (
        <>
            <Modal size="lg" show={props.show} onHide={props.handleClose} centered>
                <Modal.Header closeButton>
                    {(props.tokenStandard === "brc") ?
                        <Modal.Title>BRC-20 Inscription Preview</Modal.Title>
                        :
                        <Modal.Title>TAP Inscription Preview</Modal.Title>
                    }
                </Modal.Header>
                <Modal.Body className='preview-modal-body'>
                    <pre className='token-preview-string'>{brcString}</pre>
                    <Modal.Footer>
                        <div className='preview-modal-buttons'>
                            <Button variant="secondary" onClick={props.handleClose}>
                                Back
                            </Button>
                            <Button variant="primary" onClick={() => {
                                props.handleClose();
                                props.onOK();
                            }}>
                                Ok
                            </Button>
                        </div>
                    </Modal.Footer>

                </Modal.Body>
            </Modal>
        </>
    )
}

export default PreviewModal
