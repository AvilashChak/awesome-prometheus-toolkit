import React, {useState, useEffect} from "react";
import { fetchAlertRules } from "../api/api";
import SearchBar from "../components/SearchBar";
import AlertList from "../components/AlertList";
import Modal from "../components/Modal";
import Logo1 from '../assets/icon1.svg';
import Logo2 from '../assets/icon2.svg';
import Logo3 from '../assets/icon3.svg';
import Logo4 from '../assets/icon4.svg';
import Logo5 from '../assets/icon5.svg';
import Logo6 from '../assets/icon6.svg';
import Logo7 from '../assets/icon7.svg';
import Logo8 from '../assets/icon8.svg';

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

                const logos = [Logo1, Logo2, Logo3, Logo4, Logo5, Logo6, Logo7, Logo8];
                const groupsWithLogos = allGroups.map((group, index) => ({
                    ...group,
                    logo: logos[index]
                }));

                setGroups(groupsWithLogos);
            } catch (error) {
                console.error("Error fetching alerts: ", error);
            }
        };
        getAlerts();
    }, []);

    const filteredGroups = groups.filter((group) => 
        formatName(group.name).toLowerCase().includes(searchTerm.toLowerCase())  
    );

    const handleViewRules = (group) => {
        const selectedIndex = filteredGroups.findIndex(filteredGroup => filteredGroup.name === group.name);
        setSelectedGroup({group, groupIndex: selectedIndex});
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