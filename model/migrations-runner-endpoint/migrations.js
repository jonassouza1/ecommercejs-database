const { runner } = require("node-pg-migrate");
const { join } = require("node:path");
const database = require("../../infra/database.js");

async function runnerMigrations(req, res) {
  const dbClient = await database.getNewClient();
  const defaultMigrationOptions = {
    dbClient: dbClient,
    dryRun: true,
    dir: join("infra", "migrations"),
    direction: "up",
    verbose: true,
    migrationsTable: "pgmigrations",
  };
  if (req.method === "GET") {
    const pedingMigrations = await runner(defaultMigrationOptions);
    await dbClient.end();
    res.status(200).json(pedingMigrations);
  }
  if (req.method === "POST") {
    const migratedMigrations = await runner({
      ...defaultMigrationOptions,
      dryRun: false,
    });
    await dbClient.end();
    if (migratedMigrations.length > 0) {
      return res.status(201).json(migratedMigrations);
    }
    res.status(200).json(migratedMigrations);
  }
  return res.status(405).end();
}
module.exports = { runnerMigrations };
