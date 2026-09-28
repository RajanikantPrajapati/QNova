import { useEffect, useState } from "react";
import {
    getServicesByProvider,
    createService,
} from "../../services/serviceApi";

function ServiceManagement({ provider, onServiceCreated }) {
    const [services, setServices] = useState([]);

    const [serviceName, setServiceName] = useState("");
    const [estimatedMinutes, setEstimatedMinutes] = useState("");

    const [error, setError] = useState("");

    useEffect(() => {
        async function loadServices() {
            try {
                const data = await getServicesByProvider(provider.id);
                setServices(data);
            } catch (error) {
                setError(error.message);
            }
        }

        loadServices();
    }, [provider.id]);

    async function handleSubmit(event) {
        event.preventDefault();

        setError("");

        if (!serviceName.trim() || !estimatedMinutes) {
            setError("Please fill all fields.");
            return;
        }

        try {
            const data = await createService({
                providerId: provider.id,
                name: serviceName.trim(),
                estimatedMinutes: Number(estimatedMinutes),
            });

            const updatedServices = await getServicesByProvider(
                provider.id
            );

            setServices(updatedServices);

            setServiceName("");
            setEstimatedMinutes("");

            // Move to Staff module
            onServiceCreated(data.service);
        } catch (error) {
            setError(error.message);
        }
    }

    return (
        <section>
            <h2>Step 2: Service Management</h2>

            <p>
                <strong>Business:</strong> {provider.name}
            </p>

            <p>
                <strong>Location:</strong> {provider.location}
            </p>

            <hr />

            <h3>Add Service</h3>

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
                            setEstimatedMinutes(event.target.value)
                        }
                    />
                </div>

                <br />

                <button type="submit">
                    Create Service
                </button>
            </form>

            <br />

            {error && <p>{error}</p>}

            <h3>Existing Services</h3>

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
        </section>
    );
}

export default ServiceManagement;