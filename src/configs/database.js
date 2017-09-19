 const config = {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    db_name: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: 5432,
    dialect: 'postgres',
    pool: {
        maxConnections: 5,
        minConnections: 0,
        maxIdleTime: 10000 // seconds
    },
    logging: false,
    force: false,
    timezone: '+00:00',
};