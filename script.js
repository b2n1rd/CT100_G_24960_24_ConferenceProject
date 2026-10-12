function showWorkshop() {
    var cat = document.getElementById("category").value;
    var workshopDiv = document.getElementById("workshopDiv");
    
    if (cat === "Workshop Participant") {
        workshopDiv.style.display = "block";
    } else {
        workshopDiv.style.display = "none";
        document.getElementById("workshop").value = "None";
    }
    calculateFee();
}

function calculateFee() {
    var baseReg = 1000;
    var days = parseInt(document.getElementById("days").value) || 1;
    var attendanceFee = days * 500;
    
    var cat = document.getElementById("category").value;
    var workshopFee = (cat === "Workshop Participant" && document.getElementById("workshop").value !== "None") ? 750 : 0;
    
    var mealOpt = document.getElementById("meals").value;
    var mealFee = (mealOpt === "Yes") ? (days * 300) : 0;

    var total = baseReg + attendanceFee + workshopFee + mealFee;
    var discountText = "";

    // 10% discount when attendance is 3 days (Individual requirement for last digit 0)[cite: 5]
    if (days === 3) {
        total = total * 0.90; 
        discountText = "Special 10% discount applied for 3-day attendance![cite: 5]";
    }

    var finalTotal = Math.round(total);
    document.getElementById("displayTotal").innerText = finalTotal;
    document.getElementById("hiddenTotal").value = finalTotal;
    document.getElementById("discountMsg").innerText = discountText;
}

function validateForm() {
    var name = document.getElementById("fullname").value;
    var email = document.getElementById("email").value;
    var phone = document.getElementById("phone").value;
    var days = document.getElementById("days").value;
    var cat = document.getElementById("category").value;
    
    var isValid = true;

    document.getElementById("nameError").innerText = "";
    document.getElementById("emailError").innerText = "";
    document.getElementById("phoneError").innerText = "";
    document.getElementById("daysError").innerText = "";
    document.getElementById("catError").innerText = "";

    if (name.trim() === "") {
        document.getElementById("nameError").innerText = "Full name cannot be empty.";
        isValid = false;
    }
    if (email.indexOf("@") === -1 || email.indexOf(".") === -1) {
        document.getElementById("emailError").innerText = "Enter a valid email address.";
        isValid = false;
    }
    if (phone.length !== 10 || isNaN(phone)) {
        document.getElementById("phoneError").innerText = "Phone number must be exactly 10 digits.";
        isValid = false;
    }
    if (days < 1 || days > 3) {
        document.getElementById("daysError").innerText = "Days must be between 1 and 3.";
        isValid = false;
    }
    if (cat === "") {
        document.getElementById("catError").innerText = "Please select a participation category.";
        isValid = false;
    }

    if (!isValid) {
        alert("Please correct the errors in the form before submitting.");
    }

    return isValid;
}