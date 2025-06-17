import { useDispatch } from "react-redux";
import { doSignInWithGoogle } from "../../firebase/auth";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { FormLogin } from "../../componentes/Dashboard/Users/FormLogin";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onGoogleSignIn = async (e) => {
    e.preventDefault();
    dispatch(doSignInWithGoogle());
  };
  return (
    <div
      className="flex justify-center items-center h-screen"
      style={{
        background: "linear-gradient(135deg, #ffe4ec 0%, #fbc2eb 100%)",
      }}
    >
      <div className="w-1/2 h-full hidden lg:block">
        <img
          src="/logoNina.png"
          alt="Nina Logo"
          className="object-fill w-full h-full"
          style={{
            filter:
              "brightness(0) saturate(100%) invert(17%) sepia(80%) saturate(5000%) hue-rotate(310deg) brightness(1.1)",
          }}
        />
      </div>
      <div className="lg:p-36 md:p-52 sm:20 p-8 w-full h-full lg:w-1/2 flex justify-center gap-2 items-center flex-col">
        <h1 className="text-2xl font-semibold mb-4 text-center">Login</h1>
        <div className="mt-6 ml-10 mr-10 w-full">
          <FormLogin />
        </div>
        <div className="mt-6 ml-10 mr-10 w-full">
          <button
            onClick={onGoogleSignIn}
            className="group h-12 w-full px-6 border-2 border-gray-800 rounded-full transition duration-300 hover:border-primary focus:bg-pink-50 active:bg-pink-100"
          >
            <div className="relative flex items-center space-x-4 justify-center">
              <LazyLoadImage
                src="/logo-de-google.svg"
                className="absolute left-0 w-5"
                alt="google logo"
              />
              <span className="flex w-max ml-1 font-semibold tracking-wide text-gray-700 text-sm transition duration-300 group-hover:text-blue-600 sm:text-base">
                Google
              </span>
            </div>
          </button>
        </div>
        <div
          className="flex w-full mt-4
         justify-center items-center gap-2"
        >
          <span className="border border-pink-400 w-full"></span>
          <h3 className="text-sm text-gray-800 w-full text-center">
            O bien registrate
          </h3>
          <span className="border border-pink-400 w-full"></span>
        </div>
        <div className="mt-6 ml-10 mr-10 w-full">
          <button
            onClick={() => navigate("/register")}
            className="group h-12 w-full px-6 border-2 border-gray-800 rounded-full transition duration-300 hover:border-primary focus:bg-pink-50 active:bg-pink-100"
          >
            <div className="relative flex items-center space-x-4 justify-center">
              <img
                src="/add-user.png"
                alt="Registrate"
                className="absolute left-0 w-5"
              />

              <span className="flex w-max ml-1 font-semibold tracking-wide text-gray-800 text-sm transition duration-300 group-hover:text-pink-600 sm:text-base">
                Registrate
              </span>
            </div>
          </button>
        </div>
        <div className="flex w-full mt-2  justify-center items-center gap-2">
          <span className="border border-pink-400 w-full"></span>

          <Link
            to={"/"}
            className="text-sm border border-pink-400 hover:border-pink-400 hover:animate-pulse p-2 rounded-md text-gray-800 flex justify-center items-center gap-2 w-full text-nowrap"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m19.5 19.5-15-15m0 0v11.25m0-11.25h11.25"
              />
            </svg>
            Ir a la pagina principal
          </Link>
          <span className="border border-pink-400 w-full"></span>
        </div>
      </div>
    </div>
  );
};

export default Login;
