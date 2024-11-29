import React, {useState, useEffect} from "react";
import { fetchAlertRules } from "../api/api";
import SearchBar from "../components/SearchBar";
import AlertList from "../components/AlertList";
import Modal from "../components/Modal";

const formatName = (name) => {
    return name.replace(/([a-z])([A-Z])/g, '$1 $2');
};

const HomePage = () => {
    const [groups, setGroups] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedGroup, setSelectedGroup] = useState(null);

    useEffect(() => {
        const getAlerts = async () => {
            try {
                const data = await fetchAlertRules();
                console.log(data);

                const allGroups = data.flatMap((apiData) => {
                    if (Array.isArray(apiData.groups)) {
                        return apiData.groups;
                    }
                    console.error("Fetched data does not have groups: ", apiData);
                    return [];
                });

                setGroups(allGroups);
            } catch (error) {
                console.error("Error fetching alerts: ", error);
            }
        };
        getAlerts();
    }, []);

    const filteredGroups = groups.filter((group) => 
        formatName(group.name).toLowerCase().includes(searchTerm.toLowerCase())  
    );

    const handleViewRules = (group, groupIndex) => {
        setSelectedGroup({group, groupIndex});
    }

    const closeModal = () => {
        setSelectedGroup(null);
    }

    return (
        <div className="p-4">
            <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
            <AlertList groups={filteredGroups} onViewRules={handleViewRules}/>
            {selectedGroup && (
                <Modal 
                    isOpen={!!selectedGroup} 
                    onClose={closeModal} 
                    group={selectedGroup.group} 
                    groupIndex={selectedGroup.groupIndex} 
                />
            )}
        </div>
    );
};

export default HomePage;