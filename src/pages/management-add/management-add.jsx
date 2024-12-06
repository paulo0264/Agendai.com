import { Link, useNavigate } from "react-router-dom";
import Navbar from "../../components/navbar/navbar.jsx";
import { useEffect, useState } from "react";
import api from "../../constants/api.js";

function ManagementAdd() {

    const navigate = useNavigate();
    // const { id_appointment } = useParams();
    const [doctors, setDoctors] = useState([]);
    const [services, setServices] = useState([]);
    const [price, setPrice] = useState([]);
    

    const [idDoctor, setIdDoctor] = useState("");
    const [idService, setIdService] = useState("");

    async function LoadDoctors() {

        try {
            const response = await api.get("/doctors");

            if (response.data) {
                setDoctors(response.data);

                // Se for modo alteracao...
                // if (id_appointment > 0)
                //     LoadAppointment(id_appointment);
            }

        } catch (error) {
            if (error.response?.data.error) {
                if (error.response.status == 401)
                    // return navigate("/");

                alert(error.response?.data.error);
            }
            else
                alert("Erro ao listar médicos.");
        }
    }


    async function LoadServices() {

        try {
            const response = await api.get("/services");

            if (response.data) {
                setServices(response.data);
            }

        } catch (error) {
            if (error.response?.data.error) {
                if (error.response.status == 401)
                    // return navigate("/");

                alert(error.response?.data.error);
            }
            else
                alert("Erro ao listar serviços");
        }
    }

    useEffect(() => {
        LoadDoctors();
        LoadServices();
    }, []);

    async function SaveManagement() {

        const json = {
            id_doctor: idDoctor,
            id_service: idService,
            price: price
        };

        try {
            const response = await api.post("/admin/managements", json);

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


    return <>
        <Navbar />

        <div className="container-fluid mt-page">
            <div className="row col-lg-4 offset-lg-4">

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
                <div className="mb-3">
                    <label className="form-label">Preço</label>
                    <input
                        type="text"
                        className="form-control"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                    />
                </div>

                <div className="col-12 mt-4">
                    <div className="d-flex justify-content-end">
                        <Link to="/appointments"
                            className="btn btn-outline-primary me-3">
                            Cancelar
                        </Link>
                        <button onClick={SaveManagement} className="btn btn-primary" type="button">
                            Salvar Dados
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </>
}

export default ManagementAdd;