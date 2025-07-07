export default class Client {
  constructor({
                id = null,
                firstName = "",
                lastName = "",
                email = "",
                phone = "",
              } = {}) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.phone = phone;
  }

  static isValid(client) {
    return client.firstName && client.lastName && client.phone && client.email;
  }
}
