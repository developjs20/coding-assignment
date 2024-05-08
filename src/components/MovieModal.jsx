import Modal from 'react-modal';
import YouTubePlayer from './YoutubePlayer';
import { ReactComponent as CloseIcon } from '../assets/close.svg';
import '../styles/movieModal.scss'

const MovieModal = ({ videoKey, isOpen, onRequestClose }) => {
    const customStyles = {
        overlay: {
            backgroundColor: 'rgb(17, 17, 17, 0.75)'
        },
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            padding: '10px'
        },
    };
    return (
        <Modal isOpen={isOpen} onRequestClose={onRequestClose} style={customStyles}>
            <div class="modal-content">
                <button className="close-button" onClick={onRequestClose}><CloseIcon /></button>
                {videoKey ? (
                    <YouTubePlayer
                        videoKey={videoKey}
                    />
                ) : (
                    isOpen ? (<div className="no-video-wrapper"><h6>no trailer available. Try another movie</h6></div>) : null
                )}
            </div>
        </Modal>
    )
};

export default MovieModal;
