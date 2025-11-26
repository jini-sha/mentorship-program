const { z } = require('zod');

const createApplicantSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters").max(50),
    email: z.email("Invalid email address"),
    level:z.enum(["4","5","6"]),
    course:z.enum(["BCS","BCY","BIBM"]),
    contactNumber:z.string().regex(/^\+?[1-9]\d{1,14}$/, "Invalid phone number"),
    interestedField: z.enum(["Backend", "Frontend", "Designing"], "Invalid interested field"),
    reason: z.string().min(10, "Reason is required and must be over 10 characters.").max(500)
});

const updateStatusSchema = z.object({
    status: z.enum(["Pending", "Good Fit", "Maybe", "Not Fit"], "Invalid status")
});

module.exports = { createApplicantSchema, updateStatusSchema };
