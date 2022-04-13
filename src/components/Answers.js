import { Fragment } from 'react/cjs/react.production.min';
import classes from '../styles/Answers.module.css';
import Checkbox from './Checkbox';

export default function Answers({ options = [], changeHandler, input }) {
    return (
        <div className={classes.answers}>
            {options.map((option, index) => (
                <Fragment key={index}>
                    {input ? (
                        <Checkbox
                            className={classes.answer}
                            text={option.title}
                            value={index}
                            checked={option.checked}
                            key={index}
                            onChange={(e) => {
                                changeHandler(e, index);
                            }}
                        />
                    ) : (
                        <Checkbox
                            key={index}
                            className={`${classes.answer} ${
                                option.correct ? classes.correct: option.checked ? classes.wrong : null
                            }`}
                            text={option.title}
                            defaultChecked={option.checked}
                            disabled
                        />
                    )}
                </Fragment>
            ))}
        </div>
    );
}
