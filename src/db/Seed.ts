// import {DynamoDB} from 'aws-sdk';
import * as Chance from 'chance';
// import {addDays} from "date-fns";
// import {CreateShop} from "../repositories/Shop";

import {CreateShop} from "../repositories/Shop";

import * as shopsSeeds from "./Seed/shops.json";

const chance = new Chance();
export const Handler = async (event: any, context: any) => {

    const shops = shopsSeeds.map(shopsSeed => (
        {
            latitude: shopsSeed.location.lat,
            longitude: shopsSeed.location.lng,
            name: chance.company(),
            city: chance.city(),
            address: chance.address(),
            items: []
        } as Shop
    ));
    for(const shop of shops) {
        const createShopResult = await CreateShop(shop);
        console.log(createShopResult);
    }
};
