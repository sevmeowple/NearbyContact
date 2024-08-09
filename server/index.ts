import {authRoutes} from "./routes/authRoutes";
import {userRoutes} from "./routes/userRoutes";

const server = Bun.serve({
    async fetch(req) {
      const url = new URL(req.url);
      const method = req.method;
  
      const routes = [
        ...authRoutes(),
        ...userRoutes(),
      ];
  
      for (const route of routes) {
        if (route.method === method && url.pathname === route.path) {
          try {
            if (route.middleware) {
              // Apply middlewares
              const response = await route.middleware.reduceRight(
                (prev, mw) => mw(req, prev, () => prev),
                () => route.handler(req)
              );
              return response;
            } else {
              return route.handler(req);
            }
          } catch (error) {
            return new Response('Internal Server Error', { status: 500 });
          }
        }
      }
      return new Response('Not found', { status: 404 });
    },
  });
console.log(`Listening on ${server.hostname}:${server.port}`);