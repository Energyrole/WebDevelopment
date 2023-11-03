var finished = 0
var prev = 0
let threshold = Math.floor((Math.random()*5) + 1)
var done = false

var cleanupTimeline = anime.timeline({
    duration: '1000ms',
    autoplay: false
});

const corners = anime({
    targets: '.loader__red-box, .loader__red-box--light',
    easing: 'spring(1, 100, 50, 0)',
    borderRadius: '0px',
    duration: '1000ms',
    loop: false,
    autoplay: false
})

cleanupTimeline.add({
    targets: '.loader__cover',
    opacity: [from='1', to='0'],
    easing: 'easeInOutQuart',
    complete: () => {
        corners.play()
    }
})
cleanupTimeline.add({
    targets: '.container',
    translateX: 'calc(-50vw + 50%)',
    translateY: 'calc(-50vh + 50%)',
    rotate: '-2turn',
    easing: 'spring(1, 100, 50, 0)',
    borderRadius: '0px',
})
cleanupTimeline.add({
    targets: '.container, .loader__red-box',
    width: '100vw',
    height: '100vh',
    easing: 'easeInOutQuart',
    complete: () => {
        console.log("finished")
    }
})
cleanupTimeline.add({
    targets: '.loader',
    opacity: [2, 0],
    complete: () => {
        anime({
            targets: 'h1, p',
            opacity: [from=0, to=1],
            autoplay: true,
            loop: false,
            duration: 3000,
            delay: 100,
            begin: () => {
                document.querySelector('h1').hidden = false
                document.querySelector('p').hidden = false
            }
        })
    }
})


function updateProgress(current) {
    return Math.ceil(Math.pow(Math.random(), threshold) * (360 - current) + current)
}

const halo = anime({
    targets: '.halo',
    scale: 1.5,
    easing: 'easeOutInQuad',
    opacity: [1, 0],
    loop: true,
    duration: '1000',
    delay: anime.stagger(400, {start: 500}),
    loopComplete: () => {
        if (done) {
            halo.pause();
            cleanupTimeline.play()
        } else {
            return
        }
    }
})

function animate() {
    threshold = Math.floor((Math.random()*10) + 1)
    anime({
        targets: '.loader__red-box',
        background: [from= `conic-gradient(rgb(76, 209, 55) ${prev}deg, transparent 0deg);`, to= `conic-gradient(rgb(76, 209, 55) ${finished}deg, transparent 0deg)`],
        easing: 'easeInOutQuad',
        direction: 'alternate',
        duration: '750ms',
        loop: false,
        complete: () => {
            document.getElementById("progress").innerText = `Loaded ${Math.ceil((finished/360)*100)}%`
            if (finished == 360 && !done) {
                prev = 360
                done = true
                console.log("done for good")
                document.getElementById('red-box').style.animation = 'none';
                animate();
                return
            } else if (!done) {
                animate();
                prev = finished
                finished = updateProgress(finished);
                console.log(finished, threshold)
            } else {
                return
            }
        }
    })
}