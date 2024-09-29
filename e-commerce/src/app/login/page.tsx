import Link from "next/link";
import { doLogin } from "./action";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  return (
    <>
      <ToastContainer />
      <div className="flex items-center justify-center min-h-screen bg-gray-200">
        <div className="w-96 bg-white shadow-lg rounded-lg p-6">
          <div className="text-gray-900">
            <h2 className="text-center text-2xl font-semibold mb-4"> Sign In</h2>
            <form action={doLogin} className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm mb-1 text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="w-full p-2 border border-gray-300 rounded-lg placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  placeholder="you@mail.com"
                  required
                />
                <label htmlFor="email" className="block text-sm mb-1 text-gray-700">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  className="w-full p-2 border border-gray-300 rounded-lg placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  placeholder="••••••••"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full py-2 bg-gray-300 text-orange-600 rounded-lg "
                // disabled
              >
                Sign In
              </button>
            </form>
            <p className="text-center mt-4">
              Dont have an account?{" "}
              <Link href="/register" className="text-orange-600 hover:underline">
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
