/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect, useState } from 'react'
import TopNavbar from '../Components/TopNavbar/TopNavbar'
import { useApiGet, useApiPost } from '../Services/api.service'
import Map from '../Components/Map/Map'
import formatTime from '../Utils/formatTime'
import formatDate from '../Utils/formatDate'

function Activity() {
    const [activity, setActivity] = useState([])
    const [loading, setLoading] = useState(false)
    const [modal, setModal] = useState(false)
    const user = JSON.parse(localStorage.getItem('user'))
    const [deskripsi, setDeskripsi] = useState('')
    const [namaPelapor, setNamaPelapor] = useState('')
    const [nomorPelapor, setNomorPelapor] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    const checkCheckIn = async () => {
        setLoading(true)
        const response = await useApiGet('checkin/get/checkintoday/' + user.id)
        setActivity(response.response.data.data.checkins)
        setLoading(false)
    }

    useEffect(() => {
        checkCheckIn()
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault()
        const data = {
            checkinId: activity[0].id,
            deskripsi,
            nama_pelapor: namaPelapor,
            nomor_pelapor: nomorPelapor,
        }

        try {
            setIsLoading(true)
            const response = await useApiPost('catatan/', data)
            if (response.response.data.message === 'Catatan berhasil ditambahkan') {
                setModal(false)
                setIsLoading(false)
                checkCheckIn()
            }
            setIsLoading(false)
        } catch (error) {
            console.log(error)
            setIsLoading(false)
        }
    }

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
                                    <div className="date-operation mt-28">
                                        <div className="date-operation-title text-center">
                                            <h1 className="time text-4xl font-bold">{formatTime(activity[0].createdAt)}</h1>
                                            <h2 className="text-gray-500">Untuk: {formatDate(activity[0].createdAt)}</h2>
                                        </div>
                                    </div>
                                    <div className='catat mt-8 space-y-2'>
                                        <div className="activity-noted mb-6">
                                            {
                                                activity[0].catatans.length > 0 &&

                                                <h2 className='font-semibold mb-2'>Aktifitas yang sudah anda catat:</h2>
                                            }
                                            {activity[0].catatans.length > 0 && activity[0].catatans.map((catatan, index) => (
                                                <div key={index} className="activity-noted-item">
                                                    <div className='flex items-center space-x-4  text-green-500'>
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
                                                            <h1 className="text-green-500">{formatTime(catatan.createdAt)}</h1>
                                                        </div>
                                                        <div className="activity-noted-item-title">
                                                            <h1 className="text-lg font-semibold">{catatan.deskripsi}</h1>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                        <h2 className='font-semibold'>Catat aktifitas anda disini:</h2>
                                        <div>
                                            <button
                                                className='flex items-center text-sm'
                                                onClick={() => setModal(!modal)}
                                            >
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
            </div >
            {
                modal && (
                    <div className="modal max-w-lg px-4 z-10 fixed inset-0 mx-auto bg-black/30 backdrop-opacity-10 backdrop-invert flex items-center justify-center">
                        <div className="modal-content md:p-10 p-6 w-full bg-white rounded-lg shadow-lg">
                            <div className="modal-body space-y-4 text-sm">
                                <form onSubmit={handleSubmit} className='space-y-4'>
                                    <div className="form-group">
                                        <label htmlFor="deskripsi" className="text-sm font-semibold">
                                            Deskripsi Tugas Anda
                                        </label>
                                        <textarea
                                            type="text"
                                            className="form-control w-full py-3 px-4 border border-orange-500 mt-1 rounded-xl"
                                            id="activity"
                                            name="deskripsi"
                                            onChange={(e) => setDeskripsi(e.target.value)}
                                        ></textarea>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="nama-pelapor" className="text-sm font-semibold">
                                            Nama Lengkap PIC Pelapor Lapangan
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control w-full py-3 px-4 border border-orange-500 mt-1 rounded-xl"
                                            id="nama-pelapor"
                                            name="nama-pelapor"
                                            onChange={(e) => setNamaPelapor(e.target.value)}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="nomor-lapangan" className="text-sm font-semibold">
                                            Nomor HP PIC Pelapor Lapangan
                                        </label>
                                        <input
                                            type="number"
                                            className="form-control w-full py-3 px-4 border border-orange-500 mt-1 rounded-xl"
                                            id="nomor-lapangan"
                                            name="nomor-lapangan"
                                            onChange={(e) => setNomorPelapor(e.target.value)}
                                        />
                                    </div>
                                    <div className="modal-btn grid grid-cols-2 gap-x-2 pt-4">
                                        <button
                                            className='border p-2 border-orange-500 rounded-full font-semibold text-orange-500 hover:bg-orange-600 hover:text-white transition'
                                            onClick={() => setModal(!modal)}
                                        >
                                            Batal
                                        </button>
                                        <button type='submit' className='p-2 bg-orange-500 hover:bg-orange-600 transition rounded-full font-semibold text-white '>
                                            {isLoading ? (
                                                <svg
                                                    viewBox="0 0 1024 1024"
                                                    fill="currentColor"
                                                    height="2em"
                                                    width="2em"
                                                    className='animate-spin text-white mx-auto'
                                                >
                                                    <path d="M988 548c-19.9 0-36-16.1-36-36 0-59.4-11.6-117-34.6-171.3a440.45 440.45 0 00-94.3-139.9 437.71 437.71 0 00-139.9-94.3C629 83.6 571.4 72 512 72c-19.9 0-36-16.1-36-36s16.1-36 36-36c69.1 0 136.2 13.5 199.3 40.3C772.3 66 827 103 874 150c47 47 83.9 101.8 109.7 162.7 26.7 63.1 40.2 130.2 40.2 199.3.1 19.9-16 36-35.9 36z" />
                                                </svg>
                                            ) :
                                                'Simpan'
                                            }
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                )
            }
        </div >
    )
}

export default Activity