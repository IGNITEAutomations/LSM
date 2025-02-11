export default function capitalizeFirstLetter(sentence: string) {
    return sentence?.split(" ")?.map(word => {
        return word?.charAt(0)?.toUpperCase() + word?.slice(1)
    }).join(" ")
}