import { Patient, WeeklyReport, DashboardStats } from '../models/dashboard.model.js'

export const getDashboardData = async () => {
    return {
        stats: new DashboardStats({
            totalClients: 8522,
            totalStaff: 352,
            totalRooms: 340,
        }),
        latestPatients: [
            new Patient({ id: 'AN345', kind: 'Dog', owner: 'Luis T.', city: 'Lima', date: '10.04.2012', status: 'In work' }),
            new Patient({ id: 'LA386', kind: 'Cat', owner: 'Ern Y.', city: 'Tacna', date: '19.06.2012', status: 'In work' }),
            new Patient({ id: 'RA853', kind: 'Dog', owner: 'Tyrn T.', city: 'Piura', date: '11.05.2029', status: 'In work' }),
            new Patient({ id: 'CH234', kind: 'Rabbit', owner: 'Maria P.', city: 'Cusco', date: '22.03.2023', status: 'In work' }),
        ],
        weeklyReport: new WeeklyReport({
            income: 1542.25,
            outcome: 352.25,
        }),
        notifications: ['The client Rony solicited a review.']
    }
}
