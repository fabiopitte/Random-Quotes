let $ = document.querySelector.bind(document);

document.addEventListener('DOMContentLoaded', (e) => { loadCard(); });

$('.btn').addEventListener('click', (e) => { loadCard(); });

function loadCard(){
  $('.spinner').classList.add('spinner--active');
  getQuote().then((q) => {
    let data = JSON.parse(q);
    
    waitAndGetQuotes(200).then(() => {
      $('.spinner').classList.remove('spinner--active');
    }).then(() => {
      $('.card__quote--text').innerText = data.quote;
      $('.card__author').innerText = data.author;
    })
    .catch((e) => {
      console.log(e);
    });
  }).catch((e) => {
    console.log(e);
  });
}

const waitAndGetQuotes = ms => new Promise(resolve => setTimeout(resolve, ms));

const getQuote = () => {
  return new Promise((resolve, reject) => {
    var xhr = new XMLHttpRequest();

    xhr.open('GET','https://andruxnet-random-famous-quotes.p.mashape.com/?cat=famous&count=1');
    xhr.setRequestHeader("X-Mashape-Key", "mcQZU6ngnjmshYc0UcNg3BVMV5pqp156bP9jsna1QJQlEu79fM");
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.setRequestHeader("Accept", "application/json");
    
    xhr.onload = function() {
      var responseText = xhr.responseText;
      resolve(responseText);
     };
     
     xhr.onerror = function() {
       reject(xhr.statusText);
     };
    xhr.send();
  });
};