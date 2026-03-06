import { AlertCircle, ArrowLeft, Bot, Check, Mail } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const ForgotPasswordScreen = ({ onResetPassword }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState(1); // 1: Enter email, 2: Reset code, 3: New password

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!email.trim()) {
      setError("Please enter your email address");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email address");
      return;
    }

    setIsLoading(true);

    // Simulate API call delay
    setTimeout(() => {
      console.log("Password reset requested for:", email);
      setSuccess(`Reset instructions sent to ${email}`);
      setIsLoading(false);
      setStep(2);
    }, 1000);
  };

  const handleResetCodeSubmit = (e) => {
    e.preventDefault();
    setError("");

    const code = e.target.code.value;
    if (!code || code.length !== 6) {
      setError("Please enter a valid 6-digit code");
      return;
    }

    setIsLoading(true);

    // Simulate API call delay
    setTimeout(() => {
      setStep(3);
      setIsLoading(false);
    }, 1000);
  };

  const handleNewPasswordSubmit = (e) => {
    e.preventDefault();
    setError("");

    const newPassword = e.target.newPassword.value;
    const confirmPassword = e.target.confirmPassword.value;

    if (!newPassword || newPassword.length < 8) {
      setError("Password must be at least 8 characters long");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setIsLoading(true);

    // Simulate API call delay
    setTimeout(() => {
      setSuccess(
        "Password reset successful! You can now sign in with your new password.",
      );
      setIsLoading(false);

      // Auto navigate to login after 3 seconds
      setTimeout(() => {
        navigate("/login");
      }, 3000);
    }, 1000);
  };

  const resendCode = () => {
    setSuccess("New code sent to your email");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="w-full max-w-[440px]">
        {/* Back Button */}
        <button
          onClick={() => navigate("/login")}
          className="btn btn-ghost mb-6 -ml-2 text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="w-4 h-4 mr-1" />
          Back to Sign In
        </button>

        <div className="card p-8 shadow-sm">
          {/* Logo and Title */}
          <div className="flex flex-col items-center mb-8">
            <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center mb-4">
              <Bot className="w-6 h-6 text-primary-foreground" />
            </div>
            <h1 className="text-2xl font-semibold text-foreground">
              {step === 1 && "Reset Your Password"}
              {step === 2 && "Enter Reset Code"}
              {step === 3 && "Create New Password"}
            </h1>
            <p className="text-sm text-muted-foreground mt-2 text-center">
              {step === 1 && "Enter your email to receive reset instructions"}
              {step === 2 && `We sent a 6-digit code to ${email}`}
              {step === 3 && "Create a new password for your account"}
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 rounded-lg bg-destructive/10 border border-destructive/20 flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
              <p className="text-sm text-destructive">{error}</p>
            </div>
          )}

          {/* Success Message */}
          {success && (
            <div className="mb-6 p-4 rounded-lg bg-success/10 border border-success/20 flex items-start gap-3">
              <Check className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
              <p className="text-sm text-success">{success}</p>
            </div>
          )}

          {/* Step 1: Enter Email */}
          {step === 1 && (
            <form onSubmit={handleEmailSubmit} className="space-y-6">
              <div className="space-y-2">
                <label htmlFor="email" className="label">
                  Email address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <input
                    id="email"
                    type="email"
                    placeholder="you@company.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="input pl-10"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                className="btn btn-primary w-full h-11"
                disabled={isLoading}
              >
                {isLoading ? (
                  <span className="flex items-center justify-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Sending Code...
                  </span>
                ) : (
                  "Send Reset Code"
                )}
              </button>
            </form>
          )}

          {/* Step 2: Enter Reset Code */}
          {step === 2 && (
            <>
              <form onSubmit={handleResetCodeSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label htmlFor="code" className="label">
                    6-Digit Reset Code
                  </label>
                  <input
                    id="code"
                    name="code"
                    type="text"
                    placeholder="123456"
                    maxLength="6"
                    pattern="[0-9]{6}"
                    className="input text-center text-2xl tracking-widest"
                    required
                  />
                  <p className="text-xs text-muted-foreground text-center">
                    Enter the 6-digit code sent to your email
                  </p>
                </div>

                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="btn btn-outline flex-1 h-11"
                    disabled={isLoading}
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    className="btn btn-primary flex-1 h-11"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <span className="flex items-center justify-center gap-2">
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Verifying...
                      </span>
                    ) : (
                      "Verify Code"
                    )}
                  </button>
                </div>
              </form>

              <div className="mt-6 text-center">
                <button
                  type="button"
                  onClick={resendCode}
                  className="text-sm text-primary hover:text-primary/80"
                >
                  Didn't receive the code? Resend
                </button>
              </div>
            </>
          )}

          {/* Step 3: New Password */}
          {step === 3 && (
            <form onSubmit={handleNewPasswordSubmit} className="space-y-6">
              <div className="space-y-2">
                <label htmlFor="newPassword" className="label">
                  New Password
                </label>
                <input
                  id="newPassword"
                  name="newPassword"
                  type="password"
                  placeholder="Create a strong password"
                  className="input"
                  required
                />
                <p className="text-xs text-muted-foreground">
                  Minimum 8 characters with letters and numbers
                </p>
              </div>

              <div className="space-y-2">
                <label htmlFor="confirmPassword" className="label">
                  Confirm New Password
                </label>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  placeholder="Confirm your new password"
                  className="input"
                  required
                />
              </div>

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="btn btn-outline flex-1 h-11"
                  disabled={isLoading}
                >
                  Back
                </button>
                <button
                  type="submit"
                  className="btn btn-primary flex-1 h-11"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <span className="flex items-center justify-center gap-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Resetting...
                    </span>
                  ) : (
                    "Reset Password"
                  )}
                </button>
              </div>
            </form>
          )}

          {/* Already have account */}
          <div
            className="mt-8 pt-6  border-border text-center"
            style={{ marginTop: "20px" }}
          >
            <p className="text-sm text-muted-foreground">
              Remember your password?{" "}
              <button
                type="button"
                onClick={() => navigate("/login")}
                className="btn btn-primary w-medium h-6"
              >
                Sign in
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordScreen;
