const dialog = document.querySelector('.figure-dialog');
const largeImage = dialog.querySelector('img');
const caption = dialog.querySelector('p');
const original = dialog.querySelector('.dialog-original');
let opener;
document.querySelectorAll('[data-zoom]').forEach(link => {
  link.addEventListener('click', event => {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
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
dialog.addEventListener('click', event => { if (event.target === dialog) dialog.close(); });
dialog.addEventListener('close', () => opener?.focus());
document.querySelectorAll('[data-print]').forEach(link => {
  link.addEventListener('click', event => {
    event.preventDefault();
    window.print();
  });
});
