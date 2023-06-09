import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../AuthProvider/AuthProvider";
import { EyeOff, Eye } from "lucide-react";

const Registration = () => {
  const [successMessage, setSuccessMessage] = useState("");
  const [ErrorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { EmailRegister, profileUpdate, LogOut } = useContext(AuthContext);
  const navigate = useNavigate();

  const from = "/login";

  const handleRegister = (event) => {
    event.preventDefault();
    const target = event.target;
    const emailValue = target.email.value;
    const passwordValue = target.password.value;
    const displayName = target.name.value;
    const photoURL = target.photo.value;

    EmailRegister(emailValue, passwordValue)
      .then((result) => {
        console.log(result.user);
        setSuccessMessage("Registration successfully !!!");
        setErrorMessage("");
        navigate(from, { replace: true });
        target.reset();
        LogOut();
        updateUserData(result.user, displayName, photoURL);
      })
      .catch((error) => {
        const errorMessage = error.message;
        setErrorMessage(errorMessage);
        setSuccessMessage("");
      });
  };

  const updateUserData = (user, name, photo) => {
    profileUpdate(user, name, photo)
      .then(() => {
        setSuccessMessage("Profile Updated!!!");
        setErrorMessage("");
      })
      .catch((error) => {
        console.log(error);
        const errorMessage = error.message;
        setErrorMessage(errorMessage);
        setSuccessMessage("");
      });
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="bg-base-200">
      <div className="flex flex-col items-center justify-center py-10">
        <div className="text-center">
          <h1 className="text-5xl font-bold py-6">Register now!</h1>
        </div>
        <div className="card flex-shrink-0 pb-8 w-full max-w-sm shadow-2xl bg-base-100">
          <form onSubmit={handleRegister}>
            <div className="px-8 pt-8">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Name</span>
                </label>
                <input
                  type="text"
                  placeholder="Enter Your Name"
                  className="input input-bordered"
                  name="name"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  placeholder="Enter email"
                  className="input input-bordered"
                  name="email"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter Password"
                  className="input input-bordered"
                  name="password"
                  required
                />
                <p
                  className="absolute bottom-56 right-10 bg-slate-200 p-1 rounded-2xl"
                  onClick={handleTogglePasswordVisibility}
                >
                  {showPassword ? (
                    <div>
                      <span>
                        <EyeOff color="black" size={20} />
                      </span>
                    </div>
                  ) : (
                    <div>
                      <span>
                        <Eye color="black" size={20} />
                      </span>
                    </div>
                  )}
                </p>
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Photo URL</span>
                </label>
                <input
                  type="text"
                  placeholder="Enter Your Photo URL"
                  className="input input-bordered"
                  name="photo"
                  required
                />
                <label className="label">
                  <Link
                    to="/login"
                    className="label-text-alt link link-hover my-2"
                  >
                    Already have an account? Login Here
                  </Link>
                </label>
              </div>
              {ErrorMessage && (
                <p className="text-red-500 pb-2">{ErrorMessage}</p>
              )}
              {successMessage && (
                <p className="text-green-500 pb-2">{successMessage}</p>
              )}
              <div className="form-control">
                <button className="btn">Register</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Registration;
