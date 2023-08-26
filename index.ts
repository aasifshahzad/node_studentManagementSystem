
import inquirer from "inquirer";   // import relevant modules
import chalk from "chalk";

class Student { //defining student class
    name: string;
    studentID: number;
    courses: string[];
    enrolled: boolean;
    balance: number;

    constructor(name: string, studentID: number) {
        this.name = name;
        this.studentID = studentID + 10000;
        this.courses = [];
        this.enrolled = false;
        this.balance = 0;
    }

    enroll(course: string) {
        this.courses.push(course);
        this.enrolled = true;
    }

    payTuition(amount: number) {
        this.balance += amount;
    }

    showStatus() {
        console.log("Student Details:");
        console.log("Name: " + this.name);
        console.log("ID: " + this.studentID);
        console.log("Courses: " + this.courses.join(", "));
        console.log("Enrolled: " + (this.enrolled ? "Yes" : "No"));
        console.log("Balance: $" + this.balance);
    }
}

class StudentManagementSystem {  
    private students: Student[] = [];// Student Management System class properties
    private nextStudentID: number = 10000; // Starting student ID

    addStudent(name: string) { // Student Management System class methods
        const studentID = this.nextStudentID++;
        const student = new Student(name, studentID);
        this.students.push(student);// adding student to the students array
        return student;
    }

    findStudent(studentID: number) {
        return this.students.find((student) => student.studentID === studentID); //using build in find function
    }

    showStudents() {
        return this.students; //returning the all students array
    }

    enrollStudent(studentID: number, course: string) {
        const student = this.findStudent(studentID);
        if (student) { // condition statement
            student.enroll(course);
        } else {
            console.log("Student not found.");
        }
    }

    payTuition(studentID: number, amount: number) {
        const student = this.findStudent(studentID);
        if (student) {
            student.payTuition(amount);
        } else {
            console.log("Student not found.");
        }
    }

    showStudentStatus(studentID: number) {
        const student = this.findStudent(studentID);
        if (student) {
            student.showStatus();
        } else {
            console.log("Student not found.");
        }
    }
}

const studentManagement = new StudentManagementSystem(); // instance of Student Management System

const mainMenu = async () => {  // Main menu to enter user input
    console.log(chalk.bold(chalk.bold.greenBright("\nStudent Management System")));
    
    while (true) {
        const { choice } = await inquirer.prompt([
            {
                type: 'list',
                name: 'choice',
                message: 'Select an option:',
                choices: [
                    'Add Student',
                    'Enroll Student in Course',
                    'Pay Tuition Fees',
                    'Show Student Status',
                    'List All Students',
                    'Exit',
                ],
            },
        ]);
        
        switch (choice) {
            case 'Add Student':
                const { studentName } = await inquirer.prompt({
                    type: "input",
                    message: "Enter Student name:",
                    name: "studentName",
                });
                studentManagement.addStudent(studentName);
                console.log(chalk.bold.greenBright(`New student "${chalk.bold.blueBright(studentName)}" added successfully.`));
                break;

            case 'Enroll Student in Course':
                const { studentID, courseName } = await inquirer.prompt([
                    {
                        type: "number",
                        message: "Enter Student ID:",
                        name: "studentID",
                    },
                    {
                        type: "input",
                        message: "Course to be enrolled:",
                        name: "courseName",
                    },
                ]);
                const studentFound = studentManagement.findStudent(studentID);
                if (studentFound) {
                    studentFound.enroll(courseName);
                    console.log(chalk.bold.greenBright(`Student ${chalk.bold.blueBright(studentFound.name)} enrolled in ${chalk.bold.blueBright(courseName)} Course.`));
                } else {
                    console.log(chalk.bold.redBright("Student not Found."));
                }
                break;

            case 'Pay Tuition Fees':
                const { tuitionStudentID, amount } = await inquirer.prompt([
                    {
                        type: "number",
                        message: "Enter Student ID:",
                        name: "tuitionStudentID",
                    },
                    {
                        type: "number",
                        message: "Enter Amount:",
                        name: "amount",
                    },
                ]);
                studentManagement.payTuition(tuitionStudentID, amount);
                console.log(chalk.bold.greenBright(`Tuition Fee Rs ${chalk.bold.blueBright(amount)}/- for student ID "${chalk.bold.blueBright(tuitionStudentID)}" paid successfully.`));
                break;

            case 'Show Student Status':
                const { statusStudentID } = await inquirer.prompt({
                    type: "number",
                    message: "Enter Student ID:",
                    name: "statusStudentID",
                });
                studentManagement.showStudentStatus(statusStudentID);
                break;

            case 'List All Students':
                const studentList = studentManagement.showStudents();
                if (studentList.length > 0) {
                    console.log(chalk.bold("\nList of All Students:"));
                    studentList.forEach((student) => {
                        console.log(chalk.bold.greenBright(`Name: ${chalk.bold.blueBright(student.name)}, ID: ${chalk.bold.blueBright(student.studentID)}`));
                    });
                } else {
                    console.log(chalk.bold.redBright("No students found."));
                }
                break;

            case 'Exit':
                console.log(chalk.bold(chalk.bold.redBright('Student Management System Exit')));
                process.exit(0);

            default:
                console.log(chalk.red("Invalid choice. Please try again."));
                break;
        }
    }
};
mainMenu();