import React, { useState } from "react";
import { FORM_TYPE } from "./constant";
import { useRouter } from 'next/navigation';


const SignUp = (props) => {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [error, setError] = useState(false);
    const [name, setName] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [signUpSuccess, setSignUpSuccess] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(false);

        if (name.length < 1 || email.length < 1 || pass.length < 1) {
            setError(true);
        } else {
            setIsLoading(true);
            const response = await fetch('https://academics.newtonschool.co/api/v1/user/signup', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    projectID: "drbdz4ox1jwn"
                },
                body: JSON.stringify({ name: name, email: email, password: pass, appType: 'music' })
            });
            const json = await response.json()
            localStorage.setItem('token', json.token);
            setIsLoading(false);

            if (json.status === 'success') {
                setIsLoggedIn(true);
                setSignUpSuccess(true);
                setName('');
                setEmail('');
                setPass('');
                setTimeout(() => {
                    props.onClose();
                }, 1000);
            }
        }
    }

    const navigateToLogin = () => {
        router.push('./login');
    }

    return (
        <div className="flex justify-center items-center xsm:p-11 p-28 text-black">
            <div className="w-full  max-w-md">
                <div className="bg-white shadow-md rounded px-8 py-6">
                    {isLoggedIn ? (
                        <div>
                            <h2 className="text-2xl mb-4">Logged In</h2>
                        </div>
                    ) : (
                        <div>
                            <h2 className="text-2xl mb-4">Sign Up</h2>
                            <form className="register-form" onSubmit={handleSubmit}>
                                <div className="mb-4">
                                    <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">Full name</label>
                                    <input value={name} name="name" onChange={(e) => setName(e.target.value)} id="name" placeholder="Full Name" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">Email</label>
                                    <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="youremail@gmail.com" id="email" name="email" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                                </div>
                                <div className="mb-6">
                                    <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">Password</label>
                                    <input value={pass} onChange={(e) => setPass(e.target.value)} type="password" placeholder="********" id="password" name="password" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                                </div>

                                {error && (
                                    <div className="text-red-500">Please fill in all the fields.</div>
                                )}
                                <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                                    {isLoading ? 'Signing Up...' : 'Sign Up'}
                                </button>
                            </form>
                            <button className="mt-4 text-blue-500 hover:text-blue-700 cursor-pointer" onClick={navigateToLogin}>Already have an account? Login here.</button>
                        </div>
                    )}
                    {signUpSuccess && (
                        <div className="text-green-500 mt-4">Sign Up Successful!</div>
                    )}
                </div>
            </div>
        </div>
    )
}
export default SignUp;