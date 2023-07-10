import { Link } from "react-router-dom"

function CheckInSuccess() {
    return (
        <div className="h-screen flex flex-col justify-center items-center px-4 text-center">
            <div className="success-icon">
                <svg
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    height="6em"
                    width="6em"
                    className="text-orange-500"
                >
                    <path d="M10 15.586l-3.293-3.293-1.414 1.414L10 18.414l9.707-9.707-1.414-1.414z" />
                </svg>
            </div>
            <div className="success-title">
                <h1 className="font-bold text-xl text-center">
                    Anda sudah berhasil absen!
                </h1>
            </div>
            <div className="success-message mt-2">
                <p className="text-xs px-4 text-gray-500">Anda telah tercatat absen dengan keterangan sebagai berikut:</p>
            </div>
            <div className="time-checkin">
                <h2 className="font-semibold text-lg mt-4">Waktu Masuk: 10 Juni 2021</h2>
                <p className="font-semibold text-black px-4 text-2xl">08:00</p>
            </div>
            <div className="success-btn w-full mt-10">
                <Link to='/dashboard' className="inline-block w-full bg-orange-400 hover:bg-orange-500 cursor-pointer transition px-4 py-2 mx-auto rounded-full text-lg text-white font-bold mt-4">
                    Selesai
                </Link>
            </div>
        </div>
    )
}

export default CheckInSuccess