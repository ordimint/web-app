

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

function parseTextInscription(jsonStr) {
    let jsonObj;

    // Try parsing the JSON string
    try {
        jsonObj = JSON.parse(jsonStr);
    } catch (e) {
        // If an error is thrown, the JSON is invalid, so just return the original string
        return jsonStr;
    }

    // Handle different p flags
    switch (jsonObj.p) {
        case "ons":
            return {
                pFlag: "ons",
                op: jsonObj.op,
                title: jsonObj.title,
                url: jsonObj.url,
                author: jsonObj.author,
                body: jsonObj.body
            };

        case "sns":
            return {
                pFlag: "sns",
                op: jsonObj.op,
                name: jsonObj.name
            };

        case "brc-20":
            return {
                pFlag: "brc-20",
                op: jsonObj.op,
                tick: jsonObj.tick,
                amt: jsonObj.amt
            };

        default:
            // If p flag is not recognized, return the original string
            return jsonStr;
    }
}




export { getInscriptionNumber, getContentType, parseTextInscription }
