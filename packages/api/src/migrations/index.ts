import InitMongo from "services/db/mongodb";
import addUsers from "./1675018128528-add_users";
import addSpaces from "./1675019178596-add_spaces";

(async () => {
  InitMongo();
  // addUsers.up();
  addSpaces.up();
})();
