// TODO: 下面这个函数是一个字符串模版函数，... 为扩展运算符
let log = function (strArr, ...values) {
  // node 未支持 ES7 的 Object.entries 方法，暂时使用 keys 方法
  for (let key of Object.keys(values)) {
    console.log(strArr[key], values[key]);
  }
};

// ES5

(function () {
  function A() {
    this.name = 'A';
  }
  let a = new A;

  function B() {
    this.name = 'B';
  }
  B.prototype.__proto__ = A.prototype;
  let b = new B;

  function part0() {
    // TODO: Object.getPrototypeOf() 方法的返回值等于被传入该方法的对象的 __proto__ 属性
    log`${ Object.getPrototypeOf(a) === a.__proto__ }`;
  }

  function part1() {
    // TODO: {} 默认继承于 Object.prototype, Object.__proto__ 是 Function.prototype
    // Object.prototype 和一个新对象外观类似
    log`${ Object.prototype }`;
    log`${ {} }`;
    // 但实际上一个新建的对象是 Object.prototype 的一个实例
    log`${ {} === Object.prototype }`;
    log`${ Object.getPrototypeOf({}) }`;
    log`${ Object.getPrototypeOf({}) === Object.prototype }`;
    // Object 这个构造函数本身继承于 Function.prototype
    console.log(Object.getPrototypeOf(Object));
    log`${ Object.__proto__ === Function.prototype }`;
    // Function.prototype 是一个空函数，其继承于 Object.prototype
    log`${ Function.prototype }`;
    log`${ Function.prototype.__proto__ === Object.prototype }`;
  }

  function part2() {
    // TODO: 对象的 __proto__ 属性指向的父对象为其继承属性的来源， 构造函数的 prototype 用于为其生成的对象的 __proto__ 赋值
    log`${ A.prototype }${ A.__proto__}`;
    log`${ a.prototype }${ a.__proto__}`;
    log`${ a.__proto__ === A.prototype }`;
  }

  function part3() {
    // TODO: 实例的 __proto__.constructor 属性指向构造函数自身
    log`${ a.__proto__.constructor === A }${ A === A.prototype.constructor }`;
  }

  function part4() {
    // TODO: 继承时的原型链通过设置子类构造函数的 prototype.__proto__ = 父类的 prototype 来完成
    log`${ A.prototype === B.prototype.__proto__ }`;
    log`${ a.__proto__ === b.__proto__.__proto__ }`;
  }

  // part1();
  // part2();
  // part3();
  // part4();
})();

// ES6

(function () {
  class A {
    constructor() {
      this.className = 'A';
    }

    toString() {
      return 'A';
    }

    get prop() {
      return 'prop';
    }

    static showName() {
      console.log(this.className);
    }
  }

  class B extends A {
    constructor() {
      super();
      this.className = 'B';
    }

    toString() {
      return 'B';
    }
  }

  let a = new A();
  let b = new B();

  function part0() {
    // TODO: ES6 中提供的新的类的写法可以看作一个语法糖，本质上和 ES5 区别不大
    // 类中的 constructor 函数可认为是 ES5 中的构造函数
    // 类中的其他函数相当于 ES5 中定义在构造函数的 prototype 上的函数，但在 ES6 中其默认不可枚举
    // 在类内部无法定义普通变量，但可定义 get 和 set 函数
    log`${ a.prop }`;
    // 需要定义普通变量，可以像 ES5 一样使用 prototype
    A.prototype.propOrigin = 'mondo';
    log`${ a.propOrigin }`;
    // 在类内部定义的 static 函数不会被实例继承，但可以被子类继承
    A.showName();
    A.showName.apply(a);
    B.showName.apply(a);
  }

  function part1() {
    // TODO: ES6 中原型链与 ES5 类似
    log`${ a.__proto__ === A.prototype }`;
    log`${ b.__proto__ === B.prototype }`;
    log`${ b.__proto__.__proto__ === A.prototype }`;
  }

  function part2() {
    // TODO: ES6 中可以完成对原生构造函数的继承，因为实例化过程中，this 的生成时机不同
    // 在 ES6 中，子类的构造函数必须调用父类的构造函数（super）后才能使用 this
  }

  // part0();
  // part1();
})();