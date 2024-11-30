// import React, { useState } from "react";

// const SignupForm = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [otp, setOtp] = useState("");
//   const [captcha, setCaptcha] = useState("");
//   const [generatedCaptcha, setGeneratedCaptcha] = useState("");
//   const [message, setMessage] = useState("");

//   // Generate a new captcha
//   const generateCaptcha = () => {
//     const chars =
//       "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
//     let captcha = "";
//     for (let i = 0; i < 6; i++) {
//       captcha += chars.charAt(Math.floor(Math.random() * chars.length));
//     }
//     setGeneratedCaptcha(captcha);
//   };

//   // Handle OTP sending
//   const sendOtp = async () => {
//     if (!email.includes("@")) {
//       setMessage("Please enter a valid email.");
//       return;
//     }
//     if (password.length < 8) {
//       setMessage("Password must be at least 8 characters long.");
//       return;
//     }
//     if (captcha !== generatedCaptcha) {
//       setMessage("Captcha is incorrect.");
//       return;
//     }

//     setMessage("Sending OTP...");
//     try {
//       const response = await fetch("http://localhost:5000/send-otp", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ email }),
//       });
//       const data = await response.json();
//       if (data.success) {
//         setMessage("OTP sent to your email!");
//       } else {
//         setMessage("Failed to send OTP. Try again.");
//       }
//     } catch (error) {
//       setMessage("Error sending OTP. Check your connection.");
//     }
//   };

//   React.useEffect(() => {
//     generateCaptcha(); // Generate captcha when the component loads
//   }, []);

//   return (
//     <div className="flex justify-center items-center min-h-screen">
//       <div className="bg-white p-6 rounded shadow-md w-96">
//         <h1 className="text-2xl font-bold mb-4 text-center">Signup Form</h1>
//         <form>
//           <div className="mb-4">
//             <label className="block text-gray-700">Email</label>
//             <input
//               type="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               className="w-full p-2 border rounded"
//               placeholder="Enter your email"
//             />
//           </div>
//           <div className="mb-4">
//             <label className="block text-gray-700">Password</label>
//             <input
//               type="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               className="w-full p-2 border rounded"
//               placeholder="Enter your password"
//             />
//           </div>
//           <div className="mb-4">
//             <label className="block text-gray-700">Captcha</label>
//             <div className="flex items-center">
//               <span className="font-mono bg-gray-200 p-2 rounded">
//                 {generatedCaptcha}
//               </span>
//               <button
//                 type="button"
//                 onClick={generateCaptcha}
//                 className="ml-2 bg-blue-500 text-white px-2 py-1 rounded"
//               >
//                 Refresh
//               </button>
//             </div>
//             <input
//               type="text"
//               value={captcha}
//               onChange={(e) => setCaptcha(e.target.value)}
//               className="w-full mt-2 p-2 border rounded"
//               placeholder="Enter captcha"
//             />
//           </div>
//           <button
//             type="button"
//             onClick={sendOtp}
//             className="w-full bg-blue-500 text-white py-2 rounded mt-4"
//           >
//             Send OTP
//           </button>
//         </form>
//         {message && <p className="mt-4 text-center text-red-500">{message}</p>}
//       </div>
//     </div>
//   );
// };

// export default SignupForm;

// import React, { useState } from "react";

// const SignupForm = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [otp, setOtp] = useState("");
//   const [captcha, setCaptcha] = useState("");
//   const [generatedCaptcha, setGeneratedCaptcha] = useState("");
//   const [message, setMessage] = useState("");

//   const generateCaptcha = () => {
//     const chars =
//       "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
//     let captcha = "";
//     for (let i = 0; i < 6; i++) {
//       captcha += chars.charAt(Math.floor(Math.random() * chars.length));
//     }
//     setGeneratedCaptcha(captcha);
//   };

//   const sendOtp = async () => {
//     if (!email.includes("@")) {
//       setMessage("Please enter a valid email.");
//       return;
//     }
//     if (password.length < 8) {
//       setMessage("Password must be at least 8 characters long.");
//       return;
//     }
//     if (captcha !== generatedCaptcha) {
//       setMessage("Captcha is incorrect.");
//       return;
//     }

