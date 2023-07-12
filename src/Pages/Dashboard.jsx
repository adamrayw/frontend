/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
import Profile from '../assets/profile.png'
import Activity from '../assets/activity.png'
import Collaborator from '../assets/collaborator.png'
import Equipment from '../assets/equipment.png'
import BaseLocation from '../assets/base-location.png'
import CheckIn from '../assets/check-in.png'
import CheckOut from '../assets/check-out.png'
import Others from '../assets/others.png'
import Watch from '../assets/icon-watch.png'
import background from '../assets/backgroundOpacity.png'
import Logo from '../assets/Logo.png'
import { Link, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useApiGet } from '../Services/api.service'
import formatTime from '../Utils/formatTime'

function Dashboard() {
    const [isCheckIn, setIsCheckIn] = useState(false)
    const [catatan, setCatatan] = useState([])
    const user = JSON.parse(localStorage.getItem('user'))

    const navigate = useNavigate()

    const handleLogout = () => {
        localStorage.removeItem('user')
        localStorage.removeItem('credential')
        navigate('/login')
    }

    const checkCheckIn = async () => {
        const response = await useApiGet('checkin/get/checkintoday/' + user.id)

        if (response.response.data.data.checkins.length > 0) {
            setCatatan(response.response.data.data.checkins[0].catatans)
            setIsCheckIn(true)
        } else {
            setIsCheckIn(false)
        }

    }

    useEffect(() => {
        checkCheckIn()
    }, [])

    return (
        <div className="relative dashboard mx-auto h-screen max-w-sm px-4 pb-10 pt-4"
            style={{
                backgroundImage: `url('${background}')`,
                backgroundSize: 'contain',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'bottom',
            }}
        >
            <div className="dashboard-username">
                <div className='flex justify-between items-center'>
                    <h1 className="text-lg font-bold">Selamat Sore! {user.name}</h1>
                    <img src={Logo} className="logo h-10 w-10 rounded-full" />
                </div>
                <div className='logout'>
                    <button onClick={handleLogout} className='flex text-red-400 font-semibold bg-red-200 py-1 px-2 rounded-lg items-center'>
                        <svg
                            viewBox="0 0 900 1000"
                            fill="currentColor"
                            height="1em"
                            width="1em"
                            className='mr-1'
                        >
                            <path d="M502 850V750h98v100c0 26.667-9.667 50-29 70s-43 30-71 30H100c-26.667 0-50-10-70-30S0 876.667 0 850V150c0-28 10-51.667 30-71s43.333-29 70-29h400c28 0 51.667 9.667 71 29s29 43 29 71v150h-98V150H100v700h402m398-326L702 720V600H252V450h450V330l198 194" />
                        </svg>
                        Keluar
                    </button>
                </div>
            </div>
            <div className="dashboard-menu grid grid-cols-4 gap-y-6 mt-10">
                <div>
                    <img
                        width="80"
                        height="auto"
                        className="mx-auto"
                        src={Profile}
                        alt="profile-logo"
                    />
                </div>
                <div>
                    <Link to='/activity'>
                        <img
                            width="80"
                            height="auto"
                            className="mx-auto"
                            src={Activity}
                            alt="activity-logo"
                        />
                    </Link>
                </div>
                <div>
                    <img
                        width="80"
                        height="auto"
                        className="mx-auto"
                        src={Collaborator}
                        alt="collaborator-logo"
                    />
                </div>
                <div>
                    <img
                        width="80"
                        height="auto"
                        className="mx-auto"
                        src={Equipment}
                        alt="equipment-logo"
                    />
                </div>
                <div>
                    <img
                        width="80"
                        height="auto"
                        className="mx-auto"
                        src={BaseLocation}
                        alt="base=location-logo"
                    />
                </div>
                <div>
                    <Link to='/check-in'>
                        <img
                            width="80"
                            height="auto"
                            className="mx-auto"
                            src={CheckIn}
                            alt="check-in-logo"
                        />
                    </Link>
                </div>
                <div>
                    <img
                        width="80"
                        height="auto"
                        className="mx-auto"
                        src={CheckOut}
                        alt="checkout-logo"
                    />
                </div>
                <div>
                    <img
                        width="80"
                        height="auto"
                        className="mx-auto"
                        src={Others}
                        alt="others-logo"
                    />
                </div>
            </div>
            <div className="btn-mulai text-center mt-10">
                <h1 className="font-bold text-xl">Sudah waktunya berkegiatan ya!</h1>
                <a
                    className="flex items-center justify-center bg-orange-300 hover:bg-orange-400 cursor-pointer transition px-4 py-2.5 w-2/3 mx-auto rounded-full text-xl text-white font-bold mt-4"
                >
                    <img src={Watch} className="w-7 h-auto pr-2" />
                    Mulai
                </a>
            </div>
            <div className="kegiatan-saya mt-6 space-y-2">
                <div className="kegiatan-saya-title">
                    <h2 className="font-bold text-xl flex items-center">
                        Kegiatan Saya
                        <svg
                            fill="currentColor"
                            viewBox="0 0 16 16"
                            height="20"
                            width="20"
                        >
                            <path
                                fillRule="evenodd"
                                d="M4.646 1.646a.5.5 0 01.708 0l6 6a.5.5 0 010 .708l-6 6a.5.5 0 01-.708-.708L10.293 8 4.646 2.354a.5.5 0 010-.708z"
                            />
                        </svg>
                    </h2>
                </div>
                {isCheckIn && (
                    <>
                        {catatan.length > 0 ? (
                            <>
                                {catatan.map((item, index) => (
                                    <div className="kegiatan-content" key={index}>
                                        <div className='flex items-center space-x-4 bg-white shadow-lg p-2 rounded-lg  text-green-500'>
                                            <div>
                                                <svg
                                                    fill="currentColor"
                                                    viewBox="0 0 16 16"
                                                    height="2em"
                                                    width="2em"
                                                    className='text-green-500s'
                                                >
                                                    <path d="M13.854 3.646a.5.5 0 010 .708l-7 7a.5.5 0 01-.708 0l-3.5-3.5a.5.5 0 11.708-.708L6.5 10.293l6.646-6.647a.5.5 0 01.708 0z" />
                                                </svg>
                                            </div>
                                            <div className="activity-noted-item-time">
                                                <h1 className="text-green-500">{formatTime(item.createdAt)}</h1>
                                            </div>
                                            <div className="activity-noted-item-title">
                                                <h1 className="text-lg font-semibold">{item.deskripsi}</h1>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </>
                        )
                            :
                            (
                                <div className="kegiatan-content">
                                    <div className="kegiatan-content-item">
                                        <div className="card bg-white p-4 rounded-lg shadow-lg font-semibold text-sm text-center">
                                            Klik Menu <span className='text-orange-500'>Acitivity</span>, untuk update aktivitasmu
                                        </div>
                                    </div>
                                </div>
                            )}
                    </>
                )}
            </div>
        </div >
    )
}

export default Dashboard