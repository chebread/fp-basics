const log = console.log;
// Map: 배열에서 특정 값을 추출하여 하나의 배열로 만들때 사용한다.
const map = (f, iter) => {
  // 인자인 iter는 이터레이터/이터러블 프로토콜을 따르는 객채만을 따르는 값만 받는다.
  let res = [];
  for (const p of iter) {
    res.push(f(p));
    // 인자로 전달한 f 함수에게 배열을 담을 로직의 과정을 위임해준다.
  }
  return res;
  // FP에서는 함수가 인자와 리턴값으로 소통하는 것을 권장하기에,
  // 결과값을 반환하여 반환 값을 외부에서 사용하도록 해야해요
};
const products = [
  { name: '반팔티', price: 15000 },
  { name: '반팔티', price: 18000 },
  { name: '반팔티2', price: 20000 },
  { name: '반팔티3', price: 25000 },
];
log(map(p => p.name, products)); // ["반팔", "긴팔", ...]
log(map(a => a + 1, [1, 2, 3])); // [2, 3, 4]
// 첫번째 인자로 두번째 인자로 전달한 이터러블 값 중에 수집할 로직을 전달한다.
// 두번째 인자로 이터러블을 넘겨준다.

// log(elem => elem.nodeName, document.querySelectorAll('*'));
// const iter = document.querySelectorAll('*')[Symbol.iterator]();
// log(iter.next());

function* gen() {
  yield 1;
  yield 2;
}

const iter = gen();
log(iter.next().value); // 1
log(iter.next().value); // 2
log(iter.next().value); // undefined
log(map(a => a * a, gen())); // 1, 4
// for of 문으로 순회하기에 가능하다

// Filter
// filter: 이터러블/이터레이터 프로토콜을 따르는 값들을 특정 기준에 따라 분류하여, 분류되어 참인 결과값을 리턴하는 함수이다.
const filter = (f, iter) => {
  let res = [];
  for (const a of iter) {
    if (f(a)) {
      res.push(a); // A' => a는 object이지만 f가 price만 보기에 반환은 object가 된다는 점
    }
    // f로 넘겨준 로직을 참고하여 iter의 데이터들을
    // 참과 거짓중 참으로 판별된 것들을 분류한다.
    // 그리고, res 변수에 담는다.
  }
  return res;
};

log(filter(n => n % 2, [1, 2, 3, 4])); // [1, 3]
// 2로 나누어 지지 않는 것들을 filter 함수로 분류하여,
// log에 Array로 반환합니다.

// Reduce
// reduce: 이터러블/이터레이터 프로토콜을 따르는 값을 하나의 값으로 축약하여 나가는 함수이다
const reduce = (f, acc, iter) => {
  // f: f(a, b) = a + b
  // acc: [1, 2, 3, 4, 5]
  // acc 값이 없이 사용하려면, 즉 iter의 처음 실헹한 iter.next()을 초깃값으로 사용하려면 이런식으로 코드를 작성한다.
  if (!iter) {
    // 초깃값이 없다면, acc에 iter값이 있으니, iter는 empty value로 처리되어 있다.
    iter = acc[Symbol.iterator]();
    // 이터러블 값을 이터레이터로 바로 변환하는 것이 next() 메서드를 실행하여 값을 얻는 것이 더 효율적이니 즉시 이터레이터로 변경시킨다.
    acc = iter.next().value; // iter의 값의 첫번째 값을 acc에 복사해준다.
  }
  for (const a of iter) {
    // log('a ' + a); // next()를 한번해서 a는 2가 됨
    acc = f(acc, a); // acc와 a를 f로 전달한 로직으로 과정을 처리한다.
    // f(1, 2) = 3
    // acc가 3임
    // f(3, 3) = 6
    // f(6, 4) = 10
    // f(10, 5) = 15
    // log('acc ' + acc);
    // 값을 acc에 계속 로직의 과정으로 계속 진행한다.
  }
  return acc; // 15
}; // acc 초깃값을 기점으로 모든 값을 acc로 부터 담아 반환하는 함수이다.

