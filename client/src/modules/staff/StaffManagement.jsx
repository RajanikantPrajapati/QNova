import { useEffect, useState } from "react";

import { getProviders } from "../../services/providerApi";

import { getServicesByProvider } from "../../services/serviceApi";

import { getStaffByProvider, createStaff } from "../../services/staffApi";

function StaffManagement() {
    const [providers, setProviders] = useState([]);
    const [services, setServices] = useState([]);
    const [staff, setStaff] = useState([]);

    const [selectedProviderId, setSelectedProviderId] = useState("");
    const [selectedServiceId, setSelectedServiceId] = useState("");

    const [name, setName] = useState("");
    const [role, setRole] = useState("");

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

    // Load services and staff when provider changes
    useEffect(() => {
        if (!selectedProviderId) {
            setServices([]);
            setStaff([]);
            setSelectedServiceId("");
            return;
        }

        async function loadProviderData() {
            try {
                setError("");

                const providerId = Number(selectedProviderId);

                const serviceData = await getServicesByProvider(providerId);
                const staffData = await getStaffByProvider(providerId);

                setServices(serviceData);
                setStaff(staffData);
                setSelectedServiceId("");
            } catch (error) {
                setError(error.message);
            }
        }

        loadProviderData();
    }, [selectedProviderId]);

    // Create staff
    async function handleSubmit(event) {
        event.preventDefault();

        setMessage("");
        setError("");

        if (!selectedProviderId || !selectedServiceId || !name.trim()) {
            setError("Please fill all required fields.");
            return;
        }

        try {
            await createStaff({
                providerId: Number(selectedProviderId),
                serviceId: Number(selectedServiceId),
                name: name.trim(),
                role: role.trim(),
            });

            setMessage("Staff created successfully!");

            setName("");
            setRole("");
            setSelectedServiceId("");

            // Refresh staff list
            const updatedStaff = await getStaffByProvider(selectedProviderId);

            setStaff(updatedStaff);
        } catch (error) {
            setError(error.message);
        }
    }

    return (
        <section>
            <hr />

            <h2>Staff Management</h2>

            {/* Provider */}
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

                    {/* Staff Form */}
                    <form onSubmit={handleSubmit}>
                        <div>
                            <label>Service</label>
                            <br />

                            <select
                                value={selectedServiceId}
                                onChange={(event) =>
                                    setSelectedServiceId(event.target.value)
                                }
                            >
                                <option value="">Select Service</option>

                                {services.map((service) => (
                                    <option key={service.id} value={service.id}>
                                        {service.name} -{" "}
                                        {service.estimatedMinutes} min
                                    </option>
                                ))}
                            </select>
                        </div>

                        <br />

                        <div>
                            <label>Staff Name</label>
                            <br />

                            <input
                                type="text"
                                placeholder="Enter staff name"
                                value={name}
                                onChange={(event) =>
                                    setName(event.target.value)
                                }
                            />
                        </div>

                        <br />

                        <div>
                            <label>Role</label>
                            <br />

                            <input
                                type="text"
                                placeholder="Enter role"
                                value={role}
                                onChange={(event) =>
                                    setRole(event.target.value)
                                }
                            />
                        </div>

                        <br />

                        <button type="submit">Create Staff</button>
                    </form>

                    <br />

                    {message && <p>{message}</p>}
                    {error && <p>{error}</p>}

                    <h3>Staff</h3>

                    {staff.length === 0 ? (
                        <p>No staff found.</p>
                    ) : (
                        <ul>
                            {staff.map((member) => (
                                <li key={member.id}>
                                    <strong>{member.name}</strong>
                                    {" - "}
                                    {member.role}
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

export default StaffManagement;
