var fs = require('fs');
var dbPath = './db.json';

//獲取所有學生列表
exports.find = function(callback) {
    fs.readFile(dbPath,'utf8', function(err, data) {
        if(err) {
            //有err的話，給調用者去處理
            return callback(err);
        }
        callback(null, JSON.parse(data).students);
    })
};

exports.findById = function (id,callback) {
    fs.readFile(dbPath,'utf8', function(err, data) {
        if(err) {
            //有err的話，給調用者去處理
            return callback(err);
        }
        var students = JSON.parse(data).students;
        var result = students.find(function (x){return x.id === parseInt(id)})
        callback(null, result);
    })
};

//添加學生
exports.save = function(student,callback) {
    fs.readFile(dbPath,'utf8', function(err, data) {
        if(err) {
            return callback(err);
        }
        var students = JSON.parse(data).students;  //拿到[]
        //處理不重複的id
        //且存入db.json時，id要為Number  
        student.id = students[students.length-1].id +1;
        students.push(student);
        var result = JSON.stringify({   //為了還原成db.json，要用{}包起來，並轉為string
            students: students
        });
        fs.writeFile(dbPath, result, function(err) {
            if(err) {
                return callback(err);
            }
            //成功就沒錯，所以err物件是null
            callback(null);
        });
    })
}

//更新學生
exports.updateById = function(student, callback) {
    fs.readFile(dbPath,'utf8', function(err, data) {
        if(err) {
            return callback(err);
        }
        var students = JSON.parse(data).students;  //拿到[]

        //注意: 表單req.query得到的id為Strung，但db.json的id為Number，因此要轉成一樣型態
        student.id = parseInt(student.id);

        //要修改誰，就把他找出來
        var stu = students.find(function(x) { return x.id === student.id });
        //遍歷所有屬性並覆蓋
        for(var key in student) {
            stu[key] = student[key];
        };

        var result = JSON.stringify({   //為了還原成db.json，要用{}包起來，並轉為string
            students: students
        });
        
        fs.writeFile(dbPath, result, function(err) {
            if(err) {
                return callback(err);
            }
            //成功就沒錯，所以err物件是null
            callback(null);
        });
    })
}

//刪除學生
exports.delete = function(id, callback) {
    fs.readFile(dbPath,'utf8', function(err, data) {
        if(err) {
            return callback(err);
        }
        var students = JSON.parse(data).students;  //拿到[]
        var deleteId = students.findIndex(function(x) {return x.id === parseInt(id)})
        //根據index從陣列中刪除
        students.splice(deleteId,1);

        var result = JSON.stringify({   //為了還原成db.json，要用{}包起來，並轉為string
            students: students
        });
        
        fs.writeFile(dbPath, result, function(err) {
            if(err) {
                return callback(err);
            }
            //成功就沒錯，所以err物件是null
            callback(null);
        });
    })
}