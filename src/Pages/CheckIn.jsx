/* eslint-disable react-hooks/rules-of-hooks */
import 'mapbox-gl/dist/mapbox-gl.css'
import Map from "../Components/Map/Map";
import { useRef, useState } from 'react';
import Webcam from 'react-webcam';
import { useNavigate } from 'react-router-dom';
import getDate from '../Utils/getDate.utils';
import getTime from '../Utils/getTime.utils';
import { useApiPost } from '../Services/api.service';
import TopNavbar from '../Components/TopNavbar/TopNavbar';

function CheckIn() {
    const webcamRef = useRef(null);
    const [showCamera, setShowCamera] = useState(false);
    const [capturedImage, setCapturedImage] = useState(null);
    const [modeSelfie, setModeSelfie] = useState(false);
    const [childData, setChildData] = useState(null);
    const [isLoadingAbsen, setIsLoadingAbsen] = useState(false);

    const navigate = useNavigate();

    const formattedTime = getTime();
    const formattedDate = getDate();

    const handleChildData = (data) => {
        setChildData(data)
    }

    const userId = JSON.parse(localStorage.getItem('user')).id

    const sumbitCheckIn = async () => {
        const data = {
            userId,
            longitude: childData.longitude,
            latitude: childData.latitude,
            address: childData.address,
            picture: capturedImage,
        }

        try {
            setIsLoadingAbsen(true)
            const response = await useApiPost('checkin', data)
            if (response.response.data.isCheckin === true) {
                alert('Anda sudah melakukan absen hari ini')
            }

            if (response.response.data.message === 'Checkin success') {
                navigate('/check-in-success')
            }
            setIsLoadingAbsen(false)
        } catch (error) {
            console.log(error)
            setIsLoadingAbsen(false)
        }
    }


    return (
        <div className='relative h-full mb-96'>
            <TopNavbar title='Absen' />
            <div className="check-in-content h-screen">
                <div style={{ width: '100%', height: '200px' }}>
                    <Map sendDataToParent={handleChildData} />
                </div>
                <div className='p-4'>
                    <div className="date-operation mt-28">
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
                        {capturedImage ? (
                            <button
                                className="bg-green-400 hover:bg-green-500 active:bg-green-600 transition 600 w-full flex items-center justify-center py-2 rounded-full font-semibold text-lg"
                                onClick={sumbitCheckIn}
                            >
                                {isLoadingAbsen ? 'Mohon Tunggu...' : 'Klik untuk Absen'}
                            </button>

                        ) : (
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
                        )}
                    </div>
                </div>
            </div>
            {
                showCamera && (
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
                                screenshotFormat='image/jpeg'
                                mirrored='false'
                                ref={webcamRef}
                                className='rounded-t-xl' />

                            <button
                                className="bg-orange-400 hover:bg-orange-500 active:bg-orange-600 transition 600 w-full flex items-center justify-center py-2 rounded-b-xl font-semibold text-lg"
                                onClick={() => {
                                    const imageSrc = webcamRef.current.getScreenshot();
                                    setCapturedImage(imageSrc);
                                    setShowCamera(false);
                                }}
                            >
                                Ambil Foto
                            </button>
                        </div>
                    </div>
                )
            }
        </div >
    )
}

export default CheckIn