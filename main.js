const settings=document.querySelector('.set');
const popup=document.querySelector('.settings-popup');
settings.addEventListener("click",()=>{
    if(popup.style.display==="flex"){
        popup.style.display="none";
    }
    else{
        popup.style.display="flex";
    }
})