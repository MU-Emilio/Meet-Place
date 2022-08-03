import { useNavigate } from "react-router-dom";
import LogoImg from "../../assets/MEET_PLACE_BG.svg";

function Logo() {
  const navigate = useNavigate();

  return (
    <div>
      <img
        className="m-auto h-[85px] cursor-pointer transition ease-in-out hover:scale-110 duration-300"
        src={LogoImg}
        alt="Logo"
        onClick={() => navigate("/home")}
      />
    </div>
  );
}

export default Logo;
