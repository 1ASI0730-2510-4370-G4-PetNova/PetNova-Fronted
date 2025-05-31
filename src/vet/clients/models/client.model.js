export default class Client {
  constructor({
    fullName = "",
    phone = "",
    email = "",
    address = "",
    status = "",
    hc = "",
  } = {}) {
    this.fullName = fullName;
    this.phone = phone;
    this.email = email;
    this.address = address;
    this.status = status;
    this.hc = hc;
  }

  static isValid(client) {
    return (
      client.fullName &&
      client.phone &&
      client.email &&
      client.address &&
      client.status &&
      client.hc
    );
  }
}
