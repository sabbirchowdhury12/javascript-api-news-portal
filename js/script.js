
// load category------------
const loadCategories = async () => {
    const url = `https://openapi.programming-hero.com/api/news/categories`
    try {
        const res = await fetch(url);
        const data = await res.json();
        displayCategories(data.data.news_category);
    }
    catch (error) {
        console.log(error)
    }

}

//display category section----------
const displayCategories = (catagories) => {

    catagories.forEach(category => {
        const categoryList = document.getElementById('unorder-list');
        const li = document.createElement('li');

        li.innerHTML = `
        <a onclick="getCategoryId('${category.category_id}')" class="nav-link" aria-current="page" href="#">${category.category_name}</a>
        `
        categoryList.appendChild(li)

    })
}

//load news section--------
const loadNews = async (category_id) => {

    const url = `https://openapi.programming-hero.com/api/news/category/${category_id}`

    try {
        const res = await fetch(url);
        const data = await res.json();
        displayNews(data.data);
    } catch (error) {
        console.log(error)
    }

}

//show news section---------
const displayNews = (newses) => {

    const newsContainer = document.getElementById('news-container');
    newsContainer.innerHTML = '';

    //count of categoty items---
    const inputField = document.getElementById('input-field');
    inputField.value = `${newses.length} items found for this category`

    //show error msg ---
    const notFound = document.getElementById('no-news');
    if (newses.length <= 0) {
        notFound.classList.remove('d-none');
    } else {
        notFound.classList.add('d-none');
    }

    //shorting by total view-------
    newses.sort(function (a, b) {
        return b.total_view - a.total_view
    });

    newses.forEach(news => {

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
                        <p>${news.author.name ? news.author.name : 'author'}</p>
                    </div>
                    <div class="d-flex">
                    <i class="bi bi-eye"></i>
                        <p class="ms-3">${news.total_view ? news.total_view : '0'}</p>
                    </div>
                </div>
            </div>
            <button onclick="loadNewsDeatails('${news._id}')" type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">Show Details</button>
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

//get categoryId------
const getCategoryId = (id) => {
    //spinner start------
    spinnerLoad(true)
    loadNews(id);
    // console.log(id)
}


const loadNewsDeatails = async (id) => {
    const url = `https://openapi.programming-hero.com/api/news/${id}`;

    try {
        const res = await fetch(url);
        const data = await res.json();
        displayNewsDetails(data.data);
    }
    catch (err) {
        console.log(err)
    }
}

const displayNewsDetails = (details) => {

    console.log(details)

    details.forEach(detail => {
        console.log(detail)
        const modalTitile = document.getElementById('exampleModalLabel');
        modalTitile.innerText = detail.title;

        const modalBody = document.getElementById('modal-body');
        modalBody.innerHTML = `
        <img class="img-fluid" src=${detail.author.img}>
        <p>Author Name: ${detail.author.name ? detail.author.name : "no data available"}</p>
        <p>Publish Date: ${detail.author.published_date}</p>
        <p>Total View: ${detail.total_view ? detail.total_view : "no data available"}</p>
        <p>Rating: ${detail.rating.number ? detail.rating.number : "0"}</p>
        `
    })


}

loadCategories();

// loadNews('01');