// log(reduce((a, b) => a + b, 0, nums)); // 15
// 0이 초깃값으로 시작하여 1과 더하고,
// 그 결과를 2와 더하고
// 또 그 결과를 3과 더하고
// ...
// 하여 하나의 값으로 통합하는 함수를 구현하여야 한다.
// 그러하여, 함수를 연속적(재귀적)으로 실행하도록 구현하면 된다.
const add = (a, b) => a + b;
log(reduce(add, [1, 2, 3, 4, 5]));
log(reduce((a, b) => a - b, [1, 2, 3])); // -1 - (+3) = -4

log(
  reduce(
    add,
    map(
      p => p.price,
      filter(p => p.price < 20000, products) // object이기에 map을 해줘야 한다.
    )
  )
);

// A' 예제
log(filter(p => p.price < 20000, products));

// go
// 코드를 값으로 다
const go = (...args) => {
  // ...args를 사용하면 인자의 첫번째 인자에 다음 함수에 전달하고 그렇게 연속적으로 넘겨주면 된다 (어떤 함수를 하나의 함수로 축약하는 함수)
  reduce((a, f) => f(a), args); // a의 값이 f 함수의 인자로 전달된다
};

// 함수형 프로그래밍에서는 코드를 값으로 다룰 수 있는 아이디어를 많이 사용하는데,
// 코드를 값으로 다룰 수 있기에 어떤 함수가 코드인 함수인 함수를 받아서 평가의 시점을 언제든지 할 수 있다.
// 표현력을 좋게 하고 읽기 좋게 해보겠습니다.
// go함수는 즉시 함수들과 인자를 전달헤서 어떤 값을 평가하는데 사용합니다.
go(
  0,
  a => a + 1,
  a => a + 10,
  a => a + 100,
  b => b + 1000,
  log
); // cosole.log(111)
log(reduce((a, b) => a + b, [1, 10, 100, 1000]));

go(add(1, 0), a => a + 10, log); // 인자 두개를 평가해서 평가진행 가능

// pipe
// 함수들이 나열되어 있는 합성된 함수들을 만드는 함수입니다.
// 함수를 리턴하는 함수
const pipe =
  (
    f,
    ...functions // 첫번째 함수만 꺼내고 나머지 함수를 받을 수 있음
  ) =>
  (...as) => {
    // 인자를 두개 받을 수 있도록 함
    go(f(...as), ...functions);
    // 나중에 인자를 받아서 값을 평가하기에 인자를 또 받는다
  };

const fs = pipe(
  // f함수가 만들어 진다.
  (a, b) => a + b,
  a => a + 1,
  a => a + 10,
  a => a + 100
);

log(fs(1, 2)); // 111

// go를 써서 읽기 좋은 함수 만들기
log(
  reduce(
    (a, b) => a + b,
    map(
      p => p.price,
      filter(p => p.price < 20000, products)
    )
  )
); // 33000
go(
  products,
  products => filter(p => p.price < 20000, products),
  products => map(p => p.price, products),
  prices => reduce(add, prices),
  log
);

// curry
// 함수를 받아서 함수를 리턴하고 인자를 받아서 인자가 원하는 많큼의 인자가 들어왔을때 나중에 평가하는 함수이다
const curryE =
  f =>
  (a, ..._) => {
    // f라는 함수를 받고 인자를 받고 a와 _로 분리한다 (a는 처음 인자, _는 나머지 인자)
    // 인자가 두개 이상있다는 것은 _에 인자가 있다는 것임
    _.length
      ? f(a, ..._) // 인자가 존재하면 즉시 함수를 실행
      : (..._) => f(a, ..._); // 다시 인자를 받고 다시 또 인자를 받아본다 // 여기서 _는 새로 받은 인자
  };
const curry =
  f =>
  (a, ..._) =>
    _.length ? f(a, ..._) : (..._) => f(a, ..._);
const mult = curry((a, b) => a + b);
console.log(mult(1, 3));
// f에서 (a, b) 함수를 받는다
// a 인자부분에서 1과 3을 받는다
// 인자가 두개 이상이니 함수를 실행한다
console.log(mult(13)(1));
// f에서 (a, b) 함수를 받는다
// a 인자부분에서 1을 받는다
// 인자가 한개니 다시 인자를 받는다
// 1을 받아서 함수를 실행한다
const mult2 = mult(1);
log(mult2(1)); // mult(1)(1) 과 같음
// 그러니 go 함수에서 처음만 인자를 제공해주면 filter(args)(products)가 되니까 curry와 같은 효과임 (클로서 함수와 비슷하죵??)
