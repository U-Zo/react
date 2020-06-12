import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Map, List } from 'immutable';

// 객체: Map
const obj = Map({
    foo: 1,
    inner: Map({
        bar: 10
    })
});

console.log(obj.toJS());

// 배열: List
const arr = List([
    Map({ foo: 1 }),
    Map({ bar: 1 })
]);

console.log(arr.toJS());

// 설정 시: set
let nextObj = obj.set('foo', 5);
console.log(nextObj.toJS());
console.log(nextObj !== obj); // true

// Read value: get
console.log(obj.get('foo'));
console.log(nextObj.toJS());

// 내부에 있는 걸 ~ 할 땐 In 을 붙임
nextObj = obj.setIn(['inner', 'bar'], 20);
console.log(nextObj.getIn([0, 'foo']));

let nextArr = arr.setIn([0, 'foo'], 10);
console.log(nextArr.getIn([0, 'foo']));

// List 내장함수는 배열이랑 비슷함
nextArr = arr.push(Map({ qaz: 3 }));
console.log(nextArr.toJS());
nextArr = arr.filter(item => item.get('foo') === 1);
console.log(nextArr.toJS());

// delete로 키를 지울 수 있음
nextObj = nextObj.delete('foo');
console.log(nextObj.toJS());

nextArr = nextArr.delete(0);
console.log(nextArr.toJS());

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
