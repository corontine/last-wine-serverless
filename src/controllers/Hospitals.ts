import {BuildResponse} from "../helpers/Response";
import {ScanShops} from "../repositories/Restaurant";

export const Scan = async (event: any, context: any) => {
    const parsedBody = JSON.parse(event.body);
    const scanHospitalsResult = await ScanShops(parsedBody.latitude, parsedBody.longtitude, parsedBody.radius);
    return BuildResponse(200, scanHospitalsResult);
};
