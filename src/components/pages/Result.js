import _ from 'lodash';
import { useLocation, useParams } from 'react-router-dom';
import useAnswers from '../../Hooks/useAnswers';
import Analysis from '../Analysis';
import Summary from '../Summary';

export default function Result() {
    const { id } = useParams();
    const location = useLocation();
    const qna = location.state;
    const { loading, error, answers } = useAnswers(id);

    function calculate(qna) {
        let score = 0;

        answers.forEach((answer, index1) => {
            let correctIndexes = [],
                checkedIndexes = [];

            answer.options.forEach((option, index2) => {
                if (option.correct) {
                    correctIndexes.push(index2);
                }

                if (qna[index1].options[index2].checked) {
                    checkedIndexes.push(index2);
                    option.checked = true;
                    console.log(option);
                    
                }
            });

            if (_.isEqual(correctIndexes, checkedIndexes)) {
                score = score + 5;
            }
        });

        return score;
    }

    const userScore = calculate(qna);

    return (
        <>
            {loading && <div>Loading....</div>}
            {error && <div>Something went wrong....</div>}
            {!loading && !error && answers && answers.length > 0 && (
                <div>
                    <Summary score={userScore} noq={answers.length} />
                    <Analysis answers={answers} />
                </div>
            )}
        </>
    );
}
