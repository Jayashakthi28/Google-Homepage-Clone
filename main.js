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
let flag=0;
function display_changer(){
    search_bar.classList.add('add-style');
    close_icon.classList.add('flexer');
    suggestions.classList.add('flexer');
    flag=1;
}
function display_Remover(){
    search_bar.classList.remove('add-style');
    close_icon.classList.remove('flexer');
    suggestions.classList.remove('flexer');
}
const search_bar=document.querySelector('.search-wrap');
const close_icon=search_bar.querySelector('.close');
const suggestions=document.querySelector('.suggestions-section');
const inp=search_bar.querySelector('input');
let suggestion_txt;
function checkActive(){
    if(inp===document.activeElement){
        display_changer();
    }
    else{
        if(flag===1){
            display_Remover();
            flag=0;
        }
    }
        
}
close_icon.addEventListener('click',()=>{
    inp.value='';
});
window.addEventListener("click",checkActive);
inp.addEventListener('keypress',()=>{
    fetchSuggestion(inp.value)});
async function fetchSuggestion(txt){
    const regex = /data=\"([\w ]*)\"/gi;
    url = `https://suggestqueries.google.com/complete/search?output=toolbar&hl=en&q=${txt}`;
    let response = await fetch(url);
    let result = await response.text();
    let out = result.matchAll(regex);
    let temp="";
    for(const match of out){
        temp+=` <div class="suggestion-txt" data-query='${match[1]}'><span class="material-icons">
        search
        </span>${match[1]}</div>`;
    }
    temp+=` <div class="buttons-section">
    <div class="btn-wrap">
    <button><a href="">Google Search</a></button>
    <button><a href="https://www.google.com/doodles">I'm Feeling Lucky</a></button>
    </div>
    </div>`;
    suggestions.innerHTML=temp;
    suggestion_txt=suggestions.querySelectorAll('.suggestion-txt');
    suggestion_txt.forEach(d=>{
        d.addEventListener("click",()=>{
            // console.log(d);
            // console.log(d.dataset.query);
            window.location.href = `https://www.google.com/search?q=${d.dataset.query}`;
        })
    });
}
