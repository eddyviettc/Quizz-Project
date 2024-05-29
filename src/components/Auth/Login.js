import { useState } from 'react'
import './Login.scss'
import { useNavigate } from 'react-router-dom'
import { postLogin } from '../../services/apiService'
import { toast } from 'react-toastify'

const Login = (props) => {
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const navigate = useNavigate()

    const handleLogin = async () => {
        //validate 


        //submit apis
        let data = await postLogin(email, password)
        if (data && data.EC === 0) {
            toast.success(data.EM);
            navigate('/')
        }
        if (data && data.EC !== 0) {
            toast.error(data.EM)
        }
    }
    return (
        <div className="login-container">
            <div className='header'>
                <span>Don't have an account yet?</span>
                <button
                    onClick={() => navigate('/register')}
                >Sign Up</button>
            </div>
            <div className='title col-4 mx-auto'>
                Reverie
            </div>
            <div className='welcome'>
                Hello, who's this
            </div>
            <div className='content-form col-4 mx-auto'>
                <div className='form-group'>
                    <label>Email</label>
                    <input type={"email"}
                        className='form-control '
                        value={email}
                        onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className='form-group'>
                    <label>Password</label>
                    <input type={"password"}
                        className='form-control '
                        value={password}
                        onChange={(e) => setPassword(e.target.value)} />
                </div>
                <span className='forgor-password'>Forgot password?</span>
                <div>
                    <button
                        className='btn-submit'
                        onClick={() => handleLogin()}

                    >Login</button>

                    <div className='text-center'>
                        <span
                            className='back'
                            onClick={() => { navigate('/') }}> &#60;&#60; Go to Homepage</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login