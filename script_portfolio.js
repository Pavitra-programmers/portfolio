const overlay = document.querySelector('.overlay');        
const loading = document.querySelector('.loading')
let load = 0
let int = setInterval(blurring, 30)

const boxes = document.querySelectorAll('.box')

const nav = document.querySelector('.nav')
const modeEl = document.getElementById('mode')
const textEl = document.querySelector('.text h1')
const text = 'WELCOME TO MY PAGE !  '
let idx = 1
let speed = 300/1 

const panels = document.querySelectorAll('.cer')


// loading
function blurring() {
    load++;
    if (load > 99) {
        clearInterval(int);
        overlay.style.opacity = 0;
        setTimeout(() => {
            overlay.style.display = 'none';
            content.style.filter = 'none';
        }, 300);
    }
    loading.innerText = `${load}%`;
    overlay.style.opacity = scale(load, 0, 100, 1, 0);
    content.style.filter = `blur(${scale(load, 0, 100, 30, 0)}px)`;
}

const scale = (num, in_min, in_max, out_min, out_max) => {
    return ((num - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min;
}

// Initial mode check
document.addEventListener('DOMContentLoaded', () => {
    const html = document.querySelector('html')
    const textEl = document.querySelector('.text h1')
    if(html.classList.contains('dark')){
        textEl.style.color = 'white'
    } else {
        textEl.style.color = 'black'
    }
})

// mode button
modeEl.addEventListener('click', (e) => {
    const html = document.querySelector('html')
    const textEl = document.querySelector('.text h1')
    if(html.classList.contains('dark')){
        html.classList.remove('dark')
        e.target.innerHTML = '&#9789'
        textEl.style.color = 'black'
    }
    else{
        html.classList.add('dark')
        e.target.innerHTML = '&#9788;'
        textEl.style.color = 'white'
    }
})

// nav
window.addEventListener('scroll', fixNav)
function fixNav() {
    if(window.scrollY > nav.offsetHeight + 150) {
        nav.classList.add('active')
    }
    else{
        nav.classList.remove('active')
    }
}

// Auto Typing Function
function writeText() {
    textEl.innerText = text.slice(0, idx)
    idx++
    if(idx > text.length){
        idx = 1
    }
    setTimeout(writeText, speed)
}
writeText()

// boxes
window.addEventListener('scroll',checkBoxes)
checkBoxes()
function checkBoxes(){
    const triggerBottom = window.innerHeight / 5 * 4
    boxes.forEach(box => {
        const boxTop = box.getBoundingClientRect().top
        if(boxTop < triggerBottom){
            box.classList.add('show')
        }
        else{
            box.classList.remove('show')
        }
    })
}

panels.forEach((panel) => {
    panel.addEventListener('click', () => {
        removeActiveClasses()
        panel.classList.add('active');
    })
})
function removeActiveClasses(){
    panels.forEach(panel => {
        panel.classList.remove('active');
    })
}
