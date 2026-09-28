import { useEffect, useState } from "react";
import {
    getStaffByProvider,
    createStaff,
} from "../../services/staffApi";

function StaffManagement({ provider, service, onStaffCreated }) {
    const [staff, setStaff] = useState([]);

    const [name, setName] = useState("");
    const [role, setRole] = useState("");

    const [error, setError] = useState("");

    useEffect(() => {
        async function loadStaff() {
            try {
                const data = await getStaffByProvider(provider.id);
                setStaff(data);
            } catch (error) {
                setError(error.message);
            }
        }

        loadStaff();
    }, [provider.id]);

    async function handleSubmit(event) {
        event.preventDefault();

        setError("");

        if (!name.trim()) {
            setError("Staff name is required.");
            return;
        }

        try {
            const data = await createStaff({
                providerId: provider.id,
                serviceId: service.id,
                name: name.trim(),
                role: role.trim(),
            });

            const updatedStaff = await getStaffByProvider(
                provider.id
            );

            setStaff(updatedStaff);

            setName("");
            setRole("");

            onStaffCreated(data.staff);
        } catch (error) {
            setError(error.message);
        }
    }

    return (
        <section>
            <h2>Step 3: Staff Management</h2>

            <p>
                <strong>Business:</strong> {provider.name}
            </p>

            <p>
                <strong>Service:</strong> {service.name}
            </p>

            <hr />

            <h3>Add Staff</h3>

            <form onSubmit={handleSubmit}>
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

                <button type="submit">
                    Create Staff
                </button>
            </form>

            <br />

            {error && <p>{error}</p>}

            <h3>Staff List</h3>

            {staff.length === 0 ? (
                <p>No staff found.</p>
            ) : (
                <ul>
                    {staff.map((member) => (
                        <li key={member.id}>
                            <strong>{member.name}</strong>
                            {" - "}
                            {member.role || "Staff"}
                        </li>
                    ))}
                </ul>
            )}
        </section>
    );
}

export default StaffManagement;