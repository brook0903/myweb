//引入student.js
var Student = require('./student.js');

var express = require('express');
var router = express.Router();

    router.get('/students', function(req, res){
        Student.find(function (err, students) {
            if(err) {
                // 如果有erorr就發送stautsCode 500
                return res.status(500).send('Server Error!');
            }
            //如果student.js那邊讀取數據成功，就沒有err物件，且把讀取到的資料丟過來這裡
            res.render('Sport.html',{
                students: students
            })
        })
    })
    router.get('/students/new', function(req, res) {
        res.render('new.html');
    })
    router.post('/students/new', function(req, res) {
        var student = req.body;
        Student.save(student, function(err) {
            if(err) {
                return res.status(500).send('Server Error!');
            }
            res.redirect('/students');
        })
    })
    router.get('/students/edit', function(req, res) {
        //根據id把該學生找出來，並渲染頁面
        var id = req.query.id; //=> string，要轉成Number
        Student.findById(parseInt(id), function(err, student) {
            if(err) {
                return res.status(500).send('Server Error!');
            }
            res.render('edit.html', {
                student:student
            });
        })
    })
    router.post('/students/edit', function(req, res) {
        //1.獲取表單數據
        //2.更新: Student.updateById()
        //3.發送響應
        Student.updateById(req.body, function(err, student) {
            if(err) {
                return res.status(500).send('Server Error!');
            }
            res.redirect('/students')
        })
    })
    router.get('/students/delete', function(req, res) {
        //1.獲取要刪除的id
        //2.根據id執行刪除
        //3.發送響應
        Student.delete(req.query.id, function(err) {
            if(err) {
                return res.status(500).send('Server Error!');
            }
            res.redirect('/students');
        })
    })

//把 router 導出
module.exports = router;