import './App.scss';
import { useState } from 'react';
import axios from 'axios';

function App() {
    const [name, setName] = useState('');
    const [age, setAge] = useState(0);
    const [country, setCountry] = useState('');
    const [position, setPosition] = useState('');
    const [wage, setWage] = useState(0);
    const [employeeList, setEmployeeList] = useState([]);

    // const displayInfo = () => {
    //     console.log(name + age + country + position + wage);
    // };

    const addEmployee = () => {
        axios
            .post('http://localhost:3001/create', {
                // name trắng phải gioongs rea.body.name bên backend
                name: name,
                age: age,
                country: country,
                position: position,
                wage: wage,
            })
            .then(() => {
                setEmployeeList(
                    ...[
                        employeeList,
                        {
                            name: name,
                            age: age,
                            country: country,
                            position: position,
                            wage: wage,
                        },
                    ]
                );
            });
    };

    const getEmployees = () => {
        axios.get('http://localhost:3001/employees').then((response) => {
            setEmployeeList(response.data);
            console.log(response);
        });
    };
    return (
        <div className="App">
            <div className="information">
                <label>Name: </label>
                <input
                    type="text"
                    className=""
                    onChange={(event) => {
                        setName(event.target.value);
                    }}
                />
                <label>Age: </label>
                <input
                    type="number"
                    className=""
                    onChange={(event) => {
                        setAge(event.target.value);
                    }}
                />
                <label>Country: </label>
                <input
                    type="text"
                    className=""
                    onChange={(event) => {
                        setCountry(event.target.value);
                    }}
                />
                <label>Position: </label>
                <input
                    type="text"
                    className=""
                    onChange={(event) => {
                        setPosition(event.target.value);
                    }}
                />
                <label>Wage (year): </label>
                <input
                    type="number"
                    className=""
                    onChange={(event) => {
                        setWage(event.target.value);
                    }}
                />
                <button onClick={addEmployee}>Add Employee </button>
            </div>
            --------------------------------------------------------------------------------------------------------
            <div className="employees">
                <button onClick={getEmployees}>Show Employee</button>
                {employeeList.map((value, index) => {
                    return (
                        <div className="employee">
                            <h3>Name: {value.name}</h3>
                            <h3>Age: {value.age}</h3>
                            <h3>Country: {value.country}</h3>
                            <h3>Position: {value.position}</h3>
                            <h3>Wage: {value.wage}</h3>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default App;
