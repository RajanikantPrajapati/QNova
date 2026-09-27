const API_URL = "http://localhost:5000";

// Get all staff
export async function getStaff() {
    const response = await fetch(`${API_URL}/api/staff`);

    if (!response.ok) {
        throw new Error("Failed to fetch staff");
    }

    return response.json();
}

// Get staff by provider
export async function getStaffByProvider(providerId) {
    const response = await fetch(
        `${API_URL}/api/staff/provider/${providerId}`
    );

    if (!response.ok) {
        throw new Error("Failed to fetch provider staff");
    }

    return response.json();
}

// Create staff
export async function createStaff(staffData) {
    const response = await fetch(`${API_URL}/api/staff`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(staffData),
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || "Failed to create staff");
    }

    return data;
}