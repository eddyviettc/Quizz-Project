import videoHomepage from '../../assets/videoHomepage.mp4'
import { useSelector } from 'react-redux'
const HomePage = () => {

    const isAuthenticated = useSelector(state => state.user.isAuthenticated)
    const account = useSelector(state => state.user.account)

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
                    <button>Get's started free</button>
                </div>
            </div>
        </div>
    )
}

export default HomePage