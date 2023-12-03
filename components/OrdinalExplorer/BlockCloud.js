import React, { useEffect, useRef } from 'react';
import { Stack } from 'react-bootstrap';
import { useRouter } from 'next/router';
import { Badge } from 'react-bootstrap';


const BlockCloud = ({ selectedBlock, blockHeight }) => {
    const router = useRouter()
    const blockCloudRef = useRef(null); // Add this line
    // Ensure that selectedBlock is within the range of blocks
    const blocks = Array.from({ length: blockHeight - 747899 + 10 + 1 }, (_, i) => blockHeight + 10 - i);

    useEffect(() => {
        const blockCloud = blockCloudRef.current;
        const activeBadge = blockCloud.querySelector('.active-badge');

        if (activeBadge) {
            const blockCloudMiddle = blockCloud.clientWidth / 2;
            const activeBadgeMiddle = activeBadge.offsetLeft + activeBadge.clientWidth / 2;
            const scrollLeft = activeBadgeMiddle - blockCloudMiddle;

            blockCloud.scrollLeft = scrollLeft;
        }
    }, [selectedBlock]);

    return (
        <div className="block-cloud mb-4" ref={blockCloudRef}>
            <Stack direction="horizontal" gap={2}>
                {blocks.map((block, index) => {

                    return (
                        <a
                            onClick={(e) => {
                                if (block > blockHeight) {
                                    e.preventDefault();
                                    return;
                                }
                                router.push(`/explorer/block/${block}`);
                            }}
                            key={index}
                        >
                            <div
                                className={`block-cloud-tag ${block == selectedBlock ? 'active-badge' : ''} ${block > blockHeight ? 'unmined-block' : ''}`}
                            >
                                <h5>Block</h5>
                                {block}
                            </div>
                        </a>
                    );
                })}
            </Stack>
        </div>
    )
};

export default BlockCloud;