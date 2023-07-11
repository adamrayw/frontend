/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect, useState } from 'react'
import TopNavbar from '../Components/TopNavbar/TopNavbar'
import { useApiGet } from '../Services/api.service'
import Map from '../Components/Map/Map'
import formatTime from '../Utils/formatTime'
import formatDate from '../Utils/formatDate'

function Activity() {
    const [activity, setActivity] = useState([])
    const [loading, setLoading] = useState(false)
    const user = JSON.parse(localStorage.getItem('user'))

    const checkCheckIn = async () => {
        setLoading(true)
        const response = await useApiGet('checkin/get/checkintoday/' + user.id)
        setActivity(response.response.data.data.checkins)
        setLoading(false)
    }

    useEffect(() => {
        checkCheckIn()
    }, [])

    return (
        <div className='relative h-full mb-96'>
            <TopNavbar title='Aktifitas Saya' />
            <div className="check-in-content h-screen">

                {loading ?
                    <div className='flex justify-center items-center h-screen'>
                        <svg
                            viewBox="0 0 1024 1024"
                            fill="currentColor"
                            height="6em"
                            width="6em"
                            className='animate-spin text-orange-500'
                        >
                            <path d="M988 548c-19.9 0-36-16.1-36-36 0-59.4-11.6-117-34.6-171.3a440.45 440.45 0 00-94.3-139.9 437.71 437.71 0 00-139.9-94.3C629 83.6 571.4 72 512 72c-19.9 0-36-16.1-36-36s16.1-36 36-36c69.1 0 136.2 13.5 199.3 40.3C772.3 66 827 103 874 150c47 47 83.9 101.8 109.7 162.7 26.7 63.1 40.2 130.2 40.2 199.3.1 19.9-16 36-35.9 36z" />
                        </svg>
                    </div>
                    :
                    <>
                        {activity.length === 0 ?
                            <div className='flex items-center justify-center mt-24'>
                                Anda harus Checkin terlebih dahulu
                            </div>
                            :
                            <>
                                <div style={{ width: '100%', height: '200px' }}>
                                    {activity.length > 0 &&
                                        <Map
                                            longitude={activity[0].longitude}
                                            latitude={activity[0].latitude}
                                            addressFromActivity={activity[0].address}
                                        />
                                    }
                                </div>
                                <div className='p-4'>
                                    <div className="date-operation mt-24">
                                        <div className="date-operation-title text-center">
                                            <h1 className="time text-4xl font-bold">{formatTime(activity[0].createdAt)}</h1>
                                            <h2 className="text-gray-500">Untuk: {formatDate(activity[0].createdAt)}</h2>
                                        </div>
                                    </div>
                                    <div className='catat mt-6 space-y-2'>
                                        <h2 className='font-semibold'>Catat aktifitas anda disini:</h2>
                                        <div>
                                            <button className='flex items-center text-sm'>
                                                <svg
                                                    viewBox="0 0 24 24"
                                                    fill="currentColor"
                                                    height="2em"
                                                    width="2em"
                                                    className='bg-orange-500 text-white mr-2'
                                                >
                                                    <path fill="none" d="M0 0h24v24H0z" />
                                                    <path d="M11 11V5h2v6h6v2h-6v6h-2v-6H5v-2z" />
                                                </svg>
                                                Klik untuk menambahkan aktifitas
                                            </button>

                                        </div>
                                    </div>
                                </div>
                            </>
                        }
                    </>
                }
            </div>

        </div>
    )
}

export default Activity