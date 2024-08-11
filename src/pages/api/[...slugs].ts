import { Elysia, t } from "elysia";

const messages = new Elysia().group("/messages", (app) =>
  app
    .get(
      "/",
      () => {
        return {
          message: "Hello World",
        };
      },
      {
        headers: t.Object({
          "x-client-id": t.String(),
        }),
      }
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
      }
    )
);

const users = new Elysia().group("/users", (app) =>
  app.get("/", () => {
    return {
      data: [],
    };
  })
);

const app = new Elysia({ prefix: "/api" }).use(messages).use(users);

const handler = ({ request }: { request: Request }) => app.handle(request);

export const GET = handler;
export const POST = handler;
export type App = typeof app;
