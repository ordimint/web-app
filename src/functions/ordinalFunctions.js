async function getContentType(inscriptionID) {
    try {
        const response = await fetch(`https://ordapi.xyz/inscription/${inscriptionID}`)
        const responseJSON = await response.json()
        if (responseJSON) {
            const contentType = responseJSON.content_type
            // console.log(contentType)
            return contentType
        }
    } catch (error) {
        console.log(error)
        return error
    }
}

async function getInscriptionNumber(inscriptionID) {
    let inscriptionNumber
    try {
        const response = await fetch(`https://ordapi.xyz/inscription/${inscriptionID}`)
        const responseJSON = await response.json()
        // console.log(responseJSON)
        inscriptionNumber = responseJSON.data.inscription_Number
        // console.log(inscriptionNumber)
    } catch (error) {
        console.log(error)
        return error
    }
    if (inscriptionNumber) {
        return inscriptionNumber
    }
}


export { getInscriptionNumber, getContentType }
