export default function Buttons({
  children,
  setSelectedTime,
  selectedTime,
}: {
  children: React.ReactNode;
  setSelectedTime: (time: string) => void;
  selectedTime: string;
}) {
  const handleClick = () => {
    setSelectedTime(children as string);
  };

  const isSelected = selectedTime === (children as string);

  return (
    <button
      className={`rounded-xl font-bold text-sm uppercase tracking-widest py-3 px-6 transition-all duration-300 border ${
        isSelected
          ? "bg-cyan-400 text-black border-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.4)]"
          : "bg-transparent text-white border-white/20 hover:border-cyan-400 hover:text-cyan-400"
      } active:scale-95`}
      onClick={handleClick}
    >
      {children}
    </button>
  );
}
