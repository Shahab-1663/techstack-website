// let formArea = document.querySelector(".form-area");
let subForm = document.getElementById('subject-form');
let calcForm = document.getElementById('calc-form');
let subBtn = document.querySelector('.subjBtn');
let totalEGradePoints = 0;
let totalCrHours = 0;
let gradeArr = [];
let crHArr = [];
let eGradeArr = [];
let cgpa = 0;
let cgpaError = false;

subBtn.addEventListener('click', (e) => {
    e.preventDefault();
    let subNumField = document.querySelector('.sub_number');
    let subNum = document.querySelector('.sub_number').value;
    let noSubError = document.getElementById("no_sub_error");
    let maxSubError = document.getElementById("max_sub_error");
    if (subNum > 0 && subNum <= 30) {
        calcForm.innerHTML += "<h4 class='thin-heading'>Enter your Subject Grades and Credit Hours</h4>";
        for (let i = 0; i < subNum; i++) {
            createSubBox();
        }
        calcForm.innerHTML += '<p class="subjFieldError" style="font-size: 13px; color: #ff0606; display: none; margin-bottom: 5px;">Please fill out all given fields</p>';
        calcForm.innerHTML += '<p class="subjGradeError" style="font-size: 13px; color: #ff0606; display: none; margin-bottom: 5px;">Invalid Grade(s) entered!</p>';
        calcForm.innerHTML += '<button type="submit" class="btnStyle" id="cgpaCalcBtn" style="margin-left: 0;">Calculate</button>';
        calcForm.innerHTML += '<button type="submit" class="btnStyleOutline" id="cgpaCalcCancel">Cancel</button>';
        const cgpaCalcBtn = document.getElementById("cgpaCalcBtn");
        const cgpaCalcCancel = document.getElementById("cgpaCalcCancel");
        cgpaCalcBtn.addEventListener("click", (e) => {
            e.preventDefault();
            calculateCGPA();
        })
        cgpaCalcCancel.addEventListener("click", (e) => {
            e.preventDefault();
            subForm.style.display = 'block';
            subForm.style.visibility = 'visible';
            subNumField.value = '';
            calcForm.innerHTML = '';
        })
        subForm.style.display = 'none';
        subForm.style.visibility = 'hidden';
        noSubError.style.display = "none";
        maxSubError.style.display = "none";
    } else if (subNum === "") {
        maxSubError.style.display = "none";
        noSubError.style.display = "block";
        subNumField.style.border = "2px solid #DE2626FF";
    } else {
        noSubError.style.display = "none";
        maxSubError.style.display = "block";
        subNumField.style.border = "2px solid #DE2626FF";
    }

});

const createSubBox = () => {
    const subBox = `
    <div class="subject_row">
        <input class="sub_grade form-control" type="text" name="sub_grade" placeholder="Subject Grade" >
        <input class="cr_hour form-control" type="number" name="cr_hour" placeholder="Subject Credit Hours" >
    </div>
    `
    calcForm.innerHTML += subBox;
}

const calculateCGPA = () => {
    let subGrade = document.querySelectorAll(".sub_grade");
    let crHour = document.querySelectorAll(".cr_hour");
    for (let i = 0; i < subGrade.length; i++) {
        let gradeToPoint = subGrade[i].value;
        let crHourValue = crHour[i].value;
        if (gradeToPoint !== "" && crHourValue !== "") {
            gradeToPoint = gradeToPoint.toUpperCase();
            let subPoints;
            if (gradeToPoint === "A")
                subPoints = 4.0;
            else if (gradeToPoint === "B+")
                subPoints = 3.5;
            else if (gradeToPoint === "B")
                subPoints = 3.0;
            else if (gradeToPoint === "C+")
                subPoints = 2.5;
            else if (gradeToPoint === "C")
                subPoints = 2.0;
            else if (gradeToPoint === "D+")
                subPoints = 1.5;
            else if (gradeToPoint === "D")
                subPoints = 1.0;
            else if (gradeToPoint === "F")
                subPoints = 0.0;
            else {
                cgpaError = true;
                document.querySelector(".subjGradeError").style.display = "block";
                setTimeout(()=>{
                    document.querySelector(".subjGradeError").style.display = "none";
                }, 3000);
                return;
            }
            gradeArr.push(subPoints);
            crHArr.push(Number(crHour[i].value));
            eGradeArr.push(subPoints * crHour[i].value);
            cgpaError = false;
        } else {
            cgpaError = true;
            document.querySelector(".subjFieldError").style.display = "block";
            setTimeout(()=>{
                document.querySelector(".subjFieldError").style.display = "none";
            }, 3000);
            return;
        }
    }

    for (let i = 0; i < eGradeArr.length; i++) {
        totalEGradePoints += eGradeArr[i];
        totalCrHours += crHArr[i];
    }
    cgpa = totalEGradePoints / totalCrHours;
    displayCgpa(cgpa);
}

const displayCgpa = (cgpaVal) => {
    // calcForm.style.display = "none";
    // calcForm.style.visibility = "hidden";
    calcForm.innerHTML = '';
    calcForm.innerHTML += `
        <div style="display: flex; flex-direction: column; align-items: center; justify-content: space-evenly;">
            <i class="fa-duotone fa-badge-check" style="font-size: 190px;"></i>
            <p style="margin-top: 15px; font-size: 28px">You scored <span style="font-weight: bold;">${cgpaVal}</span> CGPA</p>
            <button class="btnStyle reCalcBtn">Calculate Again!</button>
        </div>
    `;
    document.querySelector(".reCalcBtn").addEventListener("click", ()=>{
        calcForm.innerHTML = '';
        subForm.style.visibility = 'visible';
        subForm.style.display = 'block';
        document.querySelector('.sub_number').value = '';
        totalEGradePoints = 0;
        totalCrHours = 0;
        gradeArr = [];
        crHArr = [];
        eGradeArr = [];
        cgpa = 0;
        cgpaError = false;
    });
}

