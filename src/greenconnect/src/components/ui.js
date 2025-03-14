import React from "react";

export function Button({ children, onClick, className, ...props }) {
    return (
        <button onClick={onClick} className={`px-4 py-2 bg-blue-500 text-white rounded ${className}`} {...props}>
            {children}
        </button>
    );
}

export function Input({ type = "text", className, ...props }) {
    return (
        <input type={type} className={`border p-2 rounded w-full ${className}`} {...props} />
    );
}

export function Textarea({ className, ...props }) {
    return (
        <textarea className={`border p-2 rounded w-full ${className}`} {...props}></textarea>
    );
}

export function Table({ children, className }) {
    return (
        <table className={`w-full border-collapse border border-gray-300 ${className}`}>
            {children}
        </table>
    );
}
