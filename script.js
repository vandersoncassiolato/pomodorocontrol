//let touchEvent = 'ontouchstart' in window ? 'touchstart' : 'click';

const pomodoro_button = document.getElementById('pomodoro')
pomodoro_button.addEventListener('click', function(){
    pomodoro()
})
pomodoro_button.addEventListener('touchstart', function(){
    pomodoro()
})

const shortbreak_button = document.getElementById('short')
shortbreak_button.addEventListener('click', function(){
    shortbreak()
})
shortbreak_button.addEventListener('touchstart', function(){
    shortbreak()
})

const longbreak_button = document.getElementById('long')
longbreak_button.addEventListener('click', function(){
    longbreak()
})
longbreak_button.addEventListener('touchstart', function(){
    longbreak()
})

const start_button = document.getElementById('start')
start_button.addEventListener('click', function(){
    start()
})
start_button.addEventListener('touchstart', function(){
    start()
})

const stop_button = document.getElementById('stop')
stop_button.addEventListener('click', function(){
    stop()
})
stop_button.addEventListener('touchstart', function(){
    stop()
})

const reset1_button = document.getElementById('reset')
reset1_button.addEventListener('click', function(){
    reset1()
})
reset1_button.addEventListener('touchstart', function(){
    reset1()
})

var min = 25;
var seg = 0;

var pomodoro_setup_number = 0
var shortbreak_setup_number = 0
var longbreak_setup_number = 0

//Função que calcula o tempo de acordo com o settings, ou continua com o mesmo tempo padrão
function calc_time() {
    var pomodoro_setup = document.getElementById('input1')
    var shortbreak_setup = document.getElementById('input2')
    var longbreak_setup = document.getElementById('input3')

    pomodoro_setup_number = Number(pomodoro_setup.value)
    shortbreak_setup_number = Number(shortbreak_setup.value)
    longbreak_setup_number = Number(longbreak_setup.value)

    if(shortbreak_setup_number<=0){
        min = 5;
        seg = 0;
        shortbreak()
    } else {
        min = shortbreak_setup_number
        seg = 0
        shortbreak()
    }

    if(longbreak_setup_number<=0){
        min = 15;
        seg = 0;
        longbreak()
    } else {
        min = longbreak_setup_number
        seg = 0
        longbreak()
    }

    if(pomodoro_setup_number<=0){
        min = 25;
        seg = 0;
        pomodoro()
    } else {
        min = pomodoro_setup_number
        seg = 0
        pomodoro()
    }
}

//Botão para salvar o settings do tempo 
const button_1 = document.getElementById('botao1')
button_1.addEventListener('click', function () {
    calc_time()
    document.getElementById('fechar').click() = true
})
button_1.addEventListener('touchstart', function () {
    calc_time()
    document.getElementById('fechar').click() = true
})

//Botão para reset do tempo
const button_3 = document.getElementById('botao2')
button_3.addEventListener('click', function() {
    document.getElementById('input1').value = 0;
    document.getElementById('input2').value = 0;
    document.getElementById('input3').value = 0;
    calc_time()
    document.getElementById('sounds').reset();
    document.getElementById('volumes').reset();
})
button_3.addEventListener('touchstart', function() {
    document.getElementById('input1').value = 0;
    document.getElementById('input2').value = 0;
    document.getElementById('input3').value = 0;
    calc_time()
    document.getElementById('sounds').reset();
    document.getElementById('volumes').reset();
})

var count = 0;
var contador = 0;

//Chama o botão pomodoro, que estabelece os 25 minutos
function pomodoro() {
    if(pomodoro_setup_number<=0){
        min = 25;
        seg = 0;
    } else {
        min = pomodoro_setup_number
        seg = 0
    }

    document.getElementById('counter').innerHTML = min + ':00'
    stop()
    count = 0
}

//Chama o botão short break, que estabelece um descanso de 5 min.
function shortbreak() {
    if(shortbreak_setup_number<=0){
        min = 5;
        seg = 0;
    } else {
        min = shortbreak_setup_number
        seg = 0
    }

    document.getElementById('counter').innerHTML = min + ':00'
    stop()
    count = 1
}

