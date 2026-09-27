import { useEffect, useState } from "react";
import { getProviders } from "../../services/providerApi";
import {
    getServicesByProvider,
    createService,
} from "../../services/serviceApi";

function ServiceManagement() {
    const [providers, setProviders] = useState([]);
    const [selectedProviderId, setSelectedProviderId] = useState("");

    const [services, setServices] = useState([]);

    const [serviceName, setServiceName] = useState("");
    const [estimatedMinutes, setEstimatedMinutes] = useState("");

    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    // Load providers
    useEffect(() => {
        async function loadProviders() {
            try {
                const data = await getProviders();
                setProviders(data);
            } catch (error) {
                setError(error.message);
            }
        }

        loadProviders();
    }, []);

    // Load services for selected provider
    useEffect(() => {
        if (!selectedProviderId) {
            setServices([]);
            return;
        }

        async function loadServices() {
            try {
                const data = await getServicesByProvider(
                    selectedProviderId
                );

                setServices(data);
            } catch (error) {
                setError(error.message);
            }
        }

        loadServices();
    }, [selectedProviderId]);

    // Create service
    async function handleSubmit(event) {
        event.preventDefault();

        setMessage("");
        setError("");

        if (
            !selectedProviderId ||
            !serviceName.trim() ||
            !estimatedMinutes
        ) {
            setError("Please fill all fields.");
            return;
        }

        try {
            await createService({
                providerId: Number(selectedProviderId),
                name: serviceName.trim(),
                estimatedMinutes: Number(estimatedMinutes),
            });

            setMessage("Service created successfully!");

            setServiceName("");
            setEstimatedMinutes("");

            const updatedServices = await getServicesByProvider(
                selectedProviderId
            );

            setServices(updatedServices);
        } catch (error) {
            setError(error.message);
        }
    }

    return (
        <section>
            <hr />

            <h2>Service Management</h2>

            <div>
                <label>Select Provider</label>
                <br />

                <select
                    value={selectedProviderId}
                    onChange={(event) =>
                        setSelectedProviderId(event.target.value)
                    }
                >
                    <option value="">Select Provider</option>

                    {providers.map((provider) => (
                        <option key={provider.id} value={provider.id}>
                            {provider.name}
                        </option>
                    ))}
                </select>
            </div>

            {selectedProviderId && (
                <>
                    <br />

                    <form onSubmit={handleSubmit}>
                        <div>
                            <label>Service Name</label>
                            <br />

                            <input
                                type="text"
                                placeholder="Enter service name"
                                value={serviceName}
                                onChange={(event) =>
                                    setServiceName(event.target.value)
                                }
                            />
                        </div>

                        <br />

                        <div>
                            <label>Estimated Minutes</label>
                            <br />

                            <input
                                type="number"
                                min="1"
                                placeholder="Enter estimated time"
                                value={estimatedMinutes}
                                onChange={(event) =>
                                    setEstimatedMinutes(
                                        event.target.value
                                    )
                                }
                            />
                        </div>

                        <br />

                        <button type="submit">
                            Add Service
                        </button>
                    </form>

                    <br />

                    {message && <p>{message}</p>}
                    {error && <p>{error}</p>}

                    <h3>Services</h3>

                    {services.length === 0 ? (
                        <p>No services found.</p>
                    ) : (
                        <ul>
                            {services.map((service) => (
                                <li key={service.id}>
                                    <strong>{service.name}</strong>
                                    {" - "}
                                    {service.estimatedMinutes} minutes
                                </li>
                            ))}
                        </ul>
                    )}
                </>
            )}

            {!selectedProviderId && <p>Please select a provider.</p>}
        </section>
    );
}

export default ServiceManagement;