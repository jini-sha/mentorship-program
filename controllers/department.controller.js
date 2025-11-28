const Department = require("../models/department.model");
const asyncHandler = require("../middlewares/asyncHandler.middleware");
const { StatusCodes } = require("http-status-codes");
const departmentSchema = require("../validations/department.validation");

exports.createDepartment = asyncHandler(async (req, res, next) => {
    const validated = departmentSchema.safeParse(req.body);
    if (!validated.success) {
        const err = new Error("Validation failed");
        err.statusCode = StatusCodes.BAD_REQUEST;
        err.errors = validated.error.errors;
        return next(err);
    }

    const department = await Department.create(validated.data);
    res.status(StatusCodes.CREATED).json({
        success: true,
        message: "Department created successfully",
        data: department
    });
});

exports.updateDepartment = asyncHandler(async (req, res, next) => {
    const validated = departmentSchema.partial().safeParse(req.body);
    if (!validated.success) {
        const err = new Error("Validation failed");
        err.statusCode = StatusCodes.BAD_REQUEST;
        err.errors = validated.error.errors;
        return next(err);
    }

    const department = await Department.findByIdAndUpdate(
        req.params.id,
        validated.data,
        { new: true, runValidators: true }
    );

    if (!department) return res.status(StatusCodes.NOT_FOUND).json({ message: "Department not found" });

    res.status(StatusCodes.OK).json({ success: true, data: department });
});

exports.getDepartments = asyncHandler(async (req, res) => {
    const { subject, archived } = req.query;
    let filter = {};
    if (subject && ["Backend", "Frontend", "Designing"].includes(subject)) filter.subject = subject;
    if (!archived) {
        filter.archived = false;
    } else if (archived === "true") {
        filter.archived = true;
    } else if (archived === "false") {
        filter.archived = false;
    }
    const departments = await Department.find(filter).sort({ deadline: 1 });
    res.status(StatusCodes.OK).json({
        success: true,
        message: "Departments Retrieved.",
        count: departments.length,
        data: departments
    });
});

exports.getDepartmentById = asyncHandler(async (req, res) => {
    const department = await Department.findById(req.params.id);
    if (!department) return res.status(StatusCodes.NOT_FOUND).json({ message: "Department not found" });

    res.status(StatusCodes.OK).json({
        success: true,
        message: "Department Retrieved.",
        data: department
    });
});

exports.deleteDepartment = asyncHandler(async (req, res) => {
    const department = await Department.findByIdAndDelete(req.params.id);
    if (!department) return res.status(StatusCodes.NOT_FOUND).json({ message: "Department not found" });

    res.status(StatusCodes.OK).json({
        success: true,
        message: "Department deleted successfully"
    });
});

exports.archiveDepartment = asyncHandler(async (req, res) => {
    const department = await Department.findByIdAndUpdate(
        req.params.id,
        { archived: true },
        { new: true }
    );
    if (!department) return res.status(StatusCodes.NOT_FOUND).json({ message: "Department not found" });

    res.status(StatusCodes.OK).json({
        success: true,
        message: "Archived Successfully.",
        data: department
    });
});
