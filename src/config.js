const argv = require('minimist')(process.argv.slice(2));

export const PORT = argv.PORT || 3000;
export const MONGO_URI = argv.MONGO_URI || 'mongodb://localhost:27017/rio-catalog';
export const AUTH_SERVICE_URI = argv.AUTH_SERVICE_URI || 'http://localhost:3010/api/v1';
export const NO_AUTH = argv.NO_AUTH || false;

console.info(`PORT: ${PORT}`);
console.info(`MONGO_URI: ${MONGO_URI}`);
console.info(`NO_AUTH: ${NO_AUTH}`);
console.info(`AUTH_SERVICE_URI: ${AUTH_SERVICE_URI}`);