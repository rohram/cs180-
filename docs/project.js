const dialog = document.querySelector('.lightbox');
const resultLinks = [...document.querySelectorAll('.result-link')];
let currentImage = 0;
let openingLink;

function showImage(index) {
  currentImage = (index + resultLinks.length) % resultLinks.length;
  const link = resultLinks[currentImage];
  const image = dialog.querySelector('img');
  image.src = link.href;
  image.alt = link.querySelector('img').alt;
  dialog.querySelector('.lightbox-image').style.cssText = link.dataset.crop;
  dialog.querySelector('#lightbox-caption').textContent = link.dataset.title;
  dialog.querySelector('.original-image').href = link.href;
}

if (dialog && typeof dialog.showModal === 'function') {
  resultLinks.forEach((link, index) => {
    link.addEventListener('click', event => {
      if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
      event.preventDefault();
      openingLink = link;
      showImage(index);
      dialog.showModal();
    });
  });
  dialog.querySelector('.close-lightbox').addEventListener('click', () => dialog.close());
  dialog.querySelector('.previous-image').addEventListener('click', () => showImage(currentImage - 1));
  dialog.querySelector('.next-image').addEventListener('click', () => showImage(currentImage + 1));
  dialog.addEventListener('keydown', event => {
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      event.preventDefault();
      showImage(currentImage + (event.key === 'ArrowLeft' ? -1 : 1));
    }
  });
  dialog.addEventListener('click', event => {
    const rect = dialog.getBoundingClientRect();
    if (event.target === dialog && (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom)) dialog.close();
  });
  dialog.addEventListener('close', () => openingLink?.focus());
}
