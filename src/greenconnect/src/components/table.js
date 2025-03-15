export default function Table({ children, className = "" }) {
    return (
        <table className={`w-full border-collapse border border-gray-300 ${className}`}>
            {children}
        </table>
    );
}

export function TableHeader({ children, className = "" }) {
    return <thead className={`bg-gray-100 ${className}`}>{children}</thead>;
}

export function TableBody({ children, className = "" }) {
    return <tbody className={className}>{children}</tbody>;
}

export function TableRow({ children, className = "" }) {
    return <tr className={`border-b ${className}`}>{children}</tr>;
}

export function TableHead({ children, className = "" }) {
    return <th className={`p-2 border ${className}`}>{children}</th>;
}

export function TableCell({ children, className = "" }) {
    return <td className={`p-2 border ${className}`}>{children}</td>;
}

export { Table };
