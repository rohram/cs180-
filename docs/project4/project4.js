const dialog = document.querySelector('.figure-dialog');
const largeImage = dialog.querySelector('img');
const caption = dialog.querySelector('p');
const original = dialog.querySelector('.dialog-original');
let opener;

document.querySelectorAll('[data-zoom]').forEach(link => {
  link.addEventListener('click', event => {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    if (typeof dialog.showModal !== 'function') return;
    event.preventDefault();
    opener = link;
    largeImage.src = link.href;
    largeImage.alt = link.dataset.caption || link.querySelector('img').alt;
    caption.textContent = largeImage.alt;
    original.href = link.href;
    dialog.showModal();
  });
});

dialog.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', event => {
  if (event.target === dialog) dialog.close();
});
dialog.addEventListener('close', () => opener?.focus());

document.querySelectorAll('[data-points-toggle]').forEach(toggle => {
  const group = document.getElementById(toggle.dataset.pointsToggle);
  toggle.addEventListener('change', () => {
    group.querySelectorAll('[data-photo]').forEach(link => {
      const image = link.querySelector('img');
      const src = toggle.checked ? link.dataset.points : link.dataset.original;
      const description = link.dataset.photo + (toggle.checked ? ' with numbered correspondences' : ' original photograph');
      image.src = src;
      image.alt = description;
      link.href = src;
      link.dataset.caption = description;
      link.setAttribute('aria-label', 'Enlarge ' + description);
    });
  });
});

document.querySelectorAll('[data-print]').forEach(link => {
  link.addEventListener('click', event => {
    event.preventDefault();
    window.print();
  });
});
