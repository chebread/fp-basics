const log = console.log;
// 이터러블/이터레이터 프로토콜
// 이터러블: `[Symbol.iterator]()` 메서드를 가지고 있는 어떤 값을 `[Symbol.iterator]()` 메서드를 통해 실행했을때 이터레이터를 리턴하도록 되어있는 값
const list = [1, 2, 3, 4, 5];
log(list[Symbol.iterator]()); // Array Iterator

// 이터레이터: `{ value, done }` 값을 가지고 있는 객체를, `next()` 메서드를 통해서 리턴하는 값
const iterator = list[Symbol.iterator]();
log(iterator.next()); // { value: 1, done: false }
log(iterator.next()); // { value: 2, done: false }

/*
arr[Symbol.iterator]() 메서드를 가지고 있고, 이걸 평가해보면 함수가 리턴되며,
이 메서드를 실행할때는 이터레이터가 반환되니. 이 이터레이터를 `next()` 메서드로 실행하면,
Array의 `value` 의 값은 `arr` 의 첫번째 값이 있으며,
`done` 의 값이 `false` 로 떨어지다가 어느 시점부터 `done` 이 `true` 이고 `value` 가 `undefine` 으로 떨어지게 된다면,
for...of 문의 순회를 중단하는 형태이다.

그래서 이렇게 `next()` 메서드가 뽑아주는 것과 동일하게. for...of문을 보면,
`value` 의 들어오는 값을 변수인 `a` 에 담아 출력하고, 그다음 `value` 의 들어오는 값을 출력하고,
또 출력하다가, `done` 이 `true` 가 되면 for...of 문을 빠져 나오도록 되어 있다.
*/
