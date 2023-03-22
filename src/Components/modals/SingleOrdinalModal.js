import React from 'react'
import { Modal, Button, Figure } from 'react-bootstrap';
import { useEffect, useState } from 'react';
// import { getInscriptionNumber } from "../../functions/ordinalFunctions.js";
const SingleOrdinalModal = (props) => {

    // const [inscriptionID, setInscriptionID] = useState("")

    // useEffect(() => {

    //     setInscriptionID(getInscriptionNumber(props.selectedOrdinal))

    // }, [props.selectedOrdinal])

    if (!props.show) {
        return null;
    }

    return (


        < div >
            <Modal show={props.show} onHide={props.handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>{props.selectedOrdinalName}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Figure>
                        <Figure.Image
                            thumbnail
                            width={200}
                            height={200}
                            alt={props.selectedOrdinalName}
                            src={`https://ordinals.com/content/${props.selectedOrdinal}`}
                        />
                        <Figure.Caption>
                            {/* <h4>
                                {inscriptionID ? inscriptionID : <></>}
                            </h4> */}
                        </Figure.Caption>
                    </Figure>
                    <h4>

                    </h4>

                    <Modal.Footer>
                        <Button variant="secondary" onClick={props.handleClose}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal.Body>
            </Modal>
        </div >
    )
}

export default SingleOrdinalModal
