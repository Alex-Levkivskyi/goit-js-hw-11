
import { getImagesByQuery } from './js/pixabay-api.js';
import { createGallery, clearGallery, showLoader, hideLoader } from './js/render-functions.js';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const searchForm = document.querySelector('form');

searchForm.addEventListener('submit', event => {
  event.preventDefault(); 

  
  const searchQuery = event.currentTarget.elements['search-text'].value.trim();

  
  if (!searchQuery) {
    iziToast.warning({
      title: 'Caution',
      message: 'Please fill out the search field!',
      position: 'topRight',
    });
    return;
  }

  
  clearGallery();
  showLoader();

 
  getImagesByQuery(searchQuery)
    .then(data => {
     
      if (data.hits.length === 0) {
        iziToast.error({
          title: 'Error',
          message: 'Sorry, there are no images matching your search query. Please try again!',
          position: 'topRight',
          backgroundColor: '#EF4040', 
          messageColor: '#FAFAFB',
          titleColor: '#FAFAFB',
          iconColor: '#FAFAFB',
        });
        return;
      }

   
      createGallery(data.hits);
    })
    .catch(error => {
  
      iziToast.error({
        title: 'Error',
        message: 'Something went wrong. Please try again later.',
        position: 'topRight',
      });
      console.error(error);
    })
    .finally(() => {
    
      hideLoader();
      searchForm.reset();
    });
});