// listen for submit
document.getElementById("loan-form").addEventListener("submit", calculateResults);

// calculate results
function calculateResults(e) {
  // get variables
  const amount = document.getElementById("amount");
  const interest = document.getElementById("interest");
  const years = document.getElementById("years");
  const monthlyPayment = document.getElementById("monthly-payment");
  const totalPayment = document.getElementById("total-payment");
  const totalInterest = document.getElementById("total-interest");

  const principal = parseFloat(amount.value);
  const calculatedInterest = parseFloat(interest.value / 100 / 12);
  const calculatedPayment = parseFloat(years.value) * 12;

  //   monthly payments
  const x = Math.pow(1 + calculatedInterest, calculatedPayment);
  const monthly = (principal*x*calculatedInterest)/(x-1);

  if (isFinite(monthly)) {
    monthlyPayment.value = monthly.toFixed(2);
    totalPayment.value = (monthly * calculatedPayment).toFixed(2);
    totalInterest.value = (monthly * calculatedPayment - principal).toFixed(2);
  } else {
    showError("Please Check your Numbers");
  }

  e.preventDefault();
}

// show error
function showError(error) {
  // create a div
  const errorDiv = document.createElement("div");

  // add a bootstrap class
  errorDiv.className = "alert alert-danger";

  // create and append textnode
  errorDiv.appendChild(document.createTextNode(error));

  // get elements
  const card = document.querySelector(".card");
  const heading = document.querySelector(".heading");

  // insert error above heading
  card.insertBefore(errorDiv, heading);

  // clear after 3 sec
  setTimeout(clearError, 3000);
}

// clear error
function clearError(){
  document.querySelector(".alert").remove();
}