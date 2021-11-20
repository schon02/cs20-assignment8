function calc_tax(subtotal) {
    tax = (subtotal * .0625).toFixed(2);
	document.getElementById("tax").value = tax;
	return tax;
}

function calc_total(subtotal, tax) {
    total = ((1 * subtotal) + (1 * tax)).toFixed(2);
    document.getElementById("total").value = total;
}

$(document).ready(function(){
	$("select").change(function() { //if one of the selects are changed
		quan = this.selectedIndex;
		rowIndex = this.name.substring(4);
		priceIndex = menuItems[rowIndex].cost.toFixed(2);
		document.forms[0].cost[rowIndex].value = (quan * priceIndex).toFixed(2);
		updateTotal();
	})
	function updateTotal()
	{
		subtotal = 0;
		for (n = 0; n < ORDER_ITEMS; n++)
		{
			price = document.forms[0].cost[n].value * 1;
			subtotal += price
		}
		document.getElementById("subtotal").value = subtotal.toFixed(2);
		tax = calc_tax(subtotal);
		calc_total(subtotal, tax);
	}
})

function validphonenum() {
    var phone = document.getElementById("phone").value;
	var phoneRegex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;

	if (phoneRegex.test(phone)) {
		// var formattedPhoneNumber =
		// 	phone.replace(phoneRegex, "($1) $2-$3");
		// alert("valid phone num");
		return true;
	} else {
		// Invalid phone number
		// alert("invalid phone num");
		return false; 
	}
}

function addMinutes(date, minutes) {
    return new Date(date.getTime() + minutes*60000);
}

function validateForm() {
	var formisvalid = false;
    let lastname = document.getElementById("lname").value;
	let subtotal = document.getElementById("subtotal").value;

        if (lastname == "") {
            alert("Last name must be filled out");
        }
		else if (!validphonenum()) {
            alert("Phone number must be valid ten-digit number");
        }
		else if (subtotal == 0) {
			alert("Must order at least one item");
		}
		else {
            formisvalid = true;
        }
		return formisvalid;
    }

function submitted() {
	var today = new Date();
	let total = document.getElementById("total").value;
	let street = document.getElementById("street").value;
	let city = document.getElementById("city").value;

	if (validateForm()) {
		if (document.getElementById('pickup').checked) {
			var temp_today = addMinutes(today, 15);
			var pickup_time = temp_today.getHours() + ":" + temp_today.getMinutes();
			// alert(pickup_time);
			alert("Your order has been submitted! Your order total: " + total + " Pickup time: " + pickup_time);
		}
		else if (document.getElementById('delivery').checked) {
			var temp_today = addMinutes(today, 30);
			var pickup_time = temp_today.getHours() + ":" + temp_today.getMinutes();
			// alert(pickup_time);
			if (street == "") {
				// formisvalid = false;
				alert("Street must be filled out");
			} 
			else if (city == "") {
				// formisvalid = false;
				alert("City must be filled out");
			}
			else {
				alert("Your order has been submitted! Your order total: " + total + " Pickup time: " + pickup_time);
			}
		}
	}
}
