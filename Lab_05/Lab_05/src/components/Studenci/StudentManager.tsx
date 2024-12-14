import {useState} from "react";
import Dodawanie from "./Dodawanie.tsx";

function Studenci() {
    type Student = {
        imie: string,
        nazwisko: string,
        rocznik: number | "",
    };
    const [Students, setStudents] = useState<Student[]>([
        {imie: "Dawid", nazwisko: "Szłapa", rocznik: 2004},
        {imie: "Karol", nazwisko: "Bożydar", rocznik: 1999},
        {imie: "Damian", nazwisko: "Król", rocznik: 2006}
    ]);

    const [student, setStudent] = useState<Student>({imie: "", nazwisko: "", rocznik: ""});

    function clearInputs() {
        setStudent({imie: "", nazwisko: "", rocznik: ""});
    }

    function add() {
        if(!student.imie || !student.nazwisko || !student.rocznik) {
            alert("Wpisz wszystkie dane")
            return
        }
        setStudents(prevState => [...prevState, student]);
        clearInputs();
    }

    return (
        <div>
            {Students.map((student: Student) => (
                <p>
                    {student.imie} {student.nazwisko}, rocznik {student.rocznik}
                </p>
            ))}
            <Dodawanie submitForm={add} setState={setStudent} student={student}></Dodawanie>
        </div>
    );
}

export default Studenci;