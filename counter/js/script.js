const submit = document.querySelector('.form__submit-button');
const reset = document.querySelector('.form__reset-button');
const inputs = document.querySelectorAll('.input__wrapper input');
const resultBlock = document.querySelector('.counter__result');
const maleSwitch = document.getElementById('gender-male');
const femaleSwitch = document.getElementById('gender-female');
const activityMinimal = document.getElementById('activity-minimal');
const checkBoxes = document.querySelectorAll('.radio .radio__wrapper input');
const caloriesNorm = document.getElementById('calories-norm');
const caloriesMinimal = document.getElementById('calories-minimal');
const caloriesMaximal = document.getElementById('calories-maximal');

const WEIGHT_COEFFICIENT = 10;
const HEIGHT_COEFFICIENT = 6.25;
const AGE_COEFFICIENT = 6.25;

const MIN_ACTIVITY_COEFFICIENT = 1.2;
const LOW_ACTIVITY_COEFFICIENT = 1.375;
const MID_ACTIVITY_COEFFICIENT = 1.55;
const HIGH_ACTIVITY_COEFFICIENT = 1.725;
const HARD_ACTIVITY_COEFFICIENT = 1.9;

// activate submit an reset
for (let input of inputs) {
    input.addEventListener('input', function (evt) {
        evt.preventDefault();

        submit.disabled = !(inputs[0].value.length > 0
            && inputs[1].value.length > 0
            && inputs[2].value.length > 0);

        reset.disabled = !(inputs[0].value.length > 0
            || inputs[1].value.length > 0
            || inputs[2].value.length > 0);
    });
}

reset.addEventListener('click', function (evt) {
    evt.preventDefault();
    resultBlock.classList.add('counter__result--hidden');
    for (let input of inputs) {
        input.value = "";
    }
    maleSwitch.checked = true;
    activityMinimal.checked = true;
    reset.disabled = true;
    submit.disabled = true;
});

const countingCalories = function () {
    let maleFactor = (femaleSwitch.checked === true) ? -161 : 5;
    let weights = Number(WEIGHT_COEFFICIENT) * Number(inputs[2].value);
    let heights = Number(HEIGHT_COEFFICIENT) * Number(inputs[1].value);
    let age = Number(AGE_COEFFICIENT) * Number(inputs[0].value);

    let N = (weights + heights - age + maleFactor);

    if (checkBoxes[0].checked) {
        N *= MIN_ACTIVITY_COEFFICIENT;
    } else if (checkBoxes[1].checked) {
        N *= LOW_ACTIVITY_COEFFICIENT;
    } else if (checkBoxes[2].checked) {
        N *= MID_ACTIVITY_COEFFICIENT;
    } else if (checkBoxes[3].checked) {
        N *= HIGH_ACTIVITY_COEFFICIENT;
    } else if (checkBoxes[4].checked) {
        N *= HARD_ACTIVITY_COEFFICIENT;
    }

    caloriesNorm.innerHTML = (N).toFixed(0);
    caloriesMinimal.innerHTML = (N * 0.85).toFixed(0);
    caloriesMaximal.innerHTML = (N * 1.15).toFixed(0);
}

submit.addEventListener('click', function (evt) {
    evt.preventDefault();
    countingCalories();
    resultBlock.classList.remove('counter__result--hidden');
});
