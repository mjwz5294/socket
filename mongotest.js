var mongoose = require('mongoose'),
    DB_URL = 'mongodb://localhost:27017/mongoosesample';

/**
 * 找不到bson的解决办法：
 * https://stackoverflow.com/questions/37654497/cannot-find-module-mongodb-node-modules-bson/37655111#37655111?newreg=851ad48bee1243f7abc4aa6d511c0544
 */

/**
 * 连接
 */
mongoose.connect(DB_URL);

/**
 * 连接成功
 */
mongoose.connection.on('connected', function () {
    console.log('Mongoose connection open to ' + DB_URL);
});

/**
 * 连接异常
 */
mongoose.connection.on('error',function (err) {
    console.log('Mongoose connection error: ' + err);
});

/**
 * 连接断开
 */
mongoose.connection.on('disconnected', function () {
    console.log('Mongoose connection disconnected');
});