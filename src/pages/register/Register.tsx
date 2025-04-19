import { Button } from "antd";
import BSForm from "../../components/form/CSForm";
import BSInput from "../../components/form/CSInput";
import BSPassword from "../../components/form/CSPassword";
import { useRegistrationMutation } from "../../redux/features/auth/authApi";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";
import { NavLink, useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [register] = useRegistrationMutation();

  const onSubmit = async (data: FieldValues) => {
    const regData = {
      name: data?.name,
      email: data?.email,
      password: data?.password,
    };

    const regId = toast.loading("Please Wait, Registering...");

    try {
      const res = await register(regData);
      console.log("this is res = ", res);
      if (res?.error) {
        toast.error("Try Again...", { id: regId, duration: 2000 });
      } else {
        toast.success("Registration Successfully Done!", { id: regId, duration: 2000 });
        navigate("/login");
      }
    } catch (err) {
      toast.error("Something went wrong...!", { id: regId, duration: 2000 });
      console.log(err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-red-100 px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-3xl shadow-xl border border-red-200">
        <h1 className="text-4xl font-bold text-center text-red-600 mb-2">
          Create Account
        </h1>
        <p className="text-center text-gray-500 mb-6">
          Join our community by creating your account.
        </p>

        <BSForm onSubmit={onSubmit}>
          <div className="space-y-4">
            <BSInput
              name="name"
              label="Name"
              type="text"
              rules={{
                required: "Name is required",
              }}
            />
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
              Already have an account?{" "}
              <NavLink
                to="/login"
                className="text-red-500 font-semibold hover:underline"
              >
                Login
              </NavLink>
            </span>
          </div>

          <Button
            htmlType="submit"
            type="primary"
            className="mt-6 w-full h-10 text-md font-semibold rounded-xl bg-red-600 hover:bg-red-700"
          >
            Register
          </Button>
        </BSForm>
      </div>
    </div>
  );
};

export default Register;
