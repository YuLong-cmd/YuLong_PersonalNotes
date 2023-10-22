---

title: ES6-ES11笔记
date: 2023-07-04 17:25
updated: 2023-08-27 23:29
tags: JS ES6
categories: JS 
keywords: ES6
description: ES6 学习笔记
cover: 

---

### 1.let
1、变量不能重<font color="#2DC26B">复声明  </font>

2、块级<font color="#2DC26B">作用域  </font>

3、<font color="#2DC26B">不存在变量提升</font>  

4、不影响作用域链

![[1_let_学习.html]]
### 2.const
1、一定要赋初始值
2、一般常量使用大写
3、常量的值不能修改
4、块级作用域
5、对于数组和对象的元素修改，不算做对常量的修改

![[2_const_学习.html]]
### 3.变量的解构赋值
1、数组的解构赋值

```js
 const cA=['a','b','c'];
      let [d,f,z]=A;
      console.log(d);
      console.log(f);
      console.log(z);
```

2、对象的解构赋值
```js
   const a = {
          name: "zhangsan",
          age: 66,
          xxx: function () {
            console.log("55656");
          },
        };
        let {name,age,xxx}=a;
        console.log(name);
        console.log(age);
        console.log(xxx);
        xxx();
```

![[3_变量的解构赋值.html]]
### 4.模板字符串
1、声明
```JS
let str = `我是模版字符串`;
console.log(str,typeof str);
```
2、内容中可以直接出现换行符
```JS
let str = `
        <ul>
            <li>111<li>
            <li>222<li>
            <li>333<li>    
        <ul>
        `;
```
3、变量的拼接
```JS
let lovt = "aaa";
let out = `${lovt} 666666666666666`;
console.log(out);
```

![[4_模版字符串.html]]
### 5.简化对象写法
```JS
let name ='光锥';
        let chang = function() {
            console.log('光锥之内皆是命运');
        }

        const school ={
            name,
            chang,
            impove(){
                console.log('超越光锥才能超越命运');
            }
        }
```

![[5_简化对象写法.html]]
### 6.箭头函数
1.this 是静态的  this 始终指向函数声明是所在的作用域下的this的值
2.不能作为构造实例化对象
3.不能使用 arguments 变量
4.箭头函数的简写
1) 省略小括号，当形参有且只有一个的时候
2) 省略花括号，当代码体只有一条语句的时候，此时 return 必须省略 而且语句执行结果就是函数的返回值
![[6_箭头函数.html]]
5.练习
![[7_箭头函数的案例.html]]

### 7.参数默认值
1.形参初始值 具有默认值的参数，一般位置要靠后(潜规则)


``` JS
      function add(a, b, c = 123) {
        return a + b + c;
      }
      console.log(add(1, 2));

```
  2.与解构赋值结合

```JS
function connrct({host='127.0.0.1',username,password,port}){
        console.log(host);
        console.log(username);
        console.log(password);
        console.log(port);
    }
    connrct({
        // host:"百度.com",
        username:"root",
        password:"root",
        port:8080
    });
```

### 8.rest参数
1.ES5 获取实参的方式    对象形式

```JS
 function date(){
            console.log(arguments);
        }
        date('a','b','c','d');
```
![[Pasted image 20230611231727.png]]

2.rest 参数必须要放到参数最后

```JS
function fn(a,b,...args){
            console.log(a);
            console.log(b);
            console.log(args);
        }
        fn(1,2,3,45,6,69,6,88);
```
![[Pasted image 20230611231830.png]]

### 9.扩展运算符的认识和应用
1.认识 扩展运算符     ES6 【...】 扩展运算符 能将【数组】转换为逗号分隔的【参数序列】

```JS
// 声明一个数组
      const arr = ["A", "C", "B"]; //【数组】
      // => 'A','C','B'   【参数序列】

      // 声明一个函数
      function chang() {
        console.log(arguments);
      }
      chang(...arr); //chang('A','C','B')   【参数序列】
      chang(arr);
```
2.扩展运算符的应用
 1).数组的合并
 
