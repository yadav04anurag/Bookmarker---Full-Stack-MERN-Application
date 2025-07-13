const Button = ({ children, type = 'button', onClick, className = '' }) => {
return (
    <button
        type={type}
        onClick={onClick}
        className={`w-full bg-primary text-primary-foreground py-2 px-4 rounded-md hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary cursor-pointer transition-colors duration-200 hover:bg-primary/80 dark:hover:bg-primary/70 ${className}`}
    >
        {children}
    </button>
);
};

export default Button;