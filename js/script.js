

const loadNews = () => {

    const url = `https://openapi.programming-hero.com/api/news/categories`
    fetch(url)
        .then(res => res.json())
        .then(data => displayNews(data.data.news_category))
}

const displayNews = (news) => {

    news.forEach(element => {
        console.log(element)
    });
}
loadNews();