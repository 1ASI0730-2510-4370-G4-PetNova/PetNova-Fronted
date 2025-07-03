export default class Pet {
  constructor({ name = '', species = '', breed = '', dateOfBirth = '', color = '', gender = '', registrationDate = '', hc = '' } = {}) {
    this.name = name;
    this.species = species;
    this.breed = breed;
    this.dateOfBirth = dateOfBirth;
    this.color = color;
    this.gender = gender;
    this.registrationDate = registrationDate;
    this.hc = hc;
  }

  static isValid(pet) {
    return (
      pet.name &&
      pet.species &&
      pet.breed &&
      pet.dateOfBirth &&
      pet.color &&
      pet.gender &&
      pet.registrationDate &&
      pet.hc
    );
  }
}
