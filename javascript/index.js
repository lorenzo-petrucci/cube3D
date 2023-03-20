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
let sideList = ['front', 'back', 'top', 'bottom', 'left', 'right'];
function expand() {
    this.childNodes[1].classList.add('close-expanded');
    if (this.childNodes[5].classList[0] == 'profile') {
        document.querySelector('.profile').classList.add('profile-expanded');
        document.querySelector('.bio').classList.add('bio-expanded');
    }
    if (this.childNodes[5].classList[0] == 'skills') {
        document.querySelector('.skills').classList.add('skills-expanded');
    }

    //this.childNodes[5].classList.add('profile-expanded');
    this.classList.add('side-expanded');
    this.removeEventListener('click', expand);
    activeSide = true;
    container.appendChild(this);
    if (window.innerWidth < 500) {
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
    } else {
        sideAnimation = this.animate(
            [
                {
                    width: startSize,
                    height: startSize
                },
                {
                    width: expansionSize,
                    height: expansionSize,
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
}


//               -------- CLOSE SIDE -------------

let cube = document.querySelector('.cube');
let closeButton = document.querySelectorAll('.close');
for (let i = 0; i < closeButton.length; i++) {
    closeButton[i].addEventListener('click', closeSide);
}
function closeSide(e) {
    if (activeSide) {
        e.stopPropagation();
        this.classList.remove('close-expanded');
        document.querySelector('.profile').classList.remove('profile-expanded');
        document.querySelector('.bio').classList.remove('bio-expanded');
        document.querySelector('.skills').classList.remove('skills-expanded');

        let expandedSide = this.parentNode;
        let sidePosition = expandedSide.classList[1];
        expandedSide.classList.remove('side-expanded');
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

let moveY = -28.6;
let moveX = 37.4;
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

let oldTouchX = moveX;
let oldTouchY = moveY;
container.addEventListener('touchmove', touchRotate);
function touchRotate(e) {
    e.preventDefault();
    let touchX = e.touches[0].clientX;
    let touchY = e.touches[0].clientY;
    moveX += touchX - oldTouchX;
    moveY += touchY - oldTouchY;
    cube.style.transform = `rotateX(${-moveY}deg) rotateY(${moveX}deg)`;
    oldTouchX = touchX;
    oldTouchY = touchY;
}


//             -------- TAB FOCUS ----------

// window.addEventListener('keydown', tabFocus);
// let position;
// function tabFocus(e) {
//     console.log(document.activeElement);
//     sideList.forEach((element) => {
//         if (document.activeElement.classList[1] === element) {
//             position = element;
//         }
//     });
//     console.log(position);
    
// }


//          --------- ENTER KEY EXPAND ---------


//          --------- ESC (OR OTHER) KEY CLOSE --------