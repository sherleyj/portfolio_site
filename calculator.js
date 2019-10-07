// C - cancels previous entry
// AC - cancels all previous entries
// alert("hello");
window.onload = function (){
	var calculator_window = document.getElementsByClassName("calc-window")[0];
	var keys = document.getElementsByClassName("key");
	var operators = document.getElementsByClassName("operator");
	var C_AC_key = keys[15];
	var abv_form = document.getElementById("abv-submit");

	var a = "";
	var b = "";
	var decimal = false;
	var cur_operator = "";
	var clear_all = false;
	var cur_var = "a";
	var operator_active = false; // true: between operator press and num press.

	function num_digits(num) {
		return (num + "").length;
	}

	function updateWindow(value){
		calculator_window.innerHTML = value;
	}

	function varPress() {
		if (clear_all) {
			clear_all = false;
			C_AC_key.innerHTML = "C";
		}
		if (cur_var === "b") {
			if (num_digits(b) > 21){
				return;
			}
			b += this.innerHTML;
			updateWindow(b);
			console.log("key press! ", "cur_var:", cur_var, "a:", a, "b:", b);
		} else {
			if (num_digits(a) > 21){
				return;
			}
			a += this.innerHTML;
			updateWindow(a);
			console.log("key press! ", "cur_var:", cur_var, "a:", a, "b:", b);
		}
	}

	function operatorPress() {
		if (operator != "" && b != "" && a != "") {
			Compute();
		}
		cur_operator = this.innerHTML;
		if (cur_var === "a") {
			cur_var = "b";
		}
		console.log("operator press!", cur_operator, "cur_var: ", cur_var);
	}

	function Compute() {
		var num_a = Number(a);
		var num_b = Number(b);
		// if (ready) {
		if (cur_operator === "+") {
			num_a += num_b;
		} else if (cur_operator === "-") {
			num_a -= num_b;
		} else if (cur_operator === "X") {
			num_a *= num_b;
		} else {
			num_a /= num_b;
		}
		a = num_a.toString();
		b = "";
		updateWindow(a);
		console.log("Equal key! ", "a: ", a, "b: ", b, "operator: ", cur_operator);
	}

	function C_AC() {
		if (clear_all) {
			a = "";
			b = "";
			cur_var = "a";
			decimal = false;
			cur_operator = "";
			updateWindow("0");
			console.log("AC key!", "a: ", a, "b: ", b, "operator: ", cur_operator);
		} else {		// clear last entry.
			clear_all = true;
			C_AC_key.innerHTML = "AC";
			if(cur_var == "a"){
				a = "";
			}
			if(cur_var == "b"){
				b = "";
			}
			updateWindow("0");
			console.log("C key!", "a: ", a, "b: ", b, "operator: ", cur_operator);
		}
	}

	function Period() {
		console.log("Period key!");
		decimal = true;
		if (cur_var == "a"){
			a += ".";
			updateWindow(a);
		}
		if (cur_var == "b"){
			b += "."
			updateWindow(b);
		}
	}

	for (var i = 4; i < 14; i++){
		var key = keys[i]
		key.addEventListener("click", varPress);
	}

	for (var i = 0; i < 4; i++){
		var operator = operators[i];
		operator.addEventListener("click", operatorPress);
	}
	keys[16].addEventListener("click", Compute);
	keys[15].addEventListener("click", C_AC);
	keys[14].addEventListener("click", Period);
}
