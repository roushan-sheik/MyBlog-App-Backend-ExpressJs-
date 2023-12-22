const { faker } = require("@faker-js/faker");
const User = require("./Schema/user");

const sendFaker = (noUsers = 5) => {
  for (let i = 0; i <= noUsers; i++) {
    const user = new User({
      name: faker.person.fullName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
    });
    user.save();
  }
};
module.exports = { sendFaker };
