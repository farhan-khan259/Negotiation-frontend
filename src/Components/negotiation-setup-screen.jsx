import {
  Bot,
  ChevronLeft,
  Moon,
  Settings,
  Sparkles,
  Sun,
  User,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { negotiationService } from "../services/negotiation";

// Define Select components outside the main component
const Select = ({ value, onValueChange, children, placeholder }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="select">
      <div className="select-trigger" onClick={() => setIsOpen(!isOpen)}>
        <span>{value || placeholder}</span>
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </div>
      {isOpen && (
        <div className="select-content">
          {React.Children.map(children, (child) =>
            React.cloneElement(child, {
              onClick: () => {
                onValueChange(child.props.value);
                setIsOpen(false);
              },
            }),
          )}
        </div>
      )}
    </div>
  );
};

const SelectItem = ({ value, children, onClick }) => (
  <div className="select-item" onClick={onClick}>
    {children}
  </div>
);

const NegotiationSetupScreen = ({ onStart, onBack }) => {
  const navigate = useNavigate();
  const [supplierName, setSupplierName] = useState("");
  const [negotiationGoal, setNegotiationGoal] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [estimatedValue, setEstimatedValue] = useState("");
  const [negotiationTone, setNegotiationTone] = useState("");
  const [primaryGoal, setPrimaryGoal] = useState("");
  const [rules, setRules] = useState({
    respectBudget: true,
    maintainRelationship: true,
    prioritizeSpeed: false,
    includeWarranty: true,
  });
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

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

  const validateSetup = () => {
    if (!supplierName.trim()) {
      alert("Please enter supplier name");
      return false;
    }
    if (!estimatedValue || estimatedValue <= 0) {
      alert("Please enter a valid estimated value");
      return false;
    }
    if (!negotiationTone) {
      alert("Please select negotiation tone");
      return false;
    }
    if (!primaryGoal) {
      alert("Please select primary goal");
      return false;
    }
    return true;
  };

  const handleStart = async () => {
    if (validateSetup()) {
      setIsLoading(true);
      const setupData = {
        supplierName,
        estimatedValue,
        negotiationTone,
        primaryGoal,
        minPrice,
        maxPrice,
        negotiationGoal,
        rules,
      };

      try {
        // Start the AI negotiation session
        // Note: For MVP, we pass setupData to onStart which moves to chat screen.
        // The chat screen will then potentially use the service or receive the initial AI message.
        // However, if we want to get the *first* AI message immediately, we call it here.
        
        // Let's assume we want to initialize it on the backend:
        const response = await negotiationService.startNegotiation(setupData);

        // Pass setup data plus negotiation id and initial AI response to the next screen
        onStart({
          ...setupData,
          negotiationId: response.negotiation_id,
          initialMessages: response.messages,
        });
        
      } catch (error) {
        console.error("Failed to start negotiation:", error);
        alert("Failed to initialize AI. Please check your connection.");
      } finally {
        setIsLoading(false);
      }
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

            <button
              className="btn btn-ghost btn-icon"
              onClick={() => navigate("/settings")}
            >
              <Settings className="w-5 h-5 text-foreground" />
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
              Configure Negotiation
            </h1>
            <p className="text-muted-foreground">
              Set parameters and rules for the AI to negotiate on your behalf
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Form */}
            <div className="lg:col-span-2 space-y-6">
              {/* Supplier Information */}
              <div className="card p-6 rounded-xl">
                <h3 className="text-lg font-semibold text-foreground mb-4">
                  Supplier Information
                </h3>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label htmlFor="supplier" className="label">
                      Supplier Name
                    </label>
                    <input
                      id="supplier"
                      placeholder="Enter supplier company name"
                      value={supplierName}
                      onChange={(e) => setSupplierName(e.target.value)}
                      className="input h-11"
                    />
                  </div>
                </div>
              </div>

              {/* Negotiation Strategy (NEW SECTION) */}
              <div className="card p-6 rounded-xl">
                <h3 className="text-lg font-semibold text-foreground mb-4">
                  Negotiation Strategy
                </h3>
                <div className="space-y-4">
                  {/* Estimated Value Input */}
                  <div className="space-y-2">
                    <label htmlFor="estimated-value" className="label">
                      Estimated Deal Value (USD)
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                        $
                      </span>
                      <input
                        id="estimated-value"
                        type="number"
                        placeholder="Enter estimated value"
                        value={estimatedValue}
                        onChange={(e) => setEstimatedValue(e.target.value)}
                        className="input h-11 pl-7"
                      />
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {estimatedValue >= 1000 ? (
                        <span className="text-warning">
                          ⚠️ High-value deal: Human approval required for each
                          AI message
                        </span>
                      ) : (
                        <span className="text-success">
                          {/* ✅ Low-value deal: AI will negotiate autonomously */}
                        </span>
                      )}
                    </p>
                  </div>

                  {/* Negotiation Tone Dropdown */}
                  <div className="space-y-2">
                    <label className="label">Negotiation Tone</label>
                    <Select
                      value={negotiationTone}
                      onValueChange={setNegotiationTone}
                      placeholder="Select tone"
                    >
                      <SelectItem value="friendly">Friendly</SelectItem>
                      <SelectItem value="formal">Formal</SelectItem>
                      <SelectItem value="professional">Professional</SelectItem>
                      <SelectItem value="strict">Strict/Aggressive</SelectItem>
                    </Select>
                  </div>

                  {/* Primary Goal Dropdown */}
                  <div className="space-y-2">
                    <label className="label">Primary Goal</label>
                    <Select
                      value={primaryGoal}
                      onValueChange={setPrimaryGoal}
                      placeholder="Select goal"
                    >
                      <SelectItem value="lower-price">Lower Price</SelectItem>
                      <SelectItem value="free-quantities">
                        Free Quantities/Bonus Units
                      </SelectItem>
                      <SelectItem value="payment-installments">
                        Payment Installments
                      </SelectItem>
                      <SelectItem value="free-shipping">
                        Free Shipping
                      </SelectItem>
                    </Select>
                  </div>
                </div>
              </div>

              {/* Negotiation Parameters */}
              <div className="card p-6 rounded-xl">
                <h3 className="text-lg font-semibold text-foreground mb-4">
                  Negotiation Parameters
                </h3>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="label">Negotiation Goal</label>
                    <Select
                      value={negotiationGoal}
                      onValueChange={setNegotiationGoal}
                      placeholder="Select primary objective"
                    >
                      <SelectItem value="best-price">Best Price</SelectItem>
                      <SelectItem value="fastest-delivery">
                        Fastest Delivery
                      </SelectItem>
                      <SelectItem value="extended-warranty">
                        Extended Warranty
                      </SelectItem>
                      <SelectItem value="flexible-terms">
                        Flexible Payment Terms
                      </SelectItem>
                    </Select>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label htmlFor="min-price" className="label">
                        Minimum Price (USD)
                      </label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                          $
                        </span>
                        <input
                          id="min-price"
                          type="number"
                          placeholder="0"
                          value={minPrice}
                          onChange={(e) => setMinPrice(e.target.value)}
                          className="input h-11 pl-7"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="max-price" className="label">
                        Maximum Price (USD)
                      </label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                          $
                        </span>
                        <input
                          id="max-price"
                          type="number"
                          placeholder="0"
                          value={maxPrice}
                          onChange={(e) => setMaxPrice(e.target.value)}
                          className="input h-11 pl-7"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Negotiation Rules */}
              <div className="card p-6 rounded-xl">
                <h3 className="text-lg font-semibold text-foreground mb-4">
                  Negotiation Rules
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <label className="checkbox">
                      <input
                        type="checkbox"
                        checked={rules.respectBudget}
                        onChange={(e) =>
                          setRules({
                            ...rules,
                            respectBudget: e.target.checked,
                          })
                        }
                        className="checkbox-input"
                      />
                      <span className="checkbox-box" />
                      <div>
                        <span className="cursor-pointer">
                          Always respect budget constraints
                        </span>
                        <p className="text-sm text-muted-foreground mt-1">
                          AI will never exceed the maximum price limit
                        </p>
                      </div>
                    </label>
                  </div>
                  <div className="flex items-start gap-3">
                    <label className="checkbox">
                      <input
                        type="checkbox"
                        checked={rules.maintainRelationship}
                        onChange={(e) =>
                          setRules({
                            ...rules,
                            maintainRelationship: e.target.checked,
                          })
                        }
                        className="checkbox-input"
                      />
                      <span className="checkbox-box" />
                      <div>
                        <span className="cursor-pointer">
                          Maintain positive supplier relationship
                        </span>
                        <p className="text-sm text-muted-foreground mt-1">
                          Prioritize long-term partnership over aggressive
                          tactics
                        </p>
                      </div>
                    </label>
                  </div>
                  <div className="flex items-start gap-3">
                    <label className="checkbox">
                      <input
                        type="checkbox"
                        checked={rules.prioritizeSpeed}
                        onChange={(e) =>
                          setRules({
                            ...rules,
                            prioritizeSpeed: e.target.checked,
                          })
                        }
                        className="checkbox-input"
                      />
                      <span className="checkbox-box" />
                      <div>
                        <span className="cursor-pointer">
                          Prioritize negotiation speed
                        </span>
                        <p className="text-sm text-muted-foreground mt-1">
                          Reach agreement quickly, even if it means minor
                          concessions
                        </p>
                      </div>
                    </label>
                  </div>
                  <div className="flex items-start gap-3">
                    <label className="checkbox">
                      <input
                        type="checkbox"
                        checked={rules.includeWarranty}
                        onChange={(e) =>
                          setRules({
                            ...rules,
                            includeWarranty: e.target.checked,
                          })
                        }
                        className="checkbox-input"
                      />
                      <span className="checkbox-box" />
                      <div>
                        <span className="cursor-pointer">
                          Include warranty in negotiation
                        </span>
                        <p className="text-sm text-muted-foreground mt-1">
                          Request extended warranty or service guarantees
                        </p>
                      </div>
                    </label>
                  </div>
                </div>
              </div>
            </div>

            {/* AI Strategy Preview */}
            <div className="lg:col-span-1">
              <div className="sticky top-8">
                <div className="card p-6 rounded-xl border border-primary/20 bg-gradient-to-br from-primary/5 to-transparent">
                  <div className="flex items-center gap-2 mb-4">
                    <Sparkles className="w-5 h-5 text-primary" />
                    <h3 className="text-lg font-semibold text-foreground">
                      AI Strategy Preview
                    </h3>
                  </div>
                  <div className="space-y-4 text-sm">
                    <div>
                      <p className="text-muted-foreground mb-2">
                        Strategy Type:
                      </p>
                      <p className="font-medium text-foreground">
                        Collaborative Negotiation
                      </p>
                    </div>
                    <div>
                      <p className="text-muted-foreground mb-2">
                        Opening Approach:
                      </p>
                      <p className="font-medium text-foreground">
                        Value-based discussion with emphasis on partnership
                      </p>
                    </div>
                    <div>
                      <p className="text-muted-foreground mb-2">
                        Concession Strategy:
                      </p>
                      <p className="font-medium text-foreground">
                        Gradual, reciprocal adjustments
                      </p>
                    </div>
                    <div>
                      <p className="text-muted-foreground mb-2">
                        Expected Duration:
                      </p>
                      <p className="font-medium text-foreground">
                        3-5 negotiation rounds
                      </p>
                    </div>

                    {/* Autonomy Mode Display */}
                    <div className="pt-3 border-t border-border">
                      <p className="text-muted-foreground mb-2">
                        Autonomy Mode:
                      </p>
                      {estimatedValue >= 1000 ? (
                        <div className="flex items-center gap-2 text-warning">
                          <div className="w-2 h-2 rounded-full bg-warning animate-pulse" />
                          <span className="font-medium">Human-in-the-loop</span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2 text-success">
                          <div className="w-2 h-2 rounded-full bg-success" />
                          <span className="font-medium">Fully Autonomous</span>
                        </div>
                      )}
                    </div>

                    <div className="pt-4 border-t border-border">
                      <p className="text-xs text-muted-foreground">
                        Strategy adapts in real-time based on supplier responses
                        and critic agent validation
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Action Button */}
          <div className="mt-8 flex justify-end">
            <button
              onClick={handleStart}
              disabled={isLoading}
              id="continue-btn"
              className="btn btn-primary h-11 px-8 disabled:opacity-70"
            >
              {isLoading ? "Initializing AI..." : "Start Negotiation"}
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default NegotiationSetupScreen;
