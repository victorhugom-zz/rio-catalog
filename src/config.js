const argv = require('minimist')(process.argv.slice(2));

export const PORT = argv.PORT || 3000;;
export const MONGO_URI = argv.MONGO_URI || 'mongodb://localhost:27017/rio-catalog';
export const AUTH_SERVICE_URI= argv.AUTH_SERVICE_URI || 'http://localhost:3010/api/v1';