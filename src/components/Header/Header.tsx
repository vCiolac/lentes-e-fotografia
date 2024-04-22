import bg from '../../assets/bg21.png';

function Header() {
  return (
    <header className="w-full relative mb-4">
      <div className="h-[44vh] max-h-[44vh] relative flex items-center justify-center">
        <img className="w-full h-full object-cover" src={bg} alt="Header" />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white opacity-50" />
    </header>
  );
}

export default Header;