//Chama o botão longbreak, que estabelece um descanso de 15 min
function longbreak() {
    if(longbreak_setup_number<=0){
        min = 15;
        seg = 0;
    } else {
        min = longbreak_setup_number
        seg = 0
    }

    document.getElementById('counter').innerHTML = min + ':00'
    stop()
    count = 2
}

var tempo = 1000; //Quantos milésimos equivalem a 1 segundo?
var cron = 0

//Começa a rodar o contador
function start() {
    cron = setInterval(() => {timer();}, tempo);

    document.getElementById ('start').disabled = true;
    document.getElementById ('stop').disabled = false;
}

//Para o contador no tempo q está e permanece
function stop() {
    clearInterval(cron);

    document.getElementById ('start').disabled = false;
}

//Reset do contador para o botão de atividade selecionado, pomodor, shortbreak e longbreak
function reset1() {
    clearInterval(cron);

    document.getElementById ('start').disabled = false;
    
    min = 25;
    seg = 0;

    document.getElementById('title_pomo').innerHTML = 'Pomodoro Control'

    if(count == 0) {
        pomodoro()
    }
    
    if(count == 1) {
        shortbreak()
    }

    if(count == 2) {
        longbreak()
    }
}

//Timer e contador girando, bem como o formato.
function timer() {
    seg-=1;
    if(seg == -1){
        seg = 59
        min-=1;
    }
    var format = (min < 10 ? '0' + min : min) + ':' + (seg < 10 ? '0' + seg : seg);
    document.getElementById('counter').innerHTML = format
    document.getElementById('title_pomo').innerHTML = 'Pomodoro Control - ' + format;

    if(min == 0 && seg == 0){
        stop()
        
        if(musica[0].checked || musica[1].checked || musica[2].checked || musica[3].checked) {
            valida_settings()
        } else {
            const audio = document.getElementById('audio4')
            audio.volume = 0.5
            audio.play()
            setTimeout(() => {audio.pause();}, 5000)
        }

        document.getElementById ('start').disabled = true;
        document.getElementById ('stop').disabled = true;

        //Automatização do botão autostart
        if(document.getElementById('autostart').checked == true && seg == 0) {
            if (count == 0 && contador == 0){
            shortbreak()
            start()
            contador = 5}
            else if (count == 1 || count == 2){
                pomodoro()
                var tempo_1 = 50
                setTimeout(() => {start();}, tempo_1)}
            else if (count == 0 && contador == 5){
                longbreak()
                var tempo_1 = 50
                setTimeout(() => {start();}, tempo_1)
                contador = 0}
        } else {
            //Alerta quando sem o auto start
            if(seg == 0) {            
                function alerta() {
                    alert("The time is finished! Let's start a new cycle.")
                    pomodoro()
                    document.getElementById('title_pomo').innerHTML = 'Pomodoro Control'
                } 
                var tempo_1 = 50
                setTimeout(() => {alerta();}, tempo_1)
            }
        }
    }
}

//Função para Abrir e Fechar a tela de Settings
function iniciaModal(modalID) {
    const modal = document.getElementById(modalID);
    modal.classList.add('mostrarmodal');
    modal.addEventListener('click', (e) => {
        if(e.target.className == 'fechar') {
            modal.classList.remove('mostrarmodal');
        }
    });
    modal.addEventListener('touchstart', (e) => {
        if(e.target.className == 'fechar') {
            modal.classList.remove('mostrarmodal');
        }
    });
    }

    const settings = document.querySelector('.settings');
    settings.addEventListener('click', () => iniciaModal('modal-settings'));
    settings.addEventListener('touchstart', () => iniciaModal('modal-settings'));

