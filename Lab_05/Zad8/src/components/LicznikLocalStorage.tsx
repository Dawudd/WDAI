import {useEffect, useState} from "react";

function LicznikLocalStorage() {
    const [count, setCount] = useState(0);

    useEffect(() => {
        let savedCount: string | null = localStorage.getItem("count");
        if (savedCount !== null) {
            setCount(parseInt(savedCount));
        }
    }, []);

    function click() {
        setCount((prevCount) => {
            localStorage.setItem("count", (prevCount + 1).toString());
            return (prevCount + 1);
        });
    }

    return (
        <div>
            <button
                onClick={() => {click()}}
            >
                CLICK
            </button>
            <p>{count}</p>
        </div>
    )
}

export default LicznikLocalStorage;
