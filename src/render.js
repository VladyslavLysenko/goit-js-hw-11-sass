export function renderMarkUp(arrPhotos) {
    console.log(arrPhotos);
     return arrPhotos.map(
      ({
        largeImageURL,
        webformatURL,
        tags,
        likes,
        views,
        comments,
        downloads,
         }) =>
         {return `<div class="gallery__item">
            <a class="gallery__link" href="${largeImageURL}">
                <img class="gallery__image" src="${webformatURL}" alt="${tags}" />
            </a>
                <div class="gallery__item__info">
                    <div class="info-wrap"><p class="gallery__text"><b>Likes</b></p><span class="text">${likes}</span></div>
                    <div class="info-wrap"><p class="gallery__text"><b>Views</b></p><span class="text">${views}</span></div>
                    <div class="info-wrap"><p class="gallery__text"><b>Comments</b></p><span class="text">${comments}</span></div>
                    <div class="info-wrap"><p class="gallery__text"><b>Downloads</b></p><span class="text">${downloads}</span></div>
                </div>
    </div>`
         }).join('');
 }

