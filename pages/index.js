import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMicrophone, faVideo, faMicrophoneSlash, faVideoSlash } from '@fortawesome/free-solid-svg-icons';
import { v4 as uuidv4 } from 'uuid';
import { useRouter } from 'next/navigation';
import { useState, useEffect, useRef } from 'react';
import styles from '@/styles/home.module.css';
import dynamic from 'next/dynamic';
const InputField = dynamic(() => import('@/component/InputField'), {
  ssr: false,
})

export default function Home() {
  const router = useRouter();
  const [roomId, setRoomId] = useState('');
  const [localStream, setLocalStream] = useState(null);
  const [isMicrophoneMuted, setIsMicrophoneMuted] = useState(false);
  const [isVideoMuted, setIsVideoMuted] = useState(false);
  const videoRef = useRef(null);
  let Token;
  if (typeof window !== 'undefined') {
    Token = localStorage.getItem('token');

  }

  useEffect(() => {
    startCamera();

    return () => {
      stopCamera();
    };
  }, []);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      setLocalStream(stream);

      if (videoRef.current) {
        videoRef.current.srcObject = stream;

        videoRef.current.addEventListener('loadedmetadata', () => {
          videoRef.current.play().catch(error => console.error('Error playing video:', error));
        });
      }
    } catch (error) {
      console.error('Error accessing camera:', error);
    }
  };

  const stopCamera = () => {
    if (localStream) {
      localStream.getTracks().forEach(track => track.stop());
      setLocalStream(null);
    }
  };

  const toggleMicrophone = () => {
    if (localStream) {
      const audioTracks = localStream.getAudioTracks();
      audioTracks.forEach(track => (track.enabled = !track.enabled));
      setIsMicrophoneMuted(!isMicrophoneMuted);
    }
  };

  const toggleVideo = () => {
    if (localStream) {
      const videoTracks = localStream.getVideoTracks();
      videoTracks.forEach(track => (track.enabled = !track.enabled));
      setIsVideoMuted(!isVideoMuted);
    }
  };

  const createAndJoin = () => {
    if (localStorage.getItem('token') !== null) {
      console.log('create a room');
      const roomId = uuidv4();
      router.push(`/${roomId}`);
    } else {
      router.push('./login');
    }
  };

  const joinRoom = () => {
    if (roomId) {
      router.push(`/${roomId}`);
    } else {
      alert('Please provide a valid room id');
    }
  };

  const navigateToLogin = () => {
    router.push('./login');
  };

  const removeToken = () => {
    localStorage.removeItem('token');
    router.push('./login');
    Token = null;
  }


  return (
    <div className='bg-white h-auto'>
      <div className='flex justify-between'>
        <img src='/google-meet-logo.png' alt='Logo' height={200} width={200} className='m-4' />
        {Token !== null ?
          (
            <button onClick={removeToken} className='text-cyan-500 pr-10'>
              Logout
            </button>) : (<button onClick={navigateToLogin} className='text-cyan-500 pr-10'>
              Login
            </button>)
        }
      </div>
      <div className='flex items-center xl:p-20 gap-20 sm:flex-col xsm:flex-col xsm:ml-8 xsm:mr-8 xl:flex-row xl:ml-20 xl:mr-20'>
        <div className={`${styles.videoContainer} relative`}>
          <div className=' absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-6 z-10'>
            <button onClick={toggleMicrophone}
              style={{
                borderRadius: '100%',
                width: '3rem',
                height: '3rem',
                border: isMicrophoneMuted ? 'none' : '1px solid white',
                padding: '0.5rem',
                backgroundColor: isMicrophoneMuted ? 'red' : 'transparent',
              }}>
              {isMicrophoneMuted ? (
                <FontAwesomeIcon icon={faMicrophoneSlash} size='1x' color='white' />
              ) : (
                <FontAwesomeIcon icon={faMicrophone} size='1x' color='white' />
              )}
            </button>
            <button onClick={toggleVideo}
              style={{
                borderRadius: '100%',
                width: '3rem',
                height: '3rem',
                border: isVideoMuted ? 'none' : '1px solid white',
                padding: '0.5rem',
                backgroundColor: isVideoMuted ? 'red' : 'transparent',
              }}>
              {isVideoMuted ? (
                <FontAwesomeIcon icon={faVideoSlash} size='1x' color='white' />
              ) : (
                <FontAwesomeIcon icon={faVideo} size='1x' color='white' />
              )}
            </button>
          </div>
          <video ref={videoRef} autoPlay muted style={{ width: '750px', height: '440px' }} className='rounded-lg object-cover xsm:w-auto xsm:h-auto' />
          {isVideoMuted && (
            <p className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white'>
              Camera is Off
            </p>
          )}

        </div>
        <div className={styles.homeContainer}>
          <span className='text-3xl font-sans m-6'>Ready to join ?</span>
          <div className={styles.enterRoom}>
            <InputField Token={Token} roomId={roomId} setRoomId={setRoomId} />
            <p className='font-medium m-5'>No one else is here</p>

          </div>
          <div>
            <button onClick={joinRoom}>Join now</button>
            <button onClick={createAndJoin}>Create a new room</button>
          </div>
        </div>
      </div>
    </div>
  );
}
