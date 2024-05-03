import { Link } from 'react-router-dom';
import GoogleIcon from '../../assets/google.svg';
import { useContext } from 'react';
import { Context } from '../../context/Context';

interface FooterProps {
  loading: boolean;
}

function Footer({ loading }: FooterProps) {
  const { user } = useContext(Context);

  const displayLoginName = () => {
    let text = "LOGIN";
    if (user) {
      if (Object.keys(user).length !== 0) {
        text = "MINHA CONTA";
        if (user.uid === import.meta.env.VITE_REACT_APP_ADMIN_UID) {
          text = "ADMINISTRADOR";
        }
      }
    }
    return text;
  };
  
  return (
    <footer className={`bg-[#333E42] ${loading ? 'absolute' : 'relative'} w-full bottom-0 flex flex-wrap items-center justify-center text-white p-1`}>
      <span className="text-xs mb-2 sm:mb-0 text-center">COPYRIGHT © 2024 Victor Ciolac.</span>
      <span className="text-xs mx-2 sm:mx-4">|</span>
      <Link to="/login" className="flex items-center text-xs">
        <img src={GoogleIcon} alt="Google Icon" width="20" className="mr-2" />
        {displayLoginName()}
      </Link>
    </footer>
  );
}

export default Footer;
