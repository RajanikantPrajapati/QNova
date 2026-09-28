const API_URL = "http://localhost:5000";

// Get all providers
export async function getProviders() {
    const response = await fetch(`${API_URL}/api/providers`);

    if (!response.ok) {
        throw new Error("Failed to fetch providers");
    }

    return response.json();
}

// Get providers by business type
export async function getProvidersByBusinessType(businessTypeId) {
    const response = await fetch(
        `${API_URL}/api/providers/type/${businessTypeId}`
    );

    if (!response.ok) {
        throw new Error("Failed to fetch providers by business type");
    }

    return response.json();
}

// Create provider
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