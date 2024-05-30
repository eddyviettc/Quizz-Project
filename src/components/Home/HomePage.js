import videoHomepage from '../../assets/videoHomepage.mp4'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
const HomePage = () => {

    const isAuthenticated = useSelector(state => state.user.isAuthenticated)
    const navigate = useNavigate()

    return (
        <div className="homepage-container">
            <video autoPlay loop muted >
                <source
                    src={videoHomepage}
                    type="video/mp4"
                />
            </video>
            <div className='homepage-content'>
                <div className='title-1'>At this point, you pretty much out of my mind</div>
                <div className='title-2'>but when i close my eyes i think about you everytime</div>
                <div className='title-3'>
                    {isAuthenticated === false ?
                        <button onClick={() => navigate('/login')} >Get's started free</button>

                        :
                        <button onClick={() => navigate('/users')}>Doing quiz now</button>

                    }
                </div>
            </div>
        </div>
    )
}

export default HomePage