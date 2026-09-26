import { useEffect, useState } from "react";
import { getProviders } from "../../services/providerApi";

function ProviderList({ refresh }) {
    const [providers, setProviders] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {
        const loadProviders = async () => {
            try {
                const data = await getProviders();
                setProviders(data);
            } catch (error) {
                setError(error.message);
            }
        };

        loadProviders();
    }, [refresh]);

    return (
        <section>
            <hr />

            <h2>Providers</h2>

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