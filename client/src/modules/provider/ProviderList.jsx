import { useEffect, useState } from "react";
import { getProviders } from "../../services/providerApi";

function ProviderList() {
    const [providers, setProviders] = useState([]);
    const [error, setError] = useState("");

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

    return (
        <section>
            <h2>Businesses</h2>

            {error && <p>{error}</p>}

            {providers.length === 0 ? (
                <p>No providers found.</p>
            ) : (
                <ul>
                    {providers.map((provider) => (
                        <li key={provider.id}>
                            <strong>{provider.name}</strong>
                            {" - "}
                            {provider.location}
                        </li>
                    ))}
                </ul>
            )}
        </section>
    );
}

export default ProviderList;