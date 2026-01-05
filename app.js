const express = require('express');
const app = express();
const PORT = 3000;

// Mock student data
const students = [
    { id: 'E001', name: 'John Doe', department: 'Computer Science', gpa: 3.85 },
    { id: 'E002', name: 'Jane Smith', department: 'Computer Science', gpa: 3.92 },
    { id: 'E003', name: 'Mike Johnson', department: 'Electrical Engineering', gpa: 3.78 },
    { id: 'E004', name: 'Sarah Williams', department: 'Electrical Engineering', gpa: 3.88 },
    { id: 'E005', name: 'Tom Brown', department: 'Civil Engineering', gpa: 3.65 },
    { id: 'E006', name: 'Emma Davis', department: 'Civil Engineering', gpa: 3.82 },
    { id: 'E007', name: 'Alex Martinez', department: 'Mechanical Engineering', gpa: 3.75 },
    { id: 'E008', name: 'Lisa Anderson', department: 'Mechanical Engineering', gpa: 3.91 }
];

app.use(express.json());

// API to get all students with GPA by department
app.get('/api/students/gpa', (req, res) => {
    const grouped = students.reduce((acc, student) => {
        if (!acc[student.department]) {
            acc[student.department] = [];
        }
        acc[student.department].push({
            id: student.id,
            name: student.name,
            gpa: student.gpa
        });
        return acc;
    }, {});

    res.json({
        faculty: 'Faculty of Engineering',
        departments: grouped
    });
});

// API to query individual GPA by student ID
app.get('/api/students/:id/gpa', (req, res) => {
    const student = students.find(s => s.id === req.params.id);
    
    if (!student) {
        return res.status(404).json({ error: 'Student not found' });
    }

    res.json({
        id: student.id,
        name: student.name,
        department: student.department,
        gpa: student.gpa
    });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
