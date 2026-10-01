/* =========================================================
   HISTÓRIA MALUCA
   JAVASCRIPT DO JOGO
   ========================================================= */


/* ---------------------------------------------------------
   ELEMENTOS DO DOM
   --------------------------------------------------------- */

const phraseInput = document.getElementById("phraseInput");

const addPhraseButton =
    document.getElementById("addPhraseButton");

const storyContainer =
    document.getElementById("storyContainer");

const emptyStory =
    document.getElementById("emptyStory");

const characterCount =
    document.getElementById("characterCount");

const currentPlayer =
    document.getElementById("currentPlayer");

const turnMessage =
    document.getElementById("turnMessage");

const playerOneCard =
    document.getElementById("playerOneCard");

const playerTwoCard =
    document.getElementById("playerTwoCard");

const scoreOne =
    document.getElementById("scoreOne");

const scoreTwo =
    document.getElementById("scoreTwo");

const roundNumber =
    document.getElementById("roundNumber");

const absurdEvent =
    document.getElementById("absurdEvent");

const eventText =
    document.getElementById("eventText");

const clearButton =
    document.getElementById("clearButton");

const finishButton =
    document.getElementById("finishButton");

const modalOverlay =
    document.getElementById("modalOverlay");

const finalScoreOne =
    document.getElementById("finalScoreOne");

const finalScoreTwo =
    document.getElementById("finalScoreTwo");

const finalMessage =
    document.getElementById("finalMessage");

const newGameButton =
    document.getElementById("newGameButton");


/* ---------------------------------------------------------
   ESTADO DO JOGO
   --------------------------------------------------------- */

let currentPlayerNumber = 1;

let round = 1;

let scores = {
    1: 0,
    2: 0
};

let story = [];

let gameStarted = false;


/* ---------------------------------------------------------
   FRASES DE EVENTOS ABSURDOS
   --------------------------------------------------------- */

const absurdEvents = [

    "Um pombo misterioso acaba de entrar na história.",
    
    "De repente, a lua começou a reclamar de alguma coisa.",
    
    "Um cachorro usando cartola apareceu no horizonte.",
    
    "O narrador percebeu que estava sendo observado.",
    
    "Uma torradeira declarou guerra ao reino.",
    
    "O tempo parou por exatamente três segundos.",
    
    "Um peixe invisível passou voando pela janela.",
    
    "Alguém gritou 'MEU DEUS, O QUE ESTÁ ACONTECENDO?'",
    
    "Um velho mapa começou a dar conselhos amorosos.",
    
    "Uma batata apareceu e exigiu respeito.",
    
    "As leis da física pediram demissão.",
    
    "Uma porta decidiu que não queria mais ser uma porta.",
    
    "Um cavalo extremamente educado pediu licença.",
    
    "O universo tossiu discretamente.",
    
    "Uma galinha revelou que sabia falar latim.",
    
    "Um relógio começou a andar para trás.",
    
    "O chão ficou temporariamente com medo.",
    
    "Uma nuvem assumiu o controle da situação.",
    
    "O protagonista lembrou que tinha esquecido alguma coisa importante.",
    
    "Um pato surgiu usando uma espada de plástico."

];


/* ---------------------------------------------------------
   MENSAGENS DOS TURNOS
   --------------------------------------------------------- */

const turnMessages = {

    1: [
        "Dê início à confusão...",
        "Sua vez de piorar tudo.",
        "O absurdo está esperando.",
        "Escreva alguma coisa completamente inesperada."
    ],

    2: [
        "Agora torne tudo ainda mais estranho.",
        "Sua vez de continuar o caos.",
        "Não deixe essa história fazer sentido.",
        "Supere o absurdo anterior."
    ]

};


/* ---------------------------------------------------------
   INICIALIZAÇÃO
   --------------------------------------------------------- */

function initializeGame() {

    updatePlayerInterface();

    updateCharacterCount();

    phraseInput.focus();

}


/* ---------------------------------------------------------
   ATUALIZAÇÃO DO JOGADOR
   --------------------------------------------------------- */

function updatePlayerInterface() {

    if (currentPlayerNumber === 1) {

        currentPlayer.textContent = "Jogador I";

        playerOneCard.classList.add("active");

        playerTwoCard.classList.remove("active");

    } else {

        currentPlayer.textContent = "Jogador II";

        playerTwoCard.classList.add("active");

        playerOneCard.classList.remove("active");

    }


    const messages =
        turnMessages[currentPlayerNumber];

    const randomIndex =
        Math.floor(Math.random() * messages.length);

    turnMessage.textContent =
        messages[randomIndex];

}


/* ---------------------------------------------------------
   CONTADOR DE CARACTERES
   --------------------------------------------------------- */

function updateCharacterCount() {

    const length =
        phraseInput.value.length;

    characterCount.textContent =
        `${length} / 180`;

}


/* ---------------------------------------------------------
   ADICIONAR FRASE
   --------------------------------------------------------- */

