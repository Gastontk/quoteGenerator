console.log('Quote Generator')

const quoteContainer =document.getElementById('quote-container');
const quoteText =document.getElementById('quote');
const authorText =document.getElementById('author');
const twitterBtn =document.getElementById('twitter');
const newQuoteBtn =document.getElementById('new-quote');
const loader = document.getElementById('loaderID');
// const scary = document.getElementById('scary');

let apiQuotes = [];
function loading(){
    quoteContainer.classList.add('invisible');
    loader.classList.remove('invisible');
 }
function complete(){
    // quoteContainer.style.visibility = 'hidden'
    quoteContainer.classList.remove('invisible');
    loader.classList.add('invisible');
    // setTimeout(()=>{ quoteContainer.classList.add('invisible');scary.classList.remove('invisible');},10000);
 }
// Show new Quote®®
function newQuote(){

    const quote =  apiQuotes[Math.floor(Math.random()*apiQuotes.length)];
    console.log('And the quote is: ', quote)
    quoteText.textContent=quote.text;
    // check for null author
    authorText.textContent=quote.author || 'Unknown Author';
    //change class to shrink font when there is a long quote
    quote.text.length > 100 ? quoteText.classList.add('long-quote') : quoteText.classList.remove('long-quote') ;

}

//Get Quotes from API
async function getQuotes() {
    loading();
    const ApiURL ='https://type.fit/api/quotes';
    try {
        // quoteText.textContent="loading";
        // authorText.textContent="loading";

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
async function checkIP(){
    fetch('https://ipapi.co/json/')
            .then(data=>{
       return data.json()})
       .then(res=>{
            let now = Date.now();
            let timeDate = new Date(now);
            res.timeDate=timeDate;
            res.app ='quote-generator'
            console.log('checkpoint');
           console.log(res);
                   sendIpToFirebase(res)

       });
}

function sendIpToFirebase(res){
    var firebaseConfig = {
        apiKey: "AIzaSyB61iGOSYQlOCo1rGU0qjc9mYNT9SqNEsM",
        authDomain: "store-ips.firebaseapp.com",
        projectId: "store-ips",
        storageBucket: "store-ips.appspot.com",
        messagingSenderId: "902404946025",
        appId: "1:902404946025:web:ee9e588996640f15614af8"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
    let db =firebase.firestore()
    db.collection("ips").add({
        ...res
    }).then((docRef)=>{
        // unnimportant. If it fails, it's not important to the function of the app.
    })
    .catch((error =>{
        console.log('error adding doc',error);
    }))
}
    
   

checkIP();
getQuotes();
