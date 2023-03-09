/*
 * @LastEditTime: 2023-03-09 15:11:42
 * @Descripttion:
 */
/*
 * @LastEditTime: 2023-03-09 14:12:16
 * @Descripttion: TS基础
 */
/**
 * @description: 只读数组
 */
export const readonly: ReadonlyArray<number> = [1, 2, 3];

/**
 * @description: 声明只读属性接口
 * 传递Point 类型不存在的属性时 可以有两种方式
 * 1.字符串索引签名；2.as 类型断言
 */
interface Point {
  readonly x: number;
  readonly y: number;
  //1.字符串索引签名
  //表示的是Point可以有任意数量的属性
  [propName: string]: any;
}
//2.as 类型断言
// export const p1: Point = { x: 10, y: 20, z: 30 } as Point;
export const p2: Point = { x: 10, y: 20, z: 30 };

/**
 * @description: 函数接口
 * @return {*}
 */
interface SearchFunc {
  (sources: string, subString: string): boolean;
}
/**
 * @description: 导出 函数类型为 SearchFunc 返回值为 Boolean类型的函数
 * @return {*}
 * @param {string} source 数据源
 * @param {string} subString 要查找的字符串
 * @return {boolean} true | false
 */
export const mySearch: SearchFunc = function (source: string, subString: string): boolean {
  let result = source.search(subString);
  return result > -1;
};

//#region 可索引的类型：描述那些能够“通过索引得到”的类型
/**
 * @description: 数字索引
 */
interface StringArray {
  //表示了当用 number去索引StringArray时会得到string类型的返回值
  //只读的，防止被赋值
  readonly [index: number]: string;
}
const myArray: StringArray = ['Bob', 'Fred'];
export const firstValueL: string = myArray[0];

/**
 * @description: 同时使用字符串索引和数字索引
 */
class Animal {
  constructor(public name: string) {}
}
class Dog extends Animal {
  constructor(public breed: string, name: string) {
    super(name);
  }
}
//注意：数字索引的返回值必须是字符串索引返回值类型的子类型
interface NotOkay {
  readonly [x: number]: Dog; //通过数字索引得到Dog类型
  readonly [x: string]: Animal; //通过字符串索引得到Animal类型
}
const animals: NotOkay = {
  1: new Dog('繁殖', 'xiaohuang'),
  '2': new Dog('繁殖', 'xiaohong'),
  big: new Animal('猫科动物'),
  mini: new Animal('昆虫'),
};
//通过数字索引得到Dog类型
//通过字符串索引得到Animal类型
console.log(animals['big']); //Animal { name: '猫科动物' }
console.log(typeof animals['big']); //object
console.log(animals[2]); //Dog { name: 'xiaohong', breed: '繁殖' }
console.log(typeof animals[2]); //object
console.log(animals[3]); //undefined
console.log(typeof animals[3]); //undefined
//#endregion

//#region 类类型
// 与C#或Java里接口的基本作用一样，TypeScript也能够用它来明确的强制一个类去符合某种契约
/**
 * @description: ClockConstructor为构造函数所用
 */
interface ClockConstructor {
  new (hour: number, minute: number): ClockInterface;
}
/**
 * @description: ClockInterface 为实例方法所用
 */
interface ClockInterface {
  tick(): any;
}

/**
 * @description: 定义一个构造函数
 * @param {ClockConstructor} ctor
 * @param {number} hour
 * @param {number} minute
 */
function createClock(ctor: ClockConstructor, hour: number, minute: number) {
  return new ctor(hour, minute);
}

class DigitalClock implements ClockInterface {
  constructor(h: number, m: number) {}
  tick() {
    console.log('beep beep');
  }
}
class AnalogClock implements ClockInterface {
  constructor(h: number, m: number) {}
  tick() {
    console.log('tick tock');
  }
}
let digital = createClock(DigitalClock, 12, 17);
let analog = createClock(AnalogClock, 7, 32);
//#endregion

//#region 混合类型
/**
 * @description: 例子1：一个对象可以同时做为函数和对象使用，并带有额外的属性
 */
interface Counter {
  (start: number): string; // 函数
  interval: number; // 对象属性
  setInterval(num: number): void; //
  intervalAdd(): void; // 方法
  reset(): void; // 方法
}

function getCount(): Counter {
  let counter = <Counter>function (start: number) {
    console.log('i am counter' + start);
  };
  counter.interval = 0;
  counter.setInterval = function (num) {
    counter.interval += num;
  };
  counter.intervalAdd = function () {
    counter.interval++;
  };
  counter.reset = function () {
    counter.interval = 0;
  };
  return counter;
}

let counter = getCount();
counter(10);
counter.setInterval(1);
for (let i = 0; i < 3; i++) {
  counter.intervalAdd();
}
console.log(counter.interval); //4 counter变成了闭包函数
//闭包函数特点
// 1.被闭包函数访问的父级及以上的函数的局部变量
// 2.闭包函数实现了对其他函数内部变量的访问。
//优点
// 1.可以减少全局变量的定义，避免全局变量的污染
// 2.能够读取函数内部的变量
// 3.在内存中维护一个变量，可以用做缓存
//#endregion

//#region 泛型

//把非泛型函数签名作为泛型类型一部分
interface GenericIdentityFn<T> {
  (arg: T): T;
}
//泛型T必须是number和string类型的
function identity<T extends number | string>(arg: T): T {
  return arg;
}
let myIdentity1: GenericIdentityFn<number> = identity;
let myIdentity2: GenericIdentityFn<string> = identity;
myIdentity1(1);
myIdentity2('2');
//#endregion

//#region 装饰器
function enumerable(value: boolean) {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    descriptor.enumerable = value;
  };
}
class Greeter {
  greeting: string;
  constructor(message: string) {
    this.greeting = message;
  }
  // 这里的@enumerable(false)是一个装饰器工厂。 当装饰器 @enumerable(false)被调用时，它会修改属性描述符的enumerable属性。
  @enumerable(false)
  greet() {
    return 'Hello, ' + this.greeting;
  }
}
//#endregion
