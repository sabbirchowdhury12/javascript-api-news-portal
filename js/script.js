

const loadCategories = async () => {
    const url = `https://openapi.programming-hero.com/api/news/categories`
    const res = await fetch(url);
    const data = await res.json();
    displayNews(data);
}

const loadNews = async () => {

    const url = `https://openapi.programming-hero.com/api/news/category/01`
    const res = await fetch(url);
    const data = await res.json();
    displayNews(data.data);

}

const displayNews = (newses) => {

    newses.forEach(news => {
        console.log(news)
        const newsContainer = document.getElementById('news-container');

        const newsDiv = document.createElement('div');
        newsDiv.classList.add('col');

        newsDiv.innerHTML = `
        <div class="card">
            <img src="${news.thumbnail_url}" class="card-img-top" >
            <div class="card-body">
                <h5 class="card-title">${news.title}</h5>
                <p class="card-text">${news.details}</p>
                <div class="d-flex justify-content-between align-items-center">
                    <div class="d-flex align-items-center">
                        <img src="${news.author.img}" style="width:50px; height:50px" class="rounded-circle me-3">
                        <p>${news.author.name}</p>
                    </div>
                    <div class="d-flex">
                    <i class="bi bi-eye"></i>
                        <p class="ms-3">1.5m</p>
                    </div>
                </div>
            </div>
        </div>
        `

        newsContainer.appendChild(newsDiv)


    });
}



loadNews();