import { faker } from "@faker-js/faker";
import { Elysia, t } from "elysia";

const messages = new Elysia().group("/messages", (app) =>
  app
    .get(
      "/",
      () => {
        const messages = Array(20)
          .fill(0)
          .map(() => ({
            message: faker.lorem.sentences(2, "\n"),
            user: faker.person.fullName(),
          }));
        return {
          data: messages,
        };
      },
      {
        response: t.Object({
          data: t.Array(
            t.Object({
              message: t.String(),
              user: t.String({ optional: true }),
            }),
          ),
        }),
      },
    )
    .post(
      "/",
      ({ body }) => {
        return {
          message: `message from ${body.name}: ${body.message}`,
        };
      },
      {
        body: t.Object({
          name: t.String(),
          message: t.String(),
        }),
        response: {
          message: t.String(),
        },
      },
    ),
);

export default messages;
