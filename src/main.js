import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

import { fetchPhotos } from './js/pixabay-api';
import { createGalleryCard } from './js/render-functions';

const form = document.querySelector('.form');
const gallery = document.querySelector('.gallery');
const loader = document.querySelector('.loader');
const loadBtn = document.querySelector('.load-btn');

let currentPage = 1;
let searchQuery = '';

const searchPhoto = async event => {
  try {
    event.preventDefault();

    if (form.firstElementChild.value.trim() == '') {
      iziToast.warning({
        title: '',
        message: `Введи запит на пошук`,
        messageSize: '18',
        position: 'topRight',
      });
      return;
    }

    searchQuery = form.elements.search_query.value;
    currentPage = 1;
    loader.classList.add('is-load');

    const response = await fetchPhotos(searchQuery, currentPage);

    console.log(response);

    if (response.data.hits.length === 0) {
      iziToast.error({
        title: '',
        message: `Введи запит на пошук`,
        messageSize: '18',
        position: 'topRight',
      });

      loader.classList.remove('is-load');
      loadBtn.classList.add('is-hidden');
      gallery.innerHTML = '';
      form.reset();

      return;
    }

    const galleryCards = response.data.hits
      .map(cardInfo => createGalleryCard(cardInfo))
      .join('');

    gallery.innerHTML = galleryCards;

    loader.classList.remove('is-load');
    loadBtn.classList.remove('is-hidden');

    let largeImage = new SimpleLightbox('.gallery-link', {
      captionsData: 'alt',
      captionDelay: 250,
    });

    largeImage.on('show.simplelightbox');

    form.reset();
    return;
  } catch (err) {
    console.log(err);
  }
};

const loadMoreBtnClick = async event => {
  try {
    event.preventDefault();
    currentPage++;
    loader.classList.add('is-load');

    const response = await fetchPhotos(searchQuery, currentPage);

    const galleryCards = response.data.hits
      .map(cardInfo => createGalleryCard(cardInfo))
      .join('');

    gallery.insertAdjacentHTML('beforeend', galleryCards);
    loader.classList.remove('is-load');

    scrollBy({
      top: 640,
      behavior: 'smooth',
    });
    console.log(currentPage);

    if (response.data.hits.length === 0) {
      loadBtn.classList.add('is-hidden');
      iziToast.info({
        title: '',
        message: `"We're sorry, but you've reached the end of search results."`,
        messageSize: '18',
        position: 'topRight',
      });
    }
  } catch (err) {
    console.log(err);
  }
};

form.addEventListener('submit', searchPhoto);
loadBtn.addEventListener('click', loadMoreBtnClick);
