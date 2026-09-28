import { useState } from "react";

import ProviderRegistration from "./modules/provider/ProviderRegistration";
import ServiceManagement from "./modules/service/ServiceManagement";
import StaffManagement from "./modules/staff/StaffManagement";

function App() {
    const [currentStep, setCurrentStep] = useState(1);

    const [provider, setProvider] = useState(null);
    const [service, setService] = useState(null);
    const [staff, setStaff] = useState(null);

    // Step 1 completed
    function handleProviderCreated(createdProvider) {
        setProvider(createdProvider);
        setCurrentStep(2);
    }

    // Step 2 completed
    function handleServiceCreated(createdService) {
        setService(createdService);
        setCurrentStep(3);
    }

    // Step 3 completed
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
            {currentStep === 4 && (
                <section>
                    <h2>Setup Completed ✅</h2>

                    <p>
                        Business, Service and Staff setup
                        completed successfully.
                    </p>

                    {provider && (
                        <p>
                            <strong>Business:</strong>{" "}
                            {provider.name}
                        </p>
                    )}

                    {service && (
                        <p>
                            <strong>Service:</strong>{" "}
                            {service.name}
                        </p>
                    )}

                    {staff && (
                        <p>
                            <strong>Staff:</strong>{" "}
                            {staff.name}
                        </p>
                    )}

                    <hr />

                    <h3>Next Module</h3>
                    <p>Queue Management</p>
                </section>
            )}
        </div>
    );
}

export default App;