import { Link } from "@tanstack/react-router";
import React from "react";
import { cn } from "@/lib/utils";

interface CustomLinkProps {
  children: React.ReactNode;
  to: string;
  className?: string;
  activeProps?: any;
  activeOptions?: any;
}

const Link000 = ({ children, to, className, activeProps, activeOptions }: CustomLinkProps) => {
  const isExternal = to.startsWith("http") || to.startsWith("mailto") || to.startsWith("tel");
  const baseClasses = cn(
    "group relative flex items-center",
    className,
    "before:pointer-events-none before:absolute before:bottom-0 before:left-0 before:h-[0.05em] before:w-full before:bg-current before:content-['']",
    "before:origin-right before:scale-x-0 before:transition-transform before:duration-300 before:ease-[cubic-bezier(0.4,0,0.2,1)]",
    "hover:before:origin-left hover:before:scale-x-100",
  );

  if (isExternal) {
    return (
      <a href={to} target="_blank" rel="noopener noreferrer" className={baseClasses}>
        {children}
      </a>
    );
  }

  return (
    <Link to={to} className={baseClasses} activeProps={activeProps} activeOptions={activeOptions}>
      {children}
    </Link>
  );
};

const Link001 = ({ children, to, className, activeProps, activeOptions }: CustomLinkProps) => {
  const isExternal = to.startsWith("http") || to.startsWith("mailto") || to.startsWith("tel");
  const baseClasses = cn(
    "group relative flex items-center",
    "before:pointer-events-none before:absolute before:left-0 before:bottom-[-2px] before:h-[0.07em] before:w-full before:bg-current before:content-['']",
    "before:origin-right before:scale-x-0 before:transition-transform before:duration-300 before:ease-[cubic-bezier(0.4,0,0.2,1)]",
    "hover:before:origin-left hover:before:scale-x-100",
    className,
  );

  const ArrowIcon = () => (
    <svg
      className="ml-[0.3em] size-[0.65em] translate-y-[2px] opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100"
      fill="none"
      viewBox="0 0 10 10"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M1.004 9.166 9.337.833m0 0v8.333m0-8.333H1.004"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></path>
    </svg>
  );

  if (isExternal) {
    return (
      <a href={to} target="_blank" rel="noopener noreferrer" className={baseClasses}>
        {children}
        <ArrowIcon />
      </a>
    );
  }

  return (
    <Link to={to} className={baseClasses} activeProps={activeProps} activeOptions={activeOptions}>
      {children}
      <ArrowIcon />
    </Link>
  );
};

const Link002 = ({ children, to, className, activeProps, activeOptions }: CustomLinkProps) => {
  const isExternal = to.startsWith("http") || to.startsWith("mailto") || to.startsWith("tel");
  const baseClasses = cn(
    "group relative flex items-center",
    className,
    "before:pointer-events-none before:absolute before:left-0 before:bottom-[-2px] before:h-[0.07em] before:w-full before:bg-current before:content-['']",
    "before:origin-right before:scale-x-0 before:transition-transform before:duration-300 before:ease-[cubic-bezier(0.4,0,0.2,1)]",
    "before:origin-left",
    "hover:before:origin-right hover:before:scale-x-100",
  );

  const ArrowIcon = () => (
    <svg
      className="ml-[0.3em] size-[0.65em] translate-y-[2px] opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100"
      fill="none"
      viewBox="0 0 10 10"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M1.004 9.166 9.337.833m0 0v8.333m0-8.333H1.004"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></path>
    </svg>
  );

  if (isExternal) {
    return (
      <a href={to} target="_blank" rel="noopener noreferrer" className={baseClasses}>
        {children}
        <ArrowIcon />
      </a>
    );
  }

  return (
    <Link to={to} className={baseClasses} activeProps={activeProps} activeOptions={activeOptions}>
      {children}
      <ArrowIcon />
    </Link>
  );
};

