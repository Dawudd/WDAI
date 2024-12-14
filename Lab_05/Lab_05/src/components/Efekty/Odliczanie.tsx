import {useEffect, useState} from "react";

function Odliczanie() {
    const [time, setTime] = useState(15.0)
    const [isActive, setActive] = useState(false)
    const [isButtonDisabled, setIsButtonDisabled] = useState(false)

    useEffect(() => {
        let intervalID: number | undefined;
        if (isActive) {
            intervalID = setInterval(() => {
                setTime((prevTime) => prevTime - 0.1);

            }, 100);
        }
        return () => {
            if (intervalID) {
                clearInterval(intervalID);
            }
        };
    }, [isActive])

    useEffect(() => {
        if (time<=0.0) {
            setIsButtonDisabled(true);
            setActive(false)
        }
    }, [time]);

    function changeState() {
        setActive(!isActive);
    }

    return (
        <div>
            <button
                onClick={changeState}
                disabled={isButtonDisabled}
            >
                {isButtonDisabled ? "Odliczanie zakończone" : isActive ? "STOP" : "START"}
            </button>
            <p>{Math.max(Math.round(time * 10) / 10,0)}</p>

        </div>

    )
}

export default Odliczanie;