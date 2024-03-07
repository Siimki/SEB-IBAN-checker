function checkIban() {
  const ibanField = document.getElementById("iban");
  const bankField = document.getElementById("bank")
  const rawIban = ibanField.value;
  bankField.innerHTML = "";

  //Im going to clean the iban from whitespace.
  const iban = rawIban.replaceAll(" ", "");
  //Test 1 - length of iban.
  let validLength = lengthCheck(iban);
  //Prepare iban for mod check
  const reArrangedIban = reArrangeIbanNumbers(iban.toUpperCase());
  if (!validLength) {
    addResult("IBAN INVALID");
    return;
  }
  //test 2 - mod97 check on iban.
  mod97Check(reArrangedIban);
  identifyBank(iban);
  ibanField.value = "";
}

function addResult(result) {
  const resultField = document.getElementById("result");
  resultField.innerHTML = result;
}

const submitButton = document.getElementById("submit");
submitButton.addEventListener("click", () => {
  console.log("Checking IBAN");
  checkIban();
});

function reArrangeIbanNumbers(iban) {
  let countryCode = iban.slice(0, 2);
  let checkDigits = iban.slice(2, 4);
  let rest = iban.slice(4);
  let rearrangedString = rest + countryCode + checkDigits;
  let arrangedIban = "";

  for (let i = 0; i < iban.length; i++) {
    if (!isNaN(rearrangedString[i])) {
      arrangedIban += rearrangedString[i];
    } else {
      arrangedIban += (rearrangedString.charCodeAt(i) - 55).toString();
    }
  }
  return arrangedIban;
}

function mod97Check(iban) {
  //The main algorithm to check ibans. dividend variable has to equal 1 otherwise iban is invalid!
  let dividend = "";
  for (let i = 0; i < iban.length; i++) {
    dividend += iban[i];
    dividend = dividend % 97;
  }
  if (dividend == 1) {
    addResult("IBAN VALID");
  } else {
    addResult("IBAN INVALID");
  }
}

function identifyBank(iban) {
  let bankCode2 = iban.slice(4, 6);
  const bankField = document.getElementById("bank");
  bankField.innerHTML = "";

  let bankName = "";
  switch (bankCode2) {
    case "22":
      bankName = "Swedbank";
      break;
    case "10":
      bankName = "SEB";
      bankField.style.display = "block";
      break;
    case "77":
      bankName = "LHV";
      break;
    default:
      bankName = "";
  }
  if (bankName == "SEB") {
    createLogo();
  } else {
    bankField.innerHTML = bankName;
  }
}

function createLogo() {
  const bankField = document.createElement("img");
  const outerDiv = document.getElementById("bank");
  bankField.src = "src/seb.jpg";
  bankField.className = "mt-4 h-12";
  outerDiv.appendChild(bankField);
}

function lengthCheck(iban) {
  return iban.length > 15 && iban.length < 35;
}
