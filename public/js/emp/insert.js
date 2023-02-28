const empInsertForm=document.forms["empInsertForm"];
const empnoInput=empInsertForm["empno"];
const empnoMsg=document.getElementById("empnoMsg")
const EMPNO_CHECK_URL="/emp/empnoCheck.do";
empnoInput.addEventListener("change",empnoHandler);
function empnoHandler(){
    let val=(empnoInput.value);
    fetch(EMPNO_CHECK_URL+"?empno="+val).then((res)=>{
        if(res.status===200){
            return res.json();
        }else if(res.status===400){
            empnoMsg.innerText="잘못된 요청입니다.(400)";
        }else if(res.status===500){
            empnoMsg.innerText="조회 요류! 다시 시도하세요!(500)";
        }
    }).then((obj)=>{
        if(obj["check"]){//2시까지 식사하고 오세요~
            empnoMsg.innerText=obj["emp"]["ENAME"]+"이(가) 사용하고 있는 사원번호입니다.";
        }else{
            empnoMsg.innerText="사용 가능한 사원번호입니다.";
        }
    });
}