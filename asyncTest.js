// async function testAsync(){
//     return "hello async";
// }
//
// const result = testAsync();
// console.log(result);
//
// testAsync().then(v =>{
//     console.log(v); //输出hello async
// });

function getSomething(){
    return "something";
}

async function testAsync(){
    return Promise.resolve("hello async");
}

/**
 *1. 如果等待的不是一个Promise对象，那await表达式的运算结果就是它等到的东西
 *2. 如果等到的是一个Promise对象，await就忙起来了，他会阻塞后面的代码，等着Promise对象resolve,然后得到resolve的值，作为await表达式的运算结果
 */
// async function test(){
//     const v1 = await getSomething();//await 可以用于等待一个async函数的返回值
//     const v2 = await testAsync();
//     console.log(v1,v2);
// }
// test();

//async/await 示例
//不用async
// async function takeLongTime(){
//     return new Promise(resolve => {
//         setTimeout(() => resolve("long_time_value"),5000);
//     });
// }
//
// takeLongTime().then(v=>{
//     console.log("got",v);
// }).catch(err=>{
//     console.log("got",err);
// });
//
// //使用async
// function takeLongTime(){
//     return new Promise(resolve => {
//         setTimeout(()=> resolve("long_time_value"),1000);
//     });
// }
//
// async function test(){
//     const v = await takeLongTime();
//     console.log(v);
// }
// test();

function takeLongTime(n) {
    return new Promise(resolve => {
        setTimeout(() => resolve(n+200),n);
    })
}

function setp1(n) {
    console.log(`setp1 with ${n}`);
    return takeLongTime(n);
}

function setp2(n){
    console.log(`step2 with ${n}`);
    return takeLongTime(n);
}

function step3(n){
    console.log(`step3 with ${n}`);
    return takeLongTime(n);
}

// 使用Promise方式
