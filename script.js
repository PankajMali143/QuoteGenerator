const quoteContainer=document.getElementById("quote-container");
const quoteText=document.getElementById("quote");
const authorText=document.getElementById("quote-author");
const twitterBtn=document.getElementById("twitter");
const newQuoteBtn=document.getElementById("new-quote");
const loader=document.getElementById("loader");

let apiQuotes=[];

//loader function
function loading(){
    loader.hidden=false;
    quoteContainer.hidden=true;    
}

//function completing
function complete(){
    quoteContainer.hidden=false;
    loader.hidden=true; 
}

//show new quote
function newQuotes(){
   loading();

    const Quote=apiQuotes[Math.floor(Math.random()*apiQuotes.length)]
    
    if(!Quote.author)
    {
        Quote.author="unknown";
    }
    else{
        authorText.innerHTML="- "+Quote.author;
    }

    if(Quote.text.length >50){
        quoteText.classList.add('long-quote');
    }
    else{
        quoteText.classList.remove('long-quote');
    }

    //set quote and hide loader
    quoteText.innerHTML=Quote.text;
    complete();

}

async function getQuotes(){

    loading();
    const apiUrl="https://type.fit/api/quotes";
    try{
        const response=await fetch(apiUrl);
        apiQuotes=await response.json();
        newQuotes();
    }
    catch(err){
        console.log(err)
    }

}
//tweet quote
function tweetQuote(){
    const twitterURL=`https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`
    window.open(twitterURL,'_blank');
}


newQuoteBtn.addEventListener("click",newQuotes);
twitterBtn.addEventListener("click",tweetQuote);



 getQuotes();