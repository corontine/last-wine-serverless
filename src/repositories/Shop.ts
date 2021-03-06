import {DynamoDB} from 'aws-sdk';
import {GeoDataManager, GeoDataManagerConfiguration} from "dynamodb-geo";

const tableName = 'last-wine-dev';
const ddb = new DynamoDB();
const config = new GeoDataManagerConfiguration(ddb, tableName);
config.hashKeyLength = 6;
const shopsTableManager = new GeoDataManager(config);
const docClient = new DynamoDB.DocumentClient();

export const ScanShops = async (lat: number, long: number, radiusInMeters: number) => {
    const scanResults = await shopsTableManager.queryRadius({
        RadiusInMeter: radiusInMeters,
        CenterPoint: {
            latitude: lat,
            longitude: long
        }
    });
    // @ts-ignore
    const unmarshalledResults = scanResults.map(DynamoDB.Converter.unmarshall);
    const filteredResults = unmarshalledResults.map((shop: any)=>(
        {
            city: shop.city,
            longitude: shop.longitude,
            latitude: shop.latitude,
            name: shop.name,
            phone: shop.phone,
            website: shop.website,
            address: shop.address,
            items: shop.items
        }
        ));


    return filteredResults;
};

export const CreateShop = async (shop: Shop) => {
    const shopDynamoItem = {
        latitude: shop.latitude,
        longitude: shop.longitude,
        name: shop.name,
        city: shop.city,
        website: shop.website,
        phone: shop.phone,
        address: shop.address,
        items: shop.items
    };

    const createShopResult = await shopsTableManager.putPoint({
        RangeKeyValue: {S: Math.random().toString(36).substring(2, 15)}, // Use this to ensure uniqueness of the hash/range pairs.
        GeoPoint: { // An object specifying latitutde and longitude as plain numbers. Used to build the geohash, the hashkey and geojson data
            latitude: shop.latitude,
            longitude: shop.longitude
        },
        PutItemInput: { // Passed through to the underlying DynamoDB.putItem request. TableName is filled in for you.
            Item: DynamoDB.Converter.marshall(shopDynamoItem)
            // ... Anything else to pass through to `putItem`, eg ConditionExpression
        }
    }).promise();


    // @ts-ignore
    return DynamoDB.Converter.unmarshall(createShopResult.$response.request.params.Item);
};

export const GetShop = async (hashKey: number, rangeKey: string) => {
    const params = indexParams(hashKey, rangeKey);
    const shopInDynamo = await docClient.get(params).promise();
    return shopInDynamo;
};

const indexParams = (hashKey: number, rangeKey: string) => (
    {
        "TableName": tableName,
        "Key": {
            "hashKey": hashKey,
            "rangeKey": rangeKey
        }
    }
);


export const DeleteShop = async (hashKey: number, rangeKey: string) => {
    const params = indexParams(hashKey, rangeKey);
    const deleteResult = await docClient.delete(params).promise();
    return deleteResult.toString();
};

export const UpdateShopItems = async (hashKey: string, rangeKey: string, newShop: Shop) => {
    // TODO: Get real capacity by fixing GetHospitalCapacityLogs
    // function. Currently it's erroring out due to hash key issues.


    // Lets assume the merged hospitalcapacitylog is as the following for now

    // const hospitalCapacityLogs: Array<HospitalCapacityLog> = [
    //     {bed: 10, ventilator: 10, timestamp: new Date()},
    //     {bed: 10, ventilator: 10, timestamp: new Date()},
    //     {bed: 10, ventilator: 10, timestamp: new Date()},
    //     {bed: 10, ventilator: 10, timestamp: new Date()},
    //     {bed: 10, ventilator: 10, timestamp: new Date()},
    //     {bed: 10, ventilator: 10, timestamp: new Date()}
    // ];
    //
    const putParams: any = {
        TableName: tableName,
        Key: {
            hashKey: hashKey,
            rangeKey: rangeKey
        },
    };

    docClient.put(putParams);
};
