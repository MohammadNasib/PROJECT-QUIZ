import { useRef, useState } from 'react';
import ReactPlayer from 'react-player/youtube';
import classes from '../styles/MiniPlayer.module.css';

export default function MiniPlayer({ title, id }) {
    const [status, setStatus] = useState(false);
    const buttonRef = useRef();
    const url = `https://www.youtube.com/watch?v=${id}`;

    function togglePlayer() {
        if (!status) {
            setStatus(true);
            buttonRef.current.classList.remove(classes.floatingBtn);
        } else {
            setStatus(false);
            buttonRef.current.classList.add(classes.floatingBtn);
        }
    }

    return (
        <div
            className={`${classes.miniPlayer} ${classes.floatingBtn}`}
            ref={buttonRef}
            onClick={togglePlayer}
        >
            <span className={`material-icons-outlined ${classes.open}`}> play_circle_filled </span>

            <span className={`material-icons-outlined ${classes.close}`} onClick={togglePlayer}>
                close
            </span>

            <ReactPlayer
                className={classes.player}
                url={url}
                width='300px'
                height='168px'
                playing={status}
                controls={true}
            />
            <p>{title}</p>
        </div>
    );
}
