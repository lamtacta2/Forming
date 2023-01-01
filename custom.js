document.addEventListener('DOMContentLoaded', function () {
	document.querySelector('#btn-print').addEventListener('click', function () {
		let wspFrame = document.getElementById('frame').contentWindow;
		wspFrame.focus();
		wspFrame.print();
	});
});

document.addEventListener('DOMContentLoaded', function () {
	document.querySelector('#btn-tutorial').addEventListener('click', function () {
		let wspFrame = document.getElementById('frame1').contentWindow;
		wspFrame.focus();
		wspFrame.print();
	});
});