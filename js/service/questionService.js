// https://opentdb.com/api.php?amount=10&category=11&difficulty=easy&type=boolean

async function fetchQuestions(cat) {
    
    var difficulty = sessionStorage.getItem('difficulty');
    var amount = sessionStorage.getItem('numQuestions');

    console.log(difficulty);
    console.log(amount);


    const response = await fetch(`https://opentdb.com/api.php?amount=${amount}&category=${cat}&difficulty=${difficulty}&type=boolean`);
    const body = await response.json();

    if (!response.ok) {
        throw new Error(body.message); // throwing inside async rejects the returned promise
    }

    return body;

}

async function getQuestions(cat) {

    try {
        const fetchResult = await fetchQuestions(cat);

            return fetchResult.results;
        
        
        } catch(e) {
            console.log(e.message);
        }
 

}


export default { getQuestions };