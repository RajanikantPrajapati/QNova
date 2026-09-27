const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());


// =========================
// BUSINESS TYPES
// =========================

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

app.get("/api/business-types", (req, res) => {
    res.json(businessTypes);
});


// =========================
// PROVIDERS
// =========================

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

app.get("/api/providers", (req, res) => {
    res.json(providers);
});

app.get("/api/providers/type/:businessTypeId", (req, res) => {
    const businessTypeId = Number(req.params.businessTypeId);

    const filteredProviders = providers.filter(
        provider => provider.businessTypeId === businessTypeId
    );

    res.json(filteredProviders);
});

app.post("/api/providers", (req, res) => {
    const { businessTypeId, name, location } = req.body;

    if (!businessTypeId || !name || !location) {
        return res.status(400).json({
            message: "businessTypeId, name and location are required"
        });
    }

    const businessType = businessTypes.find(
        type => type.id === Number(businessTypeId)
    );

    if (!businessType) {
        return res.status(400).json({
            message: "Invalid business type"
        });
    }

    const newId =
        providers.length > 0
            ? Math.max(...providers.map(provider => provider.id)) + 1
            : 1;

    const newProvider = {
        id: newId,
        businessTypeId: Number(businessTypeId),
        name: name.trim(),
        location: location.trim()
    };

    providers.push(newProvider);

    res.status(201).json({
        message: "Provider created successfully",
        provider: newProvider
    });
});


// =========================
// SERVICES
// =========================

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
    }
];

app.get("/api/services", (req, res) => {
    res.json(services);
});

app.get("/api/services/provider/:providerId", (req, res) => {
    const providerId = Number(req.params.providerId);

    const filteredServices = services.filter(
        service => service.providerId === providerId
    );

    res.json(filteredServices);
});

app.post("/api/services", (req, res) => {
    const { providerId, name, estimatedMinutes } = req.body;

    if (!providerId || !name || !estimatedMinutes) {
        return res.status(400).json({
            message: "providerId, name and estimatedMinutes are required"
        });
    }

    const provider = providers.find(
        provider => provider.id === Number(providerId)
    );

    if (!provider) {
        return res.status(400).json({
            message: "Invalid provider"
        });
    }

    const minutes = Number(estimatedMinutes);

    if (minutes <= 0) {
        return res.status(400).json({
            message: "estimatedMinutes must be greater than 0"
        });
    }

    const newId =
        services.length > 0
            ? Math.max(...services.map(service => service.id)) + 1
            : 1;

    const newService = {
        id: newId,
        providerId: Number(providerId),
        name: name.trim(),
        estimatedMinutes: minutes
    };

    services.push(newService);

    res.status(201).json({
        message: "Service created successfully",
        service: newService
    });
});


// =========================
// STAFF
// =========================

const staff = [];

app.get("/api/staff", (req, res) => {
    res.json(staff);
});

app.get("/api/staff/provider/:providerId", (req, res) => {
    const providerId = Number(req.params.providerId);

    const filteredStaff = staff.filter(
        member => member.providerId === providerId
    );

    res.json(filteredStaff);
});

app.get("/api/staff/service/:serviceId", (req, res) => {
    const serviceId = Number(req.params.serviceId);

    const filteredStaff = staff.filter(
        member => member.serviceId === serviceId
    );

    res.json(filteredStaff);
});

app.post("/api/staff", (req, res) => {
    const { providerId, serviceId, name, role } = req.body;

    if (!providerId || !serviceId || !name) {
        return res.status(400).json({
            message: "providerId, serviceId and name are required"
        });
    }

    const provider = providers.find(
        provider => provider.id === Number(providerId)
    );

    if (!provider) {
        return res.status(400).json({
            message: "Invalid provider"
        });
    }

    const service = services.find(
        service => service.id === Number(serviceId)
    );

    if (!service) {
        return res.status(400).json({
            message: "Invalid service"
        });
    }

    if (service.providerId !== Number(providerId)) {
        return res.status(400).json({
            message: "Selected service does not belong to this provider"
        });
    }

    const newId =
        staff.length > 0
            ? Math.max(...staff.map(member => member.id)) + 1
            : 1;

    const newStaff = {
        id: newId,
        providerId: Number(providerId),
        serviceId: Number(serviceId),
        name: name.trim(),
        role: role ? role.trim() : "Staff"
    };

    staff.push(newStaff);

    res.status(201).json({
        message: "Staff created successfully",
        staff: newStaff
    });
});


// =========================
// SERVER
// =========================

const PORT = 5000;

app.listen(PORT, () => {
    console.log(`Qnova Backend running on http://localhost:${PORT}`);
});