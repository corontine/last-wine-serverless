import {GetHospitalCapacityLogs, ScanHospitals} from "../../repositories/Restaurant";

test('hospitals can be searched with geolocation', async() => {
    const berlinGeoLocation = [52.50, 13.40];
    const berlinHospitals = await ScanHospitals(berlinGeoLocation[0], berlinGeoLocation[1], 10000);
    console.log(berlinHospitals);
});


test('hospitals can be queried with hash and range keys', async () => {
    const hashKey = 516346;
    const rangeKey = "0apwckwv7k6";
    const hospitalCapacityLogs = await GetHospitalCapacityLogs(hashKey, rangeKey);
    console.log(hospitalCapacityLogs);
});
