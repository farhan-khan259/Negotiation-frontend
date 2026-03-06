import {
  Bot,
  CheckCircle2,
  FileText,
  LogOut,
  Moon,
  Settings,
  Sun,
  Upload,
  User,
  X,
  AlertCircle
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fileService } from "../services/files";

const DashboardScreen = ({ onContinue, onLogout }) => {
  const navigate = useNavigate();
  const [files, setFiles] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [uploadingFiles, setUploadingFiles] = useState([]);
  const fileInputRef = useRef(null);

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
    
    // Fetch existing files
    loadFiles();
  }, []);

    const loadFiles = async () => {
      try {
          const fetchedFiles = await fileService.getFiles();
          setFiles(fetchedFiles.map(f => ({
              id: f.id,
              name: f.file_name,
              type: getFileTypeFromMime(f.file_type),
              size: "Unknown", // Backend doesn't return size yet, could add it to model
              status: "completed"
          })));
      } catch (err) {
          console.error("Failed to load files", err);
        if (err?.name === "AUTH") {
        alert(err.message);
        onLogout();
        return;
        }
      }
  };

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

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);

    const droppedFiles = Array.from(e.dataTransfer.files);
    handleFiles(droppedFiles);
  };

  const handleFileSelect = (e) => {
    const selectedFiles = Array.from(e.target.files);
    handleFiles(selectedFiles);
    // Clear the input so the same file can be selected again
    e.target.value = null;
  };

  const handleFiles = (fileList) => {
    const validFileTypes = [
      "application/pdf",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "text/plain",
    ];

    const maxSize = 10 * 1024 * 1024; // 10MB in bytes

    const newFiles = fileList
      .filter((file) => {
        // Check file type
        if (!validFileTypes.includes(file.type)) {
          alert(
            `File type not supported: ${file.name}. Please upload PDF, DOCX, XLSX, or TXT files.`,
          );
          return false;
        }

        // Check file size
        if (file.size > maxSize) {
          alert(`File too large: ${file.name}. Maximum file size is 10MB.`);
          return false;
        }

        return true;
      })
      .map((file) => {
        const fileId = Date.now() + Math.random().toString(36).substr(2, 9);
        const fileType = getFileType(file.type);
        const fileSize = formatFileSize(file.size);

        // Create initial file object
        const fileObj = {
          id: fileId,
          name: file.name,
          type: fileType,
          size: fileSize,
          progress: 0,
          status: "uploading",
          file: file,
        };

        // Start upload
        uploadFile(fileObj);

        return fileObj;
      });

    // Add new files to uploading state
    setUploadingFiles((prev) => [...prev, ...newFiles]);
  };

  const getFileType = (mimeType) => {
    const typeMap = {
      "application/pdf": "PDF",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
        "DOCX",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":
        "XLSX",
      "text/plain": "TXT",
    };

    return typeMap[mimeType] || "File";
  };
  
  const getFileTypeFromMime = (mimeType) => {
      if (mimeType.includes("pdf")) return "PDF";
      if (mimeType.includes("sheet") || mimeType.includes("excel")) return "XLSX";
      if (mimeType.includes("document") || mimeType.includes("word")) return "DOCX";
      return "TXT";
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return "0 Bytes";

    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + " " + sizes[i];
  };

  const uploadFile = async (fileObj) => {
      try {
          // Simulate progress
          setUploadingFiles(prev => prev.map(f => f.id === fileObj.id ? { ...f, progress: 30 } : f));
          
          const uploadedFile = await fileService.uploadFile(fileObj.file);
          
          setUploadingFiles(prev => prev.map(f => f.id === fileObj.id ? { ...f, progress: 100, status: "completed" } : f));
          
          // Move to completed files
          setTimeout(() => {
              setUploadingFiles(prev => prev.filter(f => f.id !== fileObj.id));
              setFiles(prev => [...prev, {
                  id: uploadedFile.id, // Use ID from backend
                  name: uploadedFile.file_name,
                  type: getFileTypeFromMime(uploadedFile.file_type),
                  size: fileObj.size,
                  status: "completed"
              }]);
          }, 500);
          
      } catch (error) {
          console.error("Upload failed", error);
          setUploadingFiles(prev => prev.map(f => f.id === fileObj.id ? { ...f, status: "error" } : f));
          if (error?.name === "AUTH") {
            alert(error.message);
            onLogout();
            return;
          }
          alert(error?.message || `Failed to upload ${fileObj.name}`);
      }
  };

  const removeFile = (id) => {
    setFiles(files.filter((file) => file.id !== id));
  };

  const removeUploadingFile = (id) => {
    setUploadingFiles(uploadingFiles.filter((file) => file.id !== id));
  };

  const getFileIcon = (fileType) => {
    return <FileText className="w-5 h-5 text-primary" />;
  };

  const handleChooseFilesClick = () => {
    fileInputRef.current?.click();
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
            <button
              className="btn btn-ghost btn-icon text-muted-foreground hover:text-foreground"
              onClick={onLogout}
              title="Logout"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-[1440px] mx-auto px-8 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-semibold text-foreground mb-2">
              Upload Negotiation Documents
            </h1>
            <p className="text-muted-foreground">
              Upload supplier agreements, pricing sheets, or contract terms to
              train the AI negotiator
            </p>
          </div>

          {/* Upload Area */}
          <div
            className={`card p-12 border-2 border-dashed rounded-xl transition-all upload-area ${
              isDragging
                ? "border-primary bg-primary/5"
                : "border-border bg-card hover:border-primary/50"
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Upload className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                Drag and drop files here
              </h3>
              <p className="text-sm text-muted-foreground mb-6">
                Supports PDF, DOCX, XLSX, and TXT files up to 10MB
              </p>
              {/* Hidden file input */}
              <input
                type="file"
                ref={fileInputRef}
                style={{ display: "none" }}
                className="hidden"
                multiple
                accept=".pdf,.docx,.xlsx,.txt,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,text/plain"
                onChange={handleFileSelect}
              />
              {/* Direct button that triggers file input */}
              <button
                onClick={handleChooseFilesClick}
                className="btn btn-primary h-11 px-6 cursor-pointer"
              >
                Choose files to upload
              </button>
            </div>
          </div>

          {/* Currently Uploading Files */}
          {uploadingFiles.length > 0 && (
            <div className="mt-8 space-y-4">
              <h3 className="text-lg font-semibold text-foreground">
                Uploading Files
              </h3>
              <div className="space-y-3">
                {uploadingFiles.map((file) => (
                  <div key={file.id} className="card p-4 rounded-xl">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                        {getFileIcon(file.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-4 mb-2">
                          <div className="flex-1 min-w-0">
                            <h4 className="font-medium text-foreground truncate">
                              {file.name}
                            </h4>
                            <p className="text-sm text-muted-foreground">
                              {file.type} • {file.size}
                            </p>
                          </div>
                          <div className="flex items-center gap-2">
                            {file.status === "uploading" ? (
                              <div className="flex items-center gap-1.5 text-sm font-medium text-warning">
                                <span>{file.progress}%</span>
                              </div>
                            ) : file.status === "error" ? (
                                <div className="flex items-center gap-1.5 text-sm font-medium text-destructive">
                                <AlertCircle className="w-4 h-4" />
                                <span>Failed</span>
                              </div>
                            ) : (
                              <div className="flex items-center gap-1.5 text-sm font-medium text-success">
                                <CheckCircle2 className="w-4 h-4" />
                                <span>Completed</span>
                              </div>
                            )}
                            <button
                              className="btn btn-ghost btn-icon hover:bg-destructive/10 hover:text-destructive"
                              onClick={() => removeUploadingFile(file.id)}
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                        <div className="progress">
                          <div
                            className={`progress-bar ${file.status === 'error' ? 'bg-destructive' : ''}`}
                            style={{ width: `${file.progress}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Uploaded Files */}
          {files.length > 0 && (
            <div className="mt-8 space-y-4">
              <h3 className="text-lg font-semibold text-foreground">
                Uploaded Files
              </h3>
              <div className="space-y-3">
                {files.map((file) => (
                  <div key={file.id} className="card p-4 rounded-xl">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                        {getFileIcon(file.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-4 mb-2">
                          <div className="flex-1 min-w-0">
                            <h4 className="font-medium text-foreground truncate">
                              {file.name}
                            </h4>
                            <p className="text-sm text-muted-foreground">
                              {file.type} • {file.size}
                            </p>
                          </div>
                          <div className="flex items-center gap-2">
                            {file.status === "completed" && (
                              <div className="flex items-center gap-1.5 text-sm font-medium text-success">
                                <CheckCircle2 className="w-4 h-4" />
                                <span>Completed</span>
                              </div>
                            )}
                            <button
                              className="btn btn-ghost btn-icon hover:bg-destructive/10 hover:text-destructive"
                              onClick={() => removeFile(file.id)}
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Continue Button */}
          {files.length > 0 && (
            <div className="mt-8 flex justify-end">
              <button
                id="continue-btn"
                onClick={onContinue}
                className="btn btn-primary h-11 px-8"
              >
                Continue to Negotiation Setup
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default DashboardScreen;
