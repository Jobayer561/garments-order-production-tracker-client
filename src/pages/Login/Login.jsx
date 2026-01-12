import { Link, Navigate, useLocation, useNavigate } from "react-router";
import toast from "react-hot-toast";
import LoadingSpinner from "../../components/Shared/LoadingSpinner";
import useAuth from "../../hooks/useAuth";
import { FcGoogle } from "react-icons/fc";
import { useForm } from "react-hook-form";
import { saveOrUpdateUser } from "../../utils";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/button";
import { useMemo, useState } from "react";
import { FaEye } from "react-icons/fa6";
import { IoEyeOff } from "react-icons/io5";
import { LuLoader } from "react-icons/lu";

const Login = () => {
  const { signIn, signInWithGoogle, loading, user, setLoading } = useAuth();
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state || "/";
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const demoOptions = useMemo(
    () => [
      { label: "Select demo", email: "", password: "" },
      { label: "Admin", email: "jobayer9561@gmail.com", password: "Abcdef" },
      {
        label: "Manager",
        email: "jobayernayeem516@gmail.com",
        password: "Abcdef",
      },
      { label: "Buyer", email: "jobayer3085@gmail.com", password: "Abcdef" },
    ],
    []
  );
  const [selectedDemo, setSelectedDemo] = useState(demoOptions[0]);

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

      await saveOrUpdateUser({
        name: user?.displayName,
        email: user?.email,
        image: user?.photoURL,
        role: "Buyer",
      });

      navigate(from, { replace: true });
      toast.success("Signup Successful");
    } catch (err) {
      console.log(err);
      toast.error(err?.message);
    }
  };

  return (
    <div className="flex justify-center items-center  mt-24 mb-8 md:px-0 px-8">
      <div className="flex flex-col w-full max-w-md p-6 rounded-md border border-gray-200 sm:p-10  text-gray-900">
        <div className="mb-8 text-center">
          <h1 className="my-3 text-4xl text-[#3BADCD] font-bold">Log In</h1>
          <p className="text-sm text-gray-400">
            Sign in to access your account
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label className="block mb-2 text-sm text-gray-400">
              Demo role
            </label>
            <select
              className="w-full rounded-full border border-gray-300 bg-gray-100 px-4 py-3 text-sm focus:outline-none"
              value={selectedDemo.label}
              onChange={async (e) => {
                const next =
                  demoOptions.find((opt) => opt.label === e.target.value) ||
                  demoOptions[0];
                setSelectedDemo(next);
                if (next.email) {
                  setValue("email", next.email, {
                    shouldValidate: true,
                    shouldDirty: true,
                  });
                  setValue("password", next.password, {
                    shouldValidate: true,
                    shouldDirty: true,
                  });

                  try {
                    await signIn(next.email, next.password);
                    navigate(from, { replace: true });
                    toast.success("Login Successful");
                  } catch (err) {
                    console.log(err);
                    toast.error(err?.message);
                  }
                } else {
                  setValue("email", "", {
                    shouldValidate: true,
                    shouldDirty: true,
                  });
                  setValue("password", "", {
                    shouldValidate: true,
                    shouldDirty: true,
                  });
                }
              }}
            >
              {demoOptions.map((opt) => (
                <option key={opt.label} value={opt.label}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="email" className="block mb-2 text-sm text-gray-400">
              Email address
            </label>
            <Input
              type="email"
              id="email"
              placeholder="Enter Your Email Here"
              className="block w-full bg-gray-200 text-sm  border-gray-300 rounded-full cursor-pointer py-5"
              {...register("email", { required: true })}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">Email is required</p>
            )}
          </div>

          <div className="relative">
            <label
              htmlFor="password"
              className="block mb-2 text-sm text-gray-400"
            >
              Password
            </label>
            <Input
              type={show ? "text" : "password"}
              id="password"
              placeholder="••••••••"
              className="block w-full bg-gray-200 text-sm  border-gray-300 rounded-full cursor-pointer py-5"
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

          <Button
            type="submit"
            className="bg-[#3BADCD] w-full rounded-full py-5 text-white hover:bg-[#3BADCD]/80 mt-4 hover:scale-105 transition-transform"
          >
            {loading ? <LuLoader className="animate-spin " /> : "Login"}
          </Button>
        </form>

        <div className="space-y-1 mt-3">
          <button className="text-xs hover:underline  text-gray-500 cursor-pointer">
            Forgot password?
          </button>
        </div>

        <div className="flex items-center pt-4 space-x-1">
          <div className="flex-1 h-px bg-gray-300"></div>
          <p className="px-3 text-sm text-gray-400">
            Login with social accounts
          </p>
          <div className="flex-1 h-px bg-gray-300"></div>
        </div>

        <Button
          onClick={handleGoogleSignIn}
          className="flex justify-center items-center  text-white my-3 p-5 bg-[#3BADCD] hover:bg-[#3BADCD]/80 rounded-full cursor-pointer hover:scale-105 transition-transform"
        >
          <FcGoogle size={32} />
          <p>Continue with Google</p>
        </Button>

        <p className="px-6 text-sm text-center text-gray-400">
          Don't have an account yet?{" "}
          <Link
            state={from}
            to="/signup"
            className="hover:underline text-[#3BADCD]"
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
