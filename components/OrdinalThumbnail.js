import React from 'react'
import { useState } from 'react'
import { Figure } from 'react-bootstrap'
import SingleOrdinalModal from '../components/modals/SingleOrdinalModal';

const OrdinalThumbnail = (props) => {

    const [isDetailModal, showDetailModal] = useState(false);
    const renderDetailModal = () => showDetailModal(true);
    const hideDetailModal = () => showDetailModal(false);

    return (
        <div >

            <h5 style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{props.collection.meta.name}</h5>
            <a href={`https://explorer.ordimint.com/inscription/${props.collection.id}`}
                target="_blank" rel="noopener noreferrer"
            >
                <Figure>
                    <iframe title="ordinal-iframe" className="ordinal-iframe"
                        src={`https://explorer.ordimint.com/preview/${props.collection.id}`}
                        onClick={renderDetailModal}
                    >
                    </iframe>

                    <Figure.Caption>


                        <h5>

                            Detailpage
                        </h5>

                    </Figure.Caption>
                </Figure>
            </a>
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
