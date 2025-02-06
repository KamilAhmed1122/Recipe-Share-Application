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

