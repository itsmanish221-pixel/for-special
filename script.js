// Floating Hearts Animation
function createFloatingHearts() {
    const heartsContainer = document.getElementById('heartsContainer');
    const hearts = ['💖', '💕', '💘', '💝', '💗', '💓', '💞', '💜', '❤', '🧡', '💛', '💚', '💙'];
    
    function createHeart() {
        const heart = document.createElement('div');
        heart.className = 'heart';
        heart.innerHTML = hearts[Math.floor(Math.random() * hearts.length)];
        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.animationDuration = (Math.random() * 3 + 3) + 's';
        heart.style.fontSize = (Math.random() * 10 + 15) + 'px';
        heartsContainer.appendChild(heart);
        
        setTimeout(() => {
            heart.remove();
        }, 6000);
    }
    
    setInterval(createHeart, 500);
}

// Confetti Animation
class ConfettiPiece {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height - canvas.height;
        this.vx = Math.random() * 6 - 3;
        this.vy = Math.random() * 3 + 2;
        this.color = this.getRandomColor();
        this.size = Math.random() * 8 + 5;
        this.rotation = Math.random() * 360;
        this.rotationSpeed = Math.random() * 10 - 5;
    }
    
    getRandomColor() {
        const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#feca57', '#ff9ff3', '#54a0ff'];
        return colors[Math.floor(Math.random() * colors.length)];
    }
    
    update() {
        this.x += this.vx;
        this.y += this.vy;
        this.vy += 0.1; // gravity
        this.rotation += this.rotationSpeed;
        
        if (this.y > this.canvas.height) {
            this.y = -10;
            this.x = Math.random() * this.canvas.width;
        }
    }
    
    draw() {
        this.ctx.save();
        this.ctx.translate(this.x, this.y);
        this.ctx.rotate(this.rotation * Math.PI / 180);
        this.ctx.fillStyle = this.color;
        this.ctx.fillRect(-this.size/2, -this.size/2, this.size, this.size);
        this.ctx.restore();
    }
}

let confettiPieces = [];
let confettiCanvas;
let confettiCtx;
let confettiAnimationId;

function initConfetti() {
    confettiCanvas = document.getElementById('confetti-canvas');
    confettiCtx = confettiCanvas.getContext('2d');
    
    function resizeCanvas() {
        confettiCanvas.width = window.innerWidth;
        confettiCanvas.height = window.innerHeight;
    }
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    for (let i = 0; i < 100; i++) {
        confettiPieces.push(new ConfettiPiece(confettiCanvas));
    }
}

function animateConfetti() {
    confettiCtx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
    
    confettiPieces.forEach(piece => {
        piece.update();
        piece.draw();
    });
    
    confettiAnimationId = requestAnimationFrame(animateConfetti);
}

// Love Counter
function startLoveCounter() {
    // Set your relationship start date here (YYYY, MM-1, DD)
    const relationshipStart = new Date(2023, 7, 16); // January 15, 2023
    
    function updateCounter() {
        const now = new Date();
        const diffTime = Math.abs(now - relationshipStart);
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
        const diffHours = Math.floor(diffTime / (1000 * 60 * 60));
        const diffMinutes = Math.floor(diffTime / (1000 * 60));
        
        document.getElementById('days').textContent = diffDays.toLocaleString();
        document.getElementById('hours').textContent = diffHours.toLocaleString();
        document.getElementById('minutes').textContent = diffMinutes.toLocaleString();
    }
    
    updateCounter();
    setInterval(updateCounter, 60000); // Update every minute
}

// Celebration Function
function celebrate() {
    // Start confetti
    if (!confettiAnimationId) {
        animateConfetti();
    }
    
    // Play celebration sound (optional - you can add an audio file)
    // const audio = new Audio('celebration.mp3');
    // audio.play();
    
    // Show celebration message
    showCelebrationMessage();
    
    // Stop confetti after 10 seconds
    setTimeout(() => {
        if (confettiAnimationId) {
            cancelAnimationFrame(confettiAnimationId);
            confettiAnimationId = null;
            confettiCtx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
        }
    }, 10000);
}

