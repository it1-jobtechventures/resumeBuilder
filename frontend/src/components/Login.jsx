import React, { useState } from 'react'

const Login = () => {
    const [isSignUp, setIsSignUp] = useState(false);

  return (
    <>
        <mian>
        <div
      className="h-screen flex items-center justify-center bg-cover bg-center text-black"
      style={{ backgroundImage: "url('/path-to-your-image.jpg')" }}
    >
      <div className="bg-white bg-opacity-10 backdrop-blur-md p-8 rounded-lg shadow-lg max-w-sm w-full text-center">
        <h2 className="text-black text-2xl font-semibold mb-4">
          {isSignUp ? "Sign Up" : "Login"}
        </h2>
        <input
          type="text"
          placeholder="Username"
          className="w-full p-2 mb-2 rounded bg-gray-100 text-gray-900 focus:outline-none"
        />
        {isSignUp && (
          <input
            type="email"
            placeholder="Email"
            className="w-full p-2 mb-2 rounded bg-gray-100 text-gray-900 focus:outline-none"
          />
        )}
        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 mb-2 rounded bg-gray-100 text-gray-900 focus:outline-none"
        />
        <button className="w-full bg-orange-400 text-black py-2 rounded mt-2 hover:bg-orange-500">
          {isSignUp ? "Sign Up" : "Sign In"}
        </button>
        {!isSignUp && (
          <div className="flex justify-between text-black text-sm mt-2">
            <label className="flex items-center">
              <input type="checkbox" className="mr-1" /> Remember Me
            </label>
            <a href="#" className="hover:underline">Forgot Password?</a>
          </div>
        )}
        <div className="mt-4">
          <p className="text-black text-sm">Or {isSignUp ? "Sign Up" : "Sign In"} With</p>
          <div className="flex justify-center space-x-2 mt-2">
            <button className="bg-blue-600 text-black px-4 py-2 rounded">Facebook</button>
            <button className="bg-blue-400 text-black px-4 py-2 rounded">Twitter</button>
          </div>
        </div>
        <p className="text-black text-sm mt-4 cursor-pointer" onClick={() => setIsSignUp(!isSignUp)}>
          {isSignUp ? "Already have an account? Sign In" : "Don't have an account? Sign Up"}
        </p>
      </div>
    </div>
        </mian>
    </>
  )
}

export default Login