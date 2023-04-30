import { faker } from "@faker-js/faker";
import { SpaceVisibility } from "interfaces/space.interface";
import spaceModel from "models/space";
import userModel from "models/user";
import { Types } from "mongoose";

async function up() {
  const allSpaces = [];
  try {
    const users = await userModel.find();
    for (let i = 0; i < 100; i++) {
      const randomNumber = Math.floor(Math.random() * users.length);
      allSpaces.push({
        adminId: users[randomNumber],
        spaceName: faker.company.name(),
        spaceDescription: faker.lorem.sentence(),
      });
    }
    await spaceModel.insertMany(allSpaces);
    await spaceModel.create({
      adminId: new Types.ObjectId(),
      spaceName: "Public Community",
      spaceDescription: "Public Community created for demonstration purposes",
      visibility: SpaceVisibility.PUBLIC,
    });
  } catch (err) {
    console.log(err);
    throw err;
  }
}

async function down() {
  try {
    await spaceModel.collection.drop();
  } catch (err) {
    console.log(err);
    throw err;
  }
}

export default { up, down };
