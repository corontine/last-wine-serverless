import {GetShop, ScanShops} from "../../repositories/Shop";

test('shops can be searched with geolocation', async() => {
    const berlinGeoLocation = [52.50, 13.40];
    const berlinShops = await ScanShops(berlinGeoLocation[0], berlinGeoLocation[1], 10000);
    console.log(berlinShops);
});


test('shops can be queried with hash and range keys', async () => {
    const hashKey = 511883;
    const rangeKey = "hzseuwinis";
    const shop = await GetShop(hashKey, rangeKey);
    console.log(shop);
});
