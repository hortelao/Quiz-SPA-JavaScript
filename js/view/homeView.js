function render() {

  
  const container = document.querySelector('#container');

  if (container.childElementCount == 1) {
    container.removeChild(container.lastChild);
  }
  const elem = document.createElement('div');
  elem.className = `text-center`;

  elem.innerHTML = `
  <div class="space">
  <h1 class="h1-custom">Welcome to the Best Quiz Made with SPA Javascript!</h1>
  </div>
    <p>Get ready to test your knowledge in a fun and challenging way.</p>
    <div class="centered">
    <div class="dropdown">
      <select class="form-select" id="difficulty">
        <option value="easy">Easy</option>
        <option value="medium">Medium</option>
        <option value="hard">Hard</option>
      </select>
    </div>
    <div class="input-group mb-3 sized">
      <span class="input-group-text">Number of Questions (1-50):</span>
      <input type="number" min="1" max="50" value="10" class="form-control" id="numQuestions">
    </div>
    <div class="buttons">
        <a href="#/music" id="music-href"><button type="button" class="btn btn-primary">Music</button></a>
        <a href="#/it" id="it-href"><button type="button" class="btn btn-primary" >IT</button></a>
        <a href="#/videogames" id="viodegames-href"><button type="button" class="btn btn-primary" >Video Games</button></a>
        <a href="#/generalKnowledge" id="random-href"><button type="button" class="btn btn-primary" >General Knowledge</button></a>
        </div>
    </div>
    `;
    container.appendChild(elem);

    const select = document.getElementById("difficulty")
    const questions = document.getElementById("numQuestions");
    sessionStorage.setItem('difficulty', select.value);
    sessionStorage.setItem('numQuestions', questions.value);

  
select.addEventListener("change", () => {
  sessionStorage.setItem('difficulty', select.value);
});
questions.addEventListener("change", () => {
  sessionStorage.setItem('numQuestions', questions.value);
});

};

export default { render };
