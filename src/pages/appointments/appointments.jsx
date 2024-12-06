import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import "./appointments.css";
import Navbar from "../../components/navbar/navbar.jsx";
import { Link, useNavigate } from "react-router-dom";
import Appointment from "../../components/appointment/appointment.jsx";
import { useEffect, useState } from "react";
import api from "../../constants/api.js";
import { confirmAlert } from "react-confirm-alert";

function Appointments() {

    const navigate = useNavigate();
    const [appointments, setAppointments] = useState([]);
    const [doctors, setDoctors] = useState([]);

    const [idDoctor, setIdDoctor] = useState("");
    const [dtStart, setDtStart] = useState("");
    const [dtEnd, setDtEnd] = useState("");

    function ClickEdit(id_appointment) {
        navigate("/appointments/edit/" + id_appointment);
    }

    function ClickDelete(id_appointment) {
        confirmAlert({
            title: "Exclusão",
            message: "Confirma exclusão desse agendamento?",
            buttons: [
                {
                    label: "Sim",
                    onClick: () => DeleteAppointment(id_appointment)
                },
                {
                    label: "Não",
                    onClick: () => { }
                }
            ]
        });
    }

    async function DeleteAppointment(id) {

        try {
            const response = await api.delete("/appointments/" + id);

            if (response.data) {
                LoadAppointments();
            }

        } catch (error) {
            if (error.response?.data.error) {
                if (error.response.status == 401)
                    return navigate("/");

                alert(error.response?.data.error);
            }
            else
                alert("Erro ao excluir dados");
        }
    }

    async function LoadDoctors() {

        try {
            const response = await api.get("/doctors");

            if (response.data) {
                setDoctors(response.data);
            }

        } catch (error) {
            if (error.response?.data.error) {
                if (error.response.status == 401)
                    return navigate("/");

                alert(error.response?.data.error);
            }
            else
                alert("Erro ao listar médicos.");
        }
    }

    async function LoadAppointments() {

        try {
            const response = await api.get("/admin/appointments", {
                params: {
                    id_doctor: idDoctor,
                    dt_start: dtStart,
                    dt_end: dtEnd
                }
            });

            if (response.data) {
                setAppointments(response.data);
            }

        } catch (error) {
            if (error.response?.data.error) {

                if (error.response.status == 401)
                    return navigate("/");

                alert(error.response?.data.error);
            }
            else
                alert("Erro ao efetutar login. Tente novamente mais tarde.");
        }
    }

    function ChangeDoctor(e) {
        setIdDoctor(e.target.value);
    }

    useEffect(() => {
        LoadDoctors();
        LoadAppointments();
    }, []);

    return <>
    <Navbar />
    <div className="container container-fluid cont">
        <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap">
            <h2 className="mb-3">Agendamentos</h2>
            <Link to="/appointments/add" className="btn btn-outline-primary mb-3">
                Novo Agendamento
            </Link>
        </div>
  
        <div className="row mb-4">
        <div className="col-md-6 col-lg-3 mb-3">
            <label htmlFor="startDate" className="form-label">
            Data Inicial
            </label>
            <input
            id="startDate"
            className="form-control"
            type="date"
            onChange={(e) => setDtStart(e.target.value)}
            />
        </div>
        <div className="col-md-6 col-lg-3 mb-3">
            <label htmlFor="endtDate" className="form-label">
            Data Final
            </label>
            <input
            id="endtDate"
            className="form-control"
            type="date"
            onChange={(e) => setDtEnd(e.target.value)}
            />
        </div>
        <div className="col-md-6 col-lg-3 mb-3">
            <label htmlFor="doctor" className="form-label">
            Médico
            </label>
            <select
            id="doctor"
            className="form-select"
            value={idDoctor}
            onChange={ChangeDoctor}
            >
            <option value="">Todos os médicos</option>
            {doctors.map((doc) => (
                <option key={doc.id_doctor} value={doc.id_doctor}>
                {doc.name}
                </option>
            ))}
            </select>
        </div>
        <div className="col-md-6 col-lg-3 d-flex align-items-end mb-3">
            <button onClick={LoadAppointments} className="btn btn-primary w-100" type="button">
            Filtrar
            </button>
        </div>
        </div>
  
        <div className="table-responsive">
        <table className="table table-hover">
            <thead>
            <tr>
                <th scope="col">Paciente</th>
                <th scope="col">Médico</th>
                <th scope="col">Serviço</th>
                <th scope="col">Data/Hora</th>
                <th scope="col" className="text-end">Valor</th>
                <th scope="col" className="text-end">Ações</th>
            </tr>
            </thead>
            <tbody>
            {appointments.map((ap) => (
                <Appointment
                key={ap.id_appointment}
                id_appointment={ap.id_appointment}
                user={ap.user}
                doctor={ap.doctor}
                service={ap.service}
                booking_date={ap.booking_date}
                booking_hour={ap.booking_hour}
                price={ap.price}
                clickEdit={ClickEdit}
                clickDelete={ClickDelete}
                />
            ))}
            </tbody>
        </table>
        </div>
  </div>
  </>
}

export default Appointments;