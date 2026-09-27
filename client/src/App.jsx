import { useState } from "react";

import ProviderRegistration from "./modules/provider/providerRegistration";
import ProviderList from "./modules/provider/ProviderList";
import ServiceManagement from "./modules/service/ServiceManagement";

function App() {
    const [providerRefresh, setProviderRefresh] = useState(0);

    const handleProviderCreated = () => {
        setProviderRefresh((value) => value + 1);
    };

    return (
        <div>
            <h1>Qnova</h1>

            <ProviderRegistration
                onProviderCreated={handleProviderCreated}
            />

            <ProviderList
                refresh={providerRefresh}
            />
            <ServiceManagement/>
        </div>
    );
}

export default App;