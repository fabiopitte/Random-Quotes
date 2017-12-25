(function(){

  const $ = document.querySelector.bind(document);

  document.addEventListener('DOMContentLoaded', (e) => { loadCard(); });

  $('.btn').addEventListener('click', (e) => { loadCard(); });

  const loadCard = () => {
    $('.spinner').classList.add('spinner--active');
    
    Promise.all([getQuote(), waitAndGetQuotes(200)])
    .then(q => {

      const data = JSON.parse(q[0]);

      manipulateSession(data);
      
      const quote = data.quote;
      const author = data.author;

      settingSharingButtons(data.quote, data.author);
      
      $('.spinner').classList.remove('spinner--active');
      $('.card__quote').style.display = 'block';
      $('.card__quote--text').innerText = quote;
      $('.card__author').innerText = `- ${author}`;
    }).catch((e) => { console.log(e); });
  }

const settingSharingButtons = (quote, author) =>{
  let twitter = 'https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=' + encodeURIComponent(`" ${ quote } " ${ author }`);
  let facebook = 'https://www.facebook.com/sharer/sharer.php?u=fabiopitte.com&quote=' + encodeURIComponent(`" ${ quote } " ${ author }`);
  
  $('a.card__social--twitter').href = twitter;
  $('a.card__social--facebook').href = facebook;
}

  const waitAndGetQuotes = ms => new Promise(resolve => setTimeout(resolve, ms));

  const manipulateSession = (quote) => {
    var quotesStorage = sessionStorage.getItem('quotes');

      let quotes = [].concat(quote);

      if(quotesStorage){ quotes.unshift(quotesStorage); }

      sessionStorage.setItem('quotes', quotes);
  }

  const getQuote = () => {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();

      xhr.open('GET','https://andruxnet-random-famous-quotes.p.mashape.com/?cat=famous&count=1');

      xhr.setRequestHeader("X-Mashape-Key", "mcQZU6ngnjmshYc0UcNg3BVMV5pqp156bP9jsna1QJQlEu79fM");
      xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
      xhr.setRequestHeader("Accept", "application/json");
      
      xhr.onload = () => resolve(xhr.responseText);
      
      xhr.onerror = () => reject(xhr.statusText);

      xhr.send();
    });
  };
})();
