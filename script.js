const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

let apiQuotes = [];

// Show new Quote
const newQuote = () => {
    loading();
    const len = apiQuotes.length;
    // Pick a random qutoe from apiQuotes Array
    const newQuote = apiQuotes[Math.floor(Math.random() * len)];
    // Check if author field is blank and replace it with 'Unknown'
    authorText.innerText = newQuote.author || 'Unknown';
    // Check Quote length to determine the styling
    if (newQuote.text.length > 120) {
     quoteText.classList.add('long-quote');   
    } else {
        quoteText.classList.remove('long-quote');
    }
    quoteText.innerText = newQuote.text;
    complete();
}

// Get Quotes from API
const getQuotes = async () => {
    loading();
    const apiUrl = `https://type.fit/api/quotes`;
    try {
        const response = await fetch(apiUrl);
        apiQuotes = await response.json();
        newQuote();
    } catch (error) {
        // Catch Error Here
        complete();
    }
}

// tweet Quote
const tweetQuote = () => {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl, '_blank');
}

// Show Loading
const loading = () => {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

// Hide loading
const complete = () => {
    loader.hidden = true;
    quoteContainer.hidden = false;
}




//  Event Listeners
newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote);

// On Load
getQuotes();
