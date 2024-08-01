const router = require("express").Router();
const verifyJWT = require("../middleware/verifyJWT");
const projectController = require("../controllers/projectController");

// router.use(verifyJWT);

// /api/projects
router.post("/", projectController.createProject);
router.get("/", projectController.getProjects);
router.get("/:id", projectController.getProject);
router.put("/:id", projectController.updateProject);
router.delete("/:id", projectController.deleteProject);

module.exports = router;
