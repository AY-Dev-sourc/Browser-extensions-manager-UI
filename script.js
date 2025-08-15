const themeSwitch = document.getElementById('switch');

themeSwitch.addEventListener('click',()=>{
    let lightmode = document.body.classList.contains('lightmode');
    lightmode ? removeTheme() : setTheme();
});
    
// add theme
function setTheme() {
    document.body.classList.add('lightmode');
    localStorage.setItem('theme','lightmode');
}
// remove theme
function removeTheme() {
    document.body.classList.remove('lightmode');
    localStorage.removeItem('theme');
}
// get theme 
window.onload = () => {
    localStorage.getItem('theme') === 'lightmode' ? document.body.classList.add('lightmode') : null;
}

// // *** filer cards with btn's *** 
let AllCard = document.getElementById('AllCard');
let ActiveCard = document.getElementById('ActiveCard');
let InactiveCard = document.getElementById('InactiveCard');

// get data
async function getData() {
    const res = await fetch('data.json');
    const data = await res.json();
    return data;
}

// create card
function NewCard(dataItem){    
    // create card Element's
    const card = document.createElement('div');
    const subTitle = document.createElement('div');
    const controler = document.createElement('div');
    const icon = document.createElement('figure');
    const image = document.createElement('img');
    const article = document.createElement('article');
    const cardTitle = document.createElement('h1');
    const description = document.createElement('p');
    const remove = document.createElement('button');
    const btnSwitch = document.createElement('div');
    const hiddenInput = document.createElement('input');
    const slider = document.createElement('div');
    // add class
    card.className = 'card';
    subTitle.className = 'sub-title';
    icon.className = 'icon';
    cardTitle.className = "card-title";
    description.className = 'description';
    controler.className = 'controler';
    remove.className = 'remove';
    btnSwitch.className = 'switch';
    slider.className = 'slider';
    hiddenInput.setAttribute('type','checkbox');
    // add data
    image.src = dataItem.logo;
    cardTitle.textContent = dataItem.name;
    description.textContent = dataItem.description;
    hiddenInput.checked = dataItem.isActive;
    remove.textContent = 'Remove';

    // appendChild
    card.appendChild(subTitle);
    card.appendChild(controler);
    subTitle.appendChild(icon);
    subTitle.appendChild(article);
    icon.appendChild(image);
    article.appendChild(cardTitle);
    article.appendChild(description);
    controler.appendChild(remove);
    controler.appendChild(btnSwitch);
    btnSwitch.appendChild(hiddenInput);
    btnSwitch.appendChild(slider);

    // remove card
    remove.addEventListener('click', ()=>{
        card.remove();
    });
    
    // change data
    slider.addEventListener('click',()=>{
        dataItem.isActive = !dataItem.isActive;
        hiddenInput.checked = dataItem.isActive;
    });

    return card;
}
// render Cards
async function renderCards(data) {
    const cardContainer = document.getElementById("container");
    cardContainer.innerHTML = ''; // clear container

    data.forEach(item => cardContainer.appendChild(NewCard(item)));
}

let AllData = [];

onload = async()=>{
    AllData = await getData();
    renderCards(AllData);
};

// filter all cards
AllCard.addEventListener('click',async()=>{
    renderCards(AllData);
});

// filter active cards
ActiveCard.addEventListener('click',async()=>{
    const filtered = AllData.filter(card => card.isActive === true);
    renderCards(filtered);
});

// filter inactive cards
InactiveCard.addEventListener('click',async()=>{
    const filtered = AllData.filter(card => card.isActive === false);
    renderCards(filtered);
});

