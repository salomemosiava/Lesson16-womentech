function getUsers(page) {
    let request = new XMLHttpRequest();
    request.addEventListener('load', render);
    request.addEventListener('error', errorRender)


    request.open ('GET', 'https://reqres.in/api/users?page='+page);
    request.send();
}

let currentPage = 1;
let totalPages;

function render() {
    let response = this.responseText;
    let responseData = JSON.parse(response);

    
    let fragment = document.createDocumentFragment();

    responseData.data.forEach( item => {
        let li = document.createElement('li');

        let emailUser = document.createElement('p');
        emailUser.textContent = item.email;

        let imgUser = document.createElement('img');
        imgUser.src = item.avatar;
        imgUser.classList.add('img-bl');

        li.appendChild(imgUser);
        li.appendChild(emailUser);

        fragment.appendChild(li);
    });

    document.getElementById('ul').innerHTML = ' ';
    document.getElementById('ul').appendChild (fragment);

    totalPages = responseData.total_pages;
}

function errorRender() {  
    if (error ==404) {
        let p = document.createElement("p");
        p.textContent= "Server error 404";
        document.getElementById("div").appendChild(p);
    } else {
        console.log("Page Not Found");
    }
}


document.getElementById("loadprev").addEventListener('click', function() {
    if (currentPage == 1) {
        return
    }
    currentPage --;
    getUsers(currentPage);
})

document.getElementById("loadmore").addEventListener('click', function() {
    if (currentPage == totalPages) {
        return;
    }
    currentPage ++;
    getUsers(currentPage);
})

getUsers(currentPage);