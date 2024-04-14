import { useEffect, useState } from "react";
import { collection, getDocs, query, orderBy } from 'firebase/firestore'
import { db } from "../../firebase";

const Reporte = () => {

    let reports = []
    const [show, setShow] = useState([])

    async function getData(){
        const q = query(collection(db, "reportes"), orderBy("date"))
        const querySnapshot = await getDocs(q)

        querySnapshot.forEach((doc) => {
            reports = [...reports, doc.data()]
        })
        setShow(reports)
    }

    useEffect(() => {
        getData()
    }, [])

    return(
        <div className="Reporte">
            <h1>Reportes</h1>
            <div className="reportContainer">
                { show.map((report) => (
                    <h4 key={report.date}>{report.reporte}</h4>
                )) }
            </div>
        </div>
    )
}

export default Reporte;