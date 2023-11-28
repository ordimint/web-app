import React, { useEffect, useState } from 'react'
import { Badge, Stack } from 'react-bootstrap'
import { useRouter } from 'next/router'

const TagCloud = ({ selectedTags, setSelectedTags }) => {
    const [tags, setTags] = useState(['All', 'Images', 'Videos', 'GIFs', 'Text', 'Games', 'Audio', 'SVG', 'HTML'])
    const router = useRouter()

    useEffect(() => {
        setSelectedTags(['All']) // Set 'All' as the default selected tag
    }, [])
    const handleTagClick = (tag) => {
        setSelectedTags([tag]) // Only the clicked tag is active
        if (tag !== 'All') {
            router.push({
                pathname: router.pathname,
                query: { 'content-type': tag.toLowerCase() },
            }) // Update the URL with the selected tag
        } else {
            router.push(router.pathname) // If 'All' is selected, remove the query string
        }
    }

    return (
        <div className='ordinal-grid-tag-cloud mb-4'>
            <Stack direction="horizontal" gap={2}>
                {tags.map((tag, index) => (
                    <Badge
                        className='ordinal-grid-tag clickable' // Add the 'clickable' class
                        key={index}
                        onClick={() => handleTagClick(tag)}
                        pill
                        bg={selectedTags.includes(tag) ? "light" : "secondary"} // If the tag is active, use a filled background
                        text={selectedTags.includes(tag) ? "dark" : "light"} // If the tag is active, use light text
                    >
                        {tag}
                    </Badge>
                ))}
            </Stack>
        </div>
    )
}

export default TagCloud