import "./doctor-add.css";
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import "./doctor-add.css";
import { useState } from "react";
import api from "../../constants/api.js";
import Navbar from "../../components/navbar/navbar.jsx";


function DoctorAdd() {
        
    const [name, setName] = useState('');
    const [specialty, setSpecialty] = useState('');
    const [icon, setIcon] = useState('');


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await api.post('/doctors', { name, specialty, icon });
            alert('Médico cadastrado com sucesso!');
        } catch (error) {
            alert('Erro ao cadastrar médico');
        }
    };

    return (
        <div className="container container-fluid mt-page">
            <Navbar />
            <form onSubmit={handleSubmit} className="mt-3">
                <div className="mb-3">
                    <label className="form-label">Nome</label>
                    <input
                        type="text"
                        className="form-control"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Especialidade</label>
                    <input
                        type="text"
                        className="form-control"
                        value={specialty}
                        onChange={(e) => setSpecialty(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Ícone</label>
                    <input
                        type="text"
                        className="form-control"
                        value={icon}
                        onChange={(e) => setIcon(e.target.value)}
                    />
                </div>
                
                <button type="submit" className="btn btn-primary">Cadastrar</button>
            </form>
        </div>
)}

export default DoctorAdd;