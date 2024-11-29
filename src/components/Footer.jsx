import NoPadding from '../assets/no-padding.svg';

const Footer = () => {
    return (
        <footer className="bg-white border-t shadow-sm">
            <div className="container mx-auto flex justify-between py-5 px-6">
                <div className="flex items-center">
                    <span className="text-xs font-medium">Contribute on GitHub</span>
                </div>
                <div className="flex space-x-1 items-end">
                    <span className="text-xs font-medium">Maintained by Last9</span>
                    <img src={NoPadding} alt="NoPadding" className="w-5 h-5" />
                </div>
            </div>
        </footer>
    );
};

export default Footer;