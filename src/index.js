import './css/styles.css';
import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

import { renderMarkUp } from "./render";
import {apiPixabay} from "./fetch"

const form = document.querySelector(".search-form");
const gallery = document.querySelector(".gallery");
const guard = document.querySelector(".guard");

const key = `30662426-21982097d0559eebc608a0eec`;
const baseUrl = `https://pixabay.com/api/`;
const baseUrlOptions = `image_type=photo&orientation=horizontal&safesearch=true`;

const lightbox = new SimpleLightbox('.gallery a', {
      captionSelector: "img",
      captionsData: "alt",
      captionDelay: 250,
});
const optionsObserve = {
    root: null,
    rootMargin: '30px',
    threshold: 1,
}   
let observer = new IntersectionObserver(onLoad, optionsObserve);
let findImage = "";
let page = 0;
let perPage = 40;
    


form.addEventListener("submit", onSubmit)

function onSubmit(e) {
    e.preventDefault();
    
    window.scrollBy({
    behavior: 'auto',
  });
    window.scrollTo(top);
    
    findImage = e.currentTarget.elements.searchQuery.value.toLowerCase().trim();
    console.log(findImage);
    // gallery.innerHTML = "";

  
  
    if (!findImage) {
        Notiflix.Notify.failure("The field is empty")
  
    return;
    }
    
    else {
        page=1
        apiPixabay(findImage,key,baseUrl,baseUrlOptions,perPage,page).then(repsonse => {
        if (repsonse.data.total === 0) {
            Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again.")
            return;
        }
            Notiflix.Notify.info(`We found special for YOU! Total ${repsonse.data.total} photos`);
            page;
            const render = renderMarkUp(repsonse.data.hits);
            gallery.innerHTML = "";
            gallery.insertAdjacentHTML("beforeend", render)
            lightbox.refresh()
            observer.observe(guard);
    })
    

    }
}





function onLoad(entries) {

      if (findImage === '') {
    return;
  }
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            page += 1;
            apiPixabay(findImage,key,baseUrl,baseUrlOptions,perPage,page).then(response => {
                console.log('page', page);
                const allPagesFetch = Math.ceil(response.data.totalHits / perPage);
                console.log(allPagesFetch);
                
                if (page <= allPagesFetch) {
                const render = renderMarkUp(response.data.hits);
                gallery.insertAdjacentHTML("beforeend", render)
                    lightbox.refresh();
                    // плавний скрол
                    const { height: cardHeight } =
                    gallery.firstElementChild.getBoundingClientRect();
                    window.scrollBy({
                    top: cardHeight*2,
                    behavior: "smooth",});
                    
                return;
                } Notiflix.Notify.failure('We are sorry, but you have reached the end of search results.')
                return;
                
             
            })
        } 
    })
}
     
            
