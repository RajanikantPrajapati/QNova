import { useEffect, useState } from "react";
import { getBusinessTypes } from "../../services/businessTypeApi";
import { createProvider } from "../../services/providerApi";

function ProviderRegistration({ onProviderCreated }) {
    const [businessTypes, setBusinessTypes] = useState([]);

    const [businessTypeId, setBusinessTypeId] = useState("");
    const [name, setName] = useState("");
    const [location, setLocation] = useState("");

    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        const loadBusinessTypes = async () => {
            try {
                const data = await getBusinessTypes();
                setBusinessTypes(data);
            } catch (error) {
                setError(error.message);
            }
        };

        loadBusinessTypes();
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();

        setMessage("");
        setError("");

        if (!businessTypeId || !name.trim() || !location.trim()) {
            setError("Please fill all fields.");
            return;
        }

        try {
            await createProvider({
                businessTypeId: Number(businessTypeId),
                name: name.trim(),
                location: location.trim(),
            });

            setMessage("Provider created successfully!");

            setBusinessTypeId("");
            setName("");
            setLocation("");

            onProviderCreated();
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <section>
            <h2>Provider Registration</h2>

            <form onSubmit={handleSubmit}>
                <div>
                    <label>Business Type</label>
                    <br />

                    <select
                        value={businessTypeId}
                        onChange={(event) =>
                            setBusinessTypeId(event.target.value)
                        }
                    >
                        <option value="">
                            Select Business Type
                        </option>

                        {businessTypes.map((type) => (
                            <option key={type.id} value={type.id}>
                                {type.name}
                            </option>
                        ))}
                    </select>
                </div>

                <br />

                <div>
                    <label>Provider Name</label>
                    <br />

                    <input
                        type="text"
                        placeholder="Enter provider name"
                        value={name}
                        onChange={(event) =>
                            setName(event.target.value)
                        }
                    />
                </div>

                <br />

                <div>
                    <label>Location</label>
                    <br />

                    <input
                        type="text"
                        placeholder="Enter location"
                        value={location}
                        onChange={(event) =>
                            setLocation(event.target.value)
                        }
                    />
                </div>

                <br />

                <button type="submit">
                    Create Provider
                </button>
            </form>

            <br />

            {message && <p>{message}</p>}
            {error && <p>{error}</p>}
        </section>
    );
}

export default ProviderRegistration;