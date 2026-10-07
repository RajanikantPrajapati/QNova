import { useState } from "react";
import { createToken } from "../../services/tokenApi";

function TokenManagement({ provider, service }) {
    const [customerId, setCustomerId] = useState("");
    const [token, setToken] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    async function handleGenerateToken() {
        setError("");
        setToken(null);

        if (!customerId) {
            setError("Customer ID is required");
            return;
        }

        try {
            setLoading(true);

            const data = await createToken(
                customerId,
                service.id
            );

            setToken(data.token);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div>
            <h2>Step 5: Token Management</h2>

            <hr />

            <p>
                <strong>Business:</strong> {provider.name}
            </p>

            <p>
                <strong>Service:</strong> {service.name}
            </p>

            <p>
                <strong>Estimated Time:</strong>{" "}
                {service.estimatedMinutes} minutes
            </p>

            <hr />

            <h3>Generate Token</h3>

            <label>
                Customer ID:
                <input
                    type="number"
                    value={customerId}
                    onChange={(e) => setCustomerId(e.target.value)}
                    placeholder="Enter customer ID"
                />
            </label>

            <br />
            <br />

            <button
                onClick={handleGenerateToken}
                disabled={loading}
            >
                {loading ? "Generating..." : "Generate Token"}
            </button>

            {error && (
                <p>
                    <strong>Error:</strong> {error}
                </p>
            )}

            {token && (
                <div>
                    <hr />

                    <h3>Token Generated Successfully</h3>

                    <p>
                        <strong>Token:</strong>{" "}
                        {token.tokenNumber}
                    </p>

                    <p>
                        <strong>Position:</strong>{" "}
                        {token.position}
                    </p>

                    <p>
                        <strong>Status:</strong>{" "}
                        {token.status}
                    </p>

                    <p>
                        <strong>Estimated Wait:</strong>{" "}
                        {token.estimatedWait} minutes
                    </p>
                </div>
            )}
        </div>
    );
}

export default TokenManagement;