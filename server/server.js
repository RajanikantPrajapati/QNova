const express = require("express");
const cors = require("cors");

const app = express();


// ==================================================
// MIDDLEWARE
// ==================================================

app.use(cors());
app.use(express.json());


// ==================================================
// BUSINESS TYPES
// ==================================================

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


// ==================================================
// PROVIDERS / BUSINESSES
// ==================================================

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


// Get all providers
app.get("/api/providers", (req, res) => {
    res.json(providers);
});


// Get providers by business type
app.get("/api/providers/type/:businessTypeId", (req, res) => {

    const businessTypeId = Number(req.params.businessTypeId);

    if (
        !Number.isInteger(businessTypeId) ||
        businessTypeId <= 0
    ) {
        return res.status(400).json({
            message: "Invalid business type ID"
        });
    }

    const filteredProviders = providers.filter(
        provider => provider.businessTypeId === businessTypeId
    );

    res.json(filteredProviders);
});


// Create a new provider
app.post("/api/providers", (req, res) => {

    const {
        businessTypeId,
        name,
        location
    } = req.body;


    // Validate business type ID
    const parsedBusinessTypeId = Number(businessTypeId);

    if (
        !Number.isInteger(parsedBusinessTypeId) ||
        parsedBusinessTypeId <= 0
    ) {
        return res.status(400).json({
            message: "businessTypeId must be a valid positive integer"
        });
    }


    // Validate provider name
    if (
        typeof name !== "string" ||
        !name.trim()
    ) {
        return res.status(400).json({
            message: "Provider name is required"
        });
    }


    // Validate location
    if (
        typeof location !== "string" ||
        !location.trim()
    ) {
        return res.status(400).json({
            message: "Location is required"
        });
    }


    // Check business type
    const businessType = businessTypes.find(
        type => type.id === parsedBusinessTypeId
    );

    if (!businessType) {
        return res.status(400).json({
            message: "Invalid business type"
        });
    }


    // Generate provider ID
    const newId =
        providers.length > 0
            ? Math.max(
                ...providers.map(provider => provider.id)
            ) + 1
            : 1;


    // Create provider
    const newProvider = {
        id: newId,
        businessTypeId: parsedBusinessTypeId,
        name: name.trim(),
        location: location.trim()
    };


    // Save provider
    providers.push(newProvider);


    // Response
    res.status(201).json({
        message: "Provider created successfully",
        provider: newProvider
    });
});


// ==================================================
// SERVICES
// ==================================================

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


// ==================================================
// QUEUES
// ==================================================

// Every service has its own queue.
// Existing demo services already have queues.

const queues = [
    {
        id: 1,
        serviceId: 1,
        status: "Open"
    },
    {
        id: 2,
        serviceId: 2,
        status: "Open"
    },
    {
        id: 3,
        serviceId: 3,
        status: "Open"
    }
];


// ==================================================
// SERVICE APIs
// ==================================================


// Get all services
app.get("/api/services", (req, res) => {
    res.json(services);
});


// Get services by provider
app.get("/api/services/provider/:providerId", (req, res) => {

    const providerId = Number(req.params.providerId);

    if (
        !Number.isInteger(providerId) ||
        providerId <= 0
    ) {
        return res.status(400).json({
            message: "Invalid provider ID"
        });
    }


    const filteredServices = services.filter(
        service => service.providerId === providerId
    );

    res.json(filteredServices);
});


// Create a new service
// A queue is automatically created with the service.
app.post("/api/services", (req, res) => {

    const {
        providerId,
        name,
        estimatedMinutes
    } = req.body;


    // Validate provider ID
    const parsedProviderId = Number(providerId);

    if (
        !Number.isInteger(parsedProviderId) ||
        parsedProviderId <= 0
    ) {
        return res.status(400).json({
            message: "providerId must be a valid positive integer"
        });
    }


    // Validate service name
    if (
        typeof name !== "string" ||
        !name.trim()
    ) {
        return res.status(400).json({
            message: "Service name is required"
        });
    }


    // Validate estimated minutes
    const parsedMinutes = Number(estimatedMinutes);

    if (
        !Number.isFinite(parsedMinutes) ||
        parsedMinutes <= 0
    ) {
        return res.status(400).json({
            message: "estimatedMinutes must be a valid number greater than 0"
        });
    }


    // Check provider
    const provider = providers.find(
        provider => provider.id === parsedProviderId
    );

    if (!provider) {
        return res.status(400).json({
            message: "Invalid provider"
        });
    }


    // Generate service ID
    const newServiceId =
        services.length > 0
            ? Math.max(
                ...services.map(service => service.id)
            ) + 1
            : 1;


    // Create service
    const newService = {
        id: newServiceId,
        providerId: parsedProviderId,
        name: name.trim(),
        estimatedMinutes: parsedMinutes
    };


    // Save service
    services.push(newService);


    // ==============================================
    // AUTOMATIC QUEUE CREATION
    // ==============================================

    const newQueueId =
        queues.length > 0
            ? Math.max(
                ...queues.map(queue => queue.id)
            ) + 1
            : 1;


    const newQueue = {
        id: newQueueId,
        serviceId: newService.id,
        status: "Open"
    };


    // Save queue
    queues.push(newQueue);


    // Response
    res.status(201).json({
        message: "Service and queue created successfully",
        service: newService,
        queue: newQueue
    });
});


