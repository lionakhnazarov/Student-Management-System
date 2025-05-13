const asyncHandler = require("express-async-handler");
const { getAllStudents, addNewStudent, getStudentDetail, setStudentStatus, updateStudent } = require("./students-service");

const handleGetAllStudents = asyncHandler(async (req, res) => {
    try {
        const students = await getAllStudents(req.query);
        res.status(200).json({
            success: true,
            count: students.length,
            students: students
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Server Error'
        });
    }

});

const handleAddStudent = asyncHandler(async (req, res) => {
    try {
        if (!req.body.name || !req.body.email) {
            return res.status(400).json({
                success: false,
                error: 'Please include name and email'
            });
        }

        const messages = await addNewStudent(req.body);
        res.status(201).json({
            success: true,
            message: messages.message
        });
    } catch (error) {
        const statusCode = error.statusCode || 500;
        res.status(statusCode).json({
            success: false,
            error: error.message || 'Server Error'
        });
    }

});

const handleUpdateStudent = asyncHandler(async (req, res) => {
    const payload = { ...req.body, id: req.params.id };
    const message = await updateStudent(payload);
    res.json(message);

});

const handleGetStudentDetail = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const student = await getStudentDetail(id);
    res.json(student);

});

const handleStudentStatus = asyncHandler(async (req, res) => {
    const userId = req.params.id;
    const { status } = req.body;
    const reviewerId = req.user?.id;
    const message = await setStudentStatus({ userId, reviewerId, status });
    res.json(message);
});

module.exports = {
    handleGetAllStudents,
    handleGetStudentDetail,
    handleAddStudent,
    handleStudentStatus,
    handleUpdateStudent,
};
