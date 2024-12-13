import {useState} from "react";

function Aktualizacja() {
    const [state, setState] = useState({nazwa: "Pomidor", cena: 50});
    function changePrice(): void {
        setState(prevState => ({...prevState, cena: 100}));
    }
    return (
        <div>
            <p>{state.nazwa} kosztuje {state.cena}zł</p>
            <button onClick={() => changePrice()}>Zmień cenę</button>
        </div>
    )
}

export default Aktualizacja;