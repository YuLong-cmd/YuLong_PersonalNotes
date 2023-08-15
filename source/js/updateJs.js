const ulid = require('ulid')

const fs = require('fs');

// const p = new Promise(function (resolve, reject) {
//     fs.readFile('../_data', (err, date) => {
//         console.log(date);

//     });
// });
let dataJson = "D:\\桌面\\YuLong_PersonalNotes_gitee\\source\\js\\Data.json";

main();


function main() {
    let allFiles = getAllFiles('D:\\桌面\\YuLong_PersonalNotes_gitee\\source\\_posts');
    let paramsList = [];
    console.log(`文件数量:${allFiles.length}`);
    for (let i = 0; i < allFiles.length; i++) {
        console.log(allFiles[i]);
        // 同步读取文件内容
        let content = fs.readFileSync(allFiles[i]).toString();
        // 文件名字
        let name = allFiles[i].substring(allFiles[i].toString().lastIndexOf('/') + 1);
        // 更新时间   文件最近一次修改的时间戳
        const stat = fs.statSync(allFiles[i])
        let date = stat.mtime
        // 要被替换掉的更新时间
        let sourceRegx = content.substring(content.indexOf("updated:") + 8, content.indexOf("tags") - 1);

        let params = {
            "id": ulid.ulid(),
            "name": name,
            "date": date,
            "sourceRegx": sourceRegx
        };
        paramsList.push(params);
        console.log(params);
    }

    // 初次JSON数据生成
    writeJson(paramsList);

    // 确认对那几个文件进行时间的替换
    //先将json文件读出来
    fs.readFile(dataJson, function (err, data) {
        if (err) {
            return console.error(err);
        }
        let person = data.toString();//将二进制的数据转换为字符串
        person = JSON.parse(person);//将字符串转换为json对象

        for (let i = 0; i < person.data.length; i++) {
            let element = person.data[i];
            let stat;
            let dateTime = getDateTime();
            for (let j = 0; j < allFiles.length; j++) {
                stat = fs.statSync(allFiles[j]);
                // 文件名字
                let name = allFiles[j].substring(allFiles[j].toString().lastIndexOf('/') + 1);
                // 文件相同
                if (element.name === name) {
                    // 比较最近一次的修改时间
                    if (stat.mtime != element.data) {
                        // 最近一次的修改时间不相同  则说明  该文件的  更新时间需要 被更新
                        // 当前时间
                        replaceFile(allFiles[j], element.sourceRegx, dateTime);
                    }
                }
            }
            element.date = stat.mtime;
            element.sourceRegx = dateTime;
        }

        let str = JSON.stringify(person);
        fs.writeFile(dataJson, str, function (err) {
            if (err) {
                console.error(err);
            }
            console.log('----------修改成功-------------');
        })

    });


}


/**
 * 递归遍历，获取指定文件夹下面的所有文件路径
 */
function getAllFiles(filePath) {
    let allFilePaths = [];
    if (fs.existsSync(filePath)) {
        const files = fs.readdirSync(filePath);
        for (let i = 0; i < files.length; i++) {
            if (!files[i].indexOf('.') !== -1) {
                let file = files[i]; // 文件名称（不包含文件路径）
                let currentFilePath = filePath + '/' + file;
                let stats = fs.lstatSync(currentFilePath);

                if (stats.isDirectory()) {
                    allFilePaths = allFilePaths.concat(getAllFiles(currentFilePath));
                } else {
                    allFilePaths.push(currentFilePath);
                }
            } else {
                getAllFiles(filePath + '/' + files[i]);
            }

        }
    } else {
        console.warn(`指定的目录${filePath}不存在！`);
    }
    return allFilePaths;
}



//写入json文件选项
function writeJson(params) {

    let strS = [];

    //现将json文件读出来
    fs.readFile(dataJson, function (err, data) {
        if (err) {
            return console.error(err);
        }
        let person = data.toString();//将二进制的数据转换为字符串
        person = JSON.parse(person);//将字符串转换为json对象
        for (let j = 0; j < params.length; j++) {

            let element = params[j];
            let count = 0;
            for (let i = 0; i < person.data.length; i++) {
                if (element.name != person.data[i].name) {
                    count++;
                }
                if (count === person.data.length) {
                    strS.push(params[j]);//将传来的对象push进数组对象中
                    console.log(person.data);
                }

            }
        }
        for (let index = 0; index < strS.length; index++) {
            const element = strS[index];
            person.data.push(element);
        }
        let str = JSON.stringify(person);//因为nodejs的写入文件只认识字符串或者二进制数，所以把json对象转换成字符串重新写入json文件中
        fs.writeFile(dataJson, str, function (err) {
            if (err) {
                console.error(err);
            }
            console.log('----------新增成功-------------');
        })


    })
}
let getDateTime =function(){
    // var myDate = new Date();
    // myDate.getYear();  //获取当前年份(2位)
    // myDate.getFullYear(); //获取完整的年份(4位,1970-????)
    // myDate.getMonth();  //获取当前月份(0-11,0代表1月)
    // myDate.getDate();  //获取当前日(1-31)
    // myDate.getDay();   //获取当前星期X(0-6,0代表星期天)
    // myDate.getTime();  //获取当前时间(从1970.1.1开始的毫秒数)
    // myDate.getHours();  //获取当前小时数(0-23)
    // myDate.getMinutes();  //获取当前分钟数(0-59)
    // myDate.getSeconds();  //获取当前秒数(0-59)
    // myDate.getMilliseconds(); //获取当前毫秒数(0-999)
    // myDate.toLocaleDateString();  //获取当前日期
    // myDate.toLocaleString();  //获取日期与时间
    let newDate = new Date();
    newDate.toLocaleString()
    return newDate.toUTCString();
}

//=================================================================================

//读取文件，并且替换文件中指定的字符串
let replaceFile = function (filePath, sourceRegx, targetStr) {
    fs.readFile(filePath, function (err, data) {
        if (err) {
            return err;
        }
        let str = data.toString();
        str = str.replace(sourceRegx, targetStr);
        fs.writeFile(filePath, str, function (err) {
            if (err) return err;
        });
    });
}
// //遍历statics文件夹，找到main_*.js
// fs.readdir('./statics', function (err, files) {
//     if (err) {
//         return err;
//     }
//     if (files.length != 0) {
//         files.forEach((item) => {
//             let path = './statics/' + item;
//             //判断文件的状态，用于区分文件名/文件夹
//             fs.stat(path, function (err, status) {
//                 if (err) {
//                     return err;
//                 }
//                 let isFile = status.isFile();//是文件
//                 let isDir = status.isDirectory();//是文件夹
//                 if (isFile) {
//                     if (item.match(new RegExp("^main.*$"))) {
//                         replaceFile(path, /console\.log\(\"0function0\"\)/g, "zyk");
//                     }
//                 }
//                 if (isDir) {
//                     console.log("文件夹：" + item);
//                 }
//             });
//         });
//     }
// });


//=================================================================================

// 参考知识

// fs 常用的一些 方法解释
// https://juejin.cn/post/6955011872298893319

// JSON  文件的本地读写操作
// https://blog.csdn.net/zhaoxiang66/article/details/79894209

// https://blog.csdn.net/weixin_44683094/article/details/118308268