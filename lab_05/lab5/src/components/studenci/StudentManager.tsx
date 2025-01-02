import { useState } from "react";
import Dodawanie from "./Dodawanie";

// Deklaracja obiektu pojedynczego studenta
type Student = {
    imie: string;
    nazwisko: string;
    rocznik: number;
};

// Deklaracja komponentu Studenci
function Studenci() {
    const [students, setStudents] = useState<Student[]>([{ imie: "Jan", nazwisko: "Kowalski", rocznik: 1990 }, 
        { imie: "Anna", nazwisko: "Nowak", rocznik: 1995 }, 
        { imie: "Piotr", nazwisko: "Wiśniewski", rocznik: 2000 }]);


    const handleAddStudent = (student: Student) => {
        setStudents([...students, student]);
    }

    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>Imię</th>
                        <th>Nazwisko</th>
                        <th>Rocznik</th>
                    </tr>
                </thead>
                <tbody>
                    {students.map((student, index) => (
                        <tr key={index}>
                            <td>{student.imie}</td>
                            <td>{student.nazwisko}</td>
                            <td>{student.rocznik}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <Dodawanie onAdd={handleAddStudent}/>
        </div>
    );
}

export default Studenci;