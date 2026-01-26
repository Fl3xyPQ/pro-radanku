
const friendlyMessages = [
    "Smrdíš, bež se osprchovat! 😊",
    "Oslavujeme už jen pár hodin do další školy! 🎉",
    "Padá hvězda něco si přej ✨",
    "😄",
    "Hapalo to! 🌟",
    "Kulaté slunce jako čtvereček ☀️",
    "Podívej jak se ten mimoň směje 😂",
    "Jsem rád, že se jsme se poznali! 🤝",
    "Tonda má napad, napiš na MS Teams! Chce tě pozvat na RANDE!💡"
];


function updateClock() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    
    document.getElementById('clock').textContent = `${hours}:${minutes}:${seconds}`;
    
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    document.getElementById('date').textContent = now.toLocaleDateString('cs-CZ', options);
}

setInterval(updateClock, 1000);
updateClock();


let clickCount = 0;

function updateClickCounter() {
    clickCount++;
    document.getElementById('clickCounter').textContent = clickCount;
    localStorage.setItem('clickCount', clickCount);
}


if (localStorage.getItem('clickCount')) {
    clickCount = parseInt(localStorage.getItem('clickCount'));
    document.getElementById('clickCounter').textContent = clickCount;
}

// Přepínač barevného režimu
let currentTheme = 0;
const themes = [
    { bg: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)', emoji: '🌟' },
    { bg: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)', emoji: '🌅' },
    { bg: 'linear-gradient(135deg, #30cfd0 0%, #330867 100%)', emoji: '🌙' },
    { bg: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)', emoji: '🌸' },
    { bg: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)', emoji: '💖' },
    { bg: 'linear-gradient(135deg, #fccb90 0%, #d57eeb 100%)', emoji: '🍑' },
    { bg: 'linear-gradient(135deg, #e0c3fc 0%, #8ec5fc 100%)', emoji: '🦄' },
    { bg: 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)', emoji: '🍓' },
    { bg: 'linear-gradient(135deg, #96fbc4 0%, #f9f586 100%)', emoji: '🍋' },
    { bg: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)', emoji: '🧡' },
    { bg: 'linear-gradient(135deg, #ff6e7f 0%, #bfe9ff 100%)', emoji: '🌺' },
    { bg: 'linear-gradient(135deg, #c471f5 0%, #fa71cd 100%)', emoji: '🔮' },
    { bg: 'linear-gradient(135deg, #48c6ef 0%, #6f86d6 100%)', emoji: '💎' },
    { bg: 'linear-gradient(135deg, #f77062 0%, #fe5196 100%)', emoji: '🔥' },
    { bg: 'linear-gradient(135deg, #74ebd5 0%, #9face6 100%)', emoji: '🌊' },
    { bg: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', emoji: '🎨' }
];

document.getElementById('themeButton').addEventListener('click', function() {
    currentTheme = (currentTheme + 1) % themes.length;
    document.body.style.background = themes[currentTheme].bg;
    this.textContent = themes[currentTheme].emoji;
});

// Mini hra - chyt emoji
let gameActive = false;
let gameScore = 0;
let gameTimer;

document.getElementById('startGameBtn').addEventListener('click', function() {
    if (!gameActive) {
        startGame();
    }
});

function startGame() {
    gameActive = true;
    gameScore = 0;
    document.getElementById('score').textContent = gameScore;
    document.getElementById('gameScore').classList.remove('hidden');
    
    
    const btn = document.getElementById('startGameBtn');
    btn.style.opacity = '0';
    btn.style.transform = 'translate(-50%, -50%) scale(0.8)';
    setTimeout(() => {
        btn.style.display = 'none';
    }, 300);
    
    spawnEmoji();
}

function spawnEmoji() {
    if (!gameActive) return;
    
    const gameArea = document.getElementById('gameArea');
    const emoji = document.createElement('div');
    emoji.className = 'game-emoji';
    emoji.textContent = ['🌟', '⭐', '🎉', '🎈', '🎁'][Math.floor(Math.random() * 5)];
    
    emoji.style.left = Math.random() * 80 + '%';
    emoji.style.top = Math.random() * 60 + '%';
    
    let emojiCaught = false;
    
    emoji.addEventListener('click', function() {
        emojiCaught = true;
        gameScore++;
        document.getElementById('score').textContent = gameScore;
        this.remove();
        
        // Exploze efekt
        for (let i = 0; i < 5; i++) {
            setTimeout(createFloatingHeart, i * 50);
        }
        
        // Spawn dalšího emoji okamžitě
        if (gameActive) {
            setTimeout(spawnEmoji, 300);
        }
    });
    
    gameArea.appendChild(emoji);
    
    // Emoji zmiží po 3 sekundách - pokud nebylo chyceno, hra končí
    setTimeout(() => {
        if (emoji.parentNode && !emojiCaught) {
            emoji.remove();
            endGame(); 
        }
    }, 3000);
}

function endGame() {
    gameActive = false;
    
   
    const emojis = document.querySelectorAll('.game-emoji');
    emojis.forEach(e => e.remove());
    
   
    const btn = document.getElementById('startGameBtn');
    btn.textContent = `Konec! Skóre: ${gameScore} 🏆`;
    btn.style.display = 'block';
    
   
    setTimeout(() => {
        btn.style.opacity = '1';
        btn.style.transform = 'translate(-50%, -50%) scale(1)';
    }, 50);
    
    setTimeout(() => {
        btn.textContent = 'Hraj znovu!';
    }, 2000);
}


function createFloatingHeart() {
    const heartsContainer = document.getElementById('heartsContainer');
    const heart = document.createElement('div');
    heart.className = 'floating-heart';
    heart.innerHTML = ['⭐', '✨', '🌟', '💫', '🎉', '🎈', '😊', '🌈'][Math.floor(Math.random() * 8)];
    
    // Náhodná pozice zleva
    heart.style.left = Math.random() * 100 + '%';
    
    // Začíná zespodu obrazovky
    heart.style.bottom = '-50px';
    
    // Náhodné zpoždění
    heart.style.animationDelay = Math.random() * 2 + 's';
    
    // Náhodná délka trvání
    heart.style.animationDuration = (Math.random() * 3 + 4) + 's';
    
    heartsContainer.appendChild(heart);
    
   
    setTimeout(() => {
        heart.remove();
    }, 7000);
}


setInterval(createFloatingHeart, 800);


for (let i = 0; i < 5; i++) {
    setTimeout(createFloatingHeart, i * 200);
}


const loveButton = document.getElementById('loveButton');
const messageBox = document.getElementById('messageBox');
const loveMessage = document.getElementById('loveMessage');

loveButton.addEventListener('click', function() {
    // Počítá kliknutí
    updateClickCounter();
    
    
    const randomMessage = friendlyMessages[Math.floor(Math.random() * friendlyMessages.length)];
    
    // Aktualizuje zprávu
    loveMessage.textContent = randomMessage;
    
    
    messageBox.classList.remove('hidden');
    
    
    for (let i = 0; i < 10; i++) {
        setTimeout(createFloatingHeart, i * 100);
    }
    
    
    loveButton.style.transform = 'scale(0.95)';
    setTimeout(() => {
        loveButton.style.transform = 'scale(1)';
    }, 100);
});

// Třpytky – myš
document.addEventListener('mousemove', function(e) {
    if (Math.random() > 0.95) {
        const sparkle = document.createElement('div');
        sparkle.innerHTML = '✨';
        sparkle.style.position = 'fixed';
        sparkle.style.left = e.pageX + 'px';
        sparkle.style.top = e.pageY + 'px';
        sparkle.style.fontSize = '20px';
        sparkle.style.pointerEvents = 'none';
        sparkle.style.zIndex = '1000';
        sparkle.style.animation = 'fadeOut 1s ease-out';
        
        document.body.appendChild(sparkle);
        
        setTimeout(() => {
            sparkle.remove();
        }, 1000);
    }
});

// Třpytky – fdOut
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeOut {
        from {
            opacity: 1;
            transform: translateY(0);
        }
        to {
            opacity: 0;
            transform: translateY(-50px);
        }
    }
`;
document.head.appendChild(style);

