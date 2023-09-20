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

    console.log(`文件数量:${allFiles.length}`);

    // 初始数据初创
    // oneDateCreat(allFiles);

    // 确认对那几个文件进行时间的替换
    // 先将json文件读出来
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
                    if (stat.ctime != element.data && stat.size != element.size) {
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

function oneDateCreat(allFiles) {
    let paramsList = [];
    // 初次获取文件列表以及文件最后一次的修改时间
    for (let i = 0; i < allFiles.length; i++) {
        console.log(allFiles[i]);
        // 同步读取文件内容
        let content = fs.readFileSync(allFiles[i]).toString();
        // 文件名字
        let name = allFiles[i].substring(allFiles[i].toString().lastIndexOf('/') + 1);
        // 更新时间   文件最近一次修改的时间戳
        const stat = fs.statSync(allFiles[i])
        let date = stat.ctime
        // 要被替换掉的更新时间
        let sourceRegx = content.substring(content.indexOf("updated:") + 8, content.indexOf("tags") - 1);
        // 文件大小
        let size = stat.size;

        let params = {
            "id": ulid.ulid(),
            "name": name,
            "date": date,
            "sourceRegx": sourceRegx.replace("\r",""),
            "size": size
        };
        paramsList.push(params);
        console.log(params);
    }

    // 初次JSON数据生成
    writeJson(paramsList);
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
let getDateTime = function () {
    // var myDa
    let newDate = new Date()
    // timer.toLocaleString()) // 日期+时间 2023/5/28 23:07:35
    let year = newDate.getFullYear().toString().padStart(4, '0'); // 年 2023
    let month = (newDate.getMonth() + 1).toString().padStart(2, '0'); // 月 05
    let date = newDate.getDate().toString().padStart(2, '0'); // 日 29
    // ('星期' + (newDate.getDay() === 0 ? 7 : newDate.getDay())) // 周 星期1
    let hours = newDate.getHours().toString().padStart(2, '0');// 时 01
    let minutes = newDate.getMinutes().toString().padStart(2, '0'); // 分 19
    let seconds = newDate.getSeconds().toString().padStart(2, '0');// 秒 55
    let time = year + "-" + month + "-" + date + " " + hours + ":" + minutes;
    return time;
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