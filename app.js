const log = console.log;
// 제너레이터
// 제너레이터: 이터레이터를 생성하는 함수
// 제너레이터를 선언할때는 `function *name` 로 선언한다.
// 제너레이터에 값을 추가할 때는 `yield(value)` 로 선언한다.
// 제너레이터의 값에 `next()` 메서드를 실행시, `yield` 로 선언한 첫번째 값이 리턴된다.
// 또한, `next()` 메서드로 평가를 진행하게 된다면, 이터레이터가 반환된다.
// 하지만, 이터레이터가 `[Symbol.iteator]()` 를 가지고 있으니, 자기 자신을 다시 반환하는 메서드를 가지고 있는 이터러블이라고 볼 수도 있다.
// 그리고, Generator에는 마지막에 `return` 이라는 값을 추가할 수 있다.
// 이 값은, `done` 이 `true` 일때 `return` 에서 정의한 값이 `value` 의 값으로 떨어지게 된다.
// 제너레이터는 어떠한 상태나 값들을 순회 가능한 값, 이터러블로 만들어 준다고 볼 수 있다.

function* gen() {
  yield 1; // yield로 이터레이터 값을 만들 수 있다.
  yield 2;
}
const iterator = gen();
log(iterator.next()); // { value: 1, done: false }
log(iterator.next()); // { value: 2, done: false }
log(iterator.next()); // { value: undefined, done: true }
