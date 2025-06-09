export default class Pet {
  constructor({
    petName = "",
    animalType = "",
    birdDate = "",
    registrationDate = "",
    animalBreed = "",
    gender = "",
    owner = "",
    hc = "",
    photo = null,
  } = {}) {
    this.petName = petName;
    this.animalType = animalType;
    this.birdDate = birdDate;
    this.registrationDate = registrationDate;
    this.animalBreed = animalBreed;
    this.gender = gender;
    this.owner = owner;
    this.hc = hc;
    this.photo = photo;
  }

  static isValid(pet) {
    return (
      pet.petName &&
      pet.animalType && // Añadido
      pet.animalBreed &&
      pet.gender &&
      pet.birdDate &&
      pet.registrationDate &&
      pet.owner && // Añadido
      pet.hc
    );
  }
}
