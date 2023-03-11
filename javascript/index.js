//       --------- CHECK IF PORTRAIT OR LANDSCAPE -----------

let startSize;
let expansionSize;
const portrait = window.matchMedia("(orientation: portrait)").matches;
if (portrait) {
    startSize = '30vw';
    expansionSize = '95vw'
} else {
    startSize = '30vh';
    expansionSize = '95vh'
}

window.matchMedia("(orientation: portrait)").addEventListener("change", e => {
    const portrait = e.matches;
    if (portrait) {
        startSize = '30vw';
        expansionSize = '95vw'
    } else {
        startSize = '30vh';
        expansionSize = '95vh'
    }
});


//               ------------ EXPAND SIDE ---------------

let activeSide = false;
let container = document.querySelector('.container');
let side = document.querySelectorAll('.side');
for (let i = 0; i < side.length; i++) {
    side[i].addEventListener('click', expand);
}
let sideAnimation;
function expand() {
    this.removeEventListener('click', expand);
    activeSide = true;
    container.appendChild(this);
    sideAnimation = this.animate(
        [
            {
                width: startSize,
                height: startSize
            },
            {
                width: '100vw',
                height: '100vh',
                transform: 'rotateY(0deg) rotateX(0deg) translateZ(0px)'
            }
        ],
        {
            duration: 300,
            easing: 'ease',
            fill: 'forwards',
        }
    )
}


//               -------- CLOSE SIDE -------------

let cube = document.querySelector('.cube');
let closeButton = document.querySelectorAll('.close');
for (let i = 0; i < closeButton.length; i++) {
    closeButton[i].addEventListener('click', closeSide);
}
let sideList = ['front', 'back', 'top', 'bottom', 'left', 'right'];
function closeSide(e) {
    if (activeSide) {
        e.stopPropagation();
        let expandedSide = this.parentNode;
        let sidePosition = expandedSide.classList[1];
        sideAnimation.cancel();
        container.removeChild(expandedSide);
        let sideIndex;
        sideList.forEach((element, index) => {
            if (element == sidePosition) {
                sideIndex = index;
            }
        })
        cube.insertBefore(expandedSide, cube.childNodes[sideIndex]);
        expandedSide.addEventListener('click', expand);
        activeSide = false;
    }
}


//               ---------- KEY ROTATION ----------------

let moveY = 0;
let moveX = 0;
window.addEventListener("keydown", keyRotate);
function keyRotate(e) {
    switch (e.key) {
        case 'ArrowUp':
            moveY += 10;
            break;
        case 'ArrowDown':
            moveY -= 10;
            break;
        case 'ArrowLeft':
            moveX -= 10;
            break;
        case 'ArrowRight':
            moveX += 10;
            break;
    }
    cube.style.transform = `rotateX(${moveY}deg) rotateY(${moveX}deg)`;
}


//             ---------- WHEEL ROTATION ------------

container.addEventListener('wheel', wheelRotate);
function wheelRotate(e) {
    moveX += e.deltaX * 0.1;
    moveY += e.deltaY * 0.1;
    cube.style.transform = `rotateX(${moveY}deg) rotateY(${moveX}deg)`;
}


//             -------- SWIPE ROTATION --------

let oldTouchX = window.innerWidth / 2;
let oldTouchY = window.innerHeight / 2;
container.addEventListener('touchmove', touchRotate);
function touchRotate(e) {
    let touchX = e.touches[0].clientX;
    let touchY = e.touches[0].clientY;
    moveX += touchX - oldTouchX;
    moveY += touchY - oldTouchY;
    cube.style.transform = `rotateX(${-moveY}deg) rotateY(${moveX}deg)`;
    oldTouchX = touchX;
    oldTouchY = touchY;
}