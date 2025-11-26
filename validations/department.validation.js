const { z } = require('zod');

const departmentSchema = z.object({
    subject: z.enum(["Backend", "Frontend", "Designing"], "Invalid department"),
    description: z.string().optional(),
    deadline: z.string().refine((val) => !isNaN(Date.parse(val)), {
        message: "Invalid date format"
    }),
    archived: z.boolean().optional()
});

module.exports = departmentSchema;
