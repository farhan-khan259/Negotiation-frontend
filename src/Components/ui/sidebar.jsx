import React, { useState, createContext, useContext } from "react";
import { PanelLeftIcon } from "lucide-react";
import { cn } from "./utils";
import { Button } from "./button";
import { Input } from "./input";
import { Separator } from "./separator";
import { Sheet, SheetContent } from "./sheet";

const SidebarContext = createContext(null);

export const useSidebar = () => {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider.");
  }
  return context;
};

export const SidebarProvider = ({
  children,
  defaultOpen = true,
  className,
  ...props
}) => {
  const [open, setOpen] = useState(defaultOpen);
  const [openMobile, setOpenMobile] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const toggleSidebar = () => {
    if (isMobile) {
      setOpenMobile(!openMobile);
    } else {
      setOpen(!open);
    }
  };

  const state = open ? "expanded" : "collapsed";

  const contextValue = {
    state,
    open,
    setOpen,
    isMobile,
    openMobile,
    setOpenMobile,
    toggleSidebar,
  };

  return (
    <SidebarContext.Provider value={contextValue}>
      <div
        className={cn(
          "group/sidebar-wrapper flex min-h-screen w-full",
          className,
        )}
        {...props}
      >
        {children}
      </div>
    </SidebarContext.Provider>
  );
};

export const Sidebar = ({ children, side = "left", className, ...props }) => {
  const { isMobile, state, openMobile, setOpenMobile } = useSidebar();

  if (isMobile) {
    return (
      <Sheet open={openMobile} onOpenChange={setOpenMobile}>
        <SheetContent side={side} className="w-64 p-0">
          <div className="flex h-full w-full flex-col">{children}</div>
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <div
      className={cn(
        "group hidden md:block",
        side === "left" ? "border-r" : "border-l",
        className,
      )}
      data-state={state}
      {...props}
    >
      <div className="fixed inset-y-0 z-10 flex h-screen w-64 flex-col border-r bg-sidebar">
        <div className="flex h-full w-full flex-col">{children}</div>
      </div>
      <div className="w-64" />
    </div>
  );
};

export const SidebarTrigger = ({ className, ...props }) => {
  const { toggleSidebar } = useSidebar();

  return (
    <Button
      variant="ghost"
      size="icon"
      className={cn("size-7", className)}
      onClick={toggleSidebar}
      {...props}
    >
      <PanelLeftIcon />
      <span className="sr-only">Toggle Sidebar</span>
    </Button>
  );
};

export const SidebarHeader = ({ children, className, ...props }) => {
  return (
    <div className={cn("flex flex-col gap-2 p-4", className)} {...props}>
      {children}
    </div>
  );
};

export const SidebarFooter = ({ children, className, ...props }) => {
  return (
    <div className={cn("flex flex-col gap-2 p-4", className)} {...props}>
      {children}
    </div>
  );
};

export const SidebarContent = ({ children, className, ...props }) => {
  return (
    <div
      className={cn("flex flex-1 flex-col gap-2 overflow-auto p-2", className)}
      {...props}
    >
      {children}
    </div>
  );
};

export const SidebarSeparator = ({ className, ...props }) => {
  return <Separator className={cn("mx-2", className)} {...props} />;
};

export const SidebarMenu = ({ children, className, ...props }) => {
  return (
    <ul className={cn("flex w-full flex-col gap-1", className)} {...props}>
      {children}
    </ul>
  );
};

export const SidebarMenuItem = ({ children, className, ...props }) => {
  return (
    <li className={cn("relative", className)} {...props}>
      {children}
    </li>
  );
};

export const SidebarMenuButton = ({
  children,
  className,
  isActive = false,
  onClick,
  ...props
}) => {
  return (
    <button
      className={cn(
        "flex w-full items-center gap-2 rounded-md p-2 text-sm hover:bg-accent hover:text-accent-foreground",
        isActive && "bg-accent text-accent-foreground font-medium",
        className,
      )}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};
