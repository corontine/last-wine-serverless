// There is a specific migration process for geo lookup stuff in dynamodb.
// So we will do it here.

import {DynamoDB} from 'aws-sdk';
import {GeoDataManagerConfiguration, GeoTableUtil} from "dynamodb-geo";

export const Handler = async (event:any, context:any) => {
    const ddb = new DynamoDB();
    const config = new GeoDataManagerConfiguration(ddb, `hospital_map-dev`);
    config.hashKeyLength = 6;


    // TODO: Switch dynamodb to PAY_PER_REQUEST. It didn't worked out for some reason
    // and I don't want to waste more time.
    const createTableInput = GeoTableUtil.getCreateTableRequest(config);
    // createTableInput.ProvisionedThroughput.ReadCapacityUnits = 1;
    // createTableInput.ProvisionedThroughput.WriteCapacityUnits = 1;
    // createTableInput.BillingMode = "PAY_PER_REQUEST";


    const createTableResult = await  ddb.createTable(createTableInput).promise();
    console.log(createTableResult);
};

