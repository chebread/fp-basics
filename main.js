// 리스트 순회
// ES6 이전
const list = [1, 2, 3, 4, 5];
for (let i = 0; i < list.length; i++) {
  console.log(list[i]);
}

// ES6 이후
for (const a of list) {
  console.log(a);
}
