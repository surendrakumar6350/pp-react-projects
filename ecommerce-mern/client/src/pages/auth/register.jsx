import CommonForm from "@/components/common/form";
import { registerFormControls } from "@/config";
import { registerUser } from "@/store/auth-slice";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

const initialState = {
  userName: '',
  email: '',
  password: ''
};

function AuthRegister() {
  const [formData, setFormData] = useState(initialState);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function onsSubmit(event) {
    event.preventDefault();
    dispatch(registerUser(formData)).then((data) => {
      if (data?.payload?.success) {
        toast(
            <div>
              <strong className="text-[16px] text-green-800">Registration successful!</strong>
              {/* <p className="text-sm text-green-500 text-muted-foreground">Welcome to our page.</p> */}
            </div>,
            {
                duration: 4000
            }
          );
        navigate('/auth/login');
      } else {
        toast(
            <div>
              <strong className="text-[16px] text-red-600">Registration failed!</strong>
              <p className="text-[14px] text-red-400 text-muted-foreground">{data?.payload?.message}</p>
            </div>,
            {
                duration: 4000,
            }
          );
      }
    });
  }

  return (
    <div className="mx-auto w-full max-w-md space-y-6">
      <div className="text-center text-black">
        <h1 className="text-3xl font-bold tracking-tight">Create new account</h1>
        <p className="mt-2">
          Already have an account
          <Link className="font-medium ml-2 hover:underline" to={'/auth/login'}>Login</Link>
        </p>
      </div>
      <CommonForm
        formControls={registerFormControls}
        buttonText={'Sign Up'}
        formData={formData}
        setFormData={setFormData}
        onSubmit={onsSubmit}
      />
    </div>
  );
}

export default AuthRegister;
