export default class Pet {
  constructor({ petName = '', birdDate = '', registrationDate = '', animalBreed = '', gender = '', hc = '' } = {}) {
    this.petName = petName;
    this.birdDate = birdDate;
    this.registrationDate = registrationDate;
    this.animalBreed = animalBreed;
    this.gender = gender;
    this.hc = hc;
  }

  static isValid(pet) {
    return (
      pet.petName &&
      pet.birdDate &&
      pet.registrationDate &&
      pet.animalBreed &&
      pet.gender &&
      pet.hc
    );
  }
}
