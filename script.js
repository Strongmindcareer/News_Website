const API_KEY = "cbdd740bdc72486a9bba1d4ebc571532";
const url="https://newsapi.org/v2/everything?q=";
window.addEventListener("load", () => fetchNews("Technology"));

async function fetchNews(query) {
    const res = await fetch(`${url}${query}&apiKey=${API_KEY}`);
    const data = await res.json();
    bindData(data.articles);
}
function bindData(articles) {
    const cardsContainer = document.getElementById("cardscontainer");
    const newsCardTemplate = document.getElementById("template-news-card");

    cardsContainer.innerHTML = "";

    articles.forEach((article) => {
        if (!article.urlToImage) return;

        const cardClone = newsCardTemplate.content.cloneNode(true);
        fillDataInCard(cardClone, article);
        cardsContainer.appendChild(cardClone);
    })
}
function fillDataInCard(cardClone, article) {
    const newsImg = cardClone.querySelector("#news-img");
    const newsTitle = cardClone.querySelector("#news-title");
    const newsSource = cardClone.querySelector("#news-source");
    const newsDesc = cardClone.querySelector("#news-desc");

    newsImg.src = article.urlToImage;
    newsTitle.innerHTML = `${article.title.slice(0, 60)}...`;
    newsDesc.innerHTML = `${article.description.slice(0, 150)}...`;

    const date = new Date(article.publishedAt).toLocaleString("en-US", { timeZone: "Asia/Jakarta" })

    newsSource.innerHTML = `${article.source.name} · ${date}`;

    cardClone.firstElementChild.addEventListener("click", () => {
        window.open(article.url, "_blank");
    })
}

let curSelectedNav = null;
function onNavItemClick(id) {
    fetchNews(id);
    const navItem = document.getElementById(id);
    curSelectedNav?.classList.remove("active");
    curSelectedNav = navItem;
    curSelectedNav.classList.add("active");
}

const searchButton = document.getElementById("search-button");
const searchText = document.getElementById("search-text");

searchButton.addEventListener("click", () => {
    const query = searchText.value;
    if (!query) return;
    fetchNews(query);
    curSelectedNav?.classList.remove("active");
    curSelectedNav = null;
})
const darkModeToggle = document.getElementById("darkModeToggle");
const sunMoonIcon = darkModeToggle.querySelector(".sun-moon-icon");

// Check for saved dark mode preference in localStorage
if (localStorage.getItem("darkMode") === "enabled") {
  document.body.classList.add("dark-mode");
  sunMoonIcon.textContent = "🌙"; // Set moon icon for dark mode
}

// Toggle dark mode on button click
darkModeToggle.addEventListener("click", () => {
  const isDarkMode = document.body.classList.toggle("dark-mode");
  if (isDarkMode) {
    sunMoonIcon.textContent = "🌙"; // Set moon icon for dark mode
    localStorage.setItem("darkMode", "enabled");
  } else {
    sunMoonIcon.textContent = "☀️"; // Set sun icon for light mode
    localStorage.setItem("darkMode", "disabled");
  }
});