```JS
 const AArr = ["A", "C", "B"];
      const BArr = ["D", "E", "F"];
      const CArr = AArr.concat(AArr);
      console.log(CArr);
      const DArr = [...AArr, ...BArr];
      console.log(DArr);
```
2).数组的克隆   浅克隆

```JS
const KArr = ["H", "Y", "Z"];
      const YArr = [...KArr];
      console.log(YArr);
```

3).将伪类数组转换为真正的数组

```JS
    <div></div>
    <div></div>
    <div></div>

const divs=document.querySelectorAll('div');
      console.log(divs);
      const divArr = [...divs];
      console.log(divArr);
```



### 10.Symbol的认识与创建
1.创建Symobl

```JS
      let s = Symbol();
      console.log(s);
      let s1 = Symbol("光锥");
      let s2 = Symbol("光锥");
      console.log(s1, s2, s1 == s4);
```

2  Symbol.for 创建

```JS
let s3 = Symbol("光锥");
      let s4 = Symbol("光锥");
      console.log(s3, s4, s3 == s4);
```

3.不能与其他数据进行运算


```JS
let result = s+1100l;
      let result = s>1100l;
      let result = s+s;
```


4.JS 基本数据类型


```JS
 USONB  you are so niubility
      u  undefined
      s string symbol
      o  object
      n number null
      b boolean
```

### 11.Symbol创建对象属性
1.创建方式一

```JS
// 向对象中添加方法  up  down
      let game = {
        up() {
          console.log("原up方法");
        },
        down() {
          console.log("原down方法");
        },
        name: "光锥",
      };

    //   声明一个对象
    let methods= {
        up:Symbol(),
        down:Symbol()
    }
    game[methods.up]=function(){
        console.log('Symbol的up方法');
    }
    game[methods.down]=function(){
        console.log('Symbol的down方法');
    }
    console.log(game);

```
2.创建方式二

```JS
let youxi={
        name:'奇葩',
        [Symbol('say')]: function(){
            console.log('Say');
        },
        [Symbol('see')]: function(){
            console.log('see');
        }
    }
    console.log(youxi);

```
### 12.Symbol内置属性
1.hasInstance 和 isConcatSpreadable 的认识

```JS
class Person{
        static [Symbol.hasInstance](param){
          console.log(param)
          console.log('类型检测');
          return false;
        }
      }
      let o={};
      console.log(o instanceof Person);

      const arr=[1,2,3];
      const arr2=[4,5,6];
      arr2[Symbol.isConcatSpreadable]=false;//可用于数组内的数组是否展开
      console.log(arr.concat(arr2));
```
2.更多Symbol参数认识
[Symbol - JavaScript | MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Symbol)

### 20.promise方法的认识
#### 1.promise的基础认知
 1.Promise 异步操作有三种状态：pending（进行中）、fulfilled（已成功）和 rejected（已失败）。除了异步操作的结果，任何其他操作都无法改变这个状态。


``` JS
// 实例化 Promise 对象   定义
        const p =new Promise(function(resolve,reject) {
            // resolve  成功
            // reject   失败 
            // 成功和失败不会同时进行
            setTimeout(function() {
                let date= '数据库中的用户数据';
                resolve(date);

                let err= '出错了';
                reject(err);
            },1000);
        });

        // 调用 promise 对象的 then 方法
        p.then(function(value){
            console.log('成功：'+value);
        },function(reason){
            console.error(reason);
        });
```


