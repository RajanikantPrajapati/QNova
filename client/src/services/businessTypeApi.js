const API_URL = "http://localhost:5000";

export async function getBusinessTypes() {
    const response = await fetch(`${API_URL}/api/business-types`);

    if (!response.ok) {
        throw new Error("Failed to fetch business types");
    }

    return response.json();
}