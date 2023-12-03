import React from 'react'

export async function getServerSideProps(context) {
    let blockStats = null;
    const url = `${process.env.NEXT_PUBLIC_API_URL}`;

    try {
        const response = await fetch(url, {
            headers: {
                'Accept': 'application/json'
            }
        });
        blockStats = await response.json();
    } catch (error) {
        console.error('Error:', error);
    }

    return { props: { blockStats } }
}



const BlockStats = ({ blockStats }) => {
    return (
        <div>

        </div>
    )
}

export default BlockStats
