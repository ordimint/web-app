import React from 'react'
import { useRouter } from 'next/router'
import { Figure } from 'react-bootstrap'

const OrdinalThumbnail = (props) => {
    const router = useRouter()

    const handleClick = () => {
        router.push(`/explorer/inscription/${props.collection.id}`);
    }

    return (
        <div>
            <Figure className='ordinal-thumbnail-picture'>
                <div style={{ position: 'relative' }} onClick={handleClick}>
                    <iframe title="ordinal-iframe" className="ordinal-iframe"
                        src={`https://explorer.ordimint.com/preview/${props.collection.id}`}
                    >
                    </iframe>
                    <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', cursor: 'pointer' }} />
                </div>
            </Figure>
            <h5 className='ordinal-thumbnail-caption' title={props.collection.meta.name}>{props.collection.meta.name}</h5>
        </div>
    )
}

export default OrdinalThumbnail;