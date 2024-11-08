export default function createReview(name: string, gender: "male" | "female" | null, text: string) {
    if (!name || !gender || !text) {
        return ""
    }

    const connectorAdition = ['Also', 'Moreover', 'In addition', 'Additionally', 'Furthermore']
    const connectorAdversial = ['However', 'Nonetheless', 'Yet', 'On the other hand', 'Nevertheless']

    const keys = [
        {key: "[name]", gender: undefined, value: name},
        {key: "[subject]", gender: "male", value: "he"},
        {key: '[Subject]', gender: "male", value: "He"},
        {key: '[object]', gender: "male", value: "him"},
        {key: '[possessive]', gender: "male", value: "his"},
        {key: "[subject]", gender: "female", value: "she"},
        {key: '[Subject]', gender: "female", value: "She"},
        {key: '[object]', gender: "female", value: "her"},
        {key: '[possessive]', gender: "female", value: "her"},
        {key: '[adition]', gender: undefined, value: randomConnector(connectorAdition) + ", "},
        {key: '[adversial]', gender: undefined, value: randomConnector(connectorAdversial) + ", "},
    ]

    let finalText = text
    keys.forEach(item => {
        if (!item.gender) {
            finalText = finalText.replaceAll(item.key, item.value)
        } else if (item.gender === gender) {
            finalText = finalText.replaceAll(item.key, item.value)
        }
    })
    return finalText;
}

function randomConnector(connectors: string[]) {
    return connectors[Math.floor(Math.random() * (connectors.length-1))]
}