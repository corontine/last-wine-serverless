import {ScanHospitals} from "../repositories/Restaurant";
import {BuildResponse} from "../helpers/Response";

export const Scan = async (event: any, context: any) => {
    const parsedBody = JSON.parse(event.body);
    const scanHospitalsResult = await ScanHospitals(parsedBody.latitude, parsedBody.longtitude, parsedBody.radius);
    return BuildResponse(200, scanHospitalsResult);
};
