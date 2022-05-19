const log = console.log;
const products = [
  { name: "반팔티", price: 15000 },
  { name: "반팔티2", price: 20000 },
  { name: "반팔티3", price: 25000 },
];
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
log(map((p) => p.name, products)); // ["반팔", "긴팔", ...]
log(map((a) => a + 1, [1, 2, 3])); // [2, 3, 4]
// 첫번째 인자로 두번째 인자로 전달한 이터러블 값 중에 수집할 로직을 전달한다.
// 두번째 인자로 이터러블을 넘겨준다.
