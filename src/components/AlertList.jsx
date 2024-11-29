const formatName = (name) => {
    const formattedName = name.replace(/([a-z])([A-Z])/g, '$1 $2');
    return formattedName.charAt(0).toUpperCase() + formattedName.slice(1);
};

const AlertList = ({ groups, onViewRules }) => {

    return (
        <div className="container mx-auto px-6">
            <p className="text-xs mb-4 heading">BASIC RESOURCE MONITORING</p>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                {groups.map((group, groupIndex) => (
                    <div
                    key={groupIndex}
                    className="p-6 border rounded shadow-lg transition ease-in-out"
                    >
                        <div className="flex items-center mb-4">
                            <img
                                src={group.logo}
                                alt={group.name}
                                className="h-6 w-6"
                            />
                            <h3 className="text-sm groupName font-bold text-gray-800 ml-2">{formatName(group.name)}</h3>
                        </div>
                        <p className="mt-2 text-gray-600 text-xs heading">
                            <span className="rounded-full p-1 mr-1">
                                <span>{group.rules.length} RULES</span>
                            </span>
                            {group.rules
                            .map((rule) => formatName(rule.alert))
                            .slice(0, 4)
                            .join(', ')}
                            {group.rules.length > 4 && '...'}
                        </p>
                        <button
                            type="button"
                            className="mt-4 w-full py-2 px-4 btn bg-white-500 hover:bg-white-600 rounded-md text-xs"
                            onClick={() => onViewRules(group, groupIndex)}
                        >
                            View Alert Rules
                        </button>
                    </div>
                ))}
            </div>

        </div>
    );
};

export default AlertList;
