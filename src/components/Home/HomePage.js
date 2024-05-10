import videoHomepage from '../../assets/videoHomepage.mp4'

const HomePage = () => {
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