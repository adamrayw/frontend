import logo from '../assets/Logo.png'
import background from '../assets/background-login.png'
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import jwt_decode from "jwt-decode";
/* The line `import { useApiPost } from '../Services/api.service';` is importing the `useApiPost`
function from the `api.service` module located in the `../Services` directory. This function is
likely used to make a POST request to an API endpoint. */
import { useApiPost } from '../Services/api.service';

function Login() {

    const handleLogin = async (credentialResponse) => {
        var decoded = jwt_decode(credentialResponse.credential);
        const data = {
            name: decoded.name,
            email: decoded.email,
            picture: decoded.picture,
            credential: credentialResponse.credential
        }

        try {
            // eslint-disable-next-line react-hooks/rules-of-hooks
            const response = await useApiPost('users', data)

            if (response.response.data.status === 'success') {
                localStorage.setItem('credential', response.response.data.data.credential)
                localStorage.setItem('user', JSON.stringify(response.response.data.data))
            }

            window.location.href = '/dashboard'
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <div className="home mx-auto h-screen max-w-sm space-y-6 px-6 py-10"
            style={{
                backgroundImage: `url('${background}')`,
                backgroundSize: 'contain',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'bottom',
            }}
        >
            <img src={logo} className="logo mx-auto h-36 w-36 rounded-full" />
            <div className="home-title text-center">
                <h1 className="text-xl font-bold uppercase">Selamat Datang</h1>
                <p className="font-semibold">di Website Monitoring Tim SAR NASIONAL</p>
            </div>
            <div className="google-login-btn flex justify-center">
                <GoogleOAuthProvider clientId="516190441804-ceqlftuesuq1i6abg8gg6h8koivb7t0g.apps.googleusercontent.com">
                    <GoogleLogin
                        onSuccess={async (credentialResponse) => {
                            handleLogin(credentialResponse)
                        }}
                        onError={() => {
                            console.log('Login Failed');
                        }}
                    />
                </GoogleOAuthProvider>
            </div>
        </div>
    )
}

export default Login