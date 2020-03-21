type Shop = {
    lat: number,
    long: number,
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
