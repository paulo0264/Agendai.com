import { Link, useNavigate, useParams } from "react-router-dom";
import Navbar from "../../components/navbar/navbar.jsx";
import { useEffect, useState } from "react";
import api from "../../constants/api.js";

function AppointmentAdd() {

    const navigate = useNavigate();
    const { id_appointment } = useParams();
    const [users, setUsers] = useState([]);
    const [doctors, setDoctors] = useState([]);
    const [services, setServices] = useState([]);

    const [idUser, setIdUser] = useState("");
    const [idDoctor, setIdDoctor] = useState("");
    const [idService, setIdService] = useState("");
    const [bookingDate, setBookingDate] = useState("");
    const [bookingHour, setBookingHour] = useState("");

    async function LoadUsers() {
        try {
            const response = await api.get("/admin/users");

            if (response.data) {
                setUsers(response.data);
            }

        } catch (error) {
            if (error.response?.data.error) {
                if (error.response.status == 401)
                    return navigate("/");

                alert(error.response?.data.error);
            }
            else
                alert("Erro ao listar pacientes");
        }
    }

    async function LoadDoctors() {

        try {
            const response = await api.get("/doctors");

            if (response.data) {
                setDoctors(response.data);

                // Se for modo alteracao...
                if (id_appointment > 0)
                    LoadAppointment(id_appointment);
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

    async function LoadAppointment(id) {

        try {
            const response = await api.get("/admin/appointments/" + id);

            if (response.data) {
                setIdUser(response.data.id_user);
                setIdDoctor(response.data.id_doctor);
                setIdService(response.data.id_service);
                setBookingDate(response.data.booking_date);
                setBookingHour(response.data.booking_hour);
            }

        } catch (error) {
            if (error.response?.data.error) {
                if (error.response.status == 401)
                    return navigate("/");

                alert(error.response?.data.error);
            }
            else
                alert("Erro ao listar serviços");
        }
    }

    async function LoadServices(id) {

        if (!id)
            return;

        try {
            const response = await api.get("/doctors/" + id + "/services");

            if (response.data) {
                setServices(response.data);
            }

        } catch (error) {
            if (error.response?.data.error) {
                if (error.response.status == 401)
                    return navigate("/");

                alert(error.response?.data.error);
            }
            else
                alert("Erro ao listar serviços");
        }
    }

    async function SaveAppointment() {

        const json = {
            id_user: idUser,
            id_doctor: idDoctor,
            id_service: idService,
            booking_date: bookingDate,
            booking_hour: bookingHour
        };

        try {
            const response = id_appointment > 0 ?
                await api.put("/admin/appointments/" + id_appointment, json)
                :
                await api.post("/admin/appointments", json);

            if (response.data) {
                navigate("/appointments");
            }

        } catch (error) {
            if (error.response?.data.error) {
                if (error.response.status == 401)
                    return navigate("/");

                alert(error.response?.data.error);
            }
            else
                alert("Erro ao salvar dados");
        }
    }

    useEffect(() => {
        LoadUsers();
        LoadDoctors();

    }, []);

    useEffect(() => {
        LoadServices(idDoctor);
    }, [idDoctor]);

    return <>
        <Navbar />

        <div className="container-fluid mt-page">
            <div className="row col-lg-4 offset-lg-4">
                <div className="col-12 mt-2">
                    <h2>
                        {
                            id_appointment > 0 ? "Editar Agendamento" : "Novo Agendamento"
                        }
                    </h2>
                </div>

                <div className="col-12 mt-4">
                    <label htmlFor="user" className="form-label">Paciente</label>
                    <div className="form-control mb-2">
                        <select name="user" id="user"
                            value={idUser} onChange={(e) => setIdUser(e.target.value)} >
                            <option value="0">Selecione o paciente</option>

                            {
                                users.map(u => {
                                    return <option key={u.id_user} value={u.id_user}>{u.name}</option>
                                })}

                        </select>
                    </div>
                </div>

                <div className="col-12 mt-4">
                    <label htmlFor="doctor" className="form-label">Médico</label>
                    <div className="form-control mb-2">
                        <select name="doctor" id="doctor"
                            value={idDoctor} onChange={(e) => setIdDoctor(e.target.value)} >
                            <option value="0">Selecione o médico</option>

                            {doctors.map(d => {
                                return <option key={d.id_doctor} value={d.id_doctor}>{d.name}</option>
                            })}

                        </select>
                    </div>
                </div>

                <div className="col-12 mt-3">
                    <label htmlFor="service" className="form-label">Serviço</label>
                    <div className="form-control mb-2">
                        <select name="service" id="service"
                            value={idService} onChange={(e) => setIdService(e.target.value)} >
                            <option value="0">Selecione o serviço</option>

                            {services.map(s => {
                                return <option key={s.id_service}
                                    value={s.id_service}>{s.description}</option>
                            })}

                        </select>
                    </div>
                </div>

                <div className="col-6 mt-3">
                    <label htmlFor="bookingDate" className="form-label">Data</label>
                    <input type="date" className="form-control" name="bookingDate" id="bookingDate"
                        value={bookingDate} onChange={(e) => setBookingDate(e.target.value)} />
                </div>

                <div className="col-6 mt-3">
                    <label htmlFor="bookingHour" className="form-label">Horário</label>
                    <div className="form-control mb-2">
                        <select name="bookingHour" id="bookingHour"
                            value={bookingHour} onChange={(e) => setBookingHour(e.target.value)} >
                            <option value="00:00">Horário</option>
                            <option value="08:00">08:00</option>
                            <option value="09:00">09:00</option>
                            <option value="09:30">09:30</option>
                            <option value="10:00">10:00</option>
                            <option value="10:30">10:30</option>
                            <option value="11:00">11:00</option>
                        </select>
                    </div>
                </div>

                <div className="col-12 mt-4">
                    <div className="d-flex justify-content-end">
                        <Link to="/appointments"
                            className="btn btn-outline-primary me-3">
                            Cancelar
                        </Link>
                        <button onClick={SaveAppointment} className="btn btn-primary" type="button">
                            Salvar Dados
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </>
}

export default AppointmentAdd;