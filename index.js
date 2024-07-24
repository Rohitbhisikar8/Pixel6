// Generate captcha
function generateCaptcha() {
  var x = Math.floor(Math.random() * 10 + 1);
  var y = Math.floor(Math.random() * 10 + 1);
  document.getElementById("demo").innerHTML = `${x} + ${y}`;
  window.captcha = x + y;
}

generateCaptcha(); // Initial call to generate captcha

// Convert number to words

function inWords(num) {
  if ((num = num.toString()).length > 9) return "overflow";
  var a = [
    "",
    "one ",
    "two ",
    "three ",
    "four ",
    "five ",
    "six ",
    "seven ",
    "eight ",
    "nine ",
    "ten ",
    "eleven ",
    "twelve ",
    "thirteen ",
    "fourteen ",
    "fifteen ",
    "sixteen ",
    "seventeen ",
    "eighteen ",
    "nineteen ",
  ];
  var b = [
    "",
    "",
    "twenty",
    "thirty",
    "forty",
    "fifty",
    "sixty",
    "seventy",
    "eighty",
    "ninety",
  ];

  var n = ("000000000" + num)
    .substr(-9)
    .match(/^(\d{2})(\d{2})(\d{2})(\d{1})(\d{2})$/);
  if (!n) return;

  var str = "";
  str +=
    n[1] != "00"
      ? (a[Number(n[1])] || b[n[1][0]] + " " + a[n[1][1]]) + "crore "
      : "";
  str +=
    n[2] != "00"
      ? (a[Number(n[2])] || b[n[2][0]] + " " + a[n[2][1]]) + "lakh "
      : "";
  str +=
    n[3] != "00"
      ? (a[Number(n[3])] || b[n[3][0]] + " " + a[n[3][1]]) + "thousand "
      : "";
  str +=
    n[4] != "0"
      ? (a[Number(n[4])] || b[n[4][0]] + " " + a[n[4][1]]) + "hundred "
      : "";
  str +=
    n[5] != "00"
      ? (str != "" ? "and " : "") +
        (a[Number(n[5])] || b[n[5][0]] + " " + a[n[5][1]]) +
        "Rs Only."
      : "";
  return str;
}

document.getElementById("amount").onkeyup = function () {
  document.getElementById("word").innerHTML = inWords(
    document.getElementById("amount").value
  );
};

function onSubmit() {
  var firstname = document.forms["Registration"]["username"].value;
  var email = document.forms["Registration"]["email"].value;
  var panRegex = /^([A-Z]){5}([0-9]){4}([A-Z]){1}$/;
  var amount = document.forms["Registration"]["amount"].value;
  var pno = document.forms["Registration"]["pan"].value;
  var captcha = document.forms["Registration"]["captcha"].value;

  // Validation
  if (firstname.length < 4) {
    document.getElementById("p1").innerHTML = "Enter Your Name";
    document.getElementById("p1").style.color = "red";
    return false;
  }
  if (email.length === 0) {
    document.getElementById("p2").innerHTML = "Enter Your valid email";
    document.getElementById("p2").style.color = "red";
    return false;
  }
  if (!panRegex.test(pno)) {
    document.getElementById("p3").innerHTML = "Enter Your Pancard details";
    document.getElementById("p3").style.color = "red";
    return false;
  }
  if (amount.length === 0) {
    document.getElementById("p4").innerHTML = "Enter Your amount";
    document.getElementById("p4").style.color = "red";
    return false;
  }
  if (captcha.length === 0 || parseInt(captcha) !== window.captcha) {
    document.getElementById("p5").innerHTML = "Invalid captcha";
    document.getElementById("p5").style.color = "red";
    return false;
  }

  alert("You registered successfully");
}

// Function to generate OTP

function generateOtp() {
  var mainOtp = Math.round(Math.random() * 20000) + 20000;

  localStorage.setItem("mainOtp", mainOtp);

  alert(mainOtp);

  window.location.assign("new.html");
}

// Function to validate OTP

let chances = 1;
let totalChances = 3;
function validateOTP() {
  if (chances >= 3) {
    document.querySelector("#verification").style.display = "none";
  } else {
    const mainotp = parseInt(localStorage.getItem("mainotp"));
    const userOtp = parseInt(document.querySelector("#userOtp").value);

    if (mainotp === userOtp) {
      alert("application successful");
    } else {
      alert("application failed");
      alert(`Total ${totalChancesn - chances} chances left`);
    }
  }

  chances++;
}
