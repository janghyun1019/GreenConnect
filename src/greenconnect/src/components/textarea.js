export default function Textarea({ value, onChange, placeholder, className, ...props }) {
    return (
        <textarea
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className={`border p-2 rounded w-full ${className}`}
            {...props}
        ></textarea>
    );
}
