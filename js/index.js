const loadCategory = () => {
    const url = 'https://openapi.programming-hero.com/api/news/categories';
    fetch(url)
        .then(res => res.json())
        .then(data => showCategory(data.data.news_category))

    loadSingleNews('08');
};

const showCategory = (categories) =>{
    const navElement = document.getElementById('navBarUl');
    for(const category of categories){
        const li = document.createElement('li');
        li.classList.add('navHov')
        li.addEventListener('click', function(){
            loadSingleNews(category.category_id);
        })
        li.innerHTML = `
            <a class="nav-link" href="#">${category.category_name}</a>
        `;
        navElement.appendChild(li);
    }
}


const loadSingleNews = async(catId) =>{
    const url = `https://openapi.programming-hero.com/api/news/category/${catId}`;
    const res = await fetch(url);
    const data = await res.json();
    displaySingleNews(data.data);
};

const displaySingleNews = (datas) =>{
    const singleNews = document.getElementById("NewsFeed");
    singleNews.innerHTML = '';

    console.log(datas);

    if(datas.length === 0){
        const div2 = document.createElement('div');
        div2.innerHTML = '<h1 style="font-size: 200px; color:red;">Fucking no news!</h1>';
        singleNews.appendChild(div2);
    }
    let text;

    
    
    for(const data of datas){
      console.log(data.details.length);

        //Making the text Shorter
        text = data.details;
        let textMod;
        if(text.length > 400){
          textMod = text.slice(0,400);
        }
        console.log(textMod);

        
        const div = document.createElement('div');
        div.classList.add("row","singleNews","shadow","p-3","mb-5","rounded", "g-3");
        div.innerHTML = `
        <div class="image_section col-4">
            <img src="${data.image_url}">
        </div>
        <div class="info-section col-8 parent">
                  <div class="child">
                  <h1>${data.title}</h1>
                    <article style="font-size:20px;">
                      ${textMod}
                      <div id="fullBtn" class="d-none">
                        <a href='#'>Full article</a>
                      </div>
                    </article>
                  </div>

                  <div class="container text-center child">
                    <div class="row p-3 mb-5">
                      <div class="col container text-center">
                        <div class="row">
                            <div class="col d-flex align-items-md-center">
                                <img style="width:70px; border-radius:50%" src="${data.author.img}">
                            </div>
                            <div class="col ">
                            <h3>${data.author.name}</h3>
                            <p>${data.author.published_date}</p>
                            </div>
                        </div>
                      </div>
                      <div class="col d-flex align-items-md-center">
                        <img class="icon" src="../images/eye.svg">
                        <h2>: ${data.total_view}</h2>
                      </div>
                      <div class="col d-flex align-items-md-center">
                        <h3>Rating: ${data.rating.number} </h3>
                        <img class="icon" src="../images/star.svg">
                        <img class="icon" src="../images/star.svg">
                        <img class="icon" src="../images/star.svg">
                        <img class="icon" src="../images/star.svg">
                      </div>
                      <div class="col d-flex align-items-md-center">
                        <button class="btn btn-primary"> <img class="icon" src="../images/arrow-right.svg"> </button>
                      </div>
                    </div>

                  </div>
                
              </div>
        `;
        
        singleNews.appendChild(div);
    }
    
    
}


loadCategory();