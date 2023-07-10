---

title: ES6-ES11笔记
date: 2023-07-04 17:25
updated: 2023-07-04 17:25
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

