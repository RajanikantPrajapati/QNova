const API_URL = "http://localhost:5000";

// Get all queues
export async function getQueues() {
    const response = await fetch(`${API_URL}/api/queues`);

    if (!response.ok) {
        throw new Error("Failed to fetch queues");
    }

    return response.json();
}

// Get queue by service
export async function getQueueByService(serviceId) {
    const response = await fetch(
        `${API_URL}/api/queues/service/${serviceId}`
    );

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || "Failed to fetch queue");
    }

    return data;
}