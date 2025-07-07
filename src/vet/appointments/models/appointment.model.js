export default class Appointment {
  constructor({
                id = '',
                petId = '',
                petName = '',
                clientId = '',
                clientName = '',
                contactNumber = '',
                startDate = '',
                status = 0,
                type = 0,
              } = {}) {
    this.id = id;
    this.petId = petId;
    this.petName = petName;
    this.clientId = clientId;
    this.clientName = clientName;
    this.contactNumber = contactNumber;
    this.startDate = startDate;
    this.status = status;
    this.type = type;
  }

  static isValid(appointment) {
    return (
        appointment.petId &&
        appointment.clientId &&
        appointment.petName &&
        appointment.clientName &&
        appointment.contactNumber &&
        appointment.startDate !== '' &&
        typeof appointment.status === 'number' &&
        typeof appointment.type === 'number'
    );
  }
}
