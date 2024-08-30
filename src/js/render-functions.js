export const createGalleryCard = imgInfo => {
  return `
  <li class="gallery-card">
    <a class="gallery-link" href="${imgInfo.largeImageURL}">
      <img
        class="gallery-img"
        src="${imgInfo.webformatURL}"
        alt="${imgInfo.tags}"
      />
    </a>
    <div>
      <ul class="img-info">
        <li class="box-info">
          <h4>Likes</h4>
          <p>${imgInfo.likes}</p>
        </li>
        <li class="box-info">
          <h4>Views</h4>
          <p>${imgInfo.views}</p>
        </li>
        <li class="box-info">
          <h4>Comments</h4>
          <p>${imgInfo.comments}</p>
        </li>
        <li class="box-info">
          <h4>Downloads</h4>
          <p>${imgInfo.downloads}</p>
        </li>
      </ul>
    </div>
  </li>
  `;
};
