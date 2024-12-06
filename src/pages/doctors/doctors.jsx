import "./doctors.css";
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import "./doctors.css";
import { useEffect, useState } from "react";
import api from "../../constants/api.js";
import Navbar from "../../components/navbar/navbar.jsx";
import { Link } from "react-router-dom";

function Doctors() {
        
        const [doctors, setDoctors] = useState([]);
        const [search, setSearch] = useState('');
    
        const fetchDoctors = async () => {
            try {
                const response = await api.get('/doctors', { params: { name: search } });
                setDoctors(response.data);
            } catch (error) {
                alert('Erro ao carregar médicos');
            }
        };
    
        useEffect(() => {
            fetchDoctors();
        }, [ search ]);

    return (
        <div className="container container-fluid mt-page">
        <Navbar />
        <div className="container mt-5">
        <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap">
            <h2 className="mb-3">Lista de Médicos</h2>
            <Link to="/doctors/add" className="btn btn-outline-primary mb-3">
                Novo Médico
            </Link>
        </div>
            <div className="mb-3">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Pesquisar por nome..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>
            <table className="table table-hover">
                <thead>
                    <tr>
                        {/* <th>ID</th> */}
                        <th>Nome</th>
                        <th>Especialidade</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {doctors.map((doctor) => (
                        <tr key={doctor.id}>
                            {/* <td>{doctor.id}</td> */}
                            <td>{doctor.name}</td>
                            <td>{doctor.specialty}</td>
                            <td>
                                <button className="btn btn-warning btn-sm me-2">Editar</button>
                                <button className="btn btn-danger btn-sm">Excluir</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>
)}

export default Doctors;