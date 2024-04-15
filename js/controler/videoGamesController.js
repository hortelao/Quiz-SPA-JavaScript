import questionService from '../service/questionService.js';
import View from '../view/View.js';

async function init() {
  const videogames = await questionService.getQuestions(15);
  View.render(videogames, "#/videogames");
};

export default { init };