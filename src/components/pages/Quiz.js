import { getDatabase, ref, set } from 'firebase/database';
import _ from 'lodash';
import { useEffect, useReducer, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import useQuestions from '../../Hooks/useQuestions';
import Answers from '../Answers';
import MiniPlayer from '../MiniPlayer';
import ProgressBar from '../ProgressBar';

const initialState = null;

const reducer = (state, action) => {
    switch (action.type) {
        case 'questions':
            action.value.forEach((question) => {
                question.options.forEach((option) => {
                    option.checked = false;
                });
            });
            return action.value;

        case 'answer':
            const questions = _.cloneDeep(state);
            questions[action.questionID].options[action.optionIndex].checked = action.value;

            return questions;
        default:
            return state;
    }
};

export default function Quiz() {
    const { id } = useParams();
    const { loading, error, questions } = useQuestions(id);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const { currentUser } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const videoTitle = location.state;
    const [qna, dispatch] = useReducer(reducer, initialState);

    // saving all the questions in local state named 'qna'  touple
    useEffect(() => {
        dispatch({
            type: 'questions',
            value: questions,
        });
    }, [questions]);

    // handles the checkbox changes
    function checkHandler(e, index) {
        dispatch({
            type: 'answer',
            questionID: currentQuestion,
            optionIndex: index,
            value: e.target.checked,
        });
    }

    // handles when user click the next button and back button

    function nextQuestion() {
        if (currentQuestion + 1 < questions.length) {
            setCurrentQuestion((preval) => preval + 1);
        }
    }

    function prevQuestion() {
        if (currentQuestion !== 0) {
            setCurrentQuestion((preval) => preval - 1);
        }
    }

    // percentage
    const percentage = questions.length > 0 ? ((currentQuestion + 1) / questions.length) * 100 : 0;

    //submit
    async function Submit() {
        const { uid } = currentUser;
        const db = getDatabase();
        const resultRef = ref(db, `result/${uid}`);

        await set(resultRef, {
            [id]: qna,
        });

        navigate(`/result/${id}`, { state: qna });
    }

    return (
        <>
            {loading && <div>Loading ...</div>}
            {error && <div>There was an error!</div>}
            {!loading && !error && qna && qna.length > 0 && (
                <>
                    <h1>{qna[currentQuestion].title}</h1>
                    <h4>Question can have multiple answers</h4>
                    <Answers
                        input
                        options={qna[currentQuestion].options}
                        changeHandler={checkHandler}
                    />
                    <ProgressBar
                        nextFunc={nextQuestion}
                        backFunc={prevQuestion}
                        progress={percentage}
                        submitFunc={Submit}
                    />
                    <MiniPlayer id={id} title={videoTitle} />
                </>
            )}
        </>
    );
}
