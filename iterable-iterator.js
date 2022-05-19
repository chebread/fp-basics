const log = console.log;
const arr = [1, 2, 3];
// log(arr[Symbol.iteratotr]);
// Symbol.iterator는 어떤 객체의 키로 사용될 수 있다.
// 어떤 함수가 들어 있다.
// 이 함수를 지우면 for of문은 실행되지 않는다 (array가 이터블이 아니다)

// 이터러블: 이터레이터를 리턴하는 [Symbol.iterator]() 를 가진 값
// 이터레이터: { value, done } 객체를 리턴하는 next() 를 가진 값
// 이터러블/이터레이터 프로토콜: 어런 이터러블을 연산자나 문법과 함께 동작하도록 하는 규약

// 이터레이터는 이터레이터이자 이터러블입니다. (이터레이터도 [Symbol.iterator]() 메서드를 가지고 있습니다.)
// 이터레이터의 심볼 이터레이터 메서드의 실행결과는 자기 자신입니다.
// Array는 이터레이터를 리턴하는 메서드를 가져서 Array는 이터러블이다.
// log(arr[Symbol.iterator]()); // Array iterator
const iterator = arr[Symbol.iterator]();
// log(iterator.next()); // { value: 1, done: false } 를 반환하는 값을 이터레이터라 한다.
// 이터러블은 [Symbol.iterator]() 메서드를 실행했을때 이터레이터를 리턴하고, 이터레이터는 next() 라는 메서드를 통해서 객체를 리턴하는 값을 의미합니다.
for (const a of arr) log(a);
// next()가 뽑아주는 것과 동일하게 value 들어오는 값을 a로 담아서 출력하며, 그다음 값을 출력하다가 done: true가 되면 for문에서 빠져나오도록 설계되어 있습니다.
// 만약 arr iterator를 한번 next()를 하게 된다면 for문이 [2, 3]이 출력됩니다.

// for of 구문에서 index와 value를 얻어내는 방법
for (const [index, value] of arr.entries()) {
  log("index is " + index);
  log("value is " + value);
}

let arrs = [];
while (1) {
  const value = iterator.next();
  if (value.done === true) {
    break;
  } else {
    arrs.push(value.value);
  }
}
log(arrs);
