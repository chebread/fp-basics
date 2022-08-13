// callback
const add10 = (a, callback) => {
  setTimeout(() => callback(a + 10), 6000); // 100 ms뒤에 a + 10을 하는데 받아둔 함수를 실행해서 그 함수에게 결과를 전달하는 방식으로 실행한다
};
add10(1, res => console.log(res));

function add5(a) {
  return new Promise(resolve => setTimeout(() => resolve(a + 5), 1000));
}
add5(1).then(add5).then(console.log);
// promise
