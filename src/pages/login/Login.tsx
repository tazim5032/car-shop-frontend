import { Button } from "antd";
import BSForm from "../../components/form/CSForm";
import BSInput from "../../components/form/CSInput";
import BSPassword from "../../components/form/CSPassword";
import { NavLink, useNavigate } from "react-router-dom";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";
import { useLoginMutation } from "../../redux/features/auth/authApi";
import { VerifyToken } from "../../utils/verifyToken";
import { setUser, TUser } from "../../redux/features/auth/AuthSlice";
import { useAppDispatch } from "../../redux/features/hook";

const Login = () => {
  const [login] = useLoginMutation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const onSubmit = async (data: FieldValues) => {
    const loginIn = toast.loading("Please Wait, Logging in...");
    const logData = {
      email: data?.email,
      password: data?.password,
    };

    try {
      const res = await login(logData).unwrap();
      const user = VerifyToken(res?.data?.accessToken) as TUser;
      dispatch(setUser({ user, token: res?.data?.accessToken }));
      toast.success(res?.message, { id: loginIn, duration: 2000 });
      navigate("/");
    } catch (err) {
      toast.error("Something went wrong. Try Again..!", {
        id: loginIn,
        duration: 2000,
      });
      console.log(err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-red-100 px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-3xl shadow-xl border border-red-200">
        <h1 className="text-4xl font-bold text-center text-red-600 mb-2">
          Welcome Back
        </h1>
        <p className="text-center text-gray-500 mb-6">
          Please log in to your account.
        </p>

        <BSForm onSubmit={onSubmit}>
          <div className="space-y-4">
            <BSInput
              name="email"
              label="Email"
              type="email"
              rules={{
                required: "Email is required",
                pattern: { value: /^\S+@\S+$/, message: "Invalid email" },
              }}
            />
            <BSPassword
              name="password"
              label="Password"
              type="password"
              rules={{
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              }}
            />
          </div>

          <div className="mt-6 flex items-center justify-between text-sm text-gray-600">
            <span>
              Don't have an account?{" "}
              <NavLink
                to="/register"
                className="text-red-500 font-semibold hover:underline"
              >
                Register
              </NavLink>
            </span>
            <NavLink
              to="/forgot-password"
              className="text-gray-400 hover:underline"
            >
              Forgot password?
            </NavLink>
          </div>

          <Button
            htmlType="submit"
            type="primary"
            className="mt-6 w-full h-10 text-md font-semibold rounded-xl bg-red-600 hover:bg-red-700"
          >
            Login
          </Button>
        </BSForm>
      </div>
    </div>
  );
};

export default Login;