//Tasks check:
const check01 = document.getElementById('check_01')
check01.addEventListener('click', function () {
    if(document.getElementById('check_01').checked == true){
        document.getElementById('task01').disabled = true  
    } else {
        document.getElementById('task01').disabled = false
    }
})
check01.addEventListener('touchend', function () {
    setTimeout(() => {(validation());}, 100)

    function validation() {
        if(document.getElementById('check_01').checked == true){
            document.getElementById('task01').disabled = true  
        } else {
            document.getElementById('task01').disabled = false
        }
    }
})

const check02 = document.getElementById('check_02')
check02.addEventListener('click', function () {
    if(document.getElementById('check_02').checked == true){
        document.getElementById('task02').disabled = true  
    } else {
        document.getElementById('task02').disabled = false
    }
})
check02.addEventListener('touchend', function () {
    setTimeout(() => {(validation());}, 100)

    function validation() {
        if(document.getElementById('check_02').checked == true){
            document.getElementById('task02').disabled = true  
        } else {
            document.getElementById('task02').disabled = false
        }
    }
})

const check03 = document.getElementById('check_03')
check03.addEventListener('click', function () {
    if(document.getElementById('check_03').checked == true){
        document.getElementById('task03').disabled = true  
    } else {
        document.getElementById('task03').disabled = false
    }
})
check03.addEventListener('touchend', function () {
    setTimeout(() => {(validation());}, 100)

    function validation() {
        if(document.getElementById('check_03').checked == true){
            document.getElementById('task03').disabled = true  
        } else {
            document.getElementById('task03').disabled = false
        }
    }
})

const check04 = document.getElementById('check_04')
check04.addEventListener('click', function () {
    if(document.getElementById('check_04').checked == true){
        document.getElementById('task04').disabled = true  
    } else {
        document.getElementById('task04').disabled = false
    }
})
check04.addEventListener('touchend', function () {
    setTimeout(() => {(validation());}, 100)

    function validation() {
        if(document.getElementById('check_04').checked == true){
            document.getElementById('task04').disabled = true  
        } else {
            document.getElementById('task04').disabled = false
        }
    }
})

const check05 = document.getElementById('check_05')
check05.addEventListener('click', function () {
    if(document.getElementById('check_05').checked == true){
        document.getElementById('task05').disabled = true  
    } else {
        document.getElementById('task05').disabled = false
    }
})
check05.addEventListener('touchend', function () {
    setTimeout(() => {(validation());}, 100)

    function validation() {
        if(document.getElementById('check_05').checked == true){
            document.getElementById('task05').disabled = true 
        } else {
            document.getElementById('task05').disabled = false
        }
    }
})

const check06 = document.getElementById('check_06')
check06.addEventListener('click', function () {
    if(document.getElementById('check_06').checked == true){
        document.getElementById('task06').disabled = true  
    } else {
        document.getElementById('task06').disabled = false
    }
})
check06.addEventListener('touchend', function () {
    setTimeout(() => {(validation());}, 100)

    function validation() {
        if(document.getElementById('check_06').checked == true){
            document.getElementById('task06').disabled = true 
        } else {
            document.getElementById('task06').disabled = false
        }
    }
})

const check07 = document.getElementById('check_07')
check07.addEventListener('click', function () {
    if(document.getElementById('check_07').checked == true){
        document.getElementById('task07').disabled = true  
    } else {
        document.getElementById('task07').disabled = false
    }
})
check07.addEventListener('touchend', function () {
    setTimeout(() => {(validation());}, 100)

    function validation() {
        if(document.getElementById('check_07').checked == true){
            document.getElementById('task07').disabled = true  
        } else {
            document.getElementById('task07').disabled = false
        }
    }
})

const check08 = document.getElementById('check_08')
check08.addEventListener('click', function () {
    if(document.getElementById('check_08').checked == true){
        document.getElementById('task08').disabled = true  
    } else {
        document.getElementById('task08').disabled = false
    }
})
check08.addEventListener('touchend', function () {
    setTimeout(() => {(validation());}, 100)

    function validation() {
        if(document.getElementById('check_08').checked == true){
            document.getElementById('task08').disabled = true  
        } else {
            document.getElementById('task08').disabled = false
        }
    }
})

