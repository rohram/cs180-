const slider = document.querySelector('#alignment');
const study = document.querySelector('.color-study');
const readout = document.querySelector('#alignment-value');

function updateAlignment() {
  const alignment = Number(slider.value);
  study.style.setProperty('--shift', `${(100 - alignment) * 0.55}px`);
  readout.value = `${alignment}%`;
  slider.setAttribute('aria-valuetext', `${alignment} percent aligned`);
}

if (slider && study && readout) {
  slider.addEventListener('input', updateAlignment);
  updateAlignment();
}
