import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import "./services.css";
import Navbar from "../../components/navbar/navbar.jsx";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import api from "../../constants/api.js";


function Services() {

  const [services, setServices] = useState([]);
  const navigate = useNavigate();

  async function LoadServices() {

    try {
        const response = await api.get("/servic");

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

useEffect(() => {
  LoadServices();
}, []);

  // const [services, setServices] = useState([]);

  // useEffect(() => {
  //   const fetchServices = async () => {
  //     try {
  //       const response = await api.get("/service");
  //       setServices(response.data);
  //     } catch (error) {
  //       console.error("Failed to fetch doctor services:", error);
  //     }
  //   };
  //   fetchServices();
  // }, []);


    return (
    <div className="container-fluid mt-page">
      <Navbar />
        <div className="container">
          <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap">
            <h2 className="mb-3">Lista de Srviços</h2>
            <Link to="" className="btn btn-outline-primary mb-3">
                Novo Serviço
            </Link>
          </div>

          <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Doctors Services</h1>
      <table className="table-auto w-full border-collapse border border-gray-300">
        <thead>
          <tr>
            {/* <th className="border border-gray-300 p-2">Service ID</th> */}
            <th className="border border-gray-300 p-2">Description</th>
            <th className="border border-gray-300 p-2">Price</th>
          </tr>
        </thead>
        <tbody>

        
          {services.map((s) => (
            <tr key={s.service}>
              <td className="border border-gray-300 p-2">{s.description}</td>
              {/* <td className="border border-gray-300 p-2">{service.id_description}</td> */}
              <td className="border border-gray-300 p-2">${s.price.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
        </div>
    </div>
)}

export default Services;