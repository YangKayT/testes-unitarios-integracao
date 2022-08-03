import { InMemoryUsersRepository } from "../../repositories/in-memory/InMemoryUsersRepository";
import { CreateUserUseCase } from "../createUser/CreateUserUseCase";
import { ICreateUserDTO } from "../createUser/ICreateUserDTO";
import { ShowUserProfileUseCase } from "./ShowUserProfileUseCase";

let usersRepositoryInMemory: InMemoryUsersRepository;
let createUserUseCase: CreateUserUseCase;
let showUserProfileUseCase: ShowUserProfileUseCase;

describe("Show User Profile", () => {
  beforeEach(() => {
    usersRepositoryInMemory = new InMemoryUsersRepository();
    createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
    showUserProfileUseCase = new ShowUserProfileUseCase(
      usersRepositoryInMemory
    );
  });

  it("Should be return a user", async () => {
    const user: ICreateUserDTO = {
      name: "ts user",
      email: "test@tes.ts",
      password: "abc123",
    };

    const userCreated = await createUserUseCase.execute(user);
    const user_id = <string>userCreated.id;

    const userFound = await showUserProfileUseCase.execute(user_id);

    expect(userFound).toHaveProperty("name", user.name);
    expect(userFound).toHaveProperty("email", user.email);
  });
});
