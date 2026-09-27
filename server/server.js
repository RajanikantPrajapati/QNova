const express = require("express");
const cors = require("cors");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Test route
// Business Types
const businessTypes = [
    {
        id: 1,
        name: "Hospital",
        description: "Healthcare and medical services"
    },
    {
        id: 2,
        name: "Bank",
        description: "Banking and financial services"
    },
    {
        id: 3,
        name: "Salon",
        description: "Beauty and grooming services"
    },
    {
        id: 4,
        name: "Government Office",
        description: "Public and government services"
    }
];

// Get all business types
app.get("/api/business-types", (req, res) => {
    res.json(businessTypes);
});
const providers = [
    {
        id: 1,
        businessTypeId: 1,
        name: "City Care Hospital",
        location: "Varanasi"
    },
    {
        id: 2,
        businessTypeId: 1,
        name: "Sunrise Hospital",
        location: "Azamgarh"
    },
    {
        id: 3,
        businessTypeId: 2,
        name: "National Bank",
        location: "Varanasi"
    },
    {
        id: 4,
        businessTypeId: 3,
        name: "Style Studio",
        location: "Greater Noida"
    },
    {
        id: 5,
        businessTypeId: 4,
        name: "Citizen Service Center",
        location: "Greater Noida"
    }
];

// Services
const services = [
    {
        id: 1,
        providerId: 1,
        name: "General Medicine",
        estimatedMinutes: 15
    },
    {
        id: 2,
        providerId: 1,
        name: "Dental",
        estimatedMinutes: 20
    },
    {
        id: 3,
        providerId: 1,
        name: "Cardiology",
        estimatedMinutes: 30
    },
    {
        id: 4,
        providerId: 3,
        name: "Cash Deposit",
        estimatedMinutes: 10
    },
    {
        id: 5,
        providerId: 3,
        name: "Cash Withdrawal",
        estimatedMinutes: 10
    },
    {
        id: 6,
        providerId: 4,
        name: "Haircut",
        estimatedMinutes: 30
    },
    {
        id: 7,
        providerId: 4,
        name: "Hair Coloring",
        estimatedMinutes: 60
    },
    {
        id: 8,
        providerId: 5,
        name: "Certificate Service",
        estimatedMinutes: 20
    }
];

// Create a new Dynamic service
app.post("/api/services", (req, res) => {
    const { providerId, name, estimatedMinutes } = req.body;

    // Basic validation
    if (!providerId || !name || !estimatedMinutes) {
        return res.status(400).json({
            message: "providerId, name and estimatedMinutes are required"
        });
    }

    // Check whether provider exists
    const provider = providers.find(
        provider => provider.id === Number(providerId)
    );

    if (!provider) {
        return res.status(400).json({
            message: "Invalid provider"
        });
    }

    // Validate estimated time
    const minutes = Number(estimatedMinutes);

    if (minutes <= 0) {
        return res.status(400).json({
            message: "estimatedMinutes must be greater than 0"
        });
    }

    // Generate new service ID
    const newId =
        services.length > 0
            ? Math.max(...services.map(service => service.id)) + 1
            : 1;

    // Create service
    const newService = {
        id: newId,
        providerId: Number(providerId),
        name: name.trim(),
        estimatedMinutes: minutes
    };

    // Add service
    services.push(newService);

    // Response
    res.status(201).json({
        message: "Service created successfully",
        service: newService
    });
});


// Get all providers
app.get("/api/providers", (req, res) => {
    res.json(providers);
});

// Get providers by business type
app.get("/api/providers/type/:businessTypeId", (req, res) => {
    const businessTypeId = Number(req.params.businessTypeId);

    const filteredProviders = providers.filter(
        provider => provider.businessTypeId === businessTypeId
    );

    res.json(filteredProviders);
});

// Create a new  dynamic  provider
app.post("/api/providers", (req, res) => {
    const { businessTypeId, name, location } = req.body;

    // Validation
    if (!businessTypeId || !name || !location) {
        return res.status(400).json({
            message: "businessTypeId, name and location are required"
        });
    }

    // Check business type
    const businessType = businessTypes.find(
        type => type.id === Number(businessTypeId)
    );

    if (!businessType) {
        return res.status(400).json({
            message: "Invalid business type"
        });
    }

    // Generate new ID
    const newId =
        providers.length > 0
            ? Math.max(...providers.map(provider => provider.id)) + 1
            : 1;

    // Create provider
    const newProvider = {
        id: newId,
        businessTypeId: Number(businessTypeId),
        name: name.trim(),
        location: location.trim()
    };

    // Add provider
    providers.push(newProvider);

    // Response
    res.status(201).json({
        message: "Provider created successfully",
        provider: newProvider
    });
});

// Get all services
app.get("/api/services", (req, res) => {
    res.json(services);
});

// Get services by provider
app.get("/api/services/provider/:providerId", (req, res) => {
    const providerId = Number(req.params.providerId);

    const filteredServices = services.filter(
        service => service.providerId === providerId
    );

    res.json(filteredServices);
});
// Server port
const PORT = 5000;

// Start server
app.listen(PORT, () => {
    console.log(`UQMS Backend running on http://localhost:${PORT}`);
});