const Link003 = ({ children, to, className, activeProps, activeOptions }: CustomLinkProps) => {
  const isExternal = to.startsWith("http") || to.startsWith("mailto") || to.startsWith("tel");
  const baseClasses = cn(
    "group relative flex items-center",
    className,
    "before:pointer-events-none before:absolute before:left-0 before:bottom-[-2px] before:h-[0.07em] before:w-full before:bg-current before:content-['']",
    "before:origin-center before:scale-x-0 before:transition-transform before:duration-300 before:ease-[cubic-bezier(0.4,0,0.2,1)]",
    "hover:before:scale-x-100",
  );

  const ArrowIcon = () => (
    <svg
      className="ml-[0.3em] size-[0.65em] translate-y-[2px] opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100"
      fill="none"
      viewBox="0 0 10 10"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M1.004 9.166 9.337.833m0 0v8.333m0-8.333H1.004"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></path>
    </svg>
  );

  if (isExternal) {
    return (
      <a href={to} target="_blank" rel="noopener noreferrer" className={baseClasses}>
        {children}
        <ArrowIcon />
      </a>
    );
  }

  return (
    <Link to={to} className={baseClasses} activeProps={activeProps} activeOptions={activeOptions}>
      {children}
      <ArrowIcon />
    </Link>
  );
};

const Link004 = ({ children, to, className, activeProps, activeOptions }: CustomLinkProps) => {
  const isExternal = to.startsWith("http") || to.startsWith("mailto") || to.startsWith("tel");
  const baseClasses = cn(
    "group relative flex items-center px-3 py-1.5 rounded-lg overflow-hidden transition-all duration-300",
    "before:pointer-events-none before:absolute before:left-0 before:bottom-0 before:w-full before:h-0 before:bg-primary/10 before:content-['']",
    "before:transition-all before:duration-300 before:ease-[cubic-bezier(0.4,0,0.2,1)] hover:before:h-full",
    className,
  );

  const ArrowIcon = () => (
    <svg
      className="ml-[0.4em] size-[0.65em] translate-y-[2px] opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:rotate-45 group-hover:opacity-100"
      fill="none"
      viewBox="0 0 10 10"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M1.004 9.166 9.337.833m0 0v8.333m0-8.333H1.004"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></path>
    </svg>
  );

  if (isExternal) {
    return (
      <a href={to} target="_blank" rel="noopener noreferrer" className={baseClasses}>
        <span className="relative z-10 flex items-center">
          {children}
          <ArrowIcon />
        </span>
      </a>
    );
  }

  return (
    <Link to={to} className={baseClasses} activeProps={activeProps} activeOptions={activeOptions}>
      <span className="relative z-10 flex items-center">
        {children}
        <ArrowIcon />
      </span>
    </Link>
  );
};

const Link005 = ({ children, to, className, activeProps, activeOptions }: CustomLinkProps) => {
  const isExternal = to.startsWith("http") || to.startsWith("mailto") || to.startsWith("tel");
  const baseClasses = cn(
    "group relative flex items-center px-3 py-1.5 rounded-lg overflow-hidden transition-all duration-300",
    "before:pointer-events-none before:absolute before:left-0 before:top-0 before:w-full before:h-full before:bg-primary/10 before:content-['']",
    "before:scale-x-0 before:origin-left before:transition-transform before:duration-300 before:ease-[cubic-bezier(0.4,0,0.2,1)] hover:before:scale-x-100",
    className,
  );

  const ArrowIcon = () => (
    <svg
      className="ml-[0.4em] size-[0.65em] -translate-x-1 rotate-45 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100"
      fill="none"
      viewBox="0 0 10 10"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M1.004 9.166 9.337.833m0 0v8.333m0-8.333H1.004"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></path>
    </svg>
  );

  if (isExternal) {
    return (
      <a href={to} target="_blank" rel="noopener noreferrer" className={baseClasses}>
        <span className="relative z-10 flex items-center">
          {children}
          <ArrowIcon />
        </span>
      </a>
    );
  }

  return (
    <Link to={to} className={baseClasses} activeProps={activeProps} activeOptions={activeOptions}>
      <span className="relative z-10 flex items-center">
        {children}
        <ArrowIcon />
      </span>
    </Link>
  );
};

export { Link000, Link001, Link002, Link003, Link004, Link005 };
