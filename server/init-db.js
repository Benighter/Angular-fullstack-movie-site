const { db } = require('./config/DB_config');
const fs = require('fs');
const path = require('path');

// Read and execute SQL initialization files
const initDb = async () => {
    try {
        const initSql = fs.readFileSync(path.join(__dirname, 'SQL - Query', 'init_database.sql'), 'utf8');
        const createUserWatchlistSql = fs.readFileSync(path.join(__dirname, 'SQL - Query', 'createUserWatchlistTable.sql'), 'utf8');
        
        // Execute initialization queries
        await new Promise((resolve, reject) => {
            db.exec(initSql, (err) => {
                if (err) reject(err);
                else resolve();
            });
        });

        await new Promise((resolve, reject) => {
            db.exec(createUserWatchlistSql, (err) => {
                if (err) reject(err);
                else resolve();
            });
        });

        console.log('Database initialized successfully');
    } catch (error) {
        console.error('Error initializing database:', error);
    }
};

initDb().then(() => {
    console.log('Database initialization complete');
    process.exit(0);
}).catch((error) => {
    console.error('Failed to initialize database:', error);
    process.exit(1);
}); 