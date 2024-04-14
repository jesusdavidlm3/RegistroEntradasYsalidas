import { useNavigate } from 'react-router-dom'
import { TextField, Button } from '@mui/material'
import { addDoc, collection } from 'firebase/firestore'
import { useState } from 'react'
import successLogo from '../img/success.png'
import { db } from '../../firebase'

const Register = () => {

    const navigate = useNavigate()
    const [success, setSuccess] = useState(true);
    const date = new Date()

    async function handleSubmit(e){
        e.preventDefault();
        const nombre = e.target[0].value;
        const id = e.target[2].value;

        const docref = await addDoc(collection(db, "usuarios"),{
            nombre: nombre,
            id: id,
            status: false,
        })
        if(docref != null){
            setSuccess(false)
            const reportRef = await addDoc(collection(db, "reportes"), {
                reporte: `Se ha registrado a  ${nombre} como trabajador el ${date.toLocaleDateString()} a las ${date.toLocaleTimeString()}`,
                date: date,
            })
        }
    }

    return(
        <div className="Register">
            { success ? (<>
                <h4 onClick={() => navigate('/Check')}>Volver a la aplicacion</h4>
                <form onSubmit={handleSubmit}>
                    <h1>Registrate aqui</h1>
                    <TextField label='Nombre Completo'/>
                    <TextField label='Identificacion'/>
                    <Button variant='contained' type='submit'>registrar</Button>
                </form>
            </>):(<>
                <img src={successLogo}/>
                <h2>Registro exitoso</h2>
                <Button variant='contained' onClick={() => navigate('/Check')}>Volver</Button>
            </>) }
            
        </div>
    )
}

export default Register;