import { Link, Navigate, useLocation, useNavigate } from "react-router";
import toast from "react-hot-toast";
import LoadingSpinner from "../../components/Shared/LoadingSpinner";
import useAuth from "../../hooks/useAuth";
import { FcGoogle } from "react-icons/fc";
import { TbFidgetSpinner } from "react-icons/tb";
import { useForm } from "react-hook-form";
import { saveOrUpdateUser } from "../../utils";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { FaEye } from "react-icons/fa6";
import { IoEyeOff } from "react-icons/io5";
const Login = () => {
  const { signIn, signInWithGoogle, loading, user, setLoading } = useAuth();
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state || "/";
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  if (loading) return <LoadingSpinner />;
  if (user) return <Navigate to={from} replace={true} />;

  const onSubmit = async (data) => {
    try {
      await signIn(data.email, data.password);
      navigate(from, { replace: true });
      toast.success("Login Successful");
    } catch (err) {
      console.log(err);
      toast.error(err?.message);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      setLoading(true);

      const { user } = await signInWithGoogle();

      // Google Signup → role = buyer by default
      await saveOrUpdateUser({
        name: user?.displayName,
        email: user?.email,
        image: user?.photoURL,
        role: "buyer",
      });

      navigate(from, { replace: true });
      toast.success("Signup Successful");
    } catch (err) {
      console.log(err);
      toast.error(err?.message);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-white">
      <div className="flex flex-col w-full max-w-md p-6 rounded-md border border-gray-200 sm:p-10  text-gray-900 m-4">
        <div className="mb-8 text-center">
          <h1 className="my-3 text-4xl text-[#3BADCD] font-bold">Log In</h1>
          <p className="text-sm text-gray-400">
            Sign in to access your account
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Email */}
          <div>
            <label htmlFor="email" className="block mb-2 text-sm">
              Email address
            </label>
            <Input
              type="email"
              id="email"
              placeholder="Enter Your Email Here"
              className="w-full px-4 py-5 border rounded-full bg-gray-200 border-gray-300"
              {...register("email", { required: true })}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">Email is required</p>
            )}
          </div>

          {/* Password */}
          <div className="relative">
            <label htmlFor="password" className="block mb-2 text-sm">
              Password
            </label>
            <Input
              type={show ? "text" : "password"}
              id="password"
              placeholder="••••••••"
              className="w-full px-4 py-5 border rounded-full border-gray-300  bg-gray-200 text-gray-900"
              {...register("password", {
                required: true,
                minLength: 6,
              })}
            />
            <span
              onClick={() => setShow(!show)}
              className="absolute right-4 top-10 cursor-pointer "
            >
              {show ? <FaEye /> : <IoEyeOff />}
            </span>
            {errors.password?.type === "required" && (
              <p className="text-red-500 text-sm mt-1">Password is required</p>
            )}
            {errors.password?.type === "minLength" && (
              <p className="text-red-500 text-sm mt-1">
                Password must be at least 6 characters long
              </p>
            )}
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            className="bg-[#3BADCD] w-full rounded-full py-5 text-white hover:bg-[#3BADCD]/80 mt-4"
          >
            {loading ? <TbFidgetSpinner className="animate-spin " /> : "Login"}
          </Button>
        </form>

        <div className="space-y-1 mt-3">
          <button className="text-xs hover:underline  text-gray-500 cursor-pointer">
            Forgot password?
          </button>
        </div>

        {/* Divider */}
        <div className="flex items-center pt-4 space-x-1">
          <div className="flex-1 h-px bg-gray-300"></div>
          <p className="px-3 text-sm text-gray-400">
            Login with social accounts
          </p>
          <div className="flex-1 h-px bg-gray-300"></div>
        </div>

        {/* Google Login */}

        <Button
          onClick={handleGoogleSignIn}
          className="flex justify-center items-center  border my-3 p-5 bg-[#3BADCD] hover:bg-[#3BADCD]/80 rounded-full cursor-pointer"
        >
          <FcGoogle size={32} />
          <p>Continue with Google</p>
        </Button>

        <p className="px-6 text-sm text-center text-gray-400">
          Don&apos;t have an account yet?{" "}
          <Link
            state={from}
            to="/signup"
            className="hover:underline text-gray-600"
          >
            Register
          </Link>
          .
        </p>
      </div>
    </div>
  );
};

export default Login;
