// import {DynamoDB} from 'aws-sdk';
import * as Chance from 'chance';
import {addDays} from "date-fns";
import {CreateShop} from "../repositories/Shop";

export const Handler = async (event: any, context: any) => {
    const space = [...Array(100)];
    const origin = [52.50, 13.40];
    const change = new Chance();
    const yDistance = 0.02;
    const xDistance = 0.05;
    const shops = space.map((t) => {
        const shop: any = {
            lat: change.latitude({min:origin[0]-yDistance, max:origin[0]+yDistance}) ,
            long: change.longitude({min: origin[1]-xDistance, max: origin[1]+xDistance}),
            name: change.company(),
            city: change.city(),
            region: change.city(),
            capacity_logs: [
                {
                    bed: change.integer({min: 0, max: 1000}),
                    ventilator: change.integer({min: 0, max: 100}),
                    timestamp: addDays(new Date(), change.integer({min:-10, max: 0}))
                }
            ]
        };
        return shop;
    });

    for(const shop of shops) {
        const createShopResult = await CreateShop(shop);
        console.log(createShopResult);
    }
};
