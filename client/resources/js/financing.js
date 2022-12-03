const credits = document.querySelectorAll("div.credit-score-grid button");
const leasingPurchasing = document.querySelectorAll("button.lease-purchase");
const leaseLengthButtons = document.querySelectorAll("button.lease-length");
const allCalcFields = document.querySelectorAll("form.calculator-form");

var price = 0;
var downPayment = 0;
var tradeIn = 0;
var credScoreBracket = -1;
var leaseOrPurchase = -1;
var leaseLength = 0;

credits.forEach(button => {
    button.addEventListener('click', 
        function resetButton() {
            creditClearButtons();
            button.style.backgroundColor = '#D1A42D';
            button.style.color = 'white';
            credScoreBracket = $.parseJSON($(this).attr('btn-val'));
            calculate();
        }
    );
});


function creditClearButtons() {
    credits.forEach(button => {
        button.style.backgroundColor = 'white';
        button.style.color = 'black';
    });
}

leasingPurchasing.forEach(button => {
    button.addEventListener('click', 
        function resetButton() {
            leasingClearButtons();
            button.style.backgroundColor = '#D1A42D';
            button.style.color = 'white';
            leaseOrPurchase = $.parseJSON($(this).attr('btn-val'));
            calculate();
        }
    );
});


function leasingClearButtons() {
    leasingPurchasing.forEach(button => {
        button.style.backgroundColor = 'white';
        button.style.color = 'black';
    });
}

leaseLengthButtons.forEach(button => {
    button.addEventListener('click', 
        function resetButton() {
            leaseLengthClearButtons();
            button.style.backgroundColor = '#D1A42D';
            button.style.color = 'white';
            leaseLength = $.parseJSON($(this).attr('btn-val'));
            calculate();
        }
    );
});


function leaseLengthClearButtons() {
    leaseLengthButtons.forEach(button => {
        button.style.backgroundColor = 'white';
        button.style.color = 'black';
    });
}

allCalcFields.forEach(form => {
    form.addEventListener('change',
        function updateFields() {
            getCalcData(form);
            calculate();
        });
});

function getCalcData() {
    var formOutput = $('form.calculator-form').serializeArray();
    var values = [];
    for (var i = 0; i < formOutput.length; i++) {
        values.push(formOutput[i]["value"]);
    }
    price = values[0];
    price = parseFloat(price);
    if (isNaN(price)) price = 0;

    downPayment = values[1];
    downPayment = parseFloat(downPayment);
    if (isNaN(downPayment)) downPayment = 0;

    tradeIn = values[2];
    tradeIn = parseFloat(tradeIn);
    if (isNaN(tradeIn)) tradeIn = 0;

    if (isNaN(parseFloat(values[3])))
        return;
    leaseLength = values[3];
    leaseLength = parseFloat(leaseLength);
    if (isNaN(leaseLength)) leaseLength = 0;
}

function calculate() {
    if (credScoreBracket < 0 || leaseOrPurchase < 0 || leaseLength <= 0) {
        document.getElementById("calc-output-text").textContent="Please Fill in All Fields";
    } else {
        if (leaseOrPurchase == 1) {
            var apr = credScoreBracket * 0.95 + 3.68;
            apr = apr / 100;
            var netPayment = price - downPayment;
            if (netPayment < 0) {
                document.getElementById("calc-output-text").textContent="Down Payment or Trade In Value too High";
                return;
            }
            var top = netPayment * (apr * (1 + apr) ** leaseLength);
            var bottom = (1 + apr) ** leaseLength - 1;
            var final = top / bottom;
            final = final.toFixed(0);
            document.getElementById("calc-output-text").textContent="$" + final + "/month";
        } else {
            // Approximate 10% loss in value per year
            const depreciationRate = 0.85;
            var totalResidual = price * (depreciationRate ** (leaseLength / 12));
            var netDepreciation = price - totalResidual;
            var loss = netDepreciation - downPayment - tradeIn;
            if (loss < 0) {
                document.getElementById("calc-output-text").textContent="Down Payment or Trade In Value too High";
                return;
            }
            var monthlyPayment = loss / leaseLength;
            const premiumFactor = 0.00125;
            var premium = (totalResidual + (price - downPayment - tradeIn)) * premiumFactor;
            var final = monthlyPayment + premium;
            console.log(totalResidual);
            console.log(premium);
            final = final.toFixed(0);
            document.getElementById("calc-output-text").textContent="$" + final + "/month";
        }
        
    }
}

$(allCalcFields).submit(function(e) {
    e.preventDefault();
});