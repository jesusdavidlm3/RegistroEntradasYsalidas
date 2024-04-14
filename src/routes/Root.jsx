import { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'

const Root = () => {

    const navigate = useNavigate()
    useEffect(() => navigate('/Check'), [])

    return(
        <div className="Root">
            <Outlet/>
        </div>
    )
}

export default Root;