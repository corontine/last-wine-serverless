type HospitalCapacityLog = {
    bed: number,
    ventilator: number,
    timestamp: Date
}

type Hospital = {
    lat: number,
    long: number,
    name: string,
    city: string,
    region: string,
    capacity_logs: Array<HospitalCapacityLog>
}
