// var finished = ran

anime({
    targets: '.loader__red-box',
    background: [from= 'conic-gradient(red -10deg, transparent 0deg);', to= 'conic-gradient(red 360deg, transparent 0deg)'],
    easing: 'easeInOutQuad',
    direction: 'alternate',
    duration: '5000ms',
    loop: true
})