// ==================================================
// STAFF
// ==================================================

const staff = [];


// Get all staff
app.get("/api/staff", (req, res) => {
    res.json(staff);
});


// Get staff by provider
app.get("/api/staff/provider/:providerId", (req, res) => {

    const providerId = Number(req.params.providerId);

    if (
        !Number.isInteger(providerId) ||
        providerId <= 0
    ) {
        return res.status(400).json({
            message: "Invalid provider ID"
        });
    }


    const filteredStaff = staff.filter(
        member => member.providerId === providerId
    );

    res.json(filteredStaff);
});


// Get staff by service
app.get("/api/staff/service/:serviceId", (req, res) => {

    const serviceId = Number(req.params.serviceId);

    if (
        !Number.isInteger(serviceId) ||
        serviceId <= 0
    ) {
        return res.status(400).json({
            message: "Invalid service ID"
        });
    }


    const filteredStaff = staff.filter(
        member => member.serviceId === serviceId
    );

    res.json(filteredStaff);
});


// Create a new staff member
app.post("/api/staff", (req, res) => {

    const {
        providerId,
        serviceId,
        name,
        role
    } = req.body;


    // Validate provider ID
    const parsedProviderId = Number(providerId);

    if (
        !Number.isInteger(parsedProviderId) ||
        parsedProviderId <= 0
    ) {
        return res.status(400).json({
            message: "providerId must be a valid positive integer"
        });
    }


    // Validate service ID
    const parsedServiceId = Number(serviceId);

    if (
        !Number.isInteger(parsedServiceId) ||
        parsedServiceId <= 0
    ) {
        return res.status(400).json({
            message: "serviceId must be a valid positive integer"
        });
    }


    // Validate staff name
    if (
        typeof name !== "string" ||
        !name.trim()
    ) {
        return res.status(400).json({
            message: "Staff name is required"
        });
    }


    // Check provider
    const provider = providers.find(
        provider => provider.id === parsedProviderId
    );

    if (!provider) {
        return res.status(400).json({
            message: "Invalid provider"
        });
    }


    // Check service
    const service = services.find(
        service => service.id === parsedServiceId
    );

    if (!service) {
        return res.status(400).json({
            message: "Invalid service"
        });
    }


    // Make sure service belongs to provider
    if (
        service.providerId !== parsedProviderId
    ) {
        return res.status(400).json({
            message: "Selected service does not belong to this provider"
        });
    }


    // Generate staff ID
    const newId =
        staff.length > 0
            ? Math.max(
                ...staff.map(member => member.id)
            ) + 1
            : 1;


    // Create staff
    const newStaff = {
        id: newId,
        providerId: parsedProviderId,
        serviceId: parsedServiceId,
        name: name.trim(),
        role:
            typeof role === "string" && role.trim()
                ? role.trim()
                : "Staff"
    };


    // Save staff
    staff.push(newStaff);


    // Response
    res.status(201).json({
        message: "Staff created successfully",
        staff: newStaff
    });
});


// ==================================================
// QUEUE APIs
// ==================================================


// Get all queues
app.get("/api/queues", (req, res) => {
    res.json(queues);
});


// Get queue by service
app.get("/api/queues/service/:serviceId", (req, res) => {

    const serviceId = Number(req.params.serviceId);

    if (
        !Number.isInteger(serviceId) ||
        serviceId <= 0
    ) {
        return res.status(400).json({
            message: "Invalid service ID"
        });
    }


    // Check service exists
    const service = services.find(
        service => service.id === serviceId
    );

    if (!service) {
        return res.status(404).json({
            message: "Service not found"
        });
    }


    // Find queue
    const serviceQueue = queues.find(
        queue => queue.serviceId === serviceId
    );

    if (!serviceQueue) {
        return res.status(404).json({
            message: "Queue not found for this service"
        });
    }


    res.json(serviceQueue);
});


// ==================================================
// SERVER
// ==================================================

const PORT = 5000;

app.listen(PORT, () => {
    console.log(
        `Qnova Backend running on http://localhost:${PORT}`
    );
});