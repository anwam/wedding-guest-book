import { Elysia, t } from "elysia";
import { faker } from "@faker-js/faker";

const UsersRequestHeaders = t.Optional(
  t.Object({
    "x-client-id": t.String(),
  }),
);

const PostUsersBody = t.Object({
  name: t.String(),
  email: t.String(),
  password: t.String(),
});

const PostUsersResponse = t.Object({
  message: t.String(),
});

const users = new Elysia().group("/users", (app) =>
  app
    .get("/", () => {
      const randomUsers = Array(20)
        .fill(0)
        .map((_, i) => ({
          id: i + 1,
          name: faker.person.fullName(),
        }));
      return {
        data: [
          ...randomUsers,
          {
            id: randomUsers.length + 1,
            name: "John Doe",
          },
        ],
      };
    })
    .post(
      "/",
      ({ body }) => {
        console.log("User created", body);

        return {
          message: `User ${body.name} created`,
        };
      },
      {
        headers: UsersRequestHeaders,
        body: PostUsersBody,
        response: PostUsersResponse,
      },
    ),
);

export default users;
