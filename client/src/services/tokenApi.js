const API_URL = "http://localhost:5000";

export async function createToken(customerId, serviceId) {
    const response = await fetch(`${API_URL}/api/tokens`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            customerId,
            serviceId,
        }),
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || "Failed to generate token");
    }

    return data;
}
