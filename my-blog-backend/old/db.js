const fs = require("fs/promises");
const path = require("path");

class DtatabaseConnection {
  constructor(DbUrl) {
    this.db = null;
    this.dbURL = DbUrl;
  }
  async readDB() {
    const dbStr = await fs.readFile(this.dbURL, { encoding: "utf-8" });
    this.db = JSON.parse(dbStr);
  }

  async writeDB() {
    if (this.db) {
      await fs.writeFile(this.dbURL, JSON.stringify(this.db));
    }
  }
  async getDB() {
    if (this.db) {
      return this.db;
    }
    await this.readDB();
    return this.db;
  }
}

const connection = new DtatabaseConnection(path.resolve(process.env.DB_URL));

module.exports = connection;
