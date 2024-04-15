let qList;
let i = 0;
let score = 0;
let remainingQuestions;
let controllerLink;
let timerId;

function render(list, controller) {
    if (timerId) {
        clearInterval(timerId);
    }

    if (!list || !list.length) {
        renderError();
        return;
    }
    qList = list;
    controllerLink = controller;
    remainingQuestions = qList.length;

    showQuestion(list[0]);
}

function showQuestion(question) {

    const container = document.querySelector('#container');


    if (container.childElementCount == 1) {
        container.removeChild(container.lastChild);
    }

    const elem = document.createElement('div');
    elem.className = `text-center`;

    elem.innerHTML = `<h1 class='padding'>${question.question}</h1>
  <div class="truefalse">  
  <button id="true" class='next btn btn-dark'>True</button>
  <button id="false" class='next btn btn-dark'>False</button>
  <div id="timer">Time remaining: 10 seconds</div>
  <div id="score">Score: ${score}</div>
  <div id="remaining">Remaining questions: ${remainingQuestions}/${qList.length}</div>
  </div>`;
    container.appendChild(elem);
    startListening(question.correct_answer);
    startTimer();
}

function startListening(correct_answer) {
    const next = document.querySelectorAll(".next");
    next.forEach(element => {
        element.addEventListener('click', (e) => {
            clearTimeout(timerId);
            document.getElementById("true").setAttribute('disabled', 'disabled');
            document.getElementById("false").setAttribute('disabled', 'disabled');
            const button = document.getElementById(`${e.target.id}`);
            button.classList.remove("btn-dark");
            if (correct_answer.toLowerCase() == e.target.id) {
                e.target.classList.add("btn-success");
                score++;
                updateScore();
            } else {
                e.target.classList.add("btn-danger");
            }
            setTimeout(() => {
                if (i == qList.length - 1) {
                    handleGameCompletion();
                    return;
                }
                i++;
                remainingQuestions--;
                showQuestion(qList[i]);
            }, 2000);
        });
    });
}

function startTimer() {
    let secondsLeft = 10;
    const timerElem = document.getElementById("timer");

    timerId = setInterval(() => {
        addEventListener('hashchange', (e) => {
            i = 0;
            score = 0;
            clearTimeout(timerId);
        });
        secondsLeft--;
        timerElem.textContent = `Time remaining: ${secondsLeft} seconds`;
        if (secondsLeft === 0) {
            clearTimeout(timerId);
            timerElem.textContent = "Time's up!";
            if (i == qList.length - 1) {
                handleGameCompletion();
                return;
            }
            i++;
            remainingQuestions--;
            showQuestion(qList[i]);
        }
    }, 1000); // Run every second
}

function handleGameCompletion() {
    const container = document.querySelector('#container');
    container.removeChild(container.lastChild);

    const elem = document.createElement('div');
    elem.className = `text-center`;

    elem.innerHTML = `<h1 class='padding'>Score: ${score}/${qList.length}</h1>
  <button id="playAgain" class='next btn btn-primary'>Play again</button>
  `;
    container.appendChild(elem);

    document.getElementById("playAgain").addEventListener('click', () => {
        console.log("Play again button clicked");
        score = 0;
        i = 0;
        remainingQuestions = qList.length;
        window.location.replace("#/");
        window.location.replace(`${controllerLink}`);
    });
}

function updateScore() {
    const scoreElem = document.getElementById("score");
    scoreElem.textContent = `Score: ${score}`;
}

function renderError() {
    const container = document.querySelector('#container');


    if (container.childElementCount == 1) {
        container.removeChild(container.lastChild);
    }

    const elem = document.createElement('div');
    elem.className = `text-center`;

    elem.innerHTML = `<h1 class='padding'>There is some error with the API, please try different settings (Ex.: Less amount of questions)</h1>
  `;
    container.appendChild(elem);
}

export default { render };
