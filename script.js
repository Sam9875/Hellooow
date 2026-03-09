document.addEventListener('DOMContentLoaded', () => {
    const noBtn = document.getElementById('no-btn');
    const yesBtn = document.getElementById('yes-btn');
    const mainText = document.getElementById('main-text');
    const cuteGif = document.getElementById('cute-gif');
    const heartsContainer = document.getElementById('hearts-container');

    // Array of funny messages to show when YES button escapes
    const yesMessages = [
        "Are you sure?",
        "Really sure?",
        "Think again 😭",
        "pretty lady..please!",
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
        heart.style.animationDuration = Math.random() * 3 + 5 + 's';
        heart.style.fontSize = Math.random() * 1 + 1 + 'rem';
        heartsContainer.appendChild(heart);

        setTimeout(() => {
            heart.remove();
        }, 8000);
    }

    // Spawn hearts continuously
    const heartInterval = setInterval(createHeart, 600);

    // --- YES Button Escape Behavior ---

    let escaped = false;

    const moveYesButton = () => {
        // Update main text with funny messages
        mainText.innerText = yesMessages[messageIndex];
        messageIndex = (messageIndex + 1) % yesMessages.length;

        // Make it fixed positioned so it can fly around freely
        if (!escaped) {
            yesBtn.style.position = 'fixed';
            yesBtn.style.zIndex = '100';
            escaped = true;
        }

        const btnWidth = yesBtn.offsetWidth;
        const btnHeight = yesBtn.offsetHeight;

        // Keep within visible screen bounds
        const safeMargin = 20;
        const maxX = window.innerWidth - btnWidth - safeMargin;
        const maxY = window.innerHeight - btnHeight - safeMargin;

        const randomX = Math.max(safeMargin, Math.floor(Math.random() * maxX));
        const randomY = Math.max(safeMargin, Math.floor(Math.random() * maxY));

        yesBtn.style.left = randomX + 'px';
        yesBtn.style.top = randomY + 'px';
        yesBtn.style.transition = 'left 0.4s ease-out, top 0.4s ease-out';
    };

    // Proximity detection — YES button runs away as cursor APPROACHES it (desktop)
    document.addEventListener('mousemove', (e) => {
        const rect = yesBtn.getBoundingClientRect();
        const btnCenterX = rect.left + rect.width / 2;
        const btnCenterY = rect.top + rect.height / 2;
        const distance = Math.sqrt(
            Math.pow(e.clientX - btnCenterX, 2) + Math.pow(e.clientY - btnCenterY, 2)
        );

        if (distance < 80) {
            moveYesButton();
        }
    });

    // Direct hover/touch/click — all trigger escape for YES
    yesBtn.addEventListener('mouseover', moveYesButton);
    yesBtn.addEventListener('touchstart', (e) => {
        e.preventDefault();
        moveYesButton();
    });
    yesBtn.addEventListener('click', (e) => {
        e.preventDefault();
        moveYesButton();
    });

    // --- NO Button Celebration Behavior ---

    noBtn.addEventListener('click', () => {
        // Stop default floating hearts
        clearInterval(heartInterval);

        // Final text update
        mainText.innerText = "Lets gooo..!!!! I love you so much ... ❤️";

        // Hide the YES button
        yesBtn.style.display = 'none';

        // Expand and center NO button
        noBtn.style.transform = 'scale(1.2)';
        noBtn.style.pointerEvents = 'none';

        // Confetti burst animation
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

        // Spawn a burst of background hearts
        for (let i = 0; i < 40; i++) {
            setTimeout(createHeart, i * 30);
        }
    });

    // Initial heart spawn fill
    for (let i = 0; i < 10; i++) {
        setTimeout(createHeart, i * 200);
    }
});
