function Dodawanie({submitForm, setState, student}) {
    type Student = {
        imie: string,
        nazwisko: string,
        rocznik: number,
    };

    function updateName(name: string): void {
        setState((prevState: Student) => ({
            ...prevState,
            imie: name,
        }));
    }

    function updateSurname(surname: string): void {
        setState((prevState: Student) => ({
            ...prevState,
            nazwisko: surname,
        }));
    }

    function updateYear(year: number): void {
        setState((prevState: Student) => ({
            ...prevState,
            rocznik: year,
        }))
    }

    return (
        <div>
            <p>Imię</p>
            <input
                type="text"
                value={student.imie}
                onChange={(e) => updateName(e.target.value)}
            ></input>
            <p>Nazwisko</p>
            <input
                type="text"
                value={student.nazwisko}
                onChange={(e) => updateSurname(e.target.value)}
            ></input>
            <p>Rocznik</p>
            <input
                type="number"
                value={student.rocznik}
                onChange={(e) => updateYear(parseInt(e.target.value))}
            ></input>
            <br /><br />
            <button onClick={submitForm}>Dodaj</button>
        </div>
    )
}

export default Dodawanie;