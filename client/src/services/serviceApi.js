const API_URL = "http://localhost:5000";

// Get all services
export async function getServices() {
    const response = await fetch(`${API_URL}/api/services`);

    if (!response.ok) {
        throw new Error("Failed to fetch services");
    }

    return response.json();
}

// Get services by provider
export async function getServicesByProvider(providerId) {
    const response = await fetch(
        `${API_URL}/api/services/provider/${providerId}`
    );

    if (!response.ok) {
        throw new Error("Failed to fetch provider services");
    }

    return response.json();
}

// Create service
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