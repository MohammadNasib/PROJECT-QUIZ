import { useRef, useState } from 'react';
import classes from '../styles/ProgressBar.module.css';
import Button from './Button';

export default function ProgressBar({ nextFunc, backFunc, progress, submitFunc }) {
    const tooltipRef = useRef();
    const [tooltip, setTooltip] = useState(true);

    function toggleTooltip() {
        if (tooltip) {
            setTooltip(false);
            tooltipRef.current.style.display = 'block';
            tooltipRef.current.style.left = `calc(${progress}% - 65px)`;
        } else {
            setTooltip(true);
            tooltipRef.current.style.display = 'none';
        }
    }

    return (
        <div className={classes.progressBar}>
            <div className={classes.backButton} onClick={backFunc}>
                <span className='material-icons-outlined'> arrow_back </span>
            </div>

            <div className={classes.rangeArea}>
                <div className={classes.tooltip} ref={tooltipRef}>
                    {progress} Complete!
                </div>
                <div className={classes.rangeBody}>
                    <div
                        className={classes.progress}
                        style={{ width: `${progress}%` }}
                        onMouseOver={toggleTooltip}
                        onMouseOut={toggleTooltip}
                    ></div>
                </div>
            </div>

            <Button className={classes.next} onClick={progress === 100 ? submitFunc : nextFunc}>
                <span>{progress === 100 ? 'Submit' : 'Next Question'}</span>
                <span className='material-icons-outlined'> arrow_forward </span>
            </Button>
            <button className={`${classes.button} ${classes.next}`}></button>
        </div>
    );
}
