import { useEffect, useState } from "react";
import { collection, getDocs, doc, updateDoc, addDoc } from 'firebase/firestore'
import { db } from "../../firebase";
import { Button } from '@mui/material'

const Marcar = () => {

    let staff = []
    const [show, setShow] = useState([])
    const date = new Date()

    async function getStaff(){
        const querySnapshot = await getDocs(collection(db, 'usuarios'));
        querySnapshot.forEach((doc) => {
            staff = [...staff, {data: doc.data(), id: doc.id}]
        });
        setShow(staff)
    }

    useEffect(() => {
        getStaff()
    }, [])

    async function activate(docId, name){
        const docRef = doc(db, "usuarios", docId);
        await updateDoc(docRef, {
        status: true
        });
        const reportRef = await addDoc(collection(db, "reportes"), {
            reporte: `${name} salio de trabajar el ${date.toLocaleDateString()} a las ${date.toLocaleTimeString()}`,
            date: date
        })
        getStaff()
    }

    async function disable(docId, name){
        const docRef = doc(db, "usuarios", docId);
        await updateDoc(docRef, {
        status: false
        });
        const reportRef = await addDoc(collection(db, "reportes"), {
            reporte: `${name} entro a trabajar el ${date.toLocaleDateString()} a las ${date.toLocaleTimeString()}`,
            date: date,
        })
        getStaff()
    }

    return(
        <div className="Marcar">
            <h1>Entradas / Salidas</h1>
            <div className="Box">
                { show.map((person) => (
                    <div className="StaffContainer" key={person.id}>
                        <div className="info">
                            <h3>{person.data.nombre}</h3>
                            <h3>{person.data.id}</h3>
                        </div>
                        { person.data.status ? (
                            <Button variant='contained' onClick={() => disable(person.id, person.data.nombre)}>Entrada</Button>
                        ):(
                            <Button variant='contained' color='error' onClick={()=> activate(person.id, person.data.nombre)}>Salida</Button>
                        ) }
                    </div>
                )) }
            </div>
        </div>
    )
}

export default Marcar;