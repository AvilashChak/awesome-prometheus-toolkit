import Close from '../assets/close.svg';
import Copy from '../assets/copy.svg';
import Logo1 from '../assets/icon1.svg';
import Logo2 from '../assets/icon2.svg';
import Logo3 from '../assets/icon3.svg';
import Logo4 from '../assets/icon4.svg';
import Logo5 from '../assets/icon5.svg';
import Logo6 from '../assets/icon6.svg';
import Logo7 from '../assets/icon7.svg';
import Logo8 from '../assets/icon8.svg';

const copyToClipboard = (rule) => {
    const textContent = `
      alert: ${rule.alert}
      expr: ${rule.expr}
      for: ${rule.for}
      labels: ${Object.entries(rule.labels)
        .map(([key, value]) => `${key}: ${value}`)
        .join(", ")}
      annotations: ${Object.entries(rule.annotations)
        .map(([key, value]) => `${key}: ${value}`)
        .join(", ")}
    `;
  
    navigator.clipboard.writeText(textContent).then(() => {
      alert("Copied to clipboard!");
    }).catch(err => {
      console.error("Failed to copy: ", err);
    });
  };
  

const Modal = ({ isOpen, onClose, group, groupIndex }) => {
    if (!isOpen || !group) return null;

    const formatName = (name) => {
        const formattedName = name.replace(/([a-z])([A-Z])/g, '$1 $2');
        return formattedName.charAt(0).toUpperCase() + formattedName.slice(1);
    };

    const logos = [Logo1, Logo2, Logo3, Logo4, Logo5, Logo6, Logo7, Logo8];

    const handleBackDropClick = (e) => {
        if(e.target === e.currentTarget) {
            onClose();
        }
    }

    return (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center"
            onClick={handleBackDropClick}
        >
            <div className="bg-white rounded-lg shadow-lg w-4/5 max-h-[90%] overflow-y-auto modal">
                <div className="flex justify-between items-center pb-4 border-b p-6">
                    <div className='flex items-center'>
                        <img 
                            src={logos[groupIndex]}
                            alt={formatName(group.name)} 
                            className="w-5 h-5" 
                        />
                        <h2 className="text-base modal-heading ml-2">
                            {formatName(group.name)}
                            <span className="ml-2 rounded-full p-1 text-xs heading">{group.rules.length} Rules</span>
                        </h2>
                    </div>
                    <button
                        type="button"
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-800"
                    >
                        <img src={Close} alt="Close" className="w-5 h-5" />
                    </button>
                </div>
                
                <ul className="p-6">
                    {group.rules.map((rule, index) => (
                        <li key={index} className="mb-4 p-4 relative">
                            <div className="flex">
                                <div>
                                    <p className='rounded-full w-10 h-10 flex justify-center items-center'>
                                        <span className='text-xs font-bold'>{String(index + 1).padStart(2, '0')}</span>
                                    </p>    
                                </div>
                                <div className="mb-4 ml-4">
                                    <p className="text-sm sub-heading">{formatName(rule.alert)}</p>
                                    <p className="text-xs">
                                        {rule.annotations?.description
                                            ? rule.annotations.description.split("\n")[0]
                                            : "No description available."}
                                    </p>
                                </div>
                            </div>
                            <button
                                type="button"
                                className="text-gray-500 hover:text-gray-800 absolute copy"
                                onClick={() => copyToClipboard(rule)}
                            >
                                <img src={Copy} alt="Copy" className="w-16 h-8" />
                            </button>
                            <div id={`text-${rule.alert}`} className="border-0 rounded bg-gray-50 p-6 ml-12 card">
                                <div className="flex mob-mt-32">
                                    <div><span>-</span></div>   
                                    <div className='ml-2 mt-1 para'>
                                        <p>
                                            <span className="text-green-700"> alert: </span>
                                            <span>{rule.alert}</span> 
                                        </p>
                                        <p>
                                            <span className="text-green-700">  expr: </span> 
                                            <span>{rule.expr}</span>
                                        </p>
                                        <p>
                                            <span className="text-green-700">  for: </span>
                                            <span>{rule.for}</span> 
                                        </p>
                                        <div>
                                            <p className="text-green-700">  labels: </p>
                                            {Object.entries(rule.labels).map(([key, value]) => (
                                                <p key={key} className="ml-4">
                                                    <span className="text-green-700">{key}: </span>
                                                    <span>{value}</span> 
                                                </p>
                                            ))}
                                        </div>
                                        <div>
                                            <p className="text-green-700">  annotations: </p>
                                            {Object.entries(rule.annotations).map(([key, value]) => (
                                                <p key={key} className="ml-4">
                                                    <span className="text-green-700">{key}: </span> <span>{value}</span>
                                                </p>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>

            </div>
        </div>
    );
};

export default Modal;