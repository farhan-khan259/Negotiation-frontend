import { AlertCircle, Bot, Check, Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authService } from "../services/auth";

const RegisterScreen = ({ onRegister }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    companyName: "",
    phone: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = () => {
    if (!formData.firstName.trim()) {
      setError("First name is required");
      return false;
    }
    if (!formData.lastName.trim()) {
      setError("Last name is required");
      return false;
    }
    if (!formData.email.trim()) {
      setError("Email is required");
      return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setError("Please enter a valid email address");
      return false;
    }
    if (!formData.password) {
      setError("Password is required");
      return false;
    }
    if (formData.password.length < 8) {
      setError("Password must be at least 8 characters long");
      return false;
    }
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return false;
    }
    if (!formData.companyName.trim()) {
      setError("Company name is required");
      return false;
    }
    if (!agreedToTerms) {
      setError("You must agree to the Terms of Service and Privacy Policy");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      await authService.register({
        email: formData.email,
        password: formData.password,
        name: `${formData.firstName} ${formData.lastName}`,
        company_name: formData.companyName,
      });

      setSuccess(
        "Registration successful! Please check your email to verify your account.",
      );
      
      // Auto navigate to login after 3 seconds
      setTimeout(() => {
        navigate("/login");
      }, 3000);
    } catch (err) {
      setError(err.message || "Registration failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4 py-8">
      <div className="w-full max-w-[480px]">
        <div className="card p-8 shadow-sm">
          {/* Logo and Title */}
          <div className="flex flex-col items-center mb-8">
            <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center mb-4">
              <Bot className="w-6 h-6 text-primary-foreground" />
            </div>
            <h1 className="text-2xl font-semibold text-foreground">
              Create Your Account
            </h1>
            <p className="text-sm text-muted-foreground mt-2 text-center">
              Join the Autonomous AI Negotiation Platform
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

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name Fields */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="firstName" className="label">
                  First Name
                </label>
                <input
                  id="firstName"
                  name="firstName"
                  type="text"
                  placeholder="John"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="input"
                  required
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="lastName" className="label">
                  Last Name
                </label>
                <input
                  id="lastName"
                  name="lastName"
                  type="text"
                  placeholder="Doe"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="input"
                  required
                />
              </div>
            </div>

            {/* Email */}
            <div className="space-y-2">
              <label htmlFor="email" className="label">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="john.doe@company.com"
                value={formData.email}
                onChange={handleChange}
                className="input"
                required
              />
            </div>

            {/* Company Name */}
            <div className="space-y-2">
              <label htmlFor="companyName" className="label">
                Company Name
              </label>
              <input
                id="companyName"
                name="companyName"
                type="text"
                placeholder="Acme Corporation"
                value={formData.companyName}
                onChange={handleChange}
                className="input"
                required
              />
            </div>

            {/* Phone */}
            <div className="space-y-2">
              <label htmlFor="phone" className="label">
                Phone Number (Optional)
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                placeholder="+1 (555) 123-4567"
                value={formData.phone}
                onChange={handleChange}
                className="input"
              />
            </div>

            {/* Password Fields */}
            <div className="space-y-2">
              <label htmlFor="password" className="label">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Create a strong password"
                  value={formData.password}
                  onChange={handleChange}
                  className="input pr-10"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
              <p className="text-xs text-muted-foreground">
                Minimum 8 characters with letters and numbers
              </p>
            </div>

            <div className="space-y-2">
              <label htmlFor="confirmPassword" className="label">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm your password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="input pr-10"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showConfirmPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Terms and Conditions */}
            <div className="space-y-4">
              <label className="checkbox flex items-start gap-3">
                <input
                  type="checkbox"
                  checked={agreedToTerms}
                  onChange={(e) => setAgreedToTerms(e.target.checked)}
                  className="checkbox-input"
                />
                <span className="checkbox-box" />
                <div>
                  <span className="cursor-pointer">
                    I agree to the Terms of Service and Privacy Policy
                  </span>
                  <p className="text-xs text-muted-foreground mt-1">
                    By creating an account, you agree to our terms and privacy
                    policy.
                  </p>
                </div>
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="btn btn-primary w-full h-11"
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Creating Account...
                </span>
              ) : (
                "Create Account"
              )}
            </button>
          </form>

          {/* Already have account */}
          <div
            className="mt-8 pt-6  border-border text-center"
            style={{ marginTop: "20px" }}
          >
            <p className="text-sm text-muted-foreground">
              Already have an account?{" "}
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

export default RegisterScreen;
