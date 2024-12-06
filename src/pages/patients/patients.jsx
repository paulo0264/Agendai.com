// import { confirmAlert } from "react-confirm-alert";
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import { useEffect, useState } from "react";
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import "./patients.css";
import api from "../../constants/api.js";
import Navbar from "../../components/navbar/navbar.jsx";
import { Link } from "react-router-dom";


function Patients() {
    // const navigate = useNavigate();
    const [users, setUsers] = useState([]);

    // const navigate = useNavigate();

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await api.get('/admin/users');
                setUsers(response.data);
            } catch (error) {
                alert('Erro ao carregar usuários');
            }
        };

        fetchUsers();
    }, []);

    return (
    <div className="container container-fluid mt-page">
        <Navbar />
        <div className="container mt-5">
        <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap">
            <h2 className="mb-3">Lista de Pacientes</h2>
            <Link to="/patients/add" className="btn btn-outline-primary mb-3">
                Novo Paciente
            </Link>
        </div>
            <div className="table-responsive">
                <table className="table-responsive table table-hover">
                    <thead>
                        <tr>
                            {/* <th>ID</th> */}
                            <th scope="col">Nome</th>
                            <th scope="col">E-mail</th>
                            <th scope="col">Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user.id}>
                                {/* <td>{user.id}</td> */}
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>
                                <button className="btn btn-warning btn-sm me-2">Editar</button>
                                <button className="btn btn-danger btn-sm">Excluir</button>
                                </td>
                                {/* <td>clickDelete={ClickDelete}</td> */}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    </div>
)}

export default Patients;