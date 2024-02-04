import './Button.scss';

interface ButtonProps {
  className?: string;
  onClick: () => void;
  children: React.ReactNode;
}

export default function Button({ className, children, onClick }: ButtonProps) {
  return (
    <button className={className} onClick={onClick}>
      {children}
    </button>
  );
}
