(function () {
  function task1() {
    log('task1 start');
    return new Promise(function (resolve, reject) {
      setTimeout(resolve, 500, 'task1');
    });
  }

  function task2() {
    return Promise.resolve('task2');
  }

  function log(value) {
    console.log(value);
  }

  // 传递给 then 的函数如果没有返回值，后一个 then 收到的值将是 undefined
  // Promise.resolve(1).then(log).then(log)

  // 传给 then 的如果不是函数将造成穿透，相当于 then(null)
  // Promise.resolve('start').then(log).then(task1()).then(log).then(task2()).then(log);
  // Promise.resolve('start').then(log).then(task1).then(log).then(task2).then(log);
  // Promise.resolve('start').then(log).then(function () {
  //   return task1();
  // }).then(log).then(task2).then(log);

  // then 中的函数返回的值若不是 Promise，也会被包装成立即 resolve 的 Promise
  Promise.resolve(1).then(function (v) {
    console.log(v);
    return Promise.resolve(2);
  }).then(function (v) {
    console.log(v);
    return 3;
  }).then(function (v) {
    setTimeout(console.log, 500, v);
  });
})();