2.使用 promise  读取文件
结构目录
![](https://cdn.jsdelivr.net/gh/YuLong-cmd/PicGo_Image/img/202308032335074.png)

```JS
// 1.首先引入 fs 模块   前提条件  安装 node.js
const fs = require('fs');

// 2.调用方法读取文件
// fs.readFile('./21_promise读取文件/倔强.md', (err, date) => {
//     // 如果失败，则抛出错误
//     if (err) throw err;
//     // 如果成功，则输出内容  date  单纯的它是一个buffer对象  <Buffer e9 80 86 e9 a3 8e e7 9a 84 e6 96 b9 e5 90 91 20 e6 9b b4 e9 80 82 e5 90 88 e9 a3 9e e7 bf 94 0d 0a e6 88 91 e4 b8 8d e6 80 95 e5 8d 83 e4 b8 87 e4 ba ... 71 more bytes>
//     console.log(date.toString());
// });

// 3.使用Promise 封装
const p= new Promise(function(resolve,reject){
    fs.readFile('./21_promise读取文件/倔强.md', (err, date) => {
        // 判断如果失败
        if (err) reject(err);
        // 如果成功
        resolve(date);
    });
});

p.then(function(value){
    console.log(value.toString());
},function(reason){
    console.log('读取失败：' + reason);
});
```
#### 2.promise的案例
使用Promise封装 AJAX
api  已经失效

```JS
const p = new Promise(function (resove, reject) {
        // 1. 创建对象
        const xhr = new XMLHttpRequest();
        // 2.初始化
        xhr.open("GET", "https://api.apiopen.top/getJoke");
        // 3.发送
        xhr.send();
        // 4.绑定事件，处理响应结果
        xhr.onreadystatechange = function () {
          if (xhr.readyState === 4) {
            // 判断响应状态码 200-299
            if (xhr.status >= 200 && xhr.status < 300) {
              // 表示成功
              resove(xhr.response);
            } else {
              // 如果失败
              reject(xhr.status);
            }
          }
        };
      });

      p.then(
        function (value) {
          console.log(value);
        },
        function (reason) {
          console.error(reason);
        }
      );

```


### 23 Promise的Then方法


```JS
<script>
      // 创建Promise对象
      const p = new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve("用户数据");
        }, 1000);
      });
      //   调用Then方法   Then方法的返回结果是Promise对象， 对象状态由回调函数的执行结果决定
      // 1.如果回调函数的返回结果是 非 Promise 类型的属性，状态为成功
      const result = p.then(
        (value) => {
          console.log(value);
          // 1.非promise 类型的属性
          // return "66666";
          // 2.是 promise 类型的 对象
          // return new Promise((resolve,reject)=>{
          //     resolve("OK");
          //     reject("error");
          // })
          // 3. 抛出错误
          // throw new Error('出错了');
          throw "出错了";
        },
        (reason) => {
          console.warn(reason);
        }
      );

      //   2. 链式调用   可用于解决  回调地狱
      p.then(
        (value) => {},
        (reason) => {}
      ).then(
        (value) => {},
        (reason) => {}
      );
      console.log(result);
    </script>
```

### 24 Promise的实例实践

```js

// 1.首先引入 fs 模块   前提条件  安装 node.js
const fs = require('fs');

//目标 读取三个文件
// 1.回调地狱的写法
fs.readFile('./promise读取文件/倔强.md',(error1,data1)=>{
    fs.readFile('./promise读取文件/后青春期的诗.md',(error2, data2)=> {
        fs.readFile('./promise读取文件/知足.md', (error3, data3) => {
            let result  = data1 +'\r\n' + data2 +'\r\n' +data3;
            console.log(result);
        });
    });
});


// 2.promise 方式实现
const p = new Promise((resolve, reject) => {
    fs.readFile('./promise读取文件/知足.md', (error, data) => {
        resolve(data);
    });
});

p.then((value, reason) => {
    return new Promise((resolve, reject) => {
        fs.readFile('./promise读取文件/后青春期的诗.md', (error, data) => {
            resolve([value, data]);
        });
    });
}).then((value, reson) => {
    return new Promise((resolve, reject) => {
        fs.readFile('./promise读取文件/倔强.md', (error, data) => {
            value.push(data);
            resolve(value);
        });
    });
}).then((value, reson) => {
    console.log(value.join('\r\n'));
});
```

### 25   Promise的catch

```JS
const p =new Promise((resovle,reject)=>{
        setTimeout(()=>{
            // 设置p对象的状态为失败，并设置失败的值
            reject("出错了");
        },1000);
       });

       p.then((value)=>{
        console.log(value);
       },(reson)=>{
         console.warn(reson);
       });

    // catch  是当promise出现异常  终止时使用的   也可以使用  then 的方式进行替代  then  有两个参数  一个是成功一个是失败  失败的场合  类似于异常
    p.catch(function(reson){
        console.warn(reson);
    });

```

### 26  ES6集合的认识
```JS
// Set   ES6  提供了新的数据结构 set 集合  它类似于数组，但成员变量的值是唯一的，集合实现了iterator接口  所以可以使用 扩展运算符 和 for  of 进行遍历主要方法有：
        // size  返回集合元素的个数
        // add  增加一个新元素返回当前集合
        // delete 删除元素 返回布尔值
        // has 检测集合中是否包含某个元素，返回boolean值

        // 1.声明一个set
        let s =new Set();
        let s2 = new Set(['a','c','b','d','s','f','g']);

        // 元素个数
        console.log(s2.size);
        // 添加新元素
        console.log(s2.add('6666'));
        // 删除元素
        s2.delete('b');
        console.log(s2);
        // 检测
        console.log(s2.has('g'));
        // 清空
        console.log(s2.clear);

        for(let v of s2){
            console.log(v);
        }

```

### 27 Es6  集合的实践

```JS
let arr = [1, 2, 3, 4, 5, 4, 3, 2, 1];
      let arr2 = [4, 5, 4];
      1.数组去重
      let arrdis = [...new Set(arr)];
      console.log(arrdis);
      2.交集
        let result1 = [...new Set(arr)];
        let result = result1.filter((item) => {
          let result2 = new Set(arr2);
          if (result2.has(item)) {
            return true;
          } else {
            return false;
          }
        });
        //   简写
        let result2 = result1.filter((item) => new Set(arr2).has(item));
        console.log(result);
        console.log(result2);

      3.并集
      let result = [...new Set([...arr,...arr2])];
      console.log(result);

      4.差集
      let result = [...new Set(arr)].filter((item) => !new Set(arr2).has(item));
        console.log(result);
```

结果：
Set集合实践_并集
![](https://cdn.jsdelivr.net/gh/YuLong-cmd/PicGo_Image/img/27_Set%E9%9B%86%E5%90%88%E5%AE%9E%E8%B7%B5_%E5%B9%B6%E9%9B%86.png)

Set集合实践_数组去重
![](https://cdn.jsdelivr.net/gh/YuLong-cmd/PicGo_Image/img/27_Set%E9%9B%86%E5%90%88%E5%AE%9E%E8%B7%B5_%E6%95%B0%E7%BB%84%E5%8E%BB%E9%87%8D.png)

Set集合实践_交集
![](https://cdn.jsdelivr.net/gh/YuLong-cmd/PicGo_Image/img/27_Set%E9%9B%86%E5%90%88%E5%AE%9E%E8%B7%B5_%E4%BA%A4%E9%9B%86.png)

Set集合实践_差集
![](https://cdn.jsdelivr.net/gh/YuLong-cmd/PicGo_Image/img/27_Set%E9%9B%86%E5%90%88%E5%AE%9E%E8%B7%B5_%E5%B7%AE%E9%9B%86.png)

### 28 Map集合


```JS
// Map的认识
        // map类似于对象，也是键值对的集合 但键的范围不在局限于字符串，各种类型的值（包括对象）都可以作为键。map也实现；额iterator接口，所以可以使用扩展运算符和 for...of.. 进行遍历。
        // map 的属性和方法：
        // 1.size 返回map的元素个数
        // 2. set 增加一个新元素，返回当前的map
        // 3.get 返回键名对象的键值
        // 4.has 检测Map中是否包含某个元素返回boolean值
        // 5.clear 清空集合 返回 undefined
        // 6.delete 删除map里面的某个元素  返回boolean值

        // 1.声明map
        let m=new Map();
        // 添加元素
        m.set('name','光');
        m.set('change',function(){
            console.log('map 里面的一个方法');
        });
        let key ={
            name:'迪迦'
        };
        m.set(key,'66666');

        // for of 
        console.log('-------for of ------');
        for(let v of m){
            console.log(v);
        }
        // size
        console.log('-------size------');
        console.log(m.size);
        // 删除
        console.log('-------删除------');
        console.log(m.delete('name'));
        console.log(m);
        // 获取
        console.log('-------获取------');
        console.log(m.get('change'));
        console.log(m.get(key));
        // 清除
        console.log('-------清除------');
        console.log(m.clear());
        console.log(m);
        
```

运行结果：
![](https://cdn.jsdelivr.net/gh/YuLong-cmd/PicGo_Image/img/28_Map%E9%9B%86%E5%90%88.png)

### 29 Class 类 

```JS
// Es6 class类可以 看做只是一个语法糖，它的绝大部分功能，Es5都可以做到，新的class写法只是让对象原型的写法更加清晰，更像面向对象编程的语法而已。
      // 1.class 声明类
      // 2.constructor 定义函数初始化
      // 3.extends 继承父类
      // 4.super 调用父类构造方法
      // 5.static 定义静态方法和属性
      // 6.父类方法可以重写

      // 1.Es5 原型形式
      function Phone(brand, price) {
        this.brand = brand;
        this.price = price;
      }
      // 添加方法
      Phone.prototype.call = function () {
        console.log("我是一部手机");
      };
      // 实例化对象
      let huawei = new Phone("华为", 5999);
      huawei.call();
      console.log(huawei);

      // 2.class
      class shouji {
        // 构造方法 名字不能修改
        constructor(brand, price) {
          this.brand = brand;
          this.price = price;
        }
        // 方法必须使用该语法，不能使用Es5 的对象完整形式
        call() {
          console.log("1+", 66666);
        }
      }
      let onePhone = new shouji("1+", 666);
      onePhone.call();
      console.log(onePhone);
```

运行结果：
![](https://cdn.jsdelivr.net/gh/YuLong-cmd/PicGo_Image/img/29_Class%E8%AE%A4%E8%AF%86.png)

### 30 Class 静态成员


```JS
 // Es5
        function Phone() {
            
        }
        Phone.name ="手机";
        Phone.change=function(){
            console.log("光锥之内皆是命运");
        }
        Phone.prototype.size="5.5inch";
        console.log(Phone);
        console.log(Phone.name);
        console.log(Phone.change());
        let nakai = new Phone();
        console.log(nakai.name);
        nakai.change();
        console.log(nakai.size);

        // 直接实例化的对象 是无法使用 源对象的 内容  只有通过 prototype 定义的 内容 才能 被实例化对象 使用

        // Es6
        class Phone {
            // 静态属性
            static name ='手机';
            static change(){
                console.log("穷则变，变则通");
            }
        }

        let nakai =new Phone();
        console.log(nakai.name);
        console.log(nakai.change());

        // 通过 static 声明的变量  属于类  而不属于  实例对象

```

运行结果：
![](https://cdn.jsdelivr.net/gh/YuLong-cmd/PicGo_Image/img/30_Class%E9%9D%99%E6%80%81%E6%88%90%E5%91%98.png)


### 31.Es5对象继承

```JS

//我们需要牢记两点：①__proto__和constructor属性是对象所独有的；② prototype属性是函数所独有的，因为函数也是一种对象，所以函数也拥有__proto__和constructor属性。
      // __proto__属性的作用就是当访问一个对象的属性时，如果该对象内部不存在这个属性，那么就会去它的__proto__属性所指向的那个对象（父对象）里找，一直找，直到__proto__属性的终点null，再往上找就相当于在null上取值，会报错。通过__proto__属性将对象连接起来的这条链路即我们所谓的原型链。
      // prototype属性的作用就是让该函数所实例化的对象们都可以找到公用的属性和方法，即f1.__proto__ === Foo.prototype。
      // constructor属性的含义就是指向该对象的构造函数，所有函数（此时看成对象了）最终的构造函数都指向Function。
      // 手机
      function Phone(brand, price) {
        this.brand = brand;
        this.price = price;
      }

      Phone.prototype.call = function () {
        console.log("我可以打电话");
      };

      // 智能手机
      function SmartPhone(brand, price, color, size) {
        Phone.call(this, brand, price);
        this.color = color;
        this.size = size;
      }

      // 设置子集构造函数的原型
      SmartPhone.prototype = new Phone();
      SmartPhone.prototype.constructor = SmartPhone;

    //   声明子类的方法
    SmartPhone.prototype.Phone=function(){
        console.log('我可以拍照');
    }
    SmartPhone.prototype.playGame=function(){
        console.log('我可以打游戏');
    }
    const chuizi = new SmartPhone('锤子',2499,'黑色','5.5inch');

    console.log(chuizi);
    console.log(chuizi.Phone());
    console.log(chuizi.playGame());
    console.log(chuizi.call());
```

运行结果：
![](https://cdn.jsdelivr.net/gh/YuLong-cmd/PicGo_Image/img/31_Es5%E5%AF%B9%E8%B1%A1%E7%BB%A7%E6%89%BF.png)



### 32.ES6 类的继承 及子类对父类方法的重写

```JS
class Phone {
            // 构造方法
            constructor(brand,price){
                this.price=price;
                this.brand =brand;
            } 
            // 父类方法
            call(){
                console.log('我能打电话');
            }
        }

        class SmartPhone extends Phone {
            constructor(brand,price,color,size){
                super(brand,price);
                this.color=color;
                this.size=size;
            }
            
            Photo(){
                console.log('我能拍照');
            }
            playGame(){
                console.log('我能拍照');
            }
        }

        const xiaomi = new SmartPhone('小米','3599','黑','4.45in');
        console.log(xiaomi);
        xiaomi.Photo();
        xiaomi.playGame();
        xiaomi.call();

```

运行结果：
![](https://cdn.jsdelivr.net/gh/YuLong-cmd/PicGo_Image/img/32_Es6%E5%AF%B9%E8%B1%A1%E7%BB%A7%E6%89%BF.png)


重写

```JS
class Phone {
            // 构造方法
            constructor(brand,price){
                this.price=price;
                this.brand =brand;
            } 
            // 父类方法
            call(){
                console.log('我能打电话');
            }
        }

        class SmartPhone extends Phone {
            constructor(brand,price,color,size){
                super(brand,price);
                this.color=color;
                this.size=size;
            }
            
            Photo(){
                console.log('我能拍照');
            }
            playGame(){
                console.log('我能拍照');
            }

            // 子类对父类的同名方法的一个重写   但不能使用  super() 来掉用父类的方法
            call(){
                console.log('我可以进行视屏通话');
            }
        }

        const xiaomi = new SmartPhone('小米','3599','黑','4.45in');
        console.log(xiaomi);
        xiaomi.Photo();
        xiaomi.playGame();
        xiaomi.call();
```

运行结果：
![](https://cdn.jsdelivr.net/gh/YuLong-cmd/PicGo_Image/img/ES6_32_%E5%AD%90%E7%B1%BB%E5%AF%B9%E7%88%B6%E7%B1%BB%E6%96%B9%E6%B3%95%E7%9A%84%E9%87%8D%E5%86%99.png)