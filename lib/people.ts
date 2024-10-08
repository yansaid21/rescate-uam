
export async function getInfoPeople() {
    const PERSON = "https://api.generadordni.es/person/username"

    const rawData = await fetch(PERSON)
    const json = await rawData.json()

    const { data: { items } } =json

    return items.map((item: any) => {
        const {username} = item


        return {
            username
        }
    })
}