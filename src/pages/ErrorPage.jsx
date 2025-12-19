import { useNavigate } from "react-router";
import error from "../assets/images/error.png";

const ErrorPage = () => {
  const navigate = useNavigate();

  return (
    <section className="min-h-screen flex items-center justify-center bg-linear-to-br from-sky-50 to-white px-6">
      <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8 text-center">
        <div className="flex justify-center mb-6">
          <img src={error} alt="Error" className="w-40 h-auto" />
        </div>

        <h1 className="text-3xl font-bold text-gray-800">
          Oops! Something went wrong
        </h1>

        <p className="mt-3 text-gray-500">
          The page you’re trying to access doesn’t exist or an unexpected error
          has occurred.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={() => navigate(-1)}
            className="
              px-6 py-2.5
              rounded-full
              border border-gray-300
              text-gray-700
              hover:bg-gray-100
              transition
            "
          >
            ← Go Back
          </button>

          <button
            onClick={() => navigate("/")}
            className="
              px-6 py-2.5
              rounded-full
              bg-[#3badcd]
              text-white
              font-medium
              hover:bg-[#3badcd]/90
              transition
            "
          >
            Take Me Home
          </button>
        </div>
      </div>
    </section>
  );
};

export default ErrorPage;
