const BASE_URL = "https://2024-03-06.currency-api.pages.dev/v1/currencies";
const dropdowns = document.querySelectorAll(".dropdown select");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const btn = document.querySelector("form button");
const msg = document.querySelector(".msg");
const reverse = document.querySelector(".reverse");

for(select of dropdowns)
{
    for(currCode in countryList)
    {
        let newOption = document.createElement("option");
        newOption.innerText = currCode;
        newOption.value = currCode;
        if(select.name === "from" && currCode==="USD")
        {
            newOption.selected="selected";
        }
        else if(select.name === "to" && currCode==="INR")
        {
            newOption.selected="selected";
        }
        select.append(newOption);
    }
    select.addEventListener("change",(evt)=>{
        updateFlag(evt.target);
    });
    
};

reverse.addEventListener("click",(evt)=>{
    let temp = fromCurr.value;
    fromCurr.value = toCurr.value;
    toCurr.value = temp;
    updateFlag(fromCurr);
    updateFlag(toCurr);
});

const updateFlag = (element)=>{
    let currCode = element.value;
    let countryCode = countryList[currCode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;
};

const updateExchangeRate =async()=>{
    let amount = document.querySelector(".amount input");
    let amountValue = amount.value;
    if(amountValue==="" || amountValue < 0)
    {
        amount.value="1";
        amountValue = "1";
    }
    let fromURL = `${BASE_URL}/${fromCurr.value.toLowerCase()}.json`;
    let fromResponse = await fetch(fromURL);
    let toURL = `${BASE_URL}/${toCurr.value.toLowerCase()}.json`;
    let toResponse = await fetch(toURL);
    let fromData = await fromResponse.json();
    let rate = fromData[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()];
    let finalAmount = amountValue * rate;
    msg.innerText = `${amountValue} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;
};

window.addEventListener("load",()=>{
    updateExchangeRate();
});

btn.addEventListener("click",(evt)=>{
    evt.preventDefault();
    updateExchangeRate();
});