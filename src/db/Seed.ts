// import {DynamoDB} from 'aws-sdk';
import * as Chance from 'chance';
// import {addDays} from "date-fns";
// import {CreateShop} from "../repositories/Shop";

import {CreateShop} from "../repositories/Shop";

import * as shopsSeeds from "./Seed/subset.json";

const chance = new Chance();
export const Handler = async (event: any, context: any) => {

    const shops = shopsSeeds.map(shopsSeed => {
        const shop = {
            latitude: shopsSeed.location.lat,
            longitude: shopsSeed.location.lng,
            name: shopsSeed.name,
            city: chance.city(),
            address: chance.address(),
            website: chance.domain(),
            phone: chance.phone(),
            items: Array<Item>
        };
        const possibleItems = ["delivery","wine","water","antipasti"].map((itemName)=>({name: itemName}));

        shop.items = shuffle(possibleItems).splice(0, chance.natural({min: 0, max: 3}));
        return shop;
    });
    for(const shop of shops) {
        const createShopResult = await CreateShop(shop);
        console.log(createShopResult);
    }
};

function shuffle(a: any) {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}
