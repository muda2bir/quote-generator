const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const newQuoteBtn = document.getElementById("new-quote");
const loader = document.getElementById("loader");

let apiQuotes = [];

function showLoadingSpinner() {
  if (!loader.hidden) {
    loader.hidden = false;
    quoteContainer.hidden = true;
  }
}

function removeLoadingSpinner() {
  quoteContainer.hidden = false;
  loader.hidden = true;
}

// Show new Quote

function newQuote() {
  showLoadingSpinner();
  // Pick a random quote from the apiQuotes array
  const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];

  //   Check if the author filed is blank and replace it with unknown

  if (!quote.author) {
    authorText.textContent = "Unknown";
  } else {
    authorText.textContent = quote.author;
  }

  // Check the quote length to determine the styling

  if (quote.text.length > 80) {
    quoteText.classList.add("long-quote");
  } else {
    quoteText.classList.remove("long-quote");
  }

  //   Set Quote, Hide the Loader
  quoteText.textContent = quote.text;
  removeLoadingSpinner();
}

// Get Quotes from the API

async function getQuotes() {
  showLoadingSpinner();
  const apiUrl = "https://type.fit/api/quotes";
  try {
    const response = await fetch(apiUrl);
    apiQuotes = await response.json();
    newQuote();
  } catch (error) {
    // Catch Error Here
    console.log("Whoops no quote", error);
  }

  //   const proxyUrl = "https://cors-anywhere.herokuapp.com/";
  //   const apiUrl =
  //     "http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json";
  //   try {
  //     const response = await fetch(proxyUrl + apiUrl);
  //     const data = await response.json();
  //     console.log(data);
  //   } catch (error) {
  //       getQuotes();
  //     console.log("whoops, no quote", error);
  //   }
}

// Tweet Quote

function tweetQuote() {
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
  window.open(twitterUrl, "_blank");
}

// Event Listeners

newQuoteBtn.addEventListener("click", newQuote);
twitterBtn.addEventListener("click", tweetQuote);

// On Load
getQuotes();
