import {useEffect, useState} from "react";

function UseEffectLicznik() {
    const [count, setCount] = useState(0);
    function click() {
        setCount(count + 1);
    }

    useEffect(() => {
        console.log("Hello world");
    }, [])

    useEffect(() => {
        console.log("Licznik zwiększył się do " + count);
    }, [count]);

    return (
        <div>
            <p>{count}</p>
            <button onClick={() => click()}>DODAJ</button>
        </div>
    )
}

export default UseEffectLicznik;