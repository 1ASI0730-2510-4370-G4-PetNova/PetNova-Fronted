export class Appointment {
    constructor({ petName, eventType, time }) {
        this.petName = petName
        this.eventType = eventType
        this.time = time
    }
}

export class VitalStatus {
    constructor({ heartRate, temperature, status }) {
        this.heartRate = heartRate
        this.temperature = temperature
        this.status = status
    }
}

export class CollarStatus {
    constructor({ location, battery, status, lastSeen, steps }) {
        this.location = location
        this.battery = battery
        this.status = status
        this.lastSeen = lastSeen
        this.steps = steps
    }
}
