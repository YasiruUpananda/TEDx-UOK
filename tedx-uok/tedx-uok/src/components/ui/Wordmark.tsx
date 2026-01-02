interface WordmarkProps {
  event?: string;
  className?: string;
}

export default function Wordmark({ event = 'UOK', className = '' }: WordmarkProps) {
  return (
    <div className={`font-extrabold leading-none inline-flex items-baseline ${className}`}>
      <span className="relative inline-block text-[#EB0028]">
        <span>TED</span>
        <span className="absolute top-[-20%]">x</span>
        <span className="opacity-0">x</span>
      </span>
      <span className="text-white">{event}</span>
    </div>
  );

}