function addPhrase() {

    const text =
        phraseInput.value.trim();


    /* Impede frases vazias */

    if (!text) {

        phraseInput.focus();

        shakeInput();

        return;

    }


    /* Primeira frase inicia o jogo */

    if (!gameStarted) {

        gameStarted = true;

        emptyStory.remove();

    }


    /* Cria objeto da frase */

    const phrase = {

        player: currentPlayerNumber,

        text: text,

        number: story.length + 1

    };


    story.push(phrase);


    /* Adiciona pontos */

    const points =
        calculateAbsurdity(text);


    scores[currentPlayerNumber] += points;


    /* Atualiza interface */

    renderPhrase(phrase);

    updateScores();

    triggerRandomEvent();

    switchPlayer();


    /* Limpa campo */

    phraseInput.value = "";

    updateCharacterCount();

    phraseInput.focus();

}


/* ---------------------------------------------------------
   CÁLCULO DO ABSURDO
   --------------------------------------------------------- */

function calculateAbsurdity(text) {

    let points = 1;

    const lowerText =
        text.toLowerCase();


    /* Palavras consideradas absurdas */

    const absurdWords = [

        "pombo",
        "batata",
        "banana",
        "dinossauro",
        "alienígena",
        "alien",
        "robô",
        "vampiro",
        "dragão",
        "unicórnio",
        "abacaxi",
        "galinha",
        "pato",
        "macaco",
        "fantasma",
        "zumbi",
        "pirata",
        "rei",
        "rainha",
        "espaço",
        "lua",
        "marte",
        "tempo",
        "mágico",
        "mágica",
        "invisível",
        "explodiu",
        "explodindo",
        "absurdo",
        "maluco",
        "louco",
        "sanduíche",
        "torradeira",
        "geladeira"

    ];


    absurdWords.forEach(word => {

        if (lowerText.includes(word)) {

            points += 2;

        }

    });


    /* Frases grandes recebem um pequeno bônus */

    if (text.length > 80) {

        points += 1;

    }


    /* Pontuação máxima por frase */

    return Math.min(points, 8);

}


/* ---------------------------------------------------------
   RENDERIZAR FRASE
   --------------------------------------------------------- */

function renderPhrase(phrase) {

    const line =
        document.createElement("article");

    line.className = "story-line";


    const number =
        document.createElement("div");

    number.className = "story-number";

    number.textContent =
        phrase.number;


    const content =
        document.createElement("div");


    const player =
        document.createElement("span");

    player.className = "story-player";

    player.textContent =
        phrase.player === 1
            ? "Jogador I escreveu:"
            : "Jogador II escreveu:";


    const text =
        document.createElement("p");

    text.className = "story-text";


    /* Pequeno efeito de digitação */

    typeText(
        text,
        phrase.text
    );


    content.appendChild(player);

    content.appendChild(text);

    line.appendChild(number);

    line.appendChild(content);

    storyContainer.appendChild(line);


    /* Scroll para a nova frase */

    setTimeout(() => {

        storyContainer.scrollTo({

            top: storyContainer.scrollHeight,

            behavior: "smooth"

        });

    }, 100);

}


/* ---------------------------------------------------------
   EFEITO DE DIGITAÇÃO
   --------------------------------------------------------- */

function typeText(element, text) {

    let index = 0;

    const speed = 12;


    function write() {

        if (index < text.length) {

            element.textContent +=
                text.charAt(index);

            index++;

            setTimeout(write, speed);

        }

    }


    write();

}


/* ---------------------------------------------------------
   TROCAR JOGADOR
   --------------------------------------------------------- */

function switchPlayer() {

    if (currentPlayerNumber === 1) {

        currentPlayerNumber = 2;

    } else {

        currentPlayerNumber = 1;

        round++;

        roundNumber.textContent =
            round;

    }


    updatePlayerInterface();

}


/* ---------------------------------------------------------
   ATUALIZAR PONTUAÇÃO
   --------------------------------------------------------- */

function updateScores() {

    animateNumber(
        scoreOne,
        scores[1]
    );


    animateNumber(
        scoreTwo,
        scores[2]
    );

}


/* ---------------------------------------------------------
   ANIMAÇÃO DO NÚMERO
   --------------------------------------------------------- */

function animateNumber(element, value) {

    element.style.transform =
        "scale(1.4)";

    element.style.color =
        "#d1ad69";


    setTimeout(() => {

        element.textContent =
            value;

        element.style.transform =
            "scale(1)";

        element.style.color =
            "";

    }, 150);

}


/* ---------------------------------------------------------
   EVENTO ABSURDO
   --------------------------------------------------------- */

function triggerRandomEvent() {

    /*
       Existe aproximadamente 45% de chance
       de aparecer um evento.
    */

    const chance =
        Math.random();


    if (chance > 0.45) {

        return;

    }


    const index =
        Math.floor(
            Math.random() *
            absurdEvents.length
        );


    eventText.textContent =
        absurdEvents[index];


    absurdEvent.classList.remove("show");


    /* Força a animação novamente */

    void absurdEvent.offsetWidth;


    absurdEvent.classList.add("show");


    setTimeout(() => {

        absurdEvent.classList.remove("show");

    }, 5000);

}


