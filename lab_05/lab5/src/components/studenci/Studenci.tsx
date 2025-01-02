// Deklaracja obiektu pojedynczego studenta
type Student = {
    imie: string;
    nazwisko: string;
    rocznik: number;
};

// Stworzenie tablicy z studentami
const Students: Student[] = [{imie: 'Jan', nazwisko: 'Kowalski', rocznik: 1990}, 
    {imie: 'Anna', nazwisko: 'Nowak', rocznik: 1991}, 
    {imie: 'Piotr', nazwisko: 'Wiśniewski', rocznik: 1992}];

// Deklaracja komponentu Studenci
function Studenci() {
    return (
        <table>
            <thead>
                <tr>
                    <th>Imię</th>
                    <th>Nazwisko</th>
                    <th>Rocznik</th>
                </tr>
            </thead>
            <tbody>
                {Students.map((student, index) => (
                    <tr key={index}>
                        <td>{student.imie}</td>
                        <td>{student.nazwisko}</td>
                        <td>{student.rocznik}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

export default Studenci;