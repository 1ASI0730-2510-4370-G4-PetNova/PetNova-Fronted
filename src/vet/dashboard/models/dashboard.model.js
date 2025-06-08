export class Patient {
    constructor({ id, kind, owner, city, date, status }) {
        this.id = id
        this.kind = kind
        this.owner = owner
        this.city = city
        this.date = date
        this.status = status
    }
}

export class WeeklyReport {
    constructor({ income, outcome }) {
        this.income = income
        this.outcome = outcome
    }
}

export class DashboardStats {
    constructor({ totalClients, totalStaff, totalRooms }) {
        this.totalClients = totalClients
        this.totalStaff = totalStaff
        this.totalRooms = totalRooms
    }
}
