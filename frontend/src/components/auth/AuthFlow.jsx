import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Email from "./Email";
import Otp from "./Otp";
import AccountCreation from "./AccountCreation";
import { useAuth } from "../../context/authContext";

const AuthFlow = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  
  const [step, setStep] = useState("email"); // "email" | "otp" | "account"
  const [authData, setAuthData] = useState({
    email: "",
    hash: "",
    user: null,
  });

  const handleEmailSuccess = (data) => {
    setAuthData((prev) => ({
      ...prev,
      email: data.email,
      hash: data.hash,
    }));
    setStep("otp");
  };

  const handleOtpSuccess = (user) => {
    setAuthData((prev) => ({
      ...prev,
      user,
    }));
    
    // Check if user already has complete profile
    if (user.phone && user.name) {
      // User already has full profile, auto-redirect
      login(user);
      navigate("/");
    } else {
      // Show account creation form
      setStep("account");
    }
  };

  const handleBack = () => {
    setStep("email");
    setAuthData({
      email: "",
      hash: "",
      user: null,
    });
  };

  return (
    <>
      {step === "email" && <Email onSuccess={handleEmailSuccess} />}
      {step === "otp" && (
        <Otp
          email={authData.email}
          hash={authData.hash}
          onSuccess={handleOtpSuccess}
          onBack={handleBack}
        />
      )}
      {step === "account" && authData.user && (
        <AccountCreation user={authData.user} />
      )}
    </>
  );
};

export default AuthFlow;
