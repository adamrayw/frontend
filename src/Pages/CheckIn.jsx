import 'mapbox-gl/dist/mapbox-gl.css'
import Map from "../Components/BottomNav/Map";
import { useRef, useState } from 'react';
import Webcam from 'react-webcam';
import { Link, useNavigate } from 'react-router-dom';

function CheckIn() {
    const webcamRef = useRef(null);
    const [showCamera, setShowCamera] = useState(false);
    const [capturedImage, setCapturedImage] = useState(null);
    const [modeSelfie, setModeSelfie] = useState(false);

    const navigate = useNavigate();

    const date = new Date(); // Replace with your desired date

    const day = date.getDate();
    const month = new Intl.DateTimeFormat('en-US', { month: 'long' }).format(date);
    const year = date.getFullYear();

    const formattedDate = `${day} ${month} ${year}`;

    const time = new Date(); // Current date and time

    const hours = time.getHours().toString().padStart(2, '0');
    const minutes = time.getMinutes().toString().padStart(2, '0');
    const seconds = time.getSeconds().toString().padStart(2, '0');

    const formattedTime = `${hours}:${minutes}:${seconds}`;

    const sumbitCheckIn = () => {
        // Replace with your API call
        navigate('/check-in-success')
    }

    return (
        <div className='relative h-full mb-96'>
            <div className="check-in-header flex items-center justify-between shadow">
                <div className="back-icon">
                    <Link to='/dashboard'>
                        <svg
                            fill="currentColor"
                            viewBox="0 0 16 16"
                            width='3em'
                        >
                            <path
                                fillRule="evenodd"
                                d="M12 8a.5.5 0 01-.5.5H5.707l2.147 2.146a.5.5 0 01-.708.708l-3-3a.5.5 0 010-.708l3-3a.5.5 0 11.708.708L5.707 7.5H11.5a.5.5 0 01.5.5z"
                            />
                        </svg>
                    </Link>
                </div>
                <div className="check-in-title">
                    <h1 className="font-semibold text-2xl">Absen</h1>
                </div>
                <div className="check-in-history">
                    <svg
                        viewBox="0 0 1024 1024"
                        fill="currentColor"
                        width="2em"
                        className="mr-2"
                    >
                        <path d="M536.1 273H488c-4.4 0-8 3.6-8 8v275.3c0 2.6 1.2 5 3.3 6.5l165.3 120.7c3.6 2.6 8.6 1.9 11.2-1.7l28.6-39c2.7-3.7 1.9-8.7-1.7-11.2L544.1 528.5V281c0-4.4-3.6-8-8-8zm219.8 75.2l156.8 38.3c5 1.2 9.9-2.6 9.9-7.7l.8-161.5c0-6.7-7.7-10.5-12.9-6.3L752.9 334.1a8 8 0 003 14.1zm167.7 301.1l-56.7-19.5a8 8 0 00-10.1 4.8c-1.9 5.1-3.9 10.1-6 15.1-17.8 42.1-43.3 80-75.9 112.5a353 353 0 01-112.5 75.9 352.18 352.18 0 01-137.7 27.8c-47.8 0-94.1-9.3-137.7-27.8a353 353 0 01-112.5-75.9c-32.5-32.5-58-70.4-75.9-112.5A353.44 353.44 0 01171 512c0-47.8 9.3-94.2 27.8-137.8 17.8-42.1 43.3-80 75.9-112.5a353 353 0 01112.5-75.9C430.6 167.3 477 158 524.8 158s94.1 9.3 137.7 27.8A353 353 0 01775 261.7c10.2 10.3 19.8 21 28.6 32.3l59.8-46.8C784.7 146.6 662.2 81.9 524.6 82 285 82.1 92.6 276.7 95 516.4 97.4 751.9 288.9 942 524.8 942c185.5 0 343.5-117.6 403.7-282.3 1.5-4.2-.7-8.9-4.9-10.4z" />
                    </svg>
                </div>
            </div>
            <div className="check-in-content h-screen">
                <div style={{ width: '100%', height: '200px' }}>
                    <Map />
                </div>
                <div className='p-4'>
                    <div className="date-operation mt-36">
                        <div className="date-operation-title text-center">
                            <h2 className="font-semibold">Untuk: {formattedDate}</h2>
                            <h1 className="time text-4xl font-bold">{formattedTime}</h1>
                        </div>
                    </div>
                    {capturedImage && (
                        <div className='mt-6'>
                            <h2>Gambar yang diambil:</h2>
                            <img src={capturedImage} className='w-full' alt="Captured" />
                        </div>
                    )}
                    <div className="camera-absen flex flex-col mt-10 text-white">
                        <button
                            className="bg-orange-400 hover:bg-orange-500 active:bg-orange-600 transition 600 w-full flex items-center justify-center py-2 rounded-full font-semibold text-lg"
                            onClick={() => {
                                setShowCamera(true);
                                setCapturedImage(null);
                            }}
                        >
                            <svg
                                viewBox="0 0 1024 1024"
                                fill="currentColor"
                                height="1.5em"
                                width="1.5em"
                                className="mr-2"
                            >
                                <path d="M864 260H728l-32.4-90.8a32.07 32.07 0 00-30.2-21.2H358.6c-13.5 0-25.6 8.5-30.1 21.2L296 260H160c-44.2 0-80 35.8-80 80v456c0 44.2 35.8 80 80 80h704c44.2 0 80-35.8 80-80V340c0-44.2-35.8-80-80-80zM512 716c-88.4 0-160-71.6-160-160s71.6-160 160-160 160 71.6 160 160-71.6 160-160 160zm-96-160a96 96 0 10192 0 96 96 0 10-192 0z" fill="#7F4301" />
                            </svg>
                            Absen
                        </button>
                    </div>
                </div>
            </div>
            {showCamera && (
                <div className='fixed w-full top-0 z-10 inset-0 flex items-center justify-center bg-black/30 backdrop-opacity-10 backdrop-invert'>
                    <div className='absolute z-20 w-full px-8 max-w-xl h-1/2 top-0 left-1/2 mt-10 transform -translate-x-1/2'>
                        <div className='flex justify-between'>
                            <button
                                className='text-white'
                                onClick={() => {
                                    setShowCamera(false)
                                }}
                            >
                                <svg fill="none" viewBox="0 0 24 24" height="2em" width="2em">
                                    <path
                                        fill="currentColor"
                                        d="M6.225 4.811a1 1 0 00-1.414 1.414L10.586 12 4.81 17.775a1 1 0 101.414 1.414L12 13.414l5.775 5.775a1 1 0 001.414-1.414L13.414 12l5.775-5.775a1 1 0 00-1.414-1.414L12 10.586 6.225 4.81z"
                                    />
                                </svg>
                            </button>
                            <button>
                                <svg
                                    viewBox="0 0 512 512"
                                    fill="currentColor"
                                    height="2em"
                                    width="2em"
                                    className='text-white'
                                    onClick={() => {
                                        setModeSelfie(!modeSelfie)
                                    }}
                                >
                                    <path d="M456 144h-83c-3 0-6.72-1.94-9.62-5l-27.31-42.79C326 80 320 80 302 80h-92c-18 0-23 0-34.07 16.21L148.62 139c-2.22 2.42-5.34 5-8.62 5v-16a8 8 0 00-8-8H92a8 8 0 00-8 8v16H56a24 24 0 00-24 24v240a24 24 0 0024 24h400a24 24 0 0024-24V168a24 24 0 00-24-24zM256 368c-47.82 0-87.76-34.23-95-80h-43.63L176 229.37 234.63 288H194a64.07 64.07 0 00102.63 33.49L320 343l-3.68 3.72A96.64 96.64 0 01256 368zm80-53.84L277.11 256H318a64.26 64.26 0 00-103-33.36L192 200l3.14-2.45A96.19 96.19 0 01255.76 176c47.85 0 87 34.19 94.24 80h44.92z" />
                                </svg>
                            </button>
                        </div>
                        <Webcam
                            audio={false}
                            videoConstraints={
                                (modeSelfie ? { facingMode: "user" } : { facingMode: { exact: "environment" } })
                            }
                            ref={webcamRef}
                            className='rounded-t-xl'

                        >


                        </Webcam>
                        <button
                            className="bg-orange-400 hover:bg-orange-500 active:bg-orange-600 transition 600 w-full flex items-center justify-center py-2 rounded-b-xl font-semibold text-lg"
                            onClick={() => {
                                const imageSrc = webcamRef.current.getScreenshot();
                                setCapturedImage(imageSrc);
                                setShowCamera(false);
                                sumbitCheckIn();
                            }}
                        >
                            Ambil Foto
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default CheckIn