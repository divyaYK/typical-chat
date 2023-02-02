import { generateRandomIntegers } from "helpers/generateRandomIntegers";
import userModel from "models/user";
import { faker } from "@faker-js/faker";

async function up() {
  const allUsers = [];
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < 1772; i++) {
    allUsers.push({
      avatar: faker.image.avatar(),
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      email: faker.internet.email(),
      verified: true,
      password: faker.internet.password(),
      uId: generateRandomIntegers(12),
    });
  }
  try {
    await userModel.insertMany(allUsers);
  } catch (err) {
    console.log(err);
    throw err;
  }
}

async function down() {
  try {
    await userModel.collection.drop();
  } catch (err) {
    console.log(err);
    throw err;
  }
}

export default { up, down };
