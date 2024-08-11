import { Elysia, t } from "elysia";

const messages = new Elysia().group("/messages", (app) =>
  app
    .get("/", ({ headers }) => {
      if (headers["x-client-id"]) {
        console.log("Client ID:", headers["x-client-id"]);
      }

      return {
        message: "Hello World",
      };
    })
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
      }
    )
);

export default messages;
