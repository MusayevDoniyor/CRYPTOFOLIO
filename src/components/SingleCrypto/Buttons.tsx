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
      className={`rounded-md font-bold text-base border py-1 pl-2 pr-28 ${
        isSelected
          ? "bg-[#87CEEB] text-black"
          : "bg-transparent  text-white  border-[#87CEEB]"
      }`}
      onClick={handleClick}
    >
      {children}
    </button>
  );
}
