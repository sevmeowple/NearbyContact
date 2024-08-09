// bun 链接sqlite数据库
import { Database } from "bun:sqlite";

const db = new Database("test.sqlite");

// 创建 messages 表
db.run("CREATE TABLE IF NOT EXISTS messages (id INTEGER PRIMARY KEY AUTOINCREMENT, message TEXT)");

// 插入一条消息记录
db.run("INSERT INTO messages (message) VALUES ('Hello world')");

// 查询并获取插入的消息
const query = db.query("SELECT message FROM messages WHERE id = 1");
const result = query.get(); // => { message: "Hello world" }

console.log(result);