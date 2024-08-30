import iziToast from 'izitoast';
import SimpleLightbox from 'simplelightbox';

import { fetchPhotos } from './js/pixabay-api';
import { createGalleryCard } from './js/render-functions';

const form = document.querySelector('.form');
const gallery = document.querySelector('.gallery');
const loader = document.querySelector('.loader');
const loadMoreBtn = document.querySelector('.load-btn');

let currentPage = 1;
let searchQuery = '';
let totalHits = 0;
let loadedHits = 0;
let largeImage = new SimpleLightbox('.gallery-link', {
  captionsData: 'alt',
  captionDelay: 250,
});

const searchPhoto = async event => {
  try {
    event.preventDefault();

    searchQuery = form.elements.search_query.value.trim();

    if (searchQuery == '') {
      iziToast.warning({
        title: '',
        message: `Введи запит на пошук`,
        messageSize: '18',
        position: 'topRight',
      });
      return;
    }

    currentPage = 1;
    totalHits = 0;
    loadedHits = 0;
    loader.classList.add('is-load');

    const response = await fetchPhotos(searchQuery, currentPage);

    if (response.data.hits.length === 0) {
      iziToast.error({
        title: '',
        message: `Введи запит на пошук`,
        messageSize: '18',
        position: 'topRight',
      });

      loader.classList.remove('is-load');
      loadMoreBtn.classList.add('is-hidden');
      gallery.innerHTML = '';
      form.reset();

      return;
    }

    totalHits = response.data.totalHits;
    loadedHits = response.data.hits.length;

    const galleryCards = response.data.hits
      .map(cardInfo => createGalleryCard(cardInfo))
      .join('');

    gallery.innerHTML = galleryCards;
    largeImage.refresh();

    if (loadedHits < totalHits) {
      loadMoreBtn.classList.remove('is-hidden');
    } else {
      iziToast.info({
        title: '',
        message: `"We're sorry, but you've reached the end of search results."`,
        messageSize: '18',
        position: 'topRight',
      });
      loadMoreBtn.classList.add('is-hidden');
    }

    loader.classList.remove('is-load');
    form.reset();
    return;
  } catch (err) {
    console.log(err);
  }
};

const loadMoreBtnClick = async event => {
  try {
    currentPage++;
    loader.classList.add('is-load');

    const response = await fetchPhotos(searchQuery, currentPage);

    loadedHits += response.data.hits.length;

    const galleryCards = response.data.hits
      .map(cardInfo => createGalleryCard(cardInfo))
      .join('');

    gallery.insertAdjacentHTML('beforeend', galleryCards);
    largeImage.refresh();
    loader.classList.remove('is-load');

    scrollBy({
      top: 640,
      behavior: 'smooth',
    });

    if (loadedHits >= totalHits) {
      iziToast.info({
        title: '',
        message: `"We're sorry, but you've reached the end of search results."`,
        messageSize: '18',
        position: 'topRight',
      });
      loadMoreBtn.classList.add('is-hidden');
    }

  } catch (err) {
    console.log(err);
  }
};

form.addEventListener('submit', searchPhoto);
loadMoreBtn.addEventListener('click', loadMoreBtnClick);
