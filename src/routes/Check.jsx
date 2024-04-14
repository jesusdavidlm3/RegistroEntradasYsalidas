import { Button } from '@mui/material'
import Reporte from '../components/Reporte'
import Marcar from '../components/Marcar'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Check = () => {

    const navigate = useNavigate()
    const [show, setShow] = useState(true) 

    return(
        <div className="Check">
            <h4 onClick={() => navigate('/Register')}>Registrate aqui</h4>
            <div className='Buttons'>
                <Button variant='contained' onClick={() => setShow(true)}>Check</Button>
                <Button variant='contained' onClick={() => setShow(false)}>Reportes</Button>
            </div>
            <div className='Content'>
                { show ? (<Marcar/>):(<Reporte/>) }
            </div>
        </div>
    )
}

export default Check;