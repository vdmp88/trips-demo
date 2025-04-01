const block = () => {
  document.documentElement.style.setProperty(
    '--scroll-compensator',
    `${window.innerWidth - document.body.offsetWidth}px`
  );
  document.body.classList.add('scroll-block');
};

const unblock = () => {
  document.documentElement.style.setProperty('--scroll-compensator', `0px`);
  document.body.classList.remove('scroll-block');
};

const BodyScrollBlocker = {
  block,
  unblock,
};

export default BodyScrollBlocker;
