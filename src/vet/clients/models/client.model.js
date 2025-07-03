export default class Client {
  constructor({
    firstName = "",
                lastName = "",
                email = "",
    phone = "",
    address = "",
    status = "",
    hc = "",
  } = {}) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.phone = phone;
    this.address = address;
    this.status = status;
    this.hc = hc;
  }

  static isValid(client) {
    return (
      client.firstName &&
      client.lastName &&
      client.phone &&
      client.email &&
      client.address &&
      client.status &&
      client.hc
    );
  }
}
