document.addEventListener('DOMContentLoaded', () => {
    const heart = document.getElementById('heart');
    const message = document.getElementById('message');
    const container = document.querySelector('.container');
    const floatingHearts = document.querySelector('.floating-hearts');


    setTimeout(() => {
        message.classList.add('visible');
    }, 1000);


    heart.addEventListener('click', (e) => {
        createParticles(e.clientX, e.clientY);
        showLoveMessage();
        createFloatingHearts();
    });

    function createParticles(x, y) {
        const particleCount = 20;

        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            container.appendChild(particle);


            const heartRect = heart.getBoundingClientRect();
            const heartCenterX = heartRect.left + heartRect.width / 2;
            const heartCenterY = heartRect.top + heartRect.height / 2;

            particle.style.left = `${heartCenterX}px`;
            particle.style.top = `${heartCenterY}px`;


            const size = Math.random() * 8 + 4;
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;


            const hue = 350 + Math.random() * 20;
            const saturation = 80 + Math.random() * 20;
            const lightness = 50 + Math.random() * 20;
            particle.style.background = `hsl(${hue}, ${saturation}%, ${lightness}%)`;


            const angle = Math.random() * Math.PI * 2;
            const velocity = Math.random() * 5 + 2;
            const tx = Math.cos(angle) * 100 * Math.random();
            const ty = Math.sin(angle) * 100 * Math.random();

            particle.animate([
                { 
                    transform: 'translate(0, 0) scale(1)', 
                    opacity: 1 
                },
                { 
                    transform: `translate(${tx}px, ${ty}px) scale(0)`, 
                    opacity: 0 
                }
            ], {
                duration: Math.random() * 1000 + 500,
                easing: 'cubic-bezier(0,.9,.57,1)'
            });


            setTimeout(() => {
                particle.remove();
            }, 1500);
        }
    }

    function showLoveMessage() {

        message.textContent = "I Love You! ❤️";
        message.style.fontSize = '28px';
        message.style.color = '#ff3b5b';
    }

    function createFloatingHearts() {

        floatingHearts.innerHTML = '';
        
        for (let i = 0; i < 15; i++) {
            createFloatingHeart();
        }
    }

    function createFloatingHeart() {
        const heart = document.createElement('div');
        heart.className = 'floating-heart';
        

        const size = Math.random() * 20 + 10;
        heart.style.width = `${size}px`;
        heart.style.height = `${size * 0.9}px`;
        

        heart.style.left = `${Math.random() * 100}%`;
        heart.style.top = `100%`;
        

        heart.style.boxShadow = `
            ${size * 0.5}px 0 0 ${size * -0.25}px rgba(255, 59, 91, 0.6),
            ${size * -0.5}px 0 0 ${size * -0.25}px rgba(255, 59, 91, 0.6)
        `;
        
        floatingHearts.appendChild(heart);
        

        const duration = Math.random() * 5000 + 5000;
        const xMovement = (Math.random() - 0.5) * 200;
        
        heart.animate([
            { 
                transform: 'translateY(0) rotate(0deg) scale(1)', 
                opacity: 1
            },
            { 
                transform: `translateY(${-window.innerHeight - size}px) translateX(${xMovement}px) rotate(${Math.random() * 360}deg) scale(0.5)`, 
                opacity: 0
            }
        ], {
            duration: duration,
            easing: 'cubic-bezier(0,.9,.57,1)'
        });
        

        setTimeout(() => {
            heart.remove();
            if (document.querySelectorAll('.floating-heart').length < 10) {
                createFloatingHeart();
            }
        }, duration);
    }
    

    setTimeout(() => {
        for (let i = 0; i < 5; i++) {
            createFloatingHeart();
        }
    }, 2000);
});
