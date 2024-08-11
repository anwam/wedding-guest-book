import { Elysia } from "elysia";
import messages from "../../backend/messages";
import users from "../../backend/users";

const app = new Elysia({ prefix: "/api" }).use(messages).use(users);

const handler = ({ request }: { request: Request }) => app.handle(request);

export const GET = handler;
export const POST = handler;
export const PUT = handler;
export const DELETE = handler;
export const PATCH = handler;

export type App = typeof app;
