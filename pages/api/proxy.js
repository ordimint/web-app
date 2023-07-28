// Inside pages/api/proxy.js
export default async function handler(req, res) {
    const { utxo, url } = req.body;
    const fetchUrl = url ? url : `https://ordapi.xyz/output/${utxo.txid}:${utxo.vout}`;

    const response = await fetch(fetchUrl);
    const data = await response.json();

    res.status(200).json(data);
}
