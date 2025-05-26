import { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'

function UserProtectedWrapper({ children }) {


    const token = localStorage.getItem('token')
    const navigate = useNavigate()

    const { setAuthUser, connectSocket, axios } = useContext(AuthContext)
    const [isLoading, setIsLoading] = useState(true)

    const checkAuth = async () => {
        try {
            const { data } = await axios.get("/api/auth/check")

            if (data.success) {
                setIsLoading(false)
                setAuthUser(data.user)
                connectSocket(data.user)
            }

        } catch (error) {
            toast.error(error.message)
        }
    }

    useEffect(async () => {
        if (!token) {
            navigate('/login')
        }
        axios.defaults.headers.common['token'] = token;

        checkAuth()

    }, [token])

    if (isLoading) {
        return (
            <>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                    <div className="loader"></div>
                    <style jsx>{`
          .loader {
            border: 16px solid #f3f3f3;
            border-radius: 50%;
            border-top: 16px solid #3498db;
            width: 120px;
            height: 120px;
            animation: spin 2s linear infinite;
          }

          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
                </div>
            </>
        )
    }

    return (
        <>
            {children}
        </>
    )
}

export default UserProtectedWrapper