function showCelebrationMessage() {
    const messages = [
        "🎉 You're absolutely amazing Khaja Looo! 💕 Happy Birthday beautiful! 🌟 You're my everything! ✨ You make my world brighter! 💖 I love you more every day!",
    ];
    
    const randomMessage = messages[Math.floor(Math.random() * messages.length)];
    
    // Create floating message
    const messageDiv = document.createElement('div');
    messageDiv.innerHTML = randomMessage;
    messageDiv.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: rgba(30, 111, 233, 0.9);
        color: white;
        padding: 20px 30px;
        border-radius: 50px;
        font-size: 1.5rem;
        font-weight: 600;
        z-index: 10000;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        animation: celebrationPop 3s ease-out forwards;
    `;
    
    // Add animation keyframes
    const style = document.createElement('style');
    style.textContent = `
        @keyframes celebrationPop {
            0% {
                opacity: 0;
                transform: translate(-50%, -50%) scale(0.5);
            }
            20% {
                opacity: 1;
                transform: translate(-50%, -50%) scale(1.1);
            }
            80% {
                opacity: 1;
                transform: translate(-50%, -50%) scale(1);
            }
            100% {
                opacity: 0;
                transform: translate(-50%, -50%) scale(0.8);
            }
        }
    `;
    document.head.appendChild(style);
    
    document.body.appendChild(messageDiv);
    
    setTimeout(() => {
        messageDiv.remove();
        style.remove();
    }, 3000);
}

// Blow Candles Function
function blowCandles() {
    const flames = document.querySelectorAll('.candle-flame');
    flames.forEach((flame, index) => {
        setTimeout(() => {
            flame.classList.add('blown');
        }, index * 200);
    });
    
    // Show wish message
    setTimeout(() => {
        showWishMessage();
        // Restart flames after 5 seconds
        setTimeout(() => {
            flames.forEach(flame => {
                flame.classList.remove('blown');
            });
        }, 5000);
    }, 1000);
}

function showWishMessage() {
    const wishMessages = [  "🌟 Dhana Your wish has been sent to the universe!",
        "✨ May all your dreams come true!",
        "💫 The stars are listening to your wish!",
        "💝 I wish you endless happiness!"

        
         
         
    ];
    
    const randomWish = wishMessages[Math.floor(Math.random() * wishMessages.length)];
    
    const wishDiv = document.createElement('div');
    wishDiv.innerHTML = randomWish;
    wishDiv.style.cssText = `
        position: fixed;
        top: 30%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: rgba(106, 76, 147, 0.95);
        color: white;
        padding: 15px 25px;
        border-radius: 30px;
        font-size: 1.2rem;
        font-weight: 600;
        z-index: 10000;
        box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);
        animation: wishFloat 4s ease-out forwards;
    `;
    
    const wishStyle = document.createElement('style');
    wishStyle.textContent = `
        @keyframes wishFloat {
            0% {
                opacity: 0;
                transform: translate(-50%, -50%) translateY(20px);
            }
            20% {
                opacity: 1;
                transform: translate(-50%, -50%) translateY(0);
            }
            80% {
                opacity: 1;
                transform: translate(-50%, -50%) translateY(-10px);
            }
            100% {
                opacity: 0;
                transform: translate(-50%, -50%) translateY(-30px);
            }
        }
    `;
    document.head.appendChild(wishStyle);
    
    document.body.appendChild(wishDiv);
    
    setTimeout(() => {
        wishDiv.remove();
        wishStyle.remove();
    }, 4000);
}

// Initialize everything when page loads
document.addEventListener('DOMContentLoaded', function() {
    createFloatingHearts();
    initConfetti();
    startLoveCounter();
    
    // Add smooth scrolling for any anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Add entrance animations to sections
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInUp 1s ease-out forwards';
            }
        });
    }, observerOptions);
    
    // Observe all sections
    document.querySelectorAll('section').forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        observer.observe(section);
    });
    
    // Add fadeInUp animation
    const fadeStyle = document.createElement('style');
    fadeStyle.textContent = `
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
    `;
    document.head.appendChild(fadeStyle);
});

// Add some interactive effects
document.addEventListener('mousemove', function(e) {
    // Create sparkle effect on mouse move (optional)
    if (Math.random() > 0.9) {
        createSparkle(e.clientX, e.clientY);
    }
});

function createSparkle(x, y) {
    const sparkle = document.createElement('div');
    sparkle.innerHTML = '✨';
    sparkle.style.cssText = `
        position: fixed;
        left: ${x}px;
        top: ${y}px;
        font-size: 12px;
        pointer-events: none;
        z-index: 1000;
        animation: sparkleAnimation 1s ease-out forwards;
    `;
    
    const sparkleStyle = document.createElement('style');
    sparkleStyle.textContent = `
        @keyframes sparkleAnimation {
            0% {
                opacity: 1;
                transform: scale(0) rotate(0deg);
            }
            50% {
                opacity: 1;
                transform: scale(1) rotate(180deg);
            }
            100% {
                opacity: 0;
                transform: scale(0) rotate(360deg);
            }
        }
    `;
    
    if (!document.querySelector('#sparkle-style')) {
        sparkleStyle.id = 'sparkle-style';
        document.head.appendChild(sparkleStyle);
    }
    
    document.body.appendChild(sparkle);
    
    setTimeout(() => {
        sparkle.remove();
    }, 1000);
}