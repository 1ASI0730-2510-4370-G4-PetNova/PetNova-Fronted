export default class Pet {
  constructor({
                id = null,
                name = "",
                breed = "",
                dateOfBirth = "",
                dateRegistered = "",
                gender = 0,
                clientId = ""
              } = {}) {
    this.id = id;
    this.name = name;
    this.breed = breed;
    this.dateOfBirth = dateOfBirth;
    this.dateRegistered = dateRegistered;
    this.gender = gender;
    this.clientId = clientId;
  }

  static isValid(pet) {
    return pet.name && pet.breed && pet.dateOfBirth && pet.clientId;
  }
}
