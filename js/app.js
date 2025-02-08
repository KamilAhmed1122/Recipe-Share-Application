const searchoff = document.getElementById('removesearch');
const searchinput = document.getElementById('searchbar');
const searchon = document.getElementById('searchopen');

searchinput.style.display = 'none'; 
searchon.style.display = 'block'; 
searchoff.style.display = 'none'; 

searchon.addEventListener('click', () => {
    if (searchinput.style.display === 'none') {
        searchinput.style.display = 'flex';  
        searchon.style.display = 'none';  
        searchoff.style.display = 'block';  
    }
});

searchoff.addEventListener('click', () => {
    searchinput.style.display = 'none'; 
    searchon.style.display = 'block';  
    searchoff.style.display = 'none';  
});

const post = [
    {
        title: "browny Cookies",
        decs: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime nemo autem distinctio sed quis sint dicta placeat impedit!",
        link: "https://www.google.com",
        bgImg: "/img/cookies-7.jpg",
        label: "cookies"
    },
    {
        title: "Caramel Cookies",
        decs: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime nemo autem distinctio sed quis sint dicta placeat impedit!",
        link: "https://www.google.com",
        bgImg: "/img/cookies-6.jpg",
        label: "cookies"
    },
    {
        title: "Healthy Steck Cookies",
        decs: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime nemo autem distinctio sed quis sint dicta placeat impedit!",
        link: "https://www.google.com",
        bgImg: "img/cheesepizza-7.jpg",
        label: "cookies"
    },
    {
        title: "browny Cookies",
        decs: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime nemo autem distinctio sed quis sint dicta placeat impedit!",
        link: "https://www.google.com",
        bgImg: "/img/breakfast-7.jpg",
        label: "pizza"
    },
    {
        title: "browny Cookies",
        decs: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime nemo autem distinctio sed quis sint dicta placeat impedit!",
        link: "https://www.google.com",
        bgImg: "/img/grill.jpg",
        label: "grill"
    }
]

let currentSlide = 0;

function showSlide(slideIndex){
    const slide = posts[slideIndex];
    document.querySelector('.headertitle').textContent = slide.title;
    document.querySelector('.headerpara').textContent =slide.decs;
    document.querySelector('.headerpara').href =slide.link;
    document.querySelector('.headerpara').style.backgroundImage =slide.bgImg;
}

showSlide(currentSlide);

const headerPosts = document.querySelector('.headercards');

const headerPostCards = () => {
    const updateSlider = () => {
        headerPosts.innerHTML = "";
        for(let i = currentSlide; i < currentSlide + 6; i++){
            const post = post[i % post.length];
            const postElement = document.createElement('a');
            postElement.classList.add('headercard');
            postElement.classList.add('flex');
            postElement.href = `${post.link}`;
            postElement.innerHTML += `
                <img src="${post.bgImg}" alt="">
                    <div class="hcardinfo">
                        <span>${post.label}</span>
                        <h3>${post.title}</h3>
                    </div>`

            headerPosts.appendChild(postElement);
        };
    };
    updateSlider();
};

headerPostCards();