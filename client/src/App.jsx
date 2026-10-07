import { useState } from "react";

import ProviderRegistration from "./modules/provider/ProviderRegistration";
import ServiceManagement from "./modules/service/ServiceManagement";
import StaffManagement from "./modules/staff/StaffManagement";
import QueueManagement from "./modules/queue/QueueManagement";
import TokenManagement from "./modules/token/TokenManagement";

function App() {
    const [currentStep, setCurrentStep] = useState(1);

    const [provider, setProvider] = useState(null);
    const [service, setService] = useState(null);
    const [staff, setStaff] = useState(null);

    function handleProviderCreated(createdProvider) {
        setProvider(createdProvider);
        setCurrentStep(2);
    }

    function handleServiceCreated(createdService) {
        setService(createdService);
        setCurrentStep(3);
    }

    function handleStaffCreated(createdStaff) {
        setStaff(createdStaff);
        setCurrentStep(4);
    }

    function handleQueueComplete() {
        setCurrentStep(5);
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
                    <div>
                        <QueueManagement
                            provider={provider}
                            service={service}
                        />

                        <hr />

                        <button onClick={handleQueueComplete}>
                            Continue to Token Management
                        </button>
                    </div>
                )}

            {/* STEP 5 */}
            {currentStep === 5 &&
                provider &&
                service && (
                    <TokenManagement
                        provider={provider}
                        service={service}
                    />
                )}
        </div>
    );
}

export default App;