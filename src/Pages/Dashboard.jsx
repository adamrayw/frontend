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
import { Link } from 'react-router-dom'

function Dashboard() {

    const user = JSON.parse(localStorage.getItem('user'))

    return (
        <div className="relative dashboard mx-auto h-screen max-w-sm px-4 pb-10 pt-4 "
            style={{
                backgroundImage: `url('${background}')`,
                backgroundSize: 'contain',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'bottom',
            }}
        >
            <div className="dashboard-username flex justify-between items-center">
                <h1 className="text-lg font-bold">Selamat Sore! {user.name}</h1>
                <img src={Logo} className="logo h-10 w-10 rounded-full" />
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
                    <img
                        width="80"
                        height="auto"
                        className="mx-auto"
                        src={Activity}
                        alt="activity-logo"
                    />
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
            <div className="kegiatan-saya mt-6">
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
        </div>
    )
}

export default Dashboard