'use strict';

const from = document.querySelector('#from');
const to = document.querySelector('#to');
const input = document.querySelector('#input');
const result = document.querySelector('.result');
const tbody = document.querySelector('#tbody');
const modeBtn = document.querySelector('#modeBtn');

//api ka lar tae data mr comma twy pr nay loh
const toNum = function (value) {
	return Number(value.replace(',', ''));
};

const createOption = function (x, y, z) {
	const opt = document.createElement('option');
	const txt = document.createTextNode(y);
	opt.setAttribute('value', toNum(z));
	opt.appendChild(txt);
	x.appendChild(opt);
};

for (const [key, value] of Object.entries(data.rates)) {
	createOption(from, key, value);
	createOption(to, key, value);
	// console.log(key, value);
}

const createTr = function (x) {
	const emptyRow = document.querySelector('#emptyRow');
	if (emptyRow) {
		emptyRow.remove();
	}

	const tr = document.createElement('tr');

	x.map(function (el) {
		const td = document.createElement('td');
		const text = document.createTextNode(el);
		td.appendChild(text);
		tr.appendChild(td);
	});

	tbody.appendChild(tr);
};

const store = function () {
	localStorage.setItem('record', tbody.innerHTML);
};

document.querySelector('.calc').addEventListener('submit', function (e) {
	e.preventDefault();

	//get
	const inputValue = input.value;
	const fromValue = from.value;
	const toValue = to.value;

	//process
	const first = inputValue * fromValue;

	const second = first / toValue;

	const fromTxt = `${inputValue} ${from.options[from.selectedIndex].innerText}`;

	const toTxt = to.options[to.selectedIndex].innerText;

	const resultTxt = second.toFixed(2);

	const date = new Date().toLocaleString();

	const arr = [date, fromTxt, toTxt, resultTxt];
	createTr(arr);
	store();

	//set
	result.innerHTML = resultTxt;
	input.value = '';
	input.focus();
	from.value = '';
	to.value = '1';
});

(function () {
	if (localStorage.getItem('record')) {
		tbody.innerHTML = localStorage.getItem('record');
	} else {
		tbody.innerHTML = `<tr><td id='emptyRow' colspan='4'>No Exchange Record Yet</td></tr>`;
	}
})();

modeBtn.addEventListener('click',function(){
	// console.log('work');
	document.body.classList.toggle('night-mode');
})

//how to get option value from <select>
// const test = function () {
// 	console.log(to.options[to.selectedIndex].innerText);
// }
