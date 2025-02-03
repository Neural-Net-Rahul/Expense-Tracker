document.addEventListener('DOMContentLoaded',()=>{
    let btn = document.getElementById('btn');
    let expenseName = document.getElementById('exp_name');
    let amount = document.getElementById('amount');
    let sectiondown = document.getElementById('sectiondown');
    let total = document.getElementById('total');
    let showData = JSON.parse(localStorage.getItem('expense_data'))||[];
    renderData();
    function isValidNumber(str) {
      return /^[0-9]+(\.[0-9]+)?$/.test(str);
    }
    btn.addEventListener('click',()=>{
        if(expenseName.value=="" || amount.value=="") return;
        if(isValidNumber(amount.value) === false){
            return;
        }
        addData();
        renderData();
    })
    function addData(){
        showData.push({
            id : Date.now(),
            key : expenseName.value,
            value : amount.value 
        });
    }
    function renderData(){
        sectiondown.innerHTML = "";
        let total_val = 0;
        showData.forEach(i => {
            sectiondown.innerHTML += `<div>
                <div data-id=${i.id}>${i.key} && ${i.value}</div>
                <button class='deleteButton' data-id=${i.id}>Delete</button>
            </div>`;
            total_val += Number(i.value);
        })
        total.textContent = "Total amount: $" + total_val;
        expenseName.value = "";
        amount.value = "";
        localStorage.setItem('expense_data',JSON.stringify(showData));
    }
    sectiondown.addEventListener('click',(event)=>{
        if(event.target.tagName == `BUTTON`){
            let id = event.target.getAttribute('data-id');
            let newData = [];
            showData.forEach(i => {
                if(i.id != id){
                    newData.push(i);
                }
            });
            showData = newData;
            renderData();
        }
    })
})
