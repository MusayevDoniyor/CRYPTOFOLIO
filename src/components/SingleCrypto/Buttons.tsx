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
      className={`rounded-md font-bold text-base border py-2 px-4 flex items-center transition duration-300 ease-in-out ${
        isSelected
          ? "bg-[#87CEEB] text-black"
          : "bg-transparent text-white border-[#87CEEB]"
      } hover:bg-[#87CEEB] hover:text-black`}
      onClick={handleClick}
    >
      {children}
    </button>
  );
}
