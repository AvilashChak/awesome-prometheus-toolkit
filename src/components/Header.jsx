import Logo from '../assets/logo.svg';
import Frame from '../assets/Frame 7573.svg';

const Header = () => {
    return (
        <header className="bg-white border-b shadow-sm">
            <div className="container mx-auto flex justify-between py-2 px-6">
                <div className="flex items-center space-x-3 w-32">
                    <img src={Logo} alt="Logo" className="" />
                </div>
                <div className="flex space-x-1 items-end">
                    <img src={Frame} alt="Frame" className="w-5 h-5" />
                    <span className="text-xs font-medium"> 125 stars</span>
                </div>
            </div>
        </header>
    );
};

export default Header;
