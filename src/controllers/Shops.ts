import {BuildResponse} from "../helpers/Response";
import {CreateShop, DeleteShop, GetShop, ScanShops} from "../repositories/Shop";

export const Scan = async (event: any, context: any) => {
    const parsedBody = JSON.parse(event.body);
    const foundShops = await ScanShops(parseFloat(parsedBody.latitude), parseFloat(parsedBody.longitude), parseInt(parsedBody.radiusInMeters));
    return BuildResponse(200, foundShops);
};

export const Get = async (event: any, context: any) => {
    const parsedBody = JSON.parse(event.body);
    const shop = await GetShop(parseInt(parsedBody.hashKey), parsedBody.rangeKey);
    return BuildResponse(200, shop);
};

export const Create = async(event: any, context: any) => {
    const parsedBody = JSON.parse(event.body);
    const shopInDynamo = await CreateShop(parsedBody);
    return BuildResponse(200, shopInDynamo);
};

export const Delete = async(event: any, context: any) => {
    const parsedBody = JSON.parse(event.body);
    const deleteResult = await DeleteShop(parseInt(parsedBody.hashKey), parsedBody.rangeKey);
    return BuildResponse(200, deleteResult);
};
