import { Elysia } from "elysia";

const app = new Elysia()
  .get("/", async () => {
    let backendService = Bun.env.BACKEND;

    if (!backendService) throw "Unable to contact backend service";

    let response = await fetch(backendService);

    let json = await response.json();
    let ipAddress = json.ipAddress;
    return { appName: "Example App", ipAddress: ipAddress };
  })
  .listen(Bun.env.PORT ?? 3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
