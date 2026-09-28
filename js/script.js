// CGPA Calculator Logic
document.addEventListener('DOMContentLoaded', () => {
    const subForm = document.getElementById('subject-form');
    const calcForm = document.getElementById('calc-form');
    const subBtn = document.querySelector('.subjBtn');

    if (!subForm || !calcForm || !subBtn) {
        return;
    }

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
        let subNum = subNumField ? subNumField.value : '';
        let noSubError = document.getElementById("no_sub_error");
        let maxSubError = document.getElementById("max_sub_error");
        if (subNum > 0 && subNum <= 30) {
            calcForm.innerHTML = "<h4 class='thin-heading'>Enter your Subject Grades and Credit Hours</h4>";
            for (let i = 0; i < subNum; i++) {
                createSubBox();
            }
            calcForm.innerHTML += '<p class="subjFieldError" style="font-size: 13px; color: #ff0606; display: none; margin-bottom: 5px;">Please fill out all given fields</p>';
            calcForm.innerHTML += '<p class="subjGradeError" style="font-size: 13px; color: #ff0606; display: none; margin-bottom: 5px;">Invalid Grade(s) entered!</p>';
            calcForm.innerHTML += '<button type="submit" class="btnStyle" id="cgpaCalcBtn" style="margin-left: 0;">Calculate</button>';
            calcForm.innerHTML += '<button type="submit" class="btnStyleOutline" id="cgpaCalcCancel">Cancel</button>';
            const cgpaCalcBtn = document.getElementById("cgpaCalcBtn");
            const cgpaCalcCancel = document.getElementById("cgpaCalcCancel");
            if (cgpaCalcBtn) {
                cgpaCalcBtn.addEventListener("click", (e) => {
                    e.preventDefault();
                    calculateCGPA();
                });
            }
            if (cgpaCalcCancel) {
                cgpaCalcCancel.addEventListener("click", (e) => {
                    e.preventDefault();
                    subForm.style.display = 'block';
                    subForm.style.visibility = 'visible';
                    if (subNumField) subNumField.value = '';
                    calcForm.innerHTML = '';
                });
            }
            subForm.style.display = 'none';
            subForm.style.visibility = 'hidden';
            if (noSubError) noSubError.style.display = "none";
            if (maxSubError) maxSubError.style.display = "none";
        } else if (subNum === "") {
            if (maxSubError) maxSubError.style.display = "none";
            if (noSubError) noSubError.style.display = "block";
            if (subNumField) subNumField.style.border = "2px solid #DE2626FF";
        } else {
            if (noSubError) noSubError.style.display = "none";
            if (maxSubError) maxSubError.style.display = "block";
            if (subNumField) subNumField.style.border = "2px solid #DE2626FF";
        }
    });

    const createSubBox = () => {
        const subBox = `
        <div class="subject_row">
            <input class="sub_grade form-control" type="text" name="sub_grade" placeholder="Subject Grade" >
            <input class="cr_hour form-control" type="number" name="cr_hour" placeholder="Subject Credit Hours" >
        </div>
        `;
        calcForm.innerHTML += subBox;
    };

    const calculateCGPA = () => {
        let subGrade = document.querySelectorAll(".sub_grade");
        let crHour = document.querySelectorAll(".cr_hour");
        gradeArr = [];
        crHArr = [];
        eGradeArr = [];
        totalEGradePoints = 0;
        totalCrHours = 0;

        for (let i = 0; i < subGrade.length; i++) {
            let gradeToPoint = subGrade[i].value;
            let crHourValue = crHour[i].value;
            if (gradeToPoint !== "" && crHourValue !== "") {
                gradeToPoint = gradeToPoint.toUpperCase().trim();
                let subPoints;
                if (gradeToPoint === "A" || gradeToPoint === "A+")
                    subPoints = 4.0;
                else if (gradeToPoint === "A-")
                    subPoints = 3.7;
                else if (gradeToPoint === "B+")
                    subPoints = 3.5;
                else if (gradeToPoint === "B")
                    subPoints = 3.0;
                else if (gradeToPoint === "B-")
                    subPoints = 2.7;
                else if (gradeToPoint === "C+")
                    subPoints = 2.5;
                else if (gradeToPoint === "C")
                    subPoints = 2.0;
                else if (gradeToPoint === "C-")
                    subPoints = 1.7;
                else if (gradeToPoint === "D+")
                    subPoints = 1.5;
                else if (gradeToPoint === "D")
                    subPoints = 1.0;
                else if (gradeToPoint === "F")
                    subPoints = 0.0;
                else {
                    cgpaError = true;
                    const errEl = document.querySelector(".subjGradeError");
                    if (errEl) {
                        errEl.style.display = "block";
                        setTimeout(() => { errEl.style.display = "none"; }, 3000);
                    }
                    return;
                }
                gradeArr.push(subPoints);
                crHArr.push(Number(crHour[i].value));
                eGradeArr.push(subPoints * Number(crHour[i].value));
                cgpaError = false;
            } else {
                cgpaError = true;
                const errEl = document.querySelector(".subjFieldError");
                if (errEl) {
                    errEl.style.display = "block";
                    setTimeout(() => { errEl.style.display = "none"; }, 3000);
                }
                return;
            }
        }

        for (let i = 0; i < eGradeArr.length; i++) {
            totalEGradePoints += eGradeArr[i];
            totalCrHours += crHArr[i];
        }
        cgpa = totalCrHours > 0 ? (totalEGradePoints / totalCrHours) : 0;
        displayCgpa(cgpa);
    };

    const displayCgpa = (cgpaVal) => {
        const formattedCgpa = isNaN(cgpaVal) ? "0.00" : (Number.isInteger(cgpaVal) ? cgpaVal.toFixed(1) : Number(cgpaVal).toFixed(2));
        calcForm.innerHTML = `
            <div style="display: flex; flex-direction: column; align-items: center; justify-content: space-evenly; padding: 20px 0;">
                <i class="fa-solid fa-circle-check" style="font-size: 130px; color: #16a34a;"></i>
                <p style="margin-top: 18px; font-size: 26px; text-align: center;">You scored <span style="font-weight: bold; color: #111;">${formattedCgpa}</span> CGPA</p>
                <button class="btnStyle reCalcBtn" style="margin-top: 15px;">Calculate Again!</button>
            </div>
        `;
        const reCalcBtn = document.querySelector(".reCalcBtn");
        if (reCalcBtn) {
            reCalcBtn.addEventListener("click", () => {
                calcForm.innerHTML = '';
                subForm.style.visibility = 'visible';
                subForm.style.display = 'block';
                const subNumField = document.querySelector('.sub_number');
                if (subNumField) subNumField.value = '';
                totalEGradePoints = 0;
                totalCrHours = 0;
                gradeArr = [];
                crHArr = [];
                eGradeArr = [];
                cgpa = 0;
                cgpaError = false;
            });
        }
    };
});

