const Applicant = require("../models/applicant.model");
const Department = require("../models/department.model");
const asyncHandler = require("../middlewares/asyncHandler.middleware");
const { StatusCodes } = require("http-status-codes");
const { createApplicantSchema, updateStatusSchema } = require("../validations/applicant.validation");

exports.createApplicant = asyncHandler(async (req, res, next) => {
    const validated = createApplicantSchema.safeParse(req.body);
    if (!validated.success) {
        const err = new Error("Validation failed");
        err.statusCode = StatusCodes.BAD_REQUEST;
        err.errors = validated.error.errors;
        return next(err);
    }

    const { name, email, contactNumber, level, course, interestedField, reason } = validated.data;

    const department = await Department.findOne({ subject: interestedField, archived: false });
    if (!department) {
        const err = new Error("No active department found for this field");
        err.statusCode = StatusCodes.NOT_FOUND;
        return next(err);
    }

    const existing = await Applicant.findOne({ departmentId: department._id, email });
    if (existing) {
        const err = new Error("You have already applied");
        err.statusCode = StatusCodes.BAD_REQUEST;
        return next(err);
    }

    const applicant = await Applicant.create({
        careerId: department._id,
        name,
        email,
        contactNumber,
        level,
        course,
        interestedField,
        reason,
        appliedDate: new Date(),
        status: "Pending"
    });

    res.status(StatusCodes.CREATED).json({
        success: true,
        message: "Application submitted!",
        data: applicant
    });
});

exports.getApplicants = asyncHandler(async (req, res, next) => {
    const { status, level, course } = req.query;
    const departmentField = req.params.department;

    const departments = await Department.find({ subject: departmentField, archived: false });
    if (!departments.length) {
        const err = new Error("No active departments found for this field");
        err.statusCode = StatusCodes.NOT_FOUND;
        return next(err);
    }

    const departmentIds = departments.map(d => d._id);

    let filter = { careerId: { $in: departmentIds } };
    if (status) filter.status = status;
    if (level) filter.level = level;
    if (course) filter.course = course;

    const applicants = await Applicant.find(filter).sort({ appliedDate: -1 });

    res.status(StatusCodes.OK).json({
        success: true,
        message: "Applicants fetched successfully!",
        count: applicants.length,
        data: applicants
    });
});

exports.updateApplicantStatus = asyncHandler(async (req, res, next) => {
    const validated = updateStatusSchema.safeParse(req.body);
    if (!validated.success) {
        const err = new Error("Validation Failed.");
        err.statusCode = StatusCodes.BAD_REQUEST;
        err.errors = validated.error.errors;
        return next(err);
    }

    const applicant = await Applicant.findById(req.params.id);
    if (!applicant) {
        const err = new Error("Applicant Not Found.");
        err.statusCode = StatusCodes.NOT_FOUND;
        return next(err);
    }
    applicant.status = validated.data.status;
    await applicant.save();

    res.status(StatusCodes.OK).json({
        success: true,
        message: "Status updated",
        data: applicant
    });
});

exports.deleteApplicant = asyncHandler(async (req, res, next) => {
    const applicant = await Applicant.findById(req.params.id);
    if (!applicant) {
        const err = new Error("Applicant Not Found.");
        err.statusCode = StatusCodes.NOT_FOUND;
        return next(err);
    }

    await applicant.deleteOne();
    res.status(StatusCodes.OK).json({ success: true, message: "Applicant deleted" });
});
