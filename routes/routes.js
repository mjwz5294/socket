var express = require('express');
var router = express.Router();
var buglogs = require('./buglogs');

//bug页面
router.get(['/','/buglogs.html'], function(req, res, next) {
     buglogs.router(req, res, next);
});

//保存bug
router.post('/buglogs/add', function(req, res, next) {
    buglogs.add(req, res, next);
});

//删除bug
router.get('/buglogs/delete/:id', function(req, res, next) {
    buglogs.delete(req, res, next);
});

module.exports = router;