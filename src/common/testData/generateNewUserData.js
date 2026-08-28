import { faker } from '@faker-js/faker';

export function generateNewUserData() {
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();

  const user = {
    username: `${firstName}_${lastName}`.replaceAll(`'`),
    email: faker.internet.email(),
    password: faker.internet.password(),
  };

  return user;
}
