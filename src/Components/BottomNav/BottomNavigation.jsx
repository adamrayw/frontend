import { Link } from "react-router-dom"

function BottomNavigation() {
    return (
        <div id="bottom-navigation" className="block fixed inset-x-0 bottom-0 z-10 bg-gradient-to-r from-yellow-200 via-amber-400 to-yellow-200 shadow">
            <div id="tabs" className="flex justify-between">
                <Link to="/dashboard" className="w-full focus:text-gray-500 hover:text-gray-500 justify-center inline-block text-center pt-2 pb-1">
                    <svg width="33" height="33" viewBox="0 0 33 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="inline-block mb-1">
                        <path d="M12.9157 29.7182V20.2766H20.0824V29.7182C20.0824 30.7568 20.8886 31.6066 21.874 31.6066H27.249C28.2344 31.6066 29.0407 30.7568 29.0407 29.7182V16.4999H32.0865C32.9107 16.4999 33.3049 15.4235 32.6778 14.857L17.6994 0.637897C17.0186 -0.00413623 15.9794 -0.00413623 15.2986 0.637897L0.320266 14.857C-0.288901 15.4235 0.0873492 16.4999 0.911516 16.4999H3.95735V29.7182C3.95735 30.7568 4.7636 31.6066 5.74902 31.6066H11.124C12.1094 31.6066 12.9157 30.7568 12.9157 29.7182Z" fill="#7F4301" />
                    </svg>

                    <span className="tab tab-home block text-xs">Home</span>
                </Link>
                <a href="#" className="w-full focus:text-gray-500 hover:text-gray-500 justify-center inline-block text-center pt-2 pb-1">
                    <svg width="33" height="33" viewBox="0 0 33 33" fill="none" xmlns="http://www.w3.org/2000/svg" className="inline-block mb-1">
                        <path d="M29.0417 0.375H3.94042C1.95167 0.375 0.392917 1.96958 0.392917 3.95833L0.375 29.0417C0.375 31.0125 1.95167 32.625 3.94042 32.625H29.0417C31.0125 32.625 32.625 31.0125 32.625 29.0417V3.95833C32.625 1.96958 31.0125 0.375 29.0417 0.375ZM29.0417 21.875H23.4338C22.5917 21.875 21.9108 22.4842 21.6779 23.3083C21.0508 25.5838 18.9546 27.25 16.5 27.25C14.0454 27.25 11.9492 25.5838 11.3221 23.3083C11.0892 22.4842 10.4083 21.875 9.56625 21.875H3.95833V5.75C3.95833 4.76458 4.76458 3.95833 5.75 3.95833H27.25C28.2354 3.95833 29.0417 4.76458 29.0417 5.75V21.875Z" fill="#7F4301" />
                    </svg>

                    <span className="tab tab-kategori block text-xs">Inbox</span>
                </a>
                <Link to="/activity" className="w-full focus:text-gray-500 hover:text-gray-500 justify-center inline-block text-center pt-2 pb-1">
                    <svg width="33" height="33" viewBox="0 0 33 37" fill="none" xmlns="http://www.w3.org/2000/svg" className="inline-block mb-1">
                        <path d="M29.1875 32.5995H3.8125V12.9927H29.1875M23.75 0.515625V4.0805H9.25V0.515625H5.625V4.0805H3.8125C1.80062 4.0805 0.1875 5.66687 0.1875 7.64538V32.5995C0.1875 33.545 0.569418 34.4517 1.24924 35.1203C1.92906 35.7888 2.85109 36.1644 3.8125 36.1644H29.1875C30.1489 36.1644 31.0709 35.7888 31.7508 35.1203C32.4306 34.4517 32.8125 33.545 32.8125 32.5995V7.64538C32.8125 5.66687 31.1812 4.0805 29.1875 4.0805H27.375V0.515625M25.5625 20.1225H16.5V29.0346H25.5625V20.1225Z" fill="#7F4301" />
                    </svg>

                    <span className="tab tab-explore block text-xs">Activity</span>
                </Link>
                <a href="#" className="w-full focus:text-gray-500 hover:text-gray-500 justify-center inline-block text-center pt-2 pb-1">
                    <svg
                        className="inline-block"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        height="38"
                        width="38"
                    >
                        <path d="M7.5 6.5C7.5 8.981 9.519 11 12 11s4.5-2.019 4.5-4.5S14.481 2 12 2 7.5 4.019 7.5 6.5zM20 21h1v-1c0-3.859-3.141-7-7-7h-4c-3.86 0-7 3.141-7 7v1h17z" fill="#7F4301" />
                    </svg>
                    <span className="tab tab-whishlist block text-xs pb-1">User</span>
                </a>
            </div>
        </div>
    )
}

export default BottomNavigation