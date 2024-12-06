import { Link } from "react-router-dom";
import Navbar from "../../components/navbar/navbar.jsx";
import { useState } from "react";
import api from "../../constants/api.js";

function PatientAdd() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await api.post('/users/register', { name, email, password });
            alert('Usuário cadastrado com sucesso!');
        } catch (error) {
            alert('Erro ao cadastrar usuário');
        }
        
    };

    return (
        <div className="container container-fluid mt-page">
            <Navbar />
        <div className="container mt-5">
            <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap">
            <h2 className="mb-3">Cadastrar Pacientes</h2>
            <Link to="/patients" className="btn btn-outline-primary mb-3">
                Voltar
            </Link>
        </div>
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
                    <label className="form-label">E-mail</label>
                    <input
                        type="email"
                        className="form-control"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Senha</label>
                    <input
                        type="password"
                        className="form-control"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button type="submit" className="btn btn-primary">
                    Cadastrar
                </button>
            </form>
        </div>
        </div>
    );
}

export default PatientAdd;
