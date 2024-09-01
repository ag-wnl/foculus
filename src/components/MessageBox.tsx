
interface MessageBoxProps {
  text: string;
}


export const MessageBox: React.FC<MessageBoxProps> = ({ text }) => {
  return (
    <div className="flex justify-start items-start text-left p-4 border-b border-l rounded-md opacity-80  w-[25rem]">
      {text}
    </div>
  );
};