const BASE_URL="https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";
const content_select=document.querySelectorAll(".content select");
let from_msg=document.querySelector("#from-msg");
let to_msg=document.querySelector("#to-msg");
const selectflieds=document.querySelectorAll("select");
let inputfield=document.querySelectorAll("input");

window.addEventListener("load",()=>{
    let fromCurr=selectflieds[0]
        let toCurr=selectflieds[1];
         inputfield[0].value ="1";
        let amtval=inputfield[0].value;
        let toinput=inputfield[1];
    getCurrencyRate(amtval,fromCurr,toCurr,toinput);
})

// adding country list 
for (select of content_select){
    for (currcode in countryList){
        let newOption=document.createElement("option");
        newOption.innerText=currcode;
        newOption.value=currcode;
        if(select.name==="from" && currcode==="USD"){
            newOption.selected=true;
        }else if(select.name==="to" && currcode==="INR"){
            newOption.selected=true;
        }
        select.append(newOption);
    };

  //getting updated flag and  currency exchange while select flag

selectflieds.forEach((select,index)=>{
     select.addEventListener("change",(evt)=>{
        let fromCurr=selectflieds[0+index];
        let toCurr=selectflieds[1-index];
        let amtval=inputfield[0+index].value;
        let toinput=inputfield[1-index];   
        previousFromValue=fromCurr;
        previousToValue=toCurr;
        updateFlag(evt.target);
        getCurrencyRate(amtval,fromCurr,toCurr,toinput);
    });
})
};

 // updating country flags by API

 const updateFlag=(element)=>{
    let currcode=element.value;
    let countryCode=countryList[currcode];
    let img=element.parentElement.querySelector("img");
    img.src= `https://flagsapi.com/${countryCode}/shiny/64.png`;
};


//currency exchange while input

inputfield.forEach((input,index)=>{
    input.addEventListener("focus",()=>{
        let fromCurr=selectflieds[0+index];
        let toCurr=selectflieds[1-index];
    
        input.addEventListener("input",async()=>{
           let amtval=input.value;
           let toinput= inputfield[1-index];
           getCurrencyRate(amtval,fromCurr,toCurr,toinput);
          
        });
    });
});

//Getting currency rate by API

const getCurrencyRate=async(amtval,fromCurr,toCurr,toinput)=>{
    if(amtval<0){
        amtval=0;
    }
    const URL=`${BASE_URL}/${fromCurr.value.toLowerCase()}.json`;
    let response= await fetch(URL);
    let data=await response.json();
    let rate =data[`${fromCurr.value.toLowerCase()}`][`${toCurr.value.toLowerCase()}`];
    
    let finalAmt= amtval * rate;
    from_msg.innerText= `${amtval} ${fromCurr.value} equal to`;
    to_msg.innerText= `${finalAmt.toFixed(3)} ${toCurr.value}`;
    toinput.value=`${finalAmt.toFixed(3)}`;
};

