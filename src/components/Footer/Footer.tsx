import { Link } from 'react-router-dom';
import GoogleIcon from '../../assets/google.svg';

function Footer() {
  return (
    <footer className="bg-[#3091A8] h-10 w-full relative bottom-0 flex items-center justify-end">
      <Link to="/login" className="">
        <img src={GoogleIcon} alt="Google Icon" width="20" className='mr-2' />
      </Link>
    </footer>
  );
}

export default Footer;
