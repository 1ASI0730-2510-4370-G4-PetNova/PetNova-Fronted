export default class Appointment {
  constructor({ petName = '', appointmentDate = '', client = '', reason = '', contactNumber = '', status = '', eventType = '', notes = '' } = {}) {
    this.petName = petName;
    this.appointmentDate = appointmentDate;
    this.client = client;
    this.reason = reason;
    this.contactNumber = contactNumber;
    this.status = status;
    this.eventType = eventType;
    this.notes = notes;
  }

  static isValid(appointment) {
    return (
      appointment.petName &&
      appointment.appointmentDate &&
      appointment.client &&
      appointment.reason &&
      appointment.contactNumber &&
      appointment.status &&
      appointment.eventType &&
      appointment.notes
    );
  }
}
