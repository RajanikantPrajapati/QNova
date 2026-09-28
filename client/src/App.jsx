import { useState } from "react";

import ProviderRegistration from "./modules/provider/ProviderRegistration";
import ServiceManagement from "./modules/service/ServiceManagement";
import StaffManagement from "./modules/staff/StaffManagement";

function App() {
    const [currentStep, setCurrentStep] = useState(1);

    const [provider, setProvider] = useState(null);
    const [service, setService] = useState(null);

    function handleProviderCreated(newProvider) {
        setProvider(newProvider);
        setCurrentStep(2);
    }

    function handleServiceCreated(newService) {
        setService(newService);
        setCurrentStep(3);
    }

    function handleStaffCreated() {
        setCurrentStep(4);
    }

    return (
        <div>
            <h1>Qnova</h1>

            <hr />

            {currentStep === 1 && (
                <ProviderRegistration
                    onProviderCreated={handleProviderCreated}
                />
            )}

            {currentStep === 2 && (
                <ServiceManagement
                    initialProviderId={provider?.id}
                    onServiceCreated={handleServiceCreated}
                />
            )}

            {currentStep === 3 && (
                <StaffManagement
                    initialProviderId={provider?.id}
                    initialServiceId={service?.id}
                    onStaffCreated={handleStaffCreated}
                />
            )}

            {currentStep === 4 && (
                <section>
                    <h2>Setup Completed</h2>

                    <p>
                        Provider, Service and Staff setup completed
                        successfully.
                    </p>

                    <h3>Next Module</h3>

                    <p>Queue Management</p>
                </section>
            )}
        </div>
    );
}

export default App;