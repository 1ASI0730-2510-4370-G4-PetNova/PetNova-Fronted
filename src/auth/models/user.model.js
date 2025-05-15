export default class User {
  constructor({ email = '', user = '', password = '', role = ''} = {}) {
    this.email = email;
    this.user = user;
    this.password = password;
    this.role = role;
  }

  static isValid(user) {
    return (
      user.email &&
      user.user &&
      user.password &&
      user.role
    );
  }
}
