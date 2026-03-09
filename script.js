document.addEventListener('DOMContentLoaded', () => {
    const noBtn = document.getElementById('no-btn');
    const yesBtn = document.getElementById('yes-btn');
    const mainText = document.getElementById('main-text');
    const cuteGif = document.getElementById('cute-gif');
    const heartsContainer = document.getElementById('hearts-container');

    // Array of funny messages to show when no button escapes
    const noMessages = [
        "Are you sure?",
        "Really sure?",
        "Think again 😭",
        "preety lady..please!",
        "Bruhhh..please!",
        "You're breaking me 💔",
        "Please please..? 🥺",
        "I'll be so sad..."
    ];
    let messageIndex = 0;

    // --- Background Animation Utility ---
    function createHeart() {
        const heart = document.createElement('div');
        heart.classList.add('heart-float');
        const emojis = ['❤️', '💖', '💕', '💘', '💝'];
        heart.innerText = emojis[Math.floor(Math.random() * emojis.length)];
        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.animationDuration = Math.random() * 3 + 5 + 's'; // 5 to 8 seconds float up rate
        heart.style.fontSize = Math.random() * 1 + 1 + 'rem';
        heartsContainer.appendChild(heart);

        // Cleanup DOM after animation completes
        setTimeout(() => {
            heart.remove();
        }, 8000);
    }

    // Spawn hearts continuously
    const heartInterval = setInterval(createHeart, 600);

    // --- Interaction Behavior ---

    let escaped = false;

    // Function to calculate random bounds and escape
    const moveNoButton = () => {
        // Update main text
        mainText.innerText = noMessages[messageIndex];
        messageIndex = (messageIndex + 1) % noMessages.length;



        // Make it absolute positioned so it can fly around freely
        if (!escaped) {
            noBtn.style.position = 'fixed';
            noBtn.style.zIndex = '100';
            escaped = true;
        }

        const btnWidth = noBtn.offsetWidth;
        const btnHeight = noBtn.offsetHeight;

        // Keep within visible screen bounds
        const safeMargin = 20;
        const maxX = window.innerWidth - btnWidth - safeMargin;
        const maxY = window.innerHeight - btnHeight - safeMargin;

        const randomX = Math.max(safeMargin, Math.floor(Math.random() * maxX));
        const randomY = Math.max(safeMargin, Math.floor(Math.random() * maxY));

        noBtn.style.left = randomX + 'px';
        noBtn.style.top = randomY + 'px';
        noBtn.style.transition = 'left 0.4s ease-out, top 0.4s ease-out';
    };

    // Proximity detection — button runs away as cursor APPROACHES it (desktop)
    document.addEventListener('mousemove', (e) => {
        const rect = noBtn.getBoundingClientRect();
        const btnCenterX = rect.left + rect.width / 2;
        const btnCenterY = rect.top + rect.height / 2;
        const distance = Math.sqrt(
            Math.pow(e.clientX - btnCenterX, 2) + Math.pow(e.clientY - btnCenterY, 2)
        );

        // If cursor is within 80px of the button center, flee!
        if (distance < 80) {
            moveNoButton();
        }
    });

    // Direct hover/touch/click — all trigger escape
    noBtn.addEventListener('mouseover', moveNoButton);
    noBtn.addEventListener('touchstart', (e) => {
        e.preventDefault();
        moveNoButton();
    });
    noBtn.addEventListener('click', (e) => {
        e.preventDefault();
        moveNoButton();
    });

    // --- Celebration Behavior ---

    yesBtn.addEventListener('click', () => {
        // Stop default floating hearts
        clearInterval(heartInterval);

        // Final text update
        mainText.innerText = "Lets gooo..!!!! I love you so much ... ❤️";



        // Fade out/remove the no button completely
        noBtn.style.display = 'none';

        // Expand and center YES button
        yesBtn.style.transform = 'scale(1.2)';
        yesBtn.style.pointerEvents = 'none';

        // Confetti burst animation using canvas-confetti
        const duration = 3000;
        const animationEnd = Date.now() + duration;

        const frame = () => {
            confetti({
                particleCount: 5,
                angle: 60,
                spread: 55,
                origin: { x: 0 },
                colors: ['#ff4b72', '#ff758c', '#ffffff', '#ffb3c6']
            });
            confetti({
                particleCount: 5,
                angle: 120,
                spread: 55,
                origin: { x: 1 },
                colors: ['#ff4b72', '#ff758c', '#ffffff', '#ffb3c6']
            });

            if (Date.now() < animationEnd) {
                requestAnimationFrame(frame);
            }
        };
        frame();

        // Spawn a burst of background hearts immediately
        for (let i = 0; i < 40; i++) {
            setTimeout(createHeart, i * 30);
        }
    });

    // Initial heart spawn fill
    for (let i = 0; i < 10; i++) {
        setTimeout(createHeart, i * 200);
    }
});
