import './App.scss';
import { useState } from 'react';
import axios from 'axios';

function App() {
    const data = {
        name: '',
        age: '',
        country: '',
        position: '',
        wage: '',
    };
    const [form, setForm] = useState({ ...data });
    const [employeeList, setEmployeeList] = useState([]);

    // const displayInfo = () => {
    //     console.log(name + age + country + position + wage);
    // };

    const addEmployee = () => {
        axios.post('http://localhost:3001/create', { ...form }).then(() => {
            setEmployeeList(
                ...[
                    employeeList,
                    {
                        ...form,
                    },
                ]
            );
        });
    };
    const updateEmployee = () => {
        axios.put('http://localhost:3001/update', { ...form }).then(() => {
            let _data = employeeList.map((e) => {
                if (e.id == form.id) {
                    return { ...form };
                } else {
                    return e;
                }
            });
            setEmployeeList(_data);
            setForm({ ...data });
        });
    };
    const getEmployees = () => {
        axios.get('http://localhost:3001/employees').then((response) => {
            let data = response.data.map((d) => ({ ...d, status: 0 }));
            setEmployeeList(data);
        });
    };
    const handleUpdate = (value) => {
        setForm({ ...value });
    };
    const handleChange = (e) => {
        setForm((p) => {
            return { ...p, [e.target.name]: e.target.value };
        });
    };
    const handledelete = (value) => {
        // console.log('ddddd', value);

        axios.delete(`http://localhost:3001/delete/${value.id}`, { id: value.id }).then((response) => {
            // console.log('+++++++', this.state);
            //axios.delete(`http://localhost:3001/delete/${value.id}`, { id: value.id }) bản chất là nó xóa trên database xong từ then trở đi thì có nhiệm vụ xóa trên clients
            console.log('====', employeeList); // trc lúc xóa có bao nhiêu phần tử thì employeeList chính là danh sách trc khi xóa
            console.log('------', value);
            setEmployeeList(
                employeeList.filter((val) => {
                    // ham filter dung de loai 1 phan tu trong mang
                    // console.log(val);
                    // console.log(val.id != value.id);
                    return val.id != value.id;
                })
            );
        });
    };
    return (
        <div className="App">
            <div className="information">
                <label>Name: </label>
                <input type="text" value={form.name} name="name" onChange={handleChange} />
                <label>Age: </label>
                <input type="number" value={form.age} name="age" onChange={handleChange} />
                <label>Country: </label>
                <input type="text" value={form.country} name="country" onChange={handleChange} />
                <label>Position: </label>
                <input type="text" value={form.position} name="position" onChange={handleChange} />
                <label>Wage (year): </label>
                <input type="number" value={form.wage} name="wage" onChange={handleChange} />
                <button onClick={addEmployee}>Add Employee </button>
            </div>
            --------------------------------------------------------------------------------------------------------
            <div className="employees">
                <button onClick={getEmployees}>Show Employee</button>
                {employeeList.map((value, index) => {
                    return (
                        <div className="employee" key={index}>
                            <h3>Name: {value.name}</h3>
                            <h3>Age: {value.age}</h3>
                            <h3>Country: {value.country}</h3>
                            <h3>Position: {value.position}</h3>
                            <h3>Wage: {value.wage}</h3>
                            {value.status == 0 ? (
                                <button
                                    className="update-delete"
                                    onClick={() => {
                                        let data = employeeList.map((e) => {
                                            if (e.id == value.id) {
                                                return { ...e, status: 1 };
                                            } else {
                                                return e;
                                            }
                                        });
                                        setEmployeeList(data);
                                        handleUpdate(value);
                                    }}
                                >
                                    Sửa
                                </button>
                            ) : (
                                <button
                                    className="update-delete"
                                    onClick={() => {
                                        updateEmployee();
                                        let data = employeeList.map((e) => {
                                            if (e.id == form.id) {
                                                return { ...form, status: 0 };
                                            } else {
                                                return e;
                                            }
                                        });
                                        setEmployeeList(data);
                                    }}
                                >
                                    Luu
                                </button>
                            )}

                            <button
                                className="update-delete"
                                onClick={() => {
                                    handledelete(value);
                                }}
                            >
                                Xóa
                            </button>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default App;
