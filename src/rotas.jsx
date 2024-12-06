import { BrowserRouter, Route, Routes } from "react-router-dom";

import Login from "./pages/login/login.jsx";
import Register from "./pages/register/register.jsx";
import Appointments from "./pages/appointments/appointments.jsx";
import AppointmentAdd from "./pages/appointment-add/appointment-add.jsx";
import Doctors from "./pages/doctors/doctors.jsx";
import DoctorAdd from "./pages/doctor-add/doctor-add.jsx";
import Patients from "./pages/patients/patients.jsx";
import PatientAdd from "./pages/patient-add/patient-add.jsx";
import Servic from "./pages/servicess/servic.jsx";
import Managements from "./pages/managements/managements.jsx";
import ManagementAdd from "./pages/management-add/management-add.jsx";

function Rotas() {
    return <BrowserRouter>
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/appointments" element={<Appointments />} />
            <Route path="/appointments/add" element={<AppointmentAdd />} />
            <Route path="/appointments/edit/:id_appointment" element={<AppointmentAdd />} />
            <Route path="/doctors" element={<Doctors />} />
            <Route path="/doctors/add" element={<DoctorAdd />} />
            <Route path="/patients" element={<Patients />} />
            <Route path="/patients/add" element={<PatientAdd />} />
            <Route path="/servic" element={<Servic/>} />
            <Route path="/admin/managements" element={<Managements />} />
            <Route path="/admin/managements/:id_doctor_service" element={<Managements />} />
            {/* <Route path="/managements/delete/:id_management" element={<Managements />} /> */}
            <Route path="/managements/add" element={<ManagementAdd />} />
        </Routes>
    </BrowserRouter>
}

export default Rotas;