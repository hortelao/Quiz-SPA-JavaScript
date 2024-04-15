import questionService from '../service/questionService.js';
import View from '../view/View.js';

async function init() {
  const general = await questionService.getQuestions(9);
  View.render(general, "#/generalKnowledge");
};

export default { init };