import {ChangeEvent, useState} from "react";

function Haslo() {
    const [message, setMessage] = useState('Proszę wprowadzić hasło');
    const [password1, setPassword1] = useState('');
    const [password2, setPassword2] = useState('');
    function set1(event: ChangeEvent<HTMLInputElement>) {
        setPassword1(event.target.value);
        check(event.target.value, password2)
    }
    function set2(event: ChangeEvent<HTMLInputElement>) {
        setPassword2(event.target.value);
        check(password1, event.target.value)
    }
    function check(val1: string, val2: string) {
        if (!val1 && !val2) {
            setMessage("Proszę wprowadzić hasło")
            return
        }
        if (val1 !== val2) {
            setMessage("Hasła nie są zgodne")
            return
        }
        setMessage("")
    }
    return (

        <div>
            <p>Hasło</p>
            <input
                type="text"
                onChange={(e) => set1(e)}
            ></input>
            <p>Powtórz hasło</p>
            <input
                type="text"
                onChange={(e) => set2(e)}
            ></input>
            <p>
                {message}
            </p>
        </div>
    )

}

export default Haslo;