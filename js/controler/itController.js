import questionService from '../service/questionService.js';
import View from '../view/View.js';

async function init() {
  const it = await questionService.getQuestions(18);
  View.render(it, "#/it");
};

export default { init };