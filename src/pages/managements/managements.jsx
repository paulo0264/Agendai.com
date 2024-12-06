import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../../components/navbar/navbar.jsx";
import { useEffect, useState } from "react";
import { confirmAlert } from "react-confirm-alert";
import api from "../../constants/api.js";

function Management() {

    const navigate = useNavigate();
    const [doctors_services, setDoctorsServices] = useState([]);
    const [search, setSearch] = useState('');

    function ClickDelete(id_doctor_service) {
        confirmAlert({
            title: "Excluir...",
            message: "Confirma exclusão desse agendamento?",
            buttons: [
                {
                    label: "Sim",
                    onClick: () => DeleteDoctorsServices(id_doctor_service),
                },
                {
                    label: "Não",
                    onClick: () => {},
                },
            ],
        });
    }

    async function LoadDoctorsServices() {
        try {
            const response = await api.get("/admin/managements", { params: { description: search } });
            if (response.status === 200) {
                setDoctorsServices(response.data);
            }
        } catch (error) {
            alert("Erro ao carregar dados. Tente novamente mais tarde.");
        }
    }

    async function DeleteDoctorsServices(id) {
        try {
            // Realiza a requisição DELETE para o endpoint da API
            const response = await api.delete("/admin/managements/" + id);
    
            // Verifica se a resposta contém dados
            if (response.data) {
                // Recarrega os serviços dos médicos
                LoadDoctorsServices();
            } else {
                console.error("Nenhuma resposta válida foi recebida.");
            }
        } catch (error) {
            // Verifica se há uma resposta de erro do servidor
            if (error.response?.data?.error) {
                if (error.response.status === 401) {
                    console.warn("Usuário não autorizado, redirecionando...");
                    return navigate("/"); // Certifique-se de que navigate está funcionando
                }
    
                alert(error.response.data.error);
            } else {
                // Mensagem genérica para erros inesperados
                alert("Erro ao excluir dados.");
            }
    
            // Loga detalhes do erro no console para depuração
            console.error("Erro ao excluir serviço:", error);
        }
    }
    

    useEffect(() => {
        LoadDoctorsServices();
    }, [search]);

    return (
        <div className="container container-fluid mt-page">
            <Navbar />
            <div className="container mt-5">
                <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap">
                    <h2 className="mb-3">Gerenciar Médicos</h2>
                    <Link to="/managements/add" className="btn btn-outline-primary mb-3">
                        Gerenciar Novo Médico
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
                <div className="table-responsive">
                    <table className="table-responsive table table-hover">
                        <thead>
                            <tr>
                                <th scope="col">Doutor</th>
                                <th scope="col">Serviço</th>
                                <th scope="col">Preço</th>
                                <th scope="col">Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {doctors_services.map((doctor_service) => (
                                <tr key={doctor_service.id_doctor_service}>
                                    <td>{doctor_service.doctor}</td>
                                    <td>{doctor_service.service}</td>
                                    <td>{doctor_service.price}</td>
                                    <td className="text-text-sm-start">
                                        <div className="d-inline me-3">
                                            <button onClick={() => ClickEdit()}
                                                className="btn btn-sm btn-primary">
                                                <i className="bi bi-pencil-square"></i>
                                            </button>
                                        </div>
                                        <button
                                            onClick={() => ClickDelete(doctor_service.id_doctor_service)}
                                            className="btn btn-sm btn-danger"
                                        >
                                            <i className="bi bi-trash"></i>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default Management;
