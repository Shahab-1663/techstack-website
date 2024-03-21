let subForm = document.getElementById('subject-form');
let calcForm = document.getElementById('calc-form');
console.log(subForm);
let subBtn = document.querySelector('.subjBtn');
subBtn.addEventListener('click', (e)=>{
    e.preventDefault();
    let subNum = document.querySelector('.sub_number').value;
    if(subNum > 0 && subNum <= 30) {
        for(i = 0; i < subNum; i++) {
            createSubBox();
        }
        subForm.style.display = 'none';
        subForm.style.visibility = 'hidden';
    } else {
        let noSubError = 
    }
});

const createSubBox = ()=>{
    const subBox = `
    <div class="subject_row">
        <input class="sub_grade form-control" type="text" name="sub_grade" placeholder="Subject Grade" >
        <input class="cr_hour form-control" type="number" name="cr_hour" placeholder="Subject Credit Hours" >
    </div>
    `
    calcForm.innerHTML += subBox;
}