//     setMessage("Sending OTP...");
//     try {
//       const response = await fetch("http://localhost:5000/send-otp", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ email }),
//       });
//       const data = await response.json();
//       if (data.success) {
//         setMessage("OTP sent to your email!");
//       } else {
//         setMessage("Failed to send OTP. Try again.");
//       }
//     } catch (error) {
//       setMessage("Error sending OTP. Check your connection.");
//     }
//   };

//   const validateOtp = async () => {
//     setMessage("Validating OTP...");
//     try {
//       const response = await fetch("http://localhost:5000/validate-otp", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ email, otp }),
//       });
//       const data = await response.json();
//       if (data.success) {
//         setMessage("OTP validated. Proceeding to signup...");
//         await signupUser();
//       } else {
//         setMessage("Invalid OTP. Please try again.");
//       }
//     } catch (error) {
//       setMessage("Error validating OTP. Check your connection.");
//     }
//   };

//   const signupUser = async () => {
//     setMessage("Signing up...");
//     try {
//       const response = await fetch("http://localhost:5000/signup", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ email, password }),
//       });
//       const data = await response.json();
//       if (data.success) {
//         setMessage("Signup successful!");
//       } else {
//         setMessage("Error during signup. Try again.");
//       }
//     } catch (error) {
//       setMessage("Error during signup. Check your connection.");
//     }
//   };

//   React.useEffect(() => {
//     generateCaptcha();
//   }, []);

//   return (
//     <div className="flex justify-center items-center min-h-screen">
//       <div className="bg-white p-6 rounded shadow-md w-96">
//         <h1 className="text-2xl font-bold mb-4 text-center">Signup Form</h1>
//         <form>
//           <div className="mb-4">
//             <label className="block text-gray-700">Email</label>
//             <input
//               type="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               className="w-full p-2 border rounded"
//               placeholder="Enter your email"
//             />
//           </div>
//           <div className="mb-4">
//             <label className="block text-gray-700">Password</label>
//             <input
//               type="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               className="w-full p-2 border rounded"
//               placeholder="Enter your password"
//             />
//           </div>
//           <div className="mb-4">
//             <label className="block text-gray-700">Captcha</label>
//             <div className="flex items-center">
//               <span className="font-mono bg-gray-200 p-2 rounded">
//                 {generatedCaptcha}
//               </span>
//               <button
//                 type="button"
//                 onClick={generateCaptcha}
//                 className="ml-2 bg-blue-500 text-white px-2 py-1 rounded"
//               >
//                 Refresh
//               </button>
//             </div>
//             <input
//               type="text"
//               value={captcha}
//               onChange={(e) => setCaptcha(e.target.value)}
//               className="w-full mt-2 p-2 border rounded"
//               placeholder="Enter captcha"
//             />
//           </div>
//           <button
//             type="button"
//             onClick={sendOtp}
//             className="w-full bg-blue-500 text-white py-2 rounded mt-4"
//           >
//             Send OTP
//           </button>
//           <div className="mb-4 mt-4">
//             <label className="block text-gray-700">OTP</label>
//             <input
//               type="text"
//               value={otp}
//               onChange={(e) => setOtp(e.target.value)}
//               className="w-full p-2 border rounded"
//               placeholder="Enter OTP"
//             />
//           </div>
//           <button
//             type="button"
//             onClick={validateOtp}
//             className="w-full bg-green-500 text-white py-2 rounded"
//           >
//             Validate OTP and Signup
//           </button>
//         </form>
//         <p className="text-center text-red-500 mt-4">{message}</p>
//       </div>
//     </div>
//   );
// };

// export default SignupForm;

import React, { useState } from "react";

const SignupForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [captcha, setCaptcha] = useState("");
  const [generatedCaptcha, setGeneratedCaptcha] = useState("");
  const [message, setMessage] = useState("");

  const generateCaptcha = () => {
    const chars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let captcha = "";
    for (let i = 0; i < 6; i++) {
      captcha += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setGeneratedCaptcha(captcha);
  };

  const sendOtp = async () => {
    if (!email.includes("@")) {
      setMessage("Please enter a valid email.");
      return;
    }
    if (password.length < 8) {
      setMessage("Password must be at least 8 characters long.");
      return;
    }
    if (captcha !== generatedCaptcha) {
      setMessage("Captcha is incorrect.");
      return;
    }

    setMessage("Sending OTP...");
    try {
      const response = await fetch("http://localhost:5000/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await response.json();
      if (data.success) {
        setMessage("OTP sent to your email!");
      } else {
        setMessage("Failed to send OTP. Try again.");
      }
    } catch (error) {
      setMessage("Error sending OTP. Check your connection.");
    }
  };

  const validateOtp = async () => {
    setMessage("Validating OTP...");
    try {
      const response = await fetch("http://localhost:5000/validate-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp }),
      });
      const data = await response.json();
      if (data.success) {
        setMessage("OTP validated. Proceeding to signup...");
        await signupUser();
      } else {
        setMessage("Invalid OTP. Please try again.");
      }
    } catch (error) {
      setMessage("Error validating OTP. Check your connection.");
    }
  };

  const signupUser = async () => {
    setMessage("Signing up...");
    try {
      const response = await fetch("http://localhost:5000/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (data.success) {
        setMessage("Signup successful!");
      } else {
        setMessage("Error during signup. Try again.");
      }
    } catch (error) {
      setMessage("Error during signup. Check your connection.");
    }
  };

  React.useEffect(() => {
    generateCaptcha();
  }, []);

//   return (
//     <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-500 to-teal-500">
//       <div className="bg-white p-8 rounded-xl shadow-xl w-96">
//         <h1 className="text-3xl font-semibold mb-6 text-center text-blue-600">
//           Signup Form
//         </h1>
//         <form>
//           <div className="mb-5">
//             <label className="block text-gray-700 text-sm font-medium">
//               Email
//             </label>
//             <input
//               type="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               className="w-full p-3 border border-gray-300 rounded-lg mt-2 focus:ring-2 focus:ring-blue-400"
//               placeholder="Enter your email"
//             />
//           </div>
//           <div className="mb-5">
//             <label className="block text-gray-700 text-sm font-medium">
//               Password
//             </label>
//             <input
//               type="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               className="w-full p-3 border border-gray-300 rounded-lg mt-2 focus:ring-2 focus:ring-blue-400"
//               placeholder="Enter your password"
//             />
//           </div>
//           <div className="mb-5">
//             <label className="block text-gray-700 text-sm font-medium">
//               Captcha
//             </label>
//             <div className="flex items-center justify-between mt-2">
//               <span className="font-mono bg-gray-100 p-2 rounded-lg">
//                 {generatedCaptcha}
//               </span>
//               <button
//                 type="button"
//                 onClick={generateCaptcha}
//                 className="bg-blue-500 text-white px-3 py-1 rounded-lg"
//               >
//                 Refresh
//               </button>
//             </div>
//             <input
//               type="text"
//               value={captcha}
//               onChange={(e) => setCaptcha(e.target.value)}
//               className="w-full p-3 mt-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
//               placeholder="Enter captcha"
//             />
//           </div>
//           <button
//             type="button"
//             onClick={sendOtp}
//             className="w-full bg-blue-600 text-white py-3 rounded-lg mt-4 hover:bg-blue-700"
//           >
//             Send OTP
//           </button>
//           <div className="mb-5 mt-5">
//             <label className="block text-gray-700 text-sm font-medium">
//               OTP
//             </label>
//             <input
//               type="text"
//               value={otp}
//               onChange={(e) => setOtp(e.target.value)}
//               className="w-full p-3 border border-gray-300 rounded-lg mt-2 focus:ring-2 focus:ring-blue-400"
//               placeholder="Enter OTP"
//             />
//           </div>
//           <button
//             type="button"
//             onClick={validateOtp}
//             className="w-full bg-green-600 text-white py-3 rounded-lg mt-4 hover:bg-green-700"
//           >
//             Validate OTP and Signup
//           </button>
//         </form>
//         <p className="text-center text-red-500 mt-4">{message}</p>
//       </div>
//     </div>
//   );
// };

// export default SignupForm;


return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-indigo-600 to-purple-600 p-4">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-2xl transform transition-all duration-300 hover:scale-[1.02] hover:shadow-3xl">
        <h1 className="text-4xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 mb-8 animate-pulse-slow">
          Signup Form
        </h1>

        <form className="space-y-6">
          {/* Email Field */}
          <div className="relative group">
            <label
              className="block text-gray-700 text-sm font-medium mb-2 transition-colors group-focus-within:text-indigo-600"
              htmlFor="email"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-4 border border-gray-300 rounded-lg focus:ring-4 focus:ring-indigo-500/50 focus:outline-none text-sm transition-all duration-300 ease-in-out hover:border-indigo-400"
              placeholder="Enter your email"
            />
            <span className="absolute left-0 bottom-0 h-[2px] w-full bg-gradient-to-r from-indigo-500 to-purple-500 scale-x-0 group-focus-within:scale-x-100 transition-transform duration-300 origin-left"></span>
          </div>

          {/* Password Field */}
          <div className="relative group">
            <label
              className="block text-gray-700 text-sm font-medium mb-2 transition-colors group-focus-within:text-indigo-600"
              htmlFor="password"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-4 border border-gray-300 rounded-lg focus:ring-4 focus:ring-indigo-500/50 focus:outline-none text-sm transition-all duration-300 ease-in-out hover:border-indigo-400"
              placeholder="Enter your password"
            />
            <span className="absolute left-0 bottom-0 h-[2px] w-full bg-gradient-to-r from-indigo-500 to-purple-500 scale-x-0 group-focus-within:scale-x-100 transition-transform duration-300 origin-left"></span>
          </div>

          {/* Captcha Field */}
          <div className="space-y-3">
            <label
              className="block text-gray-700 text-sm font-medium"
              htmlFor="captcha"
            >
              Captcha
            </label>
            <div className="flex items-center justify-between bg-gray-100 p-3 rounded-lg shadow-inner">
              <span className="font-mono text-lg tracking-widest text-gray-700 select-none">
                {generatedCaptcha}
              </span>
              <button
                type="button"
                onClick={generateCaptcha}
                className="text-indigo-600 hover:text-indigo-800 font-semibold text-sm transition-colors group flex items-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1 group-hover:animate-spin" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Refresh
              </button>
            </div>
            <input
              type="text"
              id="captcha"
              value={captcha}
              onChange={(e) => setCaptcha(e.target.value)}
              className="w-full p-4 border border-gray-300 rounded-lg focus:ring-4 focus:ring-indigo-500/50 focus:outline-none text-sm transition-all duration-300 ease-in-out hover:border-indigo-400"
              placeholder="Enter captcha"
            />
          </div>

          {/* Send OTP Button */}
          <button
            type="button"
            onClick={sendOtp}
            className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-4 rounded-lg mt-2 hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg"
          >
            Send OTP
          </button>

          {/* OTP Field */}
          <div className="relative group">
            <label
              className="block text-gray-700 text-sm font-medium mb-2 transition-colors group-focus-within:text-indigo-600"
              htmlFor="otp"
            >
              OTP
            </label>
            <input
              type="text"
              id="otp"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="w-full p-4 border border-gray-300 rounded-lg focus:ring-4 focus:ring-indigo-500/50 focus:outline-none text-sm transition-all duration-300 ease-in-out hover:border-indigo-400"
              placeholder="Enter OTP"
            />
            <span className="absolute left-0 bottom-0 h-[2px] w-full bg-gradient-to-r from-indigo-500 to-purple-500 scale-x-0 group-focus-within:scale-x-100 transition-transform duration-300 origin-left"></span>
          </div>

          {/* Submit Button */}
          <button
            type="button"
            onClick={validateOtp}
            className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white py-4 rounded-lg mt-2 hover:from-green-600 hover:to-emerald-700 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg"
          >
            Validate OTP and Signup
          </button>

          {/* Error Message */}
          <p className="text-center text-red-500 mt-4 animate-bounce">{message}</p>
        </form>
      </div>
    </div>
  );
};



export default SignupForm;