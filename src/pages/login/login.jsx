import { Link, useNavigate } from "react-router-dom";
import "./login.css";
import logo from "../../assets/logo1.png";
import fundo from "../../assets/fundo.png";
import { useState } from "react";
import api from "../../constants/api.js";

function Login() {

    const navigate = useNavigate();
    const [email, setEmail] = useState("heber@admin.com.br");
    const [password, setPassword] = useState("12345");
    const [msg, setMsg] = useState("");


    async function ExecuteLogin() {

        setMsg("");

        try {
            const response = await api.post("/admin/login", {
                email,
                password
            });

            if (response.data) {
                localStorage.setItem("sessionToken", response.data.token);
                localStorage.setItem("sessionId", response.data.id_admin);
                localStorage.setItem("sessionEmail", response.data.email);
                localStorage.setItem("sessionName", response.data.name);
                api.defaults.headers.common['Authorization'] = "Bearer " + response.data.token;
                navigate("/appointments");

            } else
                setMsg("Erro ao efetutar login. Tente novamente mais tarde.");

        } catch (error) {
            if (error.response?.data.error)
                setMsg(error.response?.data.error);
            else
                setMsg("Erro ao efetutar login. Tente novamente mais tarde.");

            //    console.log(error);
        }

    }

    return <div className="row">
        <div className="col-sm-5 d-flex justify-content-center align-items-center text-center">

            <form className="form-signin">
                <div className="logo_logo">
                    <img src={logo} className="logo" />
                </div>
                <h5 className="mb-5">Gerencie seus agendamentos de forma descomplicada.</h5>
                <h5 className="mb-4 text-secondary">Acesse sua conta</h5>

                <div className="mt-4">
                    <input type="email" placeholder="E-mail"
                        className="form-control"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="mt-2">
                    <input type="password" placeholder="Senha"
                        className="form-control"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)} />
                </div>
                <div className="mt-3 mb-5">
                    <button onClick={ExecuteLogin} className="btn btn-primary w-100" type="button">Login</button>
                </div>

                {
                    msg.length > 0 &&
                    <div className="alert alert-danger" role="alert">
                        {msg}
                    </div>
                }


                <div>
                    <span className="me-1">Não tenho uma conta.</span>
                    <Link to="/register">Criar agora!</Link>
                </div>
            </form>
        </div>

        <div className="col-sm-7">
            <img src={fundo} className="background-login" />
        </div>

    </div>
}

export default Login;