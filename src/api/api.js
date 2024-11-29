import axios from "axios";
import * as yaml from "js-yaml";

const API_URLS = [
    "https://raw.githubusercontent.com/samber/awesome-prometheus-alerts/master/dist/rules/prometheus-self-monitoring/embedded-exporter.yml", "https://raw.githubusercontent.com/samber/awesome-prometheus-alerts/master/dist/rules/host-and-hardware/node-exporter.yml","https://raw.githubusercontent.com/samber/awesome-prometheus-alerts/master/dist/rules/s.m.a.r.t-device-monitoring/smartctl-exporter.yml","https://raw.githubusercontent.com/samber/awesome-prometheus-alerts/master/dist/rules/docker-containers/google-cadvisor.yml","https://raw.githubusercontent.com/samber/awesome-prometheus-alerts/master/dist/rules/blackbox/blackbox-exporter.yml","https://raw.githubusercontent.com/samber/awesome-prometheus-alerts/master/dist/rules/windows-server/windows-exporter.yml","https://raw.githubusercontent.com/samber/awesome-prometheus-alerts/master/dist/rules/vmware/pryorda-vmware-exporter.yml","https://raw.githubusercontent.com/samber/awesome-prometheus-alerts/master/dist/rules/netdata/embedded-exporter.yml"
];

export const fetchAlertRules = async () => {
    try {
        const fetchPromises = API_URLS.map((url) => axios.get(url));
        const responses = await Promise.all(fetchPromises);

        const allParsedData = responses.map((response, index) => {
            const match = API_URLS[index].match(/\/rules\/([^/]+)\/[^/]+\.yml/);
            const extractedName = match ? match[1] : "Unknown";

            const parsedData = yaml.load(response.data);

            console.log("Parsed Data: ", parsedData);

            if (parsedData && Array.isArray(parsedData.groups)) {
                parsedData.groups.forEach((group) => {
                    group.name = extractedName;
                });
            } else {
                console.error("Parsed data does not contain 'groups' or is not in the expected format:", parsedData);
            }

            return parsedData;
        });

        return allParsedData.flat();
    } catch (error) {
        console.error("Error fetching data: ", error);
        throw error;
    }
};
