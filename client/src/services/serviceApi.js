const API_URL = "http://localhost:5000";

export async function getServicesByProvider(providerId) {
    const response = await fetch(
        `${API_URL}/api/services/provider/${providerId}`
    );

    if (!response.ok) {
        throw new Error("Failed to fetch services");
    }

    return response.json();
}

export async function createService(serviceData) {
    const response = await fetch(`${API_URL}/api/services`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(serviceData),
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || "Failed to create service");
    }

    return data;
}