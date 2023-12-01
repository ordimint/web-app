import React from 'react';
import { Badge, Stack } from 'react-bootstrap';
import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';



const BlockCloud = ({ selectedBlock, blockHeight }) => {
    const router = useRouter()

    const blocks = Array.from({ length: blockHeight - 800000 + 1 }, (_, i) => blockHeight - i);

    const activeBlockRef = useRef(null);
    const [activeBlock, setActiveBlock] = useState(selectedBlock);

    useEffect(() => {
        if (activeBlockRef.current && selectedBlock !== null && selectedBlock !== undefined) {
            activeBlockRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }, [activeBlock, selectedBlock]);

    return (
        <div className='block-cloud mb-4'>
            <Stack direction="horizontal" gap={2}>
                {blocks.map((block, index) => (
                    <a

                        onClick={() => {
                            router.push(`/block/${block}`);
                            setActiveBlock(block);
                        }}
                        key={index}

                    >
                        <Badge
                            ref={block === activeBlock ? activeBlockRef : null}
                            className={`block-cloud-tag ${block === activeBlock ? 'active-badge' : ''}`}

                        >
                            {block}
                        </Badge>
                    </a>
                ))}
            </Stack>
        </div>
    )
};

export default BlockCloud;