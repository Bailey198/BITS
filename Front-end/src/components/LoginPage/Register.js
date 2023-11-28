import React from 'react'

const Register = () => {
    return (
        <div>
            {/* Register Form */}
            <form action="">
                <div className="relative my-4">
                    <input className="block w-72 py-3 px-0 text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus-text-white focus:border-blue-600 peer"
                        placeholder="" />
                    <label htmlFor="" className="absolute text-white duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] 
                            peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >
                        First Name:
                    </label>
                </div>
                <div className="relative my-4">
                    <input className="block w-72 py-3 px-0 text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus-text-white focus:border-blue-600 peer"
                        placeholder="" />
                    <label htmlFor="" className="absolute text-white duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] 
                            peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >
                        Last Name:
                    </label>
                </div>
                <div className="relative my-4">
                    <input className="block w-72 py-3 px-0 text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus-text-white focus:border-blue-600 peer"
                        placeholder="" />
                    <label htmlFor="" className="absolute text-white duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] 
                            peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >
                        Enter Email:
                    </label>
                </div>
                <div className="relative my-4">
                    <input className="block w-72 py-3 px-0 text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none 
                            dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus-text-white focus:border-blue-600 peer"
                        placeholder="" />
                    <label htmlFor="" className="absolute text-white duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] 
                            peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >
                        Enter Password:
                    </label>
                </div>

                {/* Register Button */}
                <button className="w-full mb-4 text-[18px] mt-6 rounded-full bg-white text-emerald-800 hover:bg-emerald-600 hover:text-white py-2 transition-colors duration-300"
                    type="submit"
                >
                    Register
                </button>
            </form>
        </div>
    )
}

export default Register;
