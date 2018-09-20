
module.exports = {
    router: function(req, res, next) {
        mgrMySQL.query('select * from buglogs', null, function (error, results, fields) {
            // console.log(JSON.stringify(results));
            res.render('buglogs', {
                title: '欢迎客官大人',
                buglog: results,
                oneUser: false
            })
        });
    }
    ,
    add:function(req, res, next){
        // var user = req.body.buglog;
        // console.log(JSON.stringify(req.body));

        var user = {
            bug_brief:req.body.bug_brief,
            bug_detail:req.body.bug_detail,
        };

        mgrMySQL.query('INSERT INTO buglogs SET ?', user, function (error, results, fields) {
            if (!error){
                console.log('数据保存成功')
            }else {
                console.log(error);
            }
        });

    },
    delete:function(req, res, next){
        var id = req.params.id;
        // console.log(JSON.stringify(req.params));
        if (id) {

            mgrMySQL.query('DELETE FROM buglogs where bug_id=?', parseInt(id), function (error, results, fields) {
                if (!error){
                    console.log('数据删除成功')
                    return res.redirect('/buglogs.html')
                }else {
                    console.log(error)
                }
            });
        }
    }
};


