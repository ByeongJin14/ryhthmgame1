let startTime = 0;
let combo = 0;

window.addEventListener('keydown', e => {
    let track = e.key.toUpperCase();
    if (document.getElementById(`tracktn${track}`)) {
        document.getElementById(`trackBtn${track}`).style.backgroundColor = 'white';
        isJudge(track);
    }
});

window.addEventListener('keyup', e => {
    let track = e.key. toUpperCase();
    if (document.getElementById(`trackBtn${track}`)) {
        document.getElementById(`trackBtn${track}`).style.backgroundColor = 'white';
        isJudge(track);
    }
});

function start() {
    document.getElementById('start').style.display = 'none';
    setTimeout(() => {
        var audio = new Audio('music.mp3');
        audio.play();
    },1300);

    startTime = Math.floor(new Date().getTime() / 100);

    setInterval(() => {
        var nowTime = Math.floor(new Date().getTime() / 100);
        for (let i = 0; i < song.note.length; i++) {
            if (startTime + song.note[i].time == nowTime && !song.note[i].noted) {
                song.note[i].noted = true;
                var test = document.createElement('div');
                test.classList.add('tile');
                test.classList.add(`t${i}`)
                document.getElementById(`track${song.note[i].track}`).appendChild(test);
                setTimeout(() => {
                    document.getElementsByClassName(`t${i}`)[0]?.remove();
                }, 3000);
            }
        }
    }, 1);
}

function isJudge(track) {
    var nowTime = Math.floor(new Date().getTime() / 100);
    
    for (let i = 0; i < song.note.length; i++) {
        if (song.note[i].track == track) {
            if (nowTime + 4 >= startTime + song.note[i].time + 30 && startTime + song.note[i].time + 30 >= nowTime) {
                if (nowTime + 1 >= startTime + song.note[i].time + 30 && startTime + song.note[i].time + 30 >= nowTime) {
                    combo += 1;
                    document.getElementById('combo').innerHTML = `COMBO: ${combo}`;
                    document.getElementById(`track${track}`).style.backgroundColor = 'rgb(200, 200, 200)';
                    setTimeout(() => {
                        document.getElementById(`track${track}`).style.backgroundColor = 'white';
                    }, 100);
                } else {
                    combo = 0;
                    document.getElementById('combo').innerHTML = `COMBO: ${combo}`;
                    document.getElementsByClassName(`t${i}`)[0].remove();
                    document.getElementById(`track${track}`).style.backgroundColor = 'red';
                    setTimeout(() => {
                        document.getElementById(`track${track}`).style.backgroundColor = 'white';
                    }, 100);
                }       
            }
        }
    }
}