const check09 = document.getElementById('check_09')
check09.addEventListener('click', function () {
    if(document.getElementById('check_09').checked == true){
        document.getElementById('task09').disabled = true  
    } else {
        document.getElementById('task09').disabled = false
    }
})
check09.addEventListener('touchend', function () {
    setTimeout(() => {(validation());}, 100)

    function validation() {
        if(document.getElementById('check_09').checked == true){
            document.getElementById('task09').disabled = true  
        } else {
            document.getElementById('task09').disabled = false
        }
    }
})

const check010 = document.getElementById('check_010')
check010.addEventListener('click', function () {
    if(document.getElementById('check_010').checked == true){
        document.getElementById('task10').disabled = true  
    } else {
        document.getElementById('task10').disabled = false
    }
})
check010.addEventListener('touchend', function () {
    setTimeout(() => {(validation());}, 100)

    function validation() {
        if(document.getElementById('check_010').checked == true){
            document.getElementById('task10').disabled = true 
        } else {
            document.getElementById('task10').disabled = false
        }
    }
})

//Destrava todos os campos após o reset do das tasks.
const resetall = document.getElementById('resettasks')
resetall.addEventListener('click', function() {
    document.getElementById('task01').disabled = false
    document.getElementById('task02').disabled = false
    document.getElementById('task03').disabled = false
    document.getElementById('task04').disabled = false
    document.getElementById('task05').disabled = false
    document.getElementById('task06').disabled = false
    document.getElementById('task07').disabled = false
    document.getElementById('task08').disabled = false
    document.getElementById('task09').disabled = false
    document.getElementById('task10').disabled = false
})
resetall.addEventListener('touchstart', function() {
    document.getElementById('task01').disabled = false
    document.getElementById('task02').disabled = false
    document.getElementById('task03').disabled = false
    document.getElementById('task04').disabled = false
    document.getElementById('task05').disabled = false
    document.getElementById('task06').disabled = false
    document.getElementById('task07').disabled = false
    document.getElementById('task08').disabled = false
    document.getElementById('task09').disabled = false
    document.getElementById('task10').disabled = false
})

//Importando valores dos campos type Radio, como tipo de musica e volume

var musica = document.getElementsByName("a1");
var volumetotal = document.getElementsByName("a2")

//Função que valida o volume e a música
function valida_settings(){
    //Validação do volume
    if (volumetotal[0].checked){
        var vol = volumetotal[0].value;
    } else if (volumetotal[1].checked){
        var vol = volumetotal[1].value;
    } else if (volumetotal[2].checked){
        var vol = volumetotal[2].value;
    } else if (volumetotal[3].checked){
        var vol = volumetotal[3].value;
    } else if (volumetotal[4].checked){
        var vol = volumetotal[4].value;
    }

    var tempo_2 = 5000 //Tempo que a música demora para dar o pause

    //Validação da musica
    if (musica[0].checked) {
        const audio = document.getElementById('audio1')
        audio.volume = vol
        audio.play()
        setTimeout(() => {audio.pause();}, tempo_2)
    } else if (musica[1].checked){
        const audio = document.getElementById('audio2')
        audio.volume = vol
        audio.play()
        setTimeout(() => {audio.pause();}, tempo_2)
    } else if (musica[2].checked) {
        const audio = document.getElementById('audio3')
        audio.volume = vol
        audio.play()
        setTimeout(() => {audio.pause();}, tempo_2)
    } else if (musica[3].checked) {
        const audio = document.getElementById('audio4')
        audio.volume = vol
        audio.play()
        setTimeout(() => {audio.pause();}, tempo_2)
}}

//Botão para o test sound
const button = document.getElementById('test_sound')
button.addEventListener('click', function(){
    valida_settings()
})
button.addEventListener('touchstart', function(){
    valida_settings()
})

//Botão que vai para o about
const button_2 = document.getElementById('about1')
button_2.addEventListener('click', function() {
    window.location.href='#foo';
})
button_2.addEventListener('touchstart', function() {
    window.location.href='#foo';
})
