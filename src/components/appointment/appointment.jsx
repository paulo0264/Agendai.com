
function Appointment(props) {

    //2024-11-15T08:30:00
    const dt = new Date(props.booking_date + "T" + props.booking_hour);

    return <tr>
        <td>{props.user}</td>
        <td>{props.doctor}</td>
        <td>{props.service}</td>
        <td>{
            new Intl.DateTimeFormat('pt-BR', { dateStyle: 'short' }).format(dt)
        } - {props.booking_hour}h</td>
        <td className="text-end">{
            new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(props.price)
        }</td>
        <td className="text-end">
            <div className="d-inline me-3">
                <button onClick={() => props.clickEdit(props.id_appointment)}
                    className="btn btn-sm btn-primary">
                    <i className="bi bi-pencil-square"></i>
                </button>
            </div>

            <button onClick={() => props.clickDelete(props.id_appointment)}
                className="btn btn-sm btn-danger">
                <i className="bi bi-trash"></i>
            </button>

        </td>
    </tr>
}

export default Appointment;