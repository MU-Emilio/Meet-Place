import MEET_PLACE from "../../../assets/MEET_PLACE.gif";

export default function Loader() {
  return (
    <div className=" w-[800px] h-[800px] mx-auto pt-[200px]">
      <img src={MEET_PLACE} alt="Loading..." />
    </div>
  );
}