/* ---------------------------------------------------------
   ANIMAÇÃO DE ERRO
   --------------------------------------------------------- */

function shakeInput() {

    phraseInput.style.animation =
        "shake 0.35s ease";


    setTimeout(() => {

        phraseInput.style.animation =
            "";

    }, 400);

}


/* ---------------------------------------------------------
   NOVA HISTÓRIA
   --------------------------------------------------------- */

function resetGame() {

    const confirmation =
        confirm(
            "Tem certeza que deseja apagar esta história e começar outra?"
        );


    if (!confirmation) {

        return;

    }


    startNewGame();

}


/* ---------------------------------------------------------
   INICIAR NOVO JOGO
   --------------------------------------------------------- */

function startNewGame() {

    currentPlayerNumber = 1;

    round = 1;

    scores = {
        1: 0,
        2: 0
    };

    story = [];

    gameStarted = false;


    roundNumber.textContent =
        "1";


    scoreOne.textContent =
        "0";


    scoreTwo.textContent =
        "0";


    storyContainer.innerHTML = "";


    const newEmptyStory =
        document.createElement("div");

    newEmptyStory.className =
        "empty-story";

    newEmptyStory.id =
        "emptyStory";


    newEmptyStory.innerHTML = `

        <div class="big-quill">✒</div>

        <h3>Era uma vez...</h3>

        <p>
            Uma história que ainda não fazia
            absolutamente nenhum sentido.
        </p>

        <span>
            O primeiro jogador deve começar.
        </span>

    `;


    storyContainer.appendChild(
        newEmptyStory
    );


    absurdEvent.classList.remove(
        "show"
    );


    updatePlayerInterface();

    phraseInput.value = "";

    updateCharacterCount();

    phraseInput.focus();

}


/* ---------------------------------------------------------
   FINALIZAR HISTÓRIA
   --------------------------------------------------------- */

function finishGame() {

    if (story.length === 0) {

        alert(
            "A história ainda está vazia! Escreva pelo menos uma frase."
        );

        phraseInput.focus();

        return;

    }


    finalScoreOne.textContent =
        scores[1];


    finalScoreTwo.textContent =
        scores[2];


    let message = "";


    const total =
        scores[1] + scores[2];


    if (total >= 30) {

        message =
            "Parabéns! Esta história atingiu níveis perigosos de absurdo. Provavelmente nenhum adulto responsável deveria lê-la.";

    } else if (total >= 15) {

        message =
            "Uma bela obra de confusão. O sentido tentou aparecer, mas foi embora correndo.";

    } else {

        message =
            "A história chegou ao fim... embora ninguém saiba exatamente o que aconteceu.";

    }


    finalMessage.textContent =
        message;


    modalOverlay.classList.add(
        "show"
    );

}


/* ---------------------------------------------------------
   EVENTOS
   --------------------------------------------------------- */


/* Botão adicionar */

addPhraseButton.addEventListener(
    "click",
    addPhrase
);


/* Digitar Enter */

phraseInput.addEventListener(
    "keydown",
    function(event) {

        /*
           Enter sozinho envia.
           Shift + Enter permite pular linha.
        */

        if (
            event.key === "Enter" &&
            !event.shiftKey
        ) {

            event.preventDefault();

            addPhrase();

        }

    }
);


/* Contador */

phraseInput.addEventListener(
    "input",
    updateCharacterCount
);


/* Nova história */

clearButton.addEventListener(
    "click",
    resetGame
);


/* Finalizar */

finishButton.addEventListener(
    "click",
    finishGame
);


/* Modal - novo jogo */

newGameButton.addEventListener(
    "click",
    function() {

        modalOverlay.classList.remove(
            "show"
        );

        startNewGame();

    }
);


/* Fechar modal clicando fora */

modalOverlay.addEventListener(
    "click",
    function(event) {

        if (
            event.target ===
            modalOverlay
        ) {

            modalOverlay.classList.remove(
                "show"
            );

        }

    }
);


/* ---------------------------------------------------------
   CSS DA ANIMAÇÃO DE SHAKE
   --------------------------------------------------------- */

const shakeStyle =
    document.createElement("style");


shakeStyle.textContent = `

    @keyframes shake {

        0%, 100% {
            transform: translateX(0);
        }

        25% {
            transform: translateX(-7px);
        }

        75% {
            transform: translateX(7px);
        }

    }

    #scoreOne,
    #scoreTwo {
        transition:
            transform 0.15s ease,
            color 0.15s ease;
    }

`;


document.head.appendChild(
    shakeStyle
);


/* ---------------------------------------------------------
   INICIAR
   --------------------------------------------------------- */

initializeGame();
