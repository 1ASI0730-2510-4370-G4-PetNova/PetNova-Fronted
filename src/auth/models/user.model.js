export default class User {
  constructor({ email = '', username = '', password = '', role = ''} = {}) {
    this.email = email;
    this.username = username;
    this.password = password;
    this.role = role;
  }

  static isValid(user) {
    return (
      user.email &&
      user.username &&
      user.password &&
      user.role
    );
  }
}