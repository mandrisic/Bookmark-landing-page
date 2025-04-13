const hamb = document.getElementById('hamburger');
const header = document.querySelector('header');
const close = document.getElementById('close');
const links = header.querySelectorAll('.ul__link');
const options = document.querySelectorAll('.option');
const tabHeading = document.querySelector('.options__text h3');
const tabDesc = document.querySelector('.description');
const tabImg = document.querySelector('.options__img');
const tabContent = document.querySelector('.options__data');
const emailInput = document.getElementById('email');
const submit = document.getElementById('submit');
const error = document.querySelector('.error');
const errorIcon = document.querySelector('.error__icon');
const errorMsg = document.querySelector('.error__msg');

const data = [{
    heading: 'Bookmark in one click',
    desc: 'Organize your bookmarks however you like. Our simple drag-and-drop interface gives you complete control over how you manage your favourite sites.',
    img: './images/illustration-features-tab-1.svg'
}, 
{
    heading: 'Intelligent search',
    desc: 'Our powerful search feature will help you find saved sites in no time at all. No need to trawl through all of your bookmarks.',
    img: './images/illustration-features-tab-2.svg'
}, 
{
    heading: 'Share your bookmarks',
    desc: 'Easily share your bookmarks and collections with others. Create a shareable link that you can send at the click of a button.',
    img: './images/illustration-features-tab-3.svg'
}]

// navigation
const handleNav = () => {
    header.classList.toggle('opened');
    hamb.classList.toggle('hidden');
    close.classList.toggle('hidden');
}

links.forEach(link => {
  link.addEventListener('click', () => {
    if (window.innerWidth < 768) {
      handleNav();
    }
  });
})

hamb.addEventListener('click', handleNav);
close.addEventListener('click', handleNav);

// features tabs
let activeIndex = 0;
let isAnimating = false;

const updateContent = (index) => {
  tabHeading.textContent = data[index].heading;
  tabDesc.textContent = data[index].desc;
  tabImg.innerHTML = `<img src="${data[index].img}" alt="Tab ${index + 1}"><div class="shape shape--left"></div>`;
};

const handleTab = (event) => {
  const clickedIndex = Array.from(options).indexOf(event.target);
  if (clickedIndex === activeIndex || isAnimating) return;

  isAnimating = true;

  options.forEach(option => option.classList.remove('active'));
  options[clickedIndex].classList.add('active');


  tabContent.classList.add('fade-out');
  tabContent.addEventListener('animationend', function onFadeOut() {
    tabContent.removeEventListener('animationend', onFadeOut);

    updateContent(clickedIndex);
    tabContent.classList.remove('fade-out');
    tabContent.classList.add('fade-in');

    tabContent.addEventListener('animationend', function onFadeIn() {
      tabContent.removeEventListener('animationend', onFadeIn);
      tabContent.classList.remove('fade-in');
      activeIndex = clickedIndex;
      isAnimating = false;
    });
  });
};

options.forEach(option => option.addEventListener('click', handleTab));
updateContent(activeIndex);
options[activeIndex].classList.add('active');

// email submit
const checkEmail = (email) => {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email);
}

const handleSubmit = () => {
  if(!checkEmail(emailInput.value)){
    error.classList.add('active');
    errorIcon.classList.remove('hidden');
    errorMsg.classList.remove('hidden');
    console.log('it was wrong');
  } else {
    error.classList.remove('active');
    errorIcon.classList.add('hidden');
    errorMsg.classList.add('hidden');
    emailInput.value = '';
    console.log('it was valid');
  }
}

submit.addEventListener('click', handleSubmit);
