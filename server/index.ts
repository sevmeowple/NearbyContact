// 初始化sqlite
import { Database } from "bun:sqlite";
import {authRoutes} from "./routes/authRoutes";
import {userRoutes} from "./routes/userRoutes";

const db = new Database("app.sqlite");

db.run("CREATE TABLE IF NOT EXISTS tbl_users (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, email TEXT, password TEXT)");

// server实例
const server = Bun.serve({
    fetch(req) {
      const url = new URL(req.url);
      const method = req.method;
  
      const routes = [
        ...authRoutes(),
        ...userRoutes(),
      ];
  
      for (const route of routes) {
        if (route.method === method && url.pathname === route.path) {
          if (route.middleware) {
            return route.middleware.reduceRight((prev, mw) => mw(req, prev, () => prev), () => route.handler(req));
          }
          return route.handler(req);
        }
      }
      return new Response('Not found', { status: 404 });
    },
  });
console.log(`Listening on ${server.hostname}:${server.port}`);