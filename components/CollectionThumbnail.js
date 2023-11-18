import React from 'react'
import { Figure } from 'react-bootstrap'
import { useRouter } from 'next/router'

const isValidUrl = (string) => {
    try {
        new URL(string);
    } catch (_) {
        return false;
    }
    return true;
}

const CollectionThumbnail = (props) => {
    const router = useRouter();
    const icon = props.collection.inscription_icon;
    const url = icon ? `https://explorer.ordimint.com/preview/${icon}` : '';
    const validUrl = isValidUrl(url);
    const placeholderUrl = '/noThumbnail.html'; // replace with your placeholder image URL

    const handleClick = () => {
        router.push(`/collections/${props.collection.slug}`);
    }

    return (
        <div style={{ position: 'relative' }}>
            <iframe title="ordinal-iframe" className="ordinal-iframe"
                src={validUrl ? url : placeholderUrl}
            >
            </iframe>
            <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', cursor: 'pointer' }} onClick={handleClick} />
            <Figure.Caption>
                <h4>
                    {props.collection.name}
                </h4>
            </Figure.Caption>
        </div>
    );
}

export default CollectionThumbnail;