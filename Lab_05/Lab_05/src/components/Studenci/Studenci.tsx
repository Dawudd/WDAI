function Studenci() {
    type Student = {
        imie: string,
        nazwisko: string,
        rocznik: number,
    };
    const Students: Student[] = [
        {imie: "Dawid", nazwisko: "Szłapa", rocznik: 2004},
        {imie: "Karol", nazwisko: "Bożydar", rocznik: 1999},
        {imie: "Damian", nazwisko: "Król", rocznik: 2006}
    ];
    return (
        Students.map((student: Student) => (
            <p>{student.imie} {student.nazwisko}, rocznik {student.rocznik}</p>
        ))
    );
}

export default Studenci;