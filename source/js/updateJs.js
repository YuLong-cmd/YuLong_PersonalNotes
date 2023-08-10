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
    let paramsList=[];
    console.log(`文件数量:${allFiles.length}`);
    for (let i = 0; i < allFiles.length; i++) {
        console.log(allFiles[i]);
        // 同步读取文件内容
        let content = fs.readFileSync(allFiles[i]).toString();
        // 文件名字
        let name = allFiles[i].substring(allFiles[i].toString().lastIndexOf('/') + 1);
        // 更新时间
        let date = content.substring(content.indexOf("updated:") + 8, content.indexOf("tags") - 2);

        let params = {
            "id": ulid.ulid(),
            "name": name,
            "date": date
        }
        paramsList.push(params);
        console.log(params);
    }

    writeJson(paramsList);
}


/**
 * 递归遍历，获取指定文件夹下面的所有文件路径
 */
function getAllFiles(filePath) {
    let allFilePaths = [];
    let bllFilePaths = [];
    if (fs.existsSync(filePath)) {
        const files = fs.readdirSync(filePath);
        for (let i = 0; i < files.length; i++) {
            if (!files[i].indexOf('.') !== -1) {
                let file = files[i]; // 文件名称（不包含文件路径）
                let currentFilePath = filePath + '/' + file;
                let stats = fs.lstatSync(currentFilePath);

                if (stats.isDirectory()) {
                    allFilePaths = allFilePaths.concat(getAllFiles(currentFilePath));
                    //bllFilePaths = bllFilePaths.concat(getAllFiles(currentFilePath));
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
    //现将json文件读出来
    fs.readFile(dataJson, function (err, data) {
        if (err) {
            return console.error(err);
        }
        let person = data.toString();//将二进制的数据转换为字符串
        person = JSON.parse(person);//将字符串转换为json对象
        for (let i = 0; i < person.data.length; i++) {
            let flg = true;
            let element = person.data[i];
            for (let j = 0; j < params.length;j++){
                if (element.name === params[j].name) {
                    flg = false;
                }
                if (flg) {
                    person.data.push(params[j]);//将传来的对象push进数组对象中
                    console.log(person.data);
                }
            }
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

// fs 常用的一些 方法解释
// https://juejin.cn/post/6955011872298893319

// JSON  文件的本地读写操作
// https://blog.csdn.net/zhaoxiang66/article/details/79894209