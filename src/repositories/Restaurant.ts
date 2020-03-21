import {DynamoDB} from 'aws-sdk';
import {GeoDataManager, GeoDataManagerConfiguration} from "dynamodb-geo";


const tableName = 'hospital_map-dev';
const ddb = new DynamoDB();
const config = new GeoDataManagerConfiguration(ddb, tableName);
config.hashKeyLength = 6;
const hospitalTableManager = new GeoDataManager(config);
const docClient = new DynamoDB.DocumentClient();


export const ScanRestaurant = async (lat: number, long: number, radiusInMeters: number) => {
    const scanResults = await hospitalTableManager.queryRadius({
        RadiusInMeter: radiusInMeters,
        CenterPoint: {
            latitude: lat,
            longitude: long
        }
    });

    // @ts-ignore
    return scanResults.map(DynamoDB.Converter.unmarshall);
};

export const CreateRestaurant = async (hospital: Hospital) => {


    const createRestaurantResult = await hospitalTableManager.putPoint({
        RangeKeyValue: {S: Math.random().toString(36).substring(2, 15)}, // Use this to ensure uniqueness of the hash/range pairs.
        GeoPoint: { // An object specifying latitutde and longitude as plain numbers. Used to build the geohash, the hashkey and geojson data
            latitude: hospital.lat,
            longitude: hospital.long
        },
        PutItemInput: { // Passed through to the underlying DynamoDB.putItem request. TableName is filled in for you.
            Item: { // The primary key, geohash and geojson data is filled in for you
                lat: {S: hospital.lat.toString()}, // Specify attribute values using { type: value } objects, like the DynamoDB API.
                long: {S: hospital.long.toString()},
                name: {S: hospital.name},
                city: {S: hospital.city},
                region: {S: hospital.region},
                // @ts-ignore
                capacity_logs: {
                    L: hospital.capacity_logs.map((capacity_log) => (
                        {
                            M: {
                                bed: {N: capacity_log.bed.toString()},
                                ventilator: {N: capacity_log.ventilator.toString()},
                                timestamp: {S: capacity_log.timestamp.toISOString()}
                            }
                        }
                    ))
                }
            },
            // ... Anything else to pass through to `putItem`, eg ConditionExpression
        }
    }).promise();
    return createRestaurantResult;
};

// type HospitalCapacityLog = {
//     TableName: string,
//     Item:{
//         senderDeviceId: string,
//         seenDeviceId: string,
//         timestamp: string
//     }
// }

export const GetRestaurantItems = async (hashKey: number, rangeKey: string) => {

};

export const GetHospitalCapacityLogs = async (hashKey: number, rangeKey: string) => {
    const params = {
        "TableName": tableName,
        "KeyConditionExpression": "hashKey = :hashKey AND rangeKey = :rangeKey",
        "ExpressionAttributeValues": {
            ":hashKey": hashKey,
            ":rangeKey": rangeKey
        }
    };
    const hospitalCapacityLogs = await docClient.query(params).promise();
    console.log(hospitalCapacityLogs);
    return hospitalCapacityLogs;
};

export const UpdateHospitalCapacityLogs = async (hashKey: string, rangeKey: string, newCapacityLog: HospitalCapacityLog) => {
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
