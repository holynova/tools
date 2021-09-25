// //评测题目: 1.业务需求中，经常有 只需要最后一次请求的结果（比如搜索）编写一个高阶函数，传递 旧请求方法（执行后返回promise），返回一个新方法。
// //连续触发时，若上一次promise执行未结束则直接废弃，只有最后一次promise会触发then/reject。

// /**
// * 只有最后一次promise会then与reject
// * @param {function} promiseFunction
// * promiseFunction 示例： () => fetch('data')
// */
// function lastPromise (promiseFunction) {

// }

// // 示例
// let count = 1;
// let promiseFunction = () =>
//   new Promise(rs =>
//     window.setTimeout(() => {
//       rs(count++);
//     })
//   );

// let lastFn = lastPromise(promiseFunction);
// lastFn().then(console.log); // 无输出
// lastFn().then(console.log); // 无输出
// lastFn().then(console.log); // 3

// 2.实现一个简单的generator自执行器

// function run(fn) {

// }

// 满足以下调用

// const readFile = thunkify(fs.readFile);

// const gen = function* (){
//   const r1 = yield readFile('./1.txt');
//   const r2 = yield readFile('./2.txt');
// };

// run(gen);

// 3. 将以下表达式转化为AST (add 2 (subtract 4 2)) 其中，词法分析后生成：

// *   [
//  *     { type: 'paren',  value: '('        },
//  *     { type: 'name',   value: 'add'      },
//  *     { type: 'number', value: '2'        },
//  *     { type: 'paren',  value: '('        },
//  *     { type: 'name',   value: 'subtract' },
//  *     { type: 'number', value: '4'        },
//  *     { type: 'number', value: '2'        },
//  *     { type: 'paren',  value: ')'        },
//  *     { type: 'paren',  value: ')'        },
//  *   ]

// function tokenizer(input) {
//   // do your work
//   ...

//   return tokens;
// }

function last() {
  function lastPromise(promiseFunction) {
    let list = [];
    let cnt = 0;
    return () => {
      return new Promise((resolve) => {
        let id = cnt;
        let res = promiseFunction()
          // .then((response) => {
          //   // if (id === list.length - 1) {
          //   //   resolve({ success: true, data: response });
          //   // }
          //   return { success: true, data: response };
          // })
          .catch((e) => {
            return { success: false, reason: e };
            // if (id === list.length - 1) {
            //   resolve({ success: false, reason: e });
            // }
          })

          .then((res) => {
            if (id === list.length - 1) {
              resolve(res);
            }
          });
        cnt += 1;
        list.push(res);
      });
    };
  }

  let count = 1;

  let promiseFunction = () =>
    new Promise((rs) =>
      setTimeout(() => {
        rs(count++);
      })
    );

  let lastFn = lastPromise(promiseFunction);

  lastFn().then(console.log); // 无输出
  lastFn().then(console.log); // 无输出
  lastFn().then(console.log); // 3

  // for (let i = 0; i < 1e6; i++) {
  //   for (let j = 0; j < 1e4; j++) {}
  // }
  setTimeout(() => {
    lastFn().then(console.log); // 4
    lastFn().then(console.log); // 4
  }, 1000);
}

last();
