let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav a');
let navbar = document.querySelector('.navbar');
let menuIcon = document.querySelector('.menu-icon');

window.onscroll = () => {
    sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 98;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');

        if (top >= offset && top < offset +height){
            navLinks.forEach(links => {
                links.classList.remove('active');
                document.querySelector('header nav a[href*=' + id + ']').classList.add
                    ('active');
            });
        };

    });

};

function toggleMenu(){
    navbar.classList.toggle('active');
}

document.addEventListener('DOMContentLoaded', function () {
    const button = document.getElementById('goToWhiteboard');
    button.classList.add('flash');
});

document.getElementById('goToWhiteboard').addEventListener('click', function() {
    window.location.href = 'whiteboard.html'; 
});

document.getElementById('goToWhiteboard').addEventListener('click', function() {
    window.open('whiteboard.html', '_blank'); 
});



