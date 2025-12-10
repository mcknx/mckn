import AvatarScene from "./AvatarScene";

export default function AvatarApp() {
  return (
    <div className="font-sans w-full h-full flex flex-col">
      <div className="flex-1 w-full relative overflow-hidden bg-[#111]">
        <AvatarScene />
      </div>
    </div>
  );
}
