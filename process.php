<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $fullname = htmlspecialchars($_POST['fullname']);
    $admission = htmlspecialchars($_POST['admission']);
    $email = htmlspecialchars($_POST['email']);
    $phone = htmlspecialchars($_POST['phone']);
    $year = htmlspecialchars($_POST['year']);
    $category = htmlspecialchars($_POST['category']);
    $days = intval($_POST['days']);
    $workshop = htmlspecialchars($_POST['workshop']);
    $meals = htmlspecialchars($_POST['meals']);

    $baseReg = 1000;
    $attendanceFee = $days * 500;
    $workshopFee = ($category === "Workshop Participant" && $workshop !== "None") ? 750 : 0;
    $mealFee = ($meals === "Yes") ? ($days * 300) : 0;

    $total = $baseReg + $attendanceFee + $workshopFee + $mealFee;
    
    if ($days === 3) {
        $total = $total * 0.90; // 10% discount for 3 days[cite: 5]
    }
    $finalTotal = round($total);
} else {
    header("Location: register.html");
    exit();
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Registration Confirmation</title>
    <link rel="stylesheet" href="css/style.css">
</head>
<body>
    <div class="container">
        <h2>REGISTRATION SUCCESSFUL</h2>
        <p><strong>Participant:</strong> <?php echo $fullname; ?></p>
        <p><strong>Admission Number:</strong> <?php echo $admission; ?></p>
        <p><strong>Email:</strong> <?php echo $email; ?></p>
        <p><strong>Phone:</strong> <?php echo $phone; ?></p>
        <p><strong>Year of Study:</strong> Year <?php echo $year; ?></p>
        <p><strong>Conference Days:</strong> <?php echo $days; ?></p>
        <p><strong>Category:</strong> <?php echo $category; ?></p>
        <p><strong>Workshop:</strong> <?php echo $workshop; ?></p>
        <p><strong>Meals:</strong> <?php echo $meals; ?></p>
        
        <?php if ($days === 3): ?>
            <p style="color: green;"><strong>Note:</strong> 10% discount applied for 3-day attendance[cite: 5].</p>
        <?php endif; ?>

        <h3>TOTAL AMOUNT PAYABLE: KSh <?php echo number_format($finalTotal); ?></h3>
        <p>Thank you for registering for the Student Technology and Innovation Conference[cite: 4].</p>
        <br>
        <a href="index.html"><button>Back to Home</button></a>
    </div>
</body>
</html>