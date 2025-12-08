import { Link, useLocation, useNavigate } from "react-router";
import { FcGoogle } from "react-icons/fc";
import useAuth from "../../hooks/useAuth";
import { toast } from "react-hot-toast";
import { TbFidgetSpinner } from "react-icons/tb";
import { useForm } from "react-hook-form";
import { saveOrUpdateUser } from "../../utils";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/button";
import { FaEye } from "react-icons/fa6";
import { IoEyeOff } from "react-icons/io5";
import { useState } from "react";
const SignUp = () => {
  const { createUser, updateUserProfile, signInWithGoogle, loading } =
    useAuth();
  const [show, setShow] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state || "/";

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const { name, image, email, password, role } = data;

    console.log(name, email, image, password, role);

    try {
      // Upload image

      // Create firebase user
      const result = await createUser(email, password);

      // Save new user to backend with ROLE
      await saveOrUpdateUser({
        name,
        email,
        image,
        role,
      });

      //   // Update firebase profile
      await updateUserProfile(name, image);

      navigate(from, { replace: true });
      toast.success("Signup Successful");
      console.log(result);
    } catch (err) {
      console.log(err);
      toast.error(err?.message);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
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
          <h1 className="my-3 text-4xl text-[#3BADCD] font-bold">Sign Up</h1>
          <p className="text-sm text-gray-400">Welcome to GarmentsFlow</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            {/* NAME */}
            <div>
              <label htmlFor="name" className="block mb-2 text-sm">
                Name
              </label>
              <Input
                type="text"
                id="name"
                placeholder="Enter Your Name Here"
                className="w-full px-4 py-5 border rounded-full bg-gray-200 border-gray-300 focus:outline-lime-500"
                {...register("name", {
                  required: "Name is required",
                  maxLength: {
                    value: 20,
                    message: "Name cannot be too long",
                  },
                })}
              />
              {errors.name && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.name.message}
                </p>
              )}
            </div>

            {/* IMAGE */}
            <div>
              <label htmlFor="image" className="block mb-2 text-sm">
                Profile Image
              </label>
              <Input
                type="text"
                id="image"
                placeholder="Enter your photoURL"
                className="block w-ful bg-gray-200 text-sm text-gray-500  
                    border-gray-300
                rounded-full cursor-pointer py-5"
                {...register("image", {
                  required: "PhotoURL is required",
                })}
              />
            </div>

            {/* EMAIL */}
            <div>
              <label htmlFor="email" className="block mb-2 text-sm">
                Email address
              </label>
              <Input
                type="email"
                id="email"
                placeholder="Enter Your Email Here"
                className="w-full px-4 py-5 border rounded-full bg-gray-200 border-gray-300"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    message: "Please enter a valid email address.",
                  },
                })}
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* ROLE */}
            <div>
              <label htmlFor="role" className="block mb-2 text-sm">
                Role
              </label>
              <select
                name="role"
                id="role"
                className="w-full px-4 py-2 border rounded-full bg-gray-200 border-gray-300 focus:outline-gray-500"
                {...register("role", { required: true })}
              >
                <option value="" disabled className="text-gray-400">
                  Select Role
                </option>
                <option value="buyer">buyer</option>
                <option value="manager">manager</option>
              </select>
              {errors.role && (
                <p className="text-red-500 text-xs mt-1">Role is required</p>
              )}
            </div>

            {/* PASSWORD */}
            <div className="relative">
              <label htmlFor="password" className="block mb-2 text-sm">
                Password
              </label>
              <Input
                type={show ? "text" : "password"}
                id="password"
                placeholder="••••••••"
                className="w-full px-4 py-5 border rounded-full bg-gray-200 border-gray-300"
                {...register("password", {
                  required: "Password is required",

                  pattern: {
                    value: /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/,
                    message:
                      "Password must be 6 character long and must contain at least one uppercase & one lowercase letter",
                  },
                })}
              />
              <span
                onClick={() => setShow(!show)}
                className="absolute right-4 top-10 cursor-pointer "
              >
                {show ? <FaEye /> : <IoEyeOff />}
              </span>
              {errors.password && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>
          </div>

          <Button
            type="submit"
            className="bg-[#3BADCD] w-full rounded-full py-5 text-white hover:bg-[#3BADCD]/80"
          >
            {loading ? (
              <TbFidgetSpinner className="animate-spin " />
            ) : (
              "Register"
            )}
          </Button>
        </form>

        {/* SOCIAL LOGIN */}
        <div className="flex items-center pt-4 space-x-1">
          <div className="flex-1 h-px bg-gray-300"></div>
          <p className="px-3 text-sm text-gray-400">
            Signup with social accounts
          </p>
          <div className="flex-1 h-px bg-gray-300"></div>
        </div>

        <Button
          onClick={handleGoogleSignIn}
          className="flex justify-center items-center  border my-3 p-5 bg-[#3BADCD] hover:bg-[#3BADCD]/80 rounded-full cursor-pointer"
        >
          <FcGoogle size={32} />
          <p>Continue with Google</p>
        </Button>

        <p className="px-6 text-sm text-center text-gray-400">
          Already have an account?{" "}
          <Link
            to="/login"
            className="hover:underline hover:text-blue text-gray-600"
          >
            Login
          </Link>
          .
        </p>
      </div>
    </div>
  );
};

export default SignUp;
