type Shop = {
    latitude: number,
    longitude: number,
    name: string,
    city: string,
    items: Array<Item>,
    userId: string
}

type Item = {
    name: string,
    price: number,
    amount: number
}
