"use strict";
/*    JavaScript 7th Edition
      Chapter 6
      Chapter case

      Order Form Code
      Author: Brandon Berger
      Date:   1/30/24

      Filename: js06a.js
 */

window.addEventListener("load", function() {
	let orderForm = document.forms.orderForm;
	let model = orderForm.elements.model;
	
	// Select Model selection list when form opens
	model.focus();
	
	// Add an event listener for every form element
	for (let i = 0; i < orderForm.elements.length; i++) {
		orderForm.elements[i].addEventListener("change", calcOrder);
	}
	
	// Calculate the cost of the order
	calcOrder();
	
	function calcOrder() {
		// Determine the selected model
		let mIndex = model.selectedIndex;
		let mValue = model.options[mIndex].value;
		
		// Determine the selected quantity
		let qIndex = orderForm.elements.qty.selectedIndex;
		let quantity = orderForm.elements.qty[qIndex].value;
		
		// Model cost = model cost * quantity
		let modelCost = mValue * quantity;
		orderForm.elements.modelCost.value = modelCost.toLocaleString("en-US", {style: "currency", currency: "USD"});
		
		// Retrieve the cost of the protection plan
		let planValue = document.querySelector('input[name="plan"]:checked').value;
		
		// Charge the plan to each item ordered
		let planCost = planValue * quantity;
		orderForm.elements.planCost.value = planCost.toLocaleString("en-US", {style: "currency", currency: "USD"});
		
		// Calculate the order subtotal
		let subtotal = modelCost + planCost;
		orderForm.elements.subtotal.value = subtotal.toLocaleString("en-US", {style: "currency", currency: "USD"});
		
		// Calculate the 5% sales tax
		let salesTax = subtotal * .05;
		orderForm.elements.salesTax.value = salesTax.toLocaleString("en-US", {style: "currency", currency: "USD"});
		
		// Calculate the total cost of the order
		let totalCost = subtotal + salesTax;
		orderForm.elements.totalCost.value = totalCost.toLocaleString("en-US", {style: "currency", currency: "USD"});
		
		orderForm.elements.modelName.value = model.options[mIndex].text;
		let selectedPlan = document.querySelector('input[name="plan"]:checked');
		orderForm.elements.planName.value = selectedPlan.labels[0].textContent;
	}
});

