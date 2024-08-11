import { Elysia, t } from "elysia";

const UsersRequestHeaders = t.Optional(
  t.Object({
    "x-client-id": t.String(),
  })
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
    .get(
      "/",
      ({ headers }) => {
        return {
          data: [
            {
              id: 1,
              name: "John Doe",
              ...(headers["x-client-id"] && {
                "x-client-id": headers["x-client-id"],
              }),
            },
          ],
        };
      },
      {
        headers: UsersRequestHeaders,
      }
    )
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
      }
    )
);

export default users;
