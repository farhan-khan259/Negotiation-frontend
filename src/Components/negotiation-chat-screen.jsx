import {
  Bot,
  Building2,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Moon,
  Pause,
  Settings,
  Shield,
  Sun,
  User,
  X,
  Send
} from "lucide-react";
import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { startNegotiation, sendMessage } from "../services/negotiation";

const NegotiationChatScreen = ({ onEnd, setupData }) => {
  const navigate = useNavigate();
  const [criticExpanded, setCriticExpanded] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [requiresApproval, setRequiresApproval] = useState(false);
  const [isApprovalMode, setIsApprovalMode] = useState(false);
  const [messages, setMessages] = useState([]);
  const [negotiationId, setNegotiationId] = useState(null);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Initialize theme
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

    if (savedTheme === "dark" || (!savedTheme && prefersDark)) {
      setIsDarkMode(true);
      document.documentElement.setAttribute("data-theme", "dark");
    }
  }, []);

  // Check autonomy mode
  useEffect(() => {
    if (setupData) {
      const estimatedValue = setupData.estimatedValue || 0;
      setRequiresApproval(estimatedValue >= 1000);
    }
  }, [setupData]);

  // Start Negotiation
  useEffect(() => {
    const initNegotiation = async () => {
      if (!setupData) return;

      if (setupData.negotiationId) {
        setNegotiationId(setupData.negotiationId);
      }

      if (setupData.initialMessages && setupData.initialMessages.length > 0) {
        const seededMessages = setupData.initialMessages.map((msg, index) => ({
          id: `ai-init-${index}`,
          sender: "ai",
          content: msg,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          needsApproval: false,
        }));
        setMessages(seededMessages);
      }

      if (setupData.negotiationId) {
        return;
      }

      setIsLoading(true);
      try {
        const data = await startNegotiation(setupData);
        setNegotiationId(data.negotiation_id);

        if (data.messages && data.messages.length > 0) {
          const newMessages = data.messages.map((msg, index) => ({
            id: `ai-init-${index}`,
            sender: "ai",
            content: msg,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            needsApproval: false,
          }));
          setMessages(newMessages);
        }
      } catch (error) {
        console.error("Failed to start negotiation", error);
        setMessages([{
          id: "err-1",
          sender: "system",
          content: "Could not connect to AI server. Using offline mode.",
          timestamp: new Date().toLocaleTimeString(),
        }]);
      } finally {
        setIsLoading(false);
      }
    };

    initNegotiation();
  }, [setupData]);

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

  // When AI generates a message that needs approval (Simulated logic for now as backend returns final text)
  // In a real generic loop:
  // 1. User sends message (or system starts).
  // 2. AI responds.
  // 3. If High Value -> AI response is "Draft" -> User edits -> Sends.
  
  // For this MVP, let's simulate the "Draft" state if high value
  useEffect(() => {
    if (requiresApproval && messages.length > 0) {
      const lastMsg = messages[messages.length - 1];
      if (lastMsg.sender === "ai" && !lastMsg.isApproved && !lastMsg.isDraftProcessed) {
        // It's a new AI message in high-value mode
        // We treat it as a draft
        setInputMessage(lastMsg.content); // Populate input
        setIsApprovalMode(true);
        
        // Mark as processed so we don't loop
        setMessages(prev => prev.map(m => m.id === lastMsg.id ? { ...m, isDraftProcessed: true, needsApproval: true } : m));
      }
    }
  }, [messages, requiresApproval]);


  const handleSendMessage = async () => {
    if (!inputMessage.trim() || !negotiationId) return;

    const currentText = inputMessage;
    setInputMessage("");
    setIsApprovalMode(false);

    // If we were in approval mode, the message currently in 'messages' as AI (Pending) 
    // should be updated to the final approved text and marked approved.
    if (requiresApproval) {
        setMessages(prev => prev.map(m => 
            (m.sender === "ai" && m.needsApproval) 
            ? { ...m, content: currentText, needsApproval: false, isApproved: true } 
            : m
        ));
    } else {
        // Normal user message (replying to AI)
        // Wait, the chat flow is:
        // AI: "Hello"
        // User (via Supplier role simulation? No, User is Buyer)
        // Actually, the user here is the BUYER approving the AI's message to the SUPPLIER.
        // OR the user is the BUYER giving instructions to the AI.
        
        // Let's stick to the "Human in the Loop" approval flow:
        // 1. AI proposes message to Supplier.
        // 2. User approves/edits.
        // 3. Message sent to Supplier (Simulated).
        // 4. Supplier responds.
        // 5. AI processes supplier response.
    }

    // Send the APPROVED message to the backend (or the Supplier)
    // For our backend `chat` endpoint, we are sending "user_message".
    // If this was an approval, we are effectively sending the message TO the supplier.
    // The backend `chat` endpoint expects "User Input" to generate the NEXT AI response.
    // This is a bit tricky with the current simple backend.
    
    // Adjusted Flow for MVP:
    // 1. We send the "Approved Message" to the backend.
    // 2. The Backend records it.
    // 3. The Backend (simulating the world) needs a response from the Supplier.
    //    Since we don't have a real supplier, we can mock the supplier response client-side 
    //    OR have the backend simulate it.
    
    // Let's do client-side supplier simulation for visual clarity.
    
    // If it was an approval:
    setIsLoading(true);
    
    // Simulate Supplier Response
    setTimeout(async () => {
        const supplierMsg = {
            id: `sup-${Date.now()}`,
            sender: "supplier",
            content: "We received your offer. Let us review the terms.",
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        setMessages(prev => [...prev, supplierMsg]);

        // Now ask AI to reply to this supplier message
        try {
            const data = await sendMessage(negotiationId, supplierMsg.content);
            if (data.messages && data.messages.length > 0) {
                const newAiMsgs = data.messages.map((msg, index) => ({
                    id: `ai-${Date.now()}-${index}`,
                    sender: "ai",
                    content: msg,
                    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                    needsApproval: false // Will be caught by useEffect for approval
                }));
                setMessages(prev => [...prev, ...newAiMsgs]);
            }
        } catch (e) {
            console.error(e);
        } finally {
            setIsLoading(false);
        }
    }, 1500);
  };

  const validationChecks = [
    { id: "1", check: "Price within acceptable range", status: "passed" },
    { id: "2", check: "Maintains professional tone", status: "passed" },
  ];

  const negotiationTone = setupData?.negotiationTone || "professional";
  const primaryGoal = setupData?.primaryGoal || "lower-price";
  const estimatedValue = setupData?.estimatedValue || 0;

  return (
    <div className="min-h-screen bg-background flex flex-col">
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
            <button className="btn btn-ghost btn-icon" onClick={() => navigate("/settings")}>
              <Settings className="w-5 h-5 text-foreground" />
            </button>
            <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
              <User className="w-5 h-5 text-primary" />
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1 max-w-[1440px] w-full mx-auto px-8 py-8 flex gap-6">
        {/* Chat Area */}
        <div className="flex-1 flex flex-col">
          {/* Chat Header */}
          <div className="card p-4 rounded-xl border border-border bg-card mb-4">
             <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-accent flex items-center justify-center">
                  <Building2 className="w-5 h-5 text-foreground" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">
                    {setupData?.supplierName || "Supplier"}
                  </h3>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <div className="w-2 h-2 rounded-full bg-[#10b981]" />
                    <span>Active Negotiation</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Strategy Info */}
            <div className="mt-4 pt-4 border-t border-border grid grid-cols-2 md:grid-cols-4 gap-4">
               <div>
                <p className="text-xs text-muted-foreground">Strategy</p>
                <p className="text-sm font-medium text-foreground capitalize">
                  {negotiationTone}
                </p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Primary Goal</p>
                <p className="text-sm font-medium text-foreground capitalize">
                  {primaryGoal.replace("-", " ")}
                </p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Deal Value</p>
                <p className="text-sm font-medium text-foreground">
                  ${estimatedValue.toLocaleString()}
                </p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Mode</p>
                <p
                  className={`text-sm font-medium ${requiresApproval ? "text-warning" : "text-success"}`}
                >
                  {requiresApproval ? "Human-in-loop" : "Autonomous"}
                </p>
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className="card flex-1 rounded-xl border border-border bg-card overflow-hidden flex flex-col">
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex gap-3 ${message.sender === "ai" ? "flex-row" : "flex-row"}`}
                >
                  {/* Avatar */}
                  {message.sender === "ai" ? (
                    <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center flex-shrink-0">
                      <Bot className="w-4 h-4 text-primary-foreground" />
                    </div>
                  ) : message.sender === "supplier" ? (
                    <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center flex-shrink-0">
                      <Building2 className="w-4 h-4 text-foreground" />
                    </div>
                  ) : (
                     <div className="w-8 h-8 rounded-lg bg-blue-500 flex items-center justify-center flex-shrink-0">
                      <User className="w-4 h-4 text-white" />
                    </div>
                  )}

                  {/* Message Content */}
                  <div className="flex-1 max-w-[600px]">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm font-medium text-foreground">
                        {message.sender === "ai"
                          ? "AI Negotiator"
                          : message.sender === "supplier" ? "Supplier" : "You"}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {message.timestamp}
                      </span>
                      {message.needsApproval && (
                        <span className="text-xs px-2 py-1 rounded bg-warning/20 text-warning">
                          Draft - Pending Approval
                        </span>
                      )}
                    </div>
                    <div
                      className={`p-4 rounded-xl ${
                        message.sender === "ai"
                          ? message.needsApproval
                            ? "bg-warning/10 border border-warning/20"
                            : "bg-primary/10 border border-primary/20"
                          : "bg-accent"
                      }`}
                    >
                      <p className="text-sm text-foreground leading-relaxed whitespace-pre-wrap">
                        {message.content}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
              
               {isLoading && (
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center flex-shrink-0">
                    <Building2 className="w-4 h-4 text-foreground" />
                  </div>
                  <div className="flex-1">
                    <div className="mt-1 p-4 rounded-xl bg-accent inline-flex items-center gap-1">
                      <div className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce" />
                      <div className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce delay-75" />
                      <div className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce delay-150" />
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-4 border-t border-border bg-muted/30">
               {isApprovalMode && (
                  <div className="p-3 mb-3 rounded-lg bg-warning/10 border border-warning/20 human-approval-banner">
                    <div className="flex items-center gap-2 text-warning mb-2">
                      <Shield className="w-4 h-4" />
                      <span className="font-medium">
                        Human Approval Required
                      </span>
                    </div>
                    <p className="text-sm text-foreground">
                      Edit the AI draft below if needed, then click Approve & Send.
                    </p>
                  </div>
               )}
               
               <div className="flex gap-3 items-end">
                  <textarea
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    placeholder={
                        isApprovalMode 
                        ? "Edit AI draft..." 
                        : "Waiting for supplier..."
                    }
                    className="flex-1 min-h-[44px] max-h-[120px] p-3 rounded-lg bg-input-background border border-input focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none text-sm"
                    disabled={!isApprovalMode && messages.length > 0 && messages[messages.length-1].sender === "ai" && requiresApproval}
                  />
                  <button
                    onClick={handleSendMessage}
                    disabled={isLoading || !inputMessage.trim() || (!isApprovalMode && requiresApproval && messages.length > 0 && messages[messages.length-1].sender === "ai")}
                    className={`btn h-11 px-6 rounded-lg flex items-center gap-2 ${isApprovalMode ? 'btn-primary' : 'btn-outline'}`}
                  >
                    {isApprovalMode ? (
                        <>
                            <CheckCircle2 className="w-4 h-4" />
                            Approve & Send
                        </>
                    ) : (
                        <>
                            <Send className="w-4 h-4" />
                            Send
                        </>
                    )}
                  </button>
               </div>
            </div>
          </div>
          
           {/* Action Buttons */}
          <div className="mt-4 flex gap-3 justify-end">
            <button className="btn btn-outline h-11 px-6 rounded-lg border-border hover:bg-accent">
              <Pause className="w-4 h-4 mr-2" />
              Pause AI
            </button>
            <button
              onClick={onEnd}
              className="btn btn-destructive h-11 px-6 rounded-lg bg-destructive hover:bg-destructive/90"
            >
              <X className="w-4 h-4 mr-2" />
              End Negotiation
            </button>
          </div>
        </div>
        
         {/* Critic Agent Panel */}
        <div className="w-80 flex-shrink-0 hidden md:block">
          <div className="card rounded-xl border border-border bg-card">
            <button
              onClick={() => setCriticExpanded(!criticExpanded)}
              className="w-full p-4 flex items-center justify-between hover:bg-accent/50 transition-colors rounded-t-xl"
            >
              <h3 className="font-semibold text-foreground">
                Critic Agent Validation
              </h3>
              {criticExpanded ? (
                <ChevronUp className="w-5 h-5 text-muted-foreground" />
              ) : (
                <ChevronDown className="w-5 h-5 text-muted-foreground" />
              )}
            </button>

            {criticExpanded && (
              <div className="p-4 pt-0 space-y-3">
                {validationChecks.map((check) => (
                  <div
                    key={check.id}
                    className="flex items-start gap-3 p-3 rounded-lg bg-accent/50"
                  >
                    <CheckCircle2
                      className={`w-5 h-5 flex-shrink-0 mt-0.5 ${
                        check.status === "passed"
                          ? "text-[#10b981]"
                          : "text-[#f59e0b]"
                      }`}
                    />
                    <p className="text-sm text-foreground">{check.check}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
          
          {/* Autonomy Settings Panel */}
          <div className="card rounded-xl border border-border bg-card mt-4 p-4">
            <h3 className="font-semibold text-foreground mb-4">
              Autonomy Settings
            </h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div
                  className={`w-3 h-3 rounded-full ${requiresApproval ? "bg-warning threshold-warning" : "bg-success"}`}
                />
                <div>
                  <p className="font-medium text-foreground">
                    {requiresApproval
                      ? "Human-in-the-loop Mode"
                      : "Fully Autonomous Mode"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

      </main>
    </div>
  );
};

export default NegotiationChatScreen;
