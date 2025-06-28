const mysql = require('mysql2');
const readline = require('readline');

// MySQL Connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'sakshi@123',
    database: 'Student_DB'
});

// CLI Setup
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Show Menu
function showMenu() {
    console.log('\n--- Student Management CLI ---');
    console.log('1. Add Student');
    console.log('2. List Students');
    console.log('3. Upadte Student Student');
    console.log('4. Delete Student');

    console.log('4. Exit');
    rl.question('Choose an option: ', (option) => {
        switch (option) {
            case '1':
                addStudent();
                break;
            case '2':
                listStudents();
                break;
            case '3':
                updateStudent();
                break;
            case '4':deleteStudent()
                break;    
            case '5':
                exitProgram();
                break;
            default:
                console.log('❌ Invalid choice!');
                showMenu();
        }
    });
}

// Connect to DB and start menu
db.connect((err) => {
    if (err) throw err;
    console.log('✅ Connected to MySQL Database');
    showMenu();
});

// Add Student
function addStudent() {
    rl.question('Enter Name: ', (name) => {
        rl.question('Enter Age: ', (age) => {
            rl.question('Enter Course: ', (course) => {
                db.query(
                    'INSERT INTO Students11(name, age, course) VALUES (?, ?, ?)',
                    [name, age, course],
                    (err) => {
                        if (err) throw err;
                        console.log('✅ Student added Successfully!');
                        showMenu();
                    }
                );
            });
        });
    });
}

// List Students
function listStudents() {
    db.query('SELECT * FROM Students11', (err, results) => {
        if (err) throw err;
        console.log('\n📋 List of Students:');
        results.forEach((student) => {
            console.log(`ID: ${student.id} | Name: ${student.name} | Age: ${student.age} | Course: ${student.course}`);
        });
        showMenu();
    });
}
//Update Students

function updateStudent() {
    rl.question('Enter Student ID to update: ', (id) => {
        rl.question('Enter new name: ', (name) => {
            rl.question('Enter new age: ', (age) => {
                rl.question('Enter new course: ', (course) => {
                    db.query(
                        'UPDATE Students11 SET name = ?, age = ?, course = ? WHERE id = ?',
                        [name, age, course, id],
                        (err, result) => {
                            if (err) throw err;
                            if (result.affectedRows === 0) {
                                console.log('⚠️ No student found with that ID.');
                            } else {
                                console.log('✏️ Student updated successfully.');
                            }
                            showMenu();
                        }
                    );
                });
            });
        });
    });
}

// Delete Student
function deleteStudent() {
    rl.question('Enter Student ID to delete: ', (id) => {
        db.query('DELETE FROM Students11 WHERE id = ?', [id], (err, result) => {
            if (err) throw err;
            if (result.affectedRows === 0) {
                console.log('⚠️ No student found with that ID.');
            } else {
                console.log('🗑️ Student deleted successfully.');
            }
            showMenu();
        });
    });
}

// Exit Program
function exitProgram() {
    console.log('👋 Exiting...');
    rl.close();
    db.end();
}
