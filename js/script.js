
// load category------------
const loadCategories = async () => {
    const url = `https://openapi.programming-hero.com/api/news/categories`
    const res = await fetch(url);
    const data = await res.json();
    displayCategories(data.data.news_category);
}

//show category section----------
const displayCategories = (catagories) => {
    // console.log(catagories)

    catagories.forEach(category => {
        console.log(category)

        const categoryList = document.getElementById('unorder-list');
        const li = document.createElement('li');

        li.innerHTML = `
        <a onclick="getCategoryId('${category.category_id}')" class="nav-link active" aria-current="page" href="#">${category.category_name}</a>
        `
        categoryList.appendChild(li)

    })
}

//load news--------
const loadNews = async (category_id) => {

    // const url = `https://openapi.programming-hero.com/api/news/category/01`
    const url = `https://openapi.programming-hero.com/api/news/category/${category_id}`
    const res = await fetch(url);
    const data = await res.json();
    displayNews(data.data);

}

//show news section---------
const displayNews = (newses) => {

    const newsContainer = document.getElementById('news-container');
    newsContainer.innerHTML = '';
    // console.log(newses.length)
    const notFound = document.getElementById('no-news');
    if (newses.length <= 0) {
        notFound.classList.remove('d-none');
    } else {
        notFound.classList.add('d-none');
    }

    newses.forEach(news => {
        console.log(news)

        const newsDiv = document.createElement('div');
        newsDiv.classList.add('col');

        const dots = "..."
        newsDiv.innerHTML = `
        <div class="card">
            <img src="${news.thumbnail_url}" class="card-img-top" >
            <div class="card-body">
                <h5 class="card-title">${news.title}</h5>
                <p class="card-text">${news.details.slice(0, 200)}${dots}</p>
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
        newsContainer.appendChild(newsDiv);
    });

    //spinner stop-----------
    spinnerLoad(false)
}

//spinner funcetion-------------
const spinnerLoad = (isLoad) => {
    const spinner = document.getElementById('sppiner');
    if (isLoad == true) {
        spinner.classList.remove('d-none');
    } else {
        spinner.classList.add('d-none')
    }
}

const getCategoryId = (id) => {
    //spinner start------
    spinnerLoad(true)
    loadNews(id);
    // console.log(id)
}

loadCategories();

// loadNews('01');