import { Appointment, VitalStatus, CollarStatus } from '../models/dashboard.model.js'

export const getDashboardData = async () => {
    return {
        appointments: [
            new Appointment({ eventType: 'Check-up', petName: 'Wartortle', time: '8:00 - 9:00 AM' }),
            new Appointment({ eventType: 'Surgery', petName: 'Ratata', time: '10:00 - 11:00 AM' }),
            new Appointment({ eventType: 'Vaccination', petName: 'Pompinchu', time: '1:00 - 2:00 PM' })
        ],
        vitalStatus: new VitalStatus({ heartRate: '70Lpm', temperature: '37.5°C', status: 'medium' }),
        collarStatus: new CollarStatus({
            location: 'Av. los Chamos block 4',
            battery: '59%',
            status: 'online',
            lastSeen: '2 hours ago',
            steps: 500
        }),
        realTimeLocation: {
            latitude: '-6.2042',
            longitude: '-75.5670',
            timestamp: '2025-06-02 10:00 AM',
            status: 'Active'
        }
    }
}

