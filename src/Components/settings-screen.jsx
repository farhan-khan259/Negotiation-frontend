import {
  Bot,
  ChevronLeft,
  Moon,
  Settings as SettingsIcon,
  Sun,
  User,
} from "lucide-react";
import { useEffect, useState } from "react";

const SettingsScreen = ({ onBack }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Initialize theme from localStorage or system preference
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)",
    ).matches;

    if (savedTheme === "dark" || (!savedTheme && prefersDark)) {
      setIsDarkMode(true);
      document.documentElement.setAttribute("data-theme", "dark");
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDarkMode;
    setIsDarkMode(newTheme);

    if (newTheme) {
      document.documentElement.setAttribute("data-theme", "dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.removeAttribute("data-theme");
      localStorage.setItem("theme", "light");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Top Navigation */}
      <nav className="bg-card border-b border-border">
        <div className="max-w-[1440px] mx-auto px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <Bot className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-semibold text-foreground">
              AI Negotiation Platform
            </span>
          </div>
          <div className="flex items-center gap-3">
            {/* Theme Toggle */}
            <label className="mode-toggle">
              <input
                type="checkbox"
                className="mode-toggle-input"
                checked={isDarkMode}
                onChange={toggleTheme}
              />
              <div className="mode-toggle-track">
                <div className="mode-toggle-icons">
                  <Sun className="mode-toggle-sun" />
                  <Moon className="mode-toggle-moon" />
                </div>
              </div>
            </label>

            <button className="btn btn-ghost btn-icon">
              <SettingsIcon className="w-5 h-5 text-foreground" />
            </button>
            <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
              <User className="w-5 h-5 text-primary" />
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-[1440px] mx-auto px-8 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Back Button */}
          <button
            onClick={onBack}
            className="btn btn-ghost mb-6 -ml-2 text-muted-foreground hover:text-foreground"
          >
            <ChevronLeft className="w-4 h-4 mr-1" />
            Back to Dashboard
          </button>

          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-semibold text-foreground mb-2">
              Settings
            </h1>
            <p className="text-muted-foreground">
              Manage your account preferences and AI configuration
            </p>
          </div>

          <div className="space-y-6">
            {/* Account Management */}
            <div className="card p-6 rounded-xl">
              <h3 className="text-lg font-semibold text-foreground mb-4">
                Account Management
              </h3>
              <div className="space-y-6">
                <div>
                  <label className="text-sm text-muted-foreground mb-1 block">
                    Email Address
                  </label>
                  <div className="p-3 rounded-lg bg-accent/50 border border-border">
                    <p className="font-medium text-foreground">
                      john.doe@company.com
                    </p>
                  </div>
                </div>

                <div className="separator" />

                <div>
                  <h4 className="font-medium text-foreground mb-4">
                    Change Password
                  </h4>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label htmlFor="current-password">Current Password</label>
                      <input
                        id="current-password"
                        type="password"
                        placeholder="Enter current password"
                        className="input h-11"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="new-password">New Password</label>
                      <input
                        id="new-password"
                        type="password"
                        placeholder="Enter new password"
                        className="input h-11"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="confirm-password">
                        Confirm New Password
                      </label>
                      <input
                        id="confirm-password"
                        type="password"
                        placeholder="Confirm new password"
                        className="input h-11"
                      />
                    </div>
                    <button className="btn btn-primary h-11 px-6">
                      Update Password
                    </button>
                  </div>
                </div>

                <div className="separator" />

                <div>
                  <h4 className="font-medium text-foreground mb-2">
                    Organization
                  </h4>
                  <p className="text-sm text-muted-foreground mb-4">
                    You are currently part of the{" "}
                    <span className="font-medium text-foreground">
                      Enterprise Corp
                    </span>{" "}
                    organization
                  </p>
                  <button className="btn btn-outline h-11 px-6">
                    Manage Organization
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SettingsScreen;
