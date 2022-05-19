// 제너레이터: 이터레이터를 리턴하는 함수
function* gen() {
  yield 1;
  yield 2;
}
const iterator = gen();
log(iterator.next()); // { 1, false }

function* odds(l) {
  for (let i = 0; i < l; i++) {
    if (i % 2) yield i;
  }
}
log(odds(10)); // 10 보다 작은 홀수만 반환하는 함수

function* infinity(i = 0) {
  while (true) yield i++;
}
log(infinity().next()); // 평가할때 까지만 동작하기 때문에 브라우저가 멈추지는 않습니다. // 무한수열을 표현할 수 있습니다.

function* limit(l, iter) {
  for (const a of iter) {
    yield a;
    if (a === l) return;
  }
}
function* odds2(l) {
  for (let i = 0; i < l; i++) {
    if (i % 2) yield i;
    if (i === l) return;
  }
}
function* odds3(l) {
  for (const a of limit(l, infinity(1))) {
    if (i % 2) yield i;
  }
}

for (const a of odds3(10)) {
  log(a);
}
