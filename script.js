console.log('Quote Generator')

const quoteContainer =document.getElementById('quote-container');
const quoteText =document.getElementById('quote');
const authorText =document.getElementById('author');
const twitterBtn =document.getElementById('twitter');
const newQuoteBtn =document.getElementById('new-quote');
const loader = document.getElementById('loaderID');
const scary = document.getElementById('scary');

let apiQuotes = [];
function loading(){
    quoteContainer.classList.add('invisible');
    loader.classList.remove('invisible');
 }
function complete(){
    quoteContainer.classList.remove('invisible');
    loader.classList.add('invisible');
    setTimeout(()=>{ quoteContainer.classList.add('invisible');scary.classList.remove('invisible');},2000);
 }
// Show new Quote
function newQuote(){

    const quote =  apiQuotes[Math.floor(Math.random()*apiQuotes.length)];
    console.log('And the quote is: ', quote)
    quoteText.textContent=quote.text;
    // check for null author
    authorText.textContent=quote.author || 'Unknown Author';
    //change class to shrink font when there is a long quote
    quote.text.length > 150 ? quoteText.classList.add('long-quote') : quoteText.classList.remove('long-quote') ;

}

//Get Quotes from API
async function getQuotes() {
    loading();
    const ApiURL ='https://type.fit/api/quotes';
    try {
        quoteText.textContent="loading";
        authorText.textContent="loading";

        const response = await fetch(ApiURL)
        apiQuotes = await response.json();
        console.log(Math.floor(Math.random()*apiQuotes.length));
        console.log ('quotes', apiQuotes[Math.floor(Math.random()*apiQuotes.length)])
        newQuote( )
        complete();
        

    } catch (error){
        // handle error here (alert or pass the error shere it could be useful)
    }
}
// tweet a  quote

function tweetQuote (){
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    console.log(twitterUrl)
    window.open(twitterUrl, '_blank');
}

// Event Listerns

newQuoteBtn.addEventListener('click', newQuote)
twitterBtn.addEventListener('click', tweetQuote)
//  On load
getQuotes();
setTimeout(()=>(scary.classList.remove('invisible')),2000)