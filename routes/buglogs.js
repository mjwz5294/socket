var UsersModels = require('../models/users'); //数据操作对象
module.exports = {
    router: function(req, res, next){
        UsersModels.find(function(err, user) {
            if (err) {
                console.log(err);
            }
            res.render('buglogs', {
                title: '欢迎客官大人',
                buglog: user,
                oneUser: false
            })
        })
    },
    add:function(req, res, next){
        var user = req.body.user;
        console.log(JSON.stringify(req.body));
        if (!user) {
            console.log(user)
            return;
        }

        this.tmpuser = user;

        UsersModels.findOne({name:user.name,password:user.password}).exec().then(function (value) {
            if(value){
                console.log('找到了！！！',value);
            }else {
                console.log('没找到',this.tmpuser.name);
                var user = new UsersModels(this.tmpuser);
                //保存数据
                user.save(function(err) {
                    if (err) {
                        console.log('保存失败')
                    }
                    console.log('数据保存成功')
                    return res.redirect('/users.html')
                });
            }

        }.bind(this));


    },
    delete:function(req, res, next){
        var id = req.params.id;
        if (id) {
            UsersModels.remove({
                _id: id
            }, function(err) {
                if (err) {
                    console.log(err)
                    return
                }
                console.log('删除成功')
                return res.redirect('/users.html')
            });
        }
    }
};


