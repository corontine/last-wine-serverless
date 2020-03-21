import {BuildResponse} from "../helpers/Response";
import {CreateShop, GetShop, ScanShops} from "../repositories/Shop";

export const Scan = async (event: any, context: any) => {
    const parsedBody = JSON.parse(event.body);
    const foundShops = await ScanShops(parsedBody.latitude, parsedBody.longtitude, parsedBody.radius);
    return BuildResponse(200, foundShops);
};

export const Get = async (event: any, context: any) => {
    const parsedBody = JSON.parse(event.body);
    const shop = await GetShop(parsedBody.hashKey, parsedBody.rangeKey);
    return BuildResponse(200, shop);
};

export const Create = async(event: any, context: any) => {
    const parsedBody = JSON.parse(event.body);
    const shopInDynamo = await CreateShop(parsedBody);
    return BuildResponse(200, shopInDynamo);
};
