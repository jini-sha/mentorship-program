const express = require("express");
const router = express.Router();
const departmentController = require("../controllers/department.controller");

router.post("/submit", departmentController.createDepartment);
router.get("/", departmentController.getDepartments);
router.get("/:id", departmentController.getDepartmentById);
router.patch("/:id", departmentController.updateDepartment);
router.delete("/:id", departmentController.deleteDepartment);
router.patch("/:id/archive", departmentController.archiveDepartment);

module.exports = router;
