type Shop = {
    latitude: number,
    longitude: number,
    name: string,
    city: string,
    address: string,
    phone: string,
    website: string,
    items: Array<Item>
}

type Item = {
    name: string,
    price: number,
    amount: number
}
