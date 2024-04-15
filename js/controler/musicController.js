import questionService from '../service/questionService.js';
import View from '../view/View.js';

async function init() {
  const music = await questionService.getQuestions(12);
  View.render(music, "#/music");
};

export default { init };
