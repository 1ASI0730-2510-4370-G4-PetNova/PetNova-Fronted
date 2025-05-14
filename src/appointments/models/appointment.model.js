export default class Appointment {
  constructor({ petName = '', startDate = '', client = '', contactNumber = '', status = '', eventType = '' } = {}) {
    this.petName = petName;
    this.startDate = startDate;
    this.client = client;
    this.contactNumber = contactNumber;
    this.status = status;
    this.eventType = eventType;
  }

  static isValid(appointment) {
    return (
      appointment.petName &&
      appointment.startDate &&
      appointment.client &&
      appointment.contactNumber &&
      appointment.status &&
      appointment.eventType
    );
  }
}
