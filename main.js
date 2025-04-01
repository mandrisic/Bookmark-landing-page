const hamb = document.getElementById('hamburger');
const header = document.querySelector('header');
const close = document.getElementById('close');

const handleNav = () => {
    header.classList.toggle('opened');
    hamb.classList.toggle('hidden');
    close.classList.toggle('hidden');
}

hamb.addEventListener('click', handleNav);

close.addEventListener('click', handleNav);