import React from 'react'
import { useState } from 'react'
import { Figure } from 'react-bootstrap'
import SingleOrdinalModal from '../components/modals/SingleOrdinalModal';

const OrdinalThumbnail = (props) => {

    const [isDetailModal, showDetailModal] = useState(false);
    const renderDetailModal = () => showDetailModal(true);
    const hideDetailModal = () => showDetailModal(false);

    return (
        <div>
            {props.isText ? (
                <Figure>

                    <iframe title="ordinal-iframe" className="ordinal-iframe"
                        src={`https://explorer.ordimint.com/preview/${props.collection.id}`}
                        onClick={() => {
                            renderDetailModal()
                        }}
                    >
                    </iframe>


                    <Figure.Caption>

                        <a href={`https://explorer.ordimint.com/inscription/${props.collection.id}`}
                            target="_blank" rel="noopener noreferrer"
                        >
                            <h4>
                                {props.collection.meta.name}
                            </h4>
                        </a >

                    </Figure.Caption>
                </Figure>

            ) : (
                <Figure>
                    <Figure.Image
                        thumbnail
                        width={200}
                        height={200}
                        alt={props.collection.meta.name}
                        src={`https://explorer.ordimint.com/content/${props.collection.id}`}
                        onClick={() => {
                            renderDetailModal()
                        }}
                    />
                    <Figure.Caption>
                        <h6>
                            {props.collection.meta.name}
                        </h6>
                    </Figure.Caption>
                </Figure>)}
            < SingleOrdinalModal
                show={isDetailModal}
                handleClose={hideDetailModal}
                selectedOrdinal={props.collection.id}
                selectedOrdinalName={props.collection.meta.name}
            />
        </div>
    )
}

export default OrdinalThumbnail
