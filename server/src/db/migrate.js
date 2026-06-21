import { readFileSync } from 'fs';
import { createConnection } from 'mysql2/promise';
import 'dotenv/config';

async function migrate() {
  const connection = await createConnection({
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '3306'),
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    multipleStatements: true,
  });

  console.log('Connected to MySQL. Running schema...');

  const schema = readFileSync(new URL('./schema.sql', import.meta.url), 'utf-8');
  await connection.query(schema);
  console.log('Schema created successfully.');

  console.log('Running seed data...');
  const seed = readFileSync(new URL('./seed.sql', import.meta.url), 'utf-8');
  await connection.query(seed);
  console.log('Seed data inserted successfully.');

  await connection.end();
  console.log('Migration complete!');
}

migrate().catch((err) => {
  console.error('Migration failed:', err.message);
  process.exit(1);
});
