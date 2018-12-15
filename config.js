'use strict';
exports.DATABASE_URL = process.env.DATABASE_URL || 'mongodb://jobsearch-user:Password1@ds043982.mlab.com:43982/carrerline';

// mongodb://jobsearch-user:Password1@ds037087.mlab.com:37087/jwt-jobsearch
exports.TEST_DATABASE_URL = process.env.TEST_DATABASE_URL || 'mongodb://localhost/jwt-auth-demo';
exports.PORT = process.env.PORT || 8080;
exports.JWT_SECRET = process.env.JWT_SECRET || 'soccer';
exports.JWT_EXPIRY = process.env.JWT_EXPIRY || '7d';