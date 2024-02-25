import { v4 as uuidv4 } from 'uuid';
import { useRouter } from 'next/navigation'
import { useState, useEffect, useRef } from 'react';
import logo from '@/public/google-meet-logo.png';

import styles from '@/styles/home.module.css'

export default function Home() {
  const router = useRouter();
  const [roomId, setRoomId] = useState('');
  const [localStream, setLocalStream] = useState(null);
  const videoRef = useRef(null);

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
          videoRef.current.play()
            .catch(error => console.error('Error playing video:', error));
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

  const createAndJoin = () => {
    console.log("create a room");
    const roomId = uuidv4();
    router.push(`/${roomId}`);
  };

  const joinRoom = () => {
    if (roomId) {
      router.push(`/${roomId}`);
    } else {
      alert("Please provide a valid room id");
    }
  };

  return (
    <div className='bg-white h-auto'>
      <img src='/google-meet-logo.png' alt='Logo' height={200} width={200} className=' m-4' />
      <div className=' flex items-center xl:pt-12 xl:p-28 sm:flex-col xsm:flex-col xsm:ml-8 xsm:mr-8 xl:flex-row xl:ml-20 xl:mr-20'>
        <div className={styles.videoContainer}>
          <video ref={videoRef} autoPlay muted playsInline width={650} className=' rounded-lg' />
        </div>
        <div className={styles.homeContainer}>
          {/* <h1>Google Meet Clone</h1> */}
          <span className='text-3xl font-sans m-6'>Ready to join ?</span>
          <div className={styles.enterRoom}>
            <input
              placeholder='Enter Room ID'
              value={roomId}
              onChange={(e) => setRoomId(e?.target?.value)}
            />

            <p className=' font-medium m-5'>No  one else is here</p>

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
