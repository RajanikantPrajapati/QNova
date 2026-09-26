const API_URL = "http://localhost:5000";

export async function getProviders() {
    const response = await fetch(`${API_URL}/api/providers`);

    if (!response.ok) {
        throw new Error("Failed to fetch providers");
    }

    return response.json();
}

export async function createProvider(providerData) {
    const response = await fetch(`${API_URL}/api/providers`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(providerData),
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || "Failed to create provider");
    }

    return data;
}