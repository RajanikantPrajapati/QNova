import { useState } from "react";

import ProviderRegistration from "./modules/provider/ProviderRegistration";
import ServiceManagement from "./modules/service/ServiceManagement";
import StaffManagement from "./modules/staff/StaffManagement";
import QueueManagement from "./modules/queue/QueueManagement";

function App() {
    const [currentStep, setCurrentStep] = useState(1);

    const [provider, setProvider] = useState(null);
    const [service, setService] = useState(null);
    const [staff, setStaff] = useState(null);

    // Step 1
    function handleProviderCreated(createdProvider) {
        setProvider(createdProvider);
        setCurrentStep(2);
    }

    // Step 2
    function handleServiceCreated(createdService) {
        setService(createdService);
        setCurrentStep(3);
    }

    // Step 3
    function handleStaffCreated(createdStaff) {
        setStaff(createdStaff);
        setCurrentStep(4);
    }

    return (
        <div>
            <h1>Qnova</h1>

            <hr />

            {/* STEP 1 */}
            {currentStep === 1 && (
                <ProviderRegistration
                    onProviderCreated={handleProviderCreated}
                />
            )}

            {/* STEP 2 */}
            {currentStep === 2 && provider && (
                <ServiceManagement
                    provider={provider}
                    onServiceCreated={handleServiceCreated}
                />
            )}

            {/* STEP 3 */}
            {currentStep === 3 && provider && service && (
                <StaffManagement
                    provider={provider}
                    service={service}
                    onStaffCreated={handleStaffCreated}
                />
            )}

            {/* STEP 4 */}
            {currentStep === 4 &&
                provider &&
                service && (
                    <QueueManagement
                        provider={provider}
                        service={service}
                    />
                )}
        </div>
    );
}

export default App;