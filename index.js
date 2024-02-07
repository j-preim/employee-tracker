// Add the required components
const inquirer = require("inquirer");
const mysql = require("mysql2");

// Connect to database
const db = require("./config/connection");

const routes = require("./routes");

let command;

console.log(
  `
  ,-------------------------------.
  |                               |
  |  WELCOME TO EMPLOYEE MANAGER  |
  |                               |
  '-------------------------------'
  `
);

init();

// const getDepts = () =>
//   fetch('http://localhost:3001/departments', {
//     method: 'GET',
//     headers: {
//       'Content-Type': 'application/json'
//     }
//   });

//   const renderDepts = async (departments) => {
//     let jsonDepts = await departments.json();
//     console.table(jsonDepts.payload);
//   }

// const getAndRenderDepts = () => getDepts().then(renderDepts);
// getAndRenderDepts();

function init() {
  // Create the inquirer prompts for the user to answer
  inquirer
    .prompt([
      {
        type: "list",
        message: "What would you like to do?",
        choices: [
          { name: "View All Employees", value: "viewEmps" },
          { name: "Add Employee", value: "addEmp" },
          { name: "Update Employee Role", value: "updateRole" },
          { name: "View All Roles", value: "viewRoles" },
          { name: "Add Role", value: "addRole" },
          { name: "View All Departments", value: "viewDepts" },
          { name: "Add Department", value: "addDept" },
          { name: "Quit", value: "quit" },
        ],
        name: "selection",
      },
      {
        type: "input",
        message: "Department name:",
        name: "deptName",
        when: (answers) => answers.selection === "addDept",
        validate: (deptName) => {
          if (!deptName) {
            return "You must enter a department name";
          }
          return true;
        },
      },
      {
        type: "input",
        message: "Role name:",
        name: "roleName",
        when: (answers) => answers.selection === "addRole",
        validate: (roleName) => {
          if (!roleName) {
            return "You must enter a role name";
          }
          return true;
        },
      },
      {
        type: "input",
        message: "Annual salary:",
        name: "roleSalary",
        when: (answers) => answers.selection === "addRole",
        validate: (roleSalary) => {
          if (!roleSalary) {
            return "You must enter a salary";
          }
          return true;
        },
      },
      {
        type: "list",
        message: "Choose a department:",
        choices: [
          { name: "View All Employees", value: "viewEmps" },
          { name: "Add Employee", value: "addEmp" },
          { name: "Update Employee Role", value: "updateRole" },
          { name: "View All Roles", value: "viewRoles" },
          { name: "Add Role", value: "addRole" },
          { name: "View All Departments", value: "viewDepts" },
          { name: "Add Department", value: "addDept" },
          { name: "Quit", value: "quit" },
        ],
        name: "roleDept",
        when: (answers) => answers.selection === "addRole",
      },
      {
        type: "input",
        message: "Employee first name:",
        name: "empFirstName",
        when: (answers) => answers.selection === "addEmp",
        validate: (empFirstName) => {
          if (!empFirstName) {
            return "You must enter a first name";
          }
          return true;
        },
      },
      {
        type: "input",
        message: "Employee last name:",
        name: "empLastName",
        when: (answers) => answers.selection === "addEmp",
        validate: (empLastName) => {
          if (!empLastName) {
            return "You must enter a last name";
          }
          return true;
        },
      },
      {
        type: "list",
        message: "Choose a role:",
        choices: [
          { name: "View All Employees", value: "viewEmps" },
          { name: "Add Employee", value: "addEmp" },
          { name: "Update Employee Role", value: "updateRole" },
          { name: "View All Roles", value: "viewRoles" },
          { name: "Add Role", value: "addRole" },
          { name: "View All Departments", value: "viewDepts" },
          { name: "Add Department", value: "addDept" },
          { name: "Quit", value: "quit" },
        ],
        name: "empRole",
        when: (answers) => answers.selection === "addEmp",
      },
      {
        type: "list",
        message: "Choose this employee's manager:",
        choices: [
          { name: "View All Employees", value: "viewEmps" },
          { name: "Add Employee", value: "addEmp" },
          { name: "Update Employee Role", value: "updateRole" },
          { name: "View All Roles", value: "viewRoles" },
          { name: "Add Role", value: "addRole" },
          { name: "View All Departments", value: "viewDepts" },
          { name: "Add Department", value: "addDept" },
          { name: "Quit", value: "quit" },
        ],
        name: "empMgr",
        when: (answers) => answers.selection === "addEmp",
      },
      {
        type: "list",
        message: "Choose an employee:",
        choices: [
          { name: "View All Employees", value: "viewEmps" },
          { name: "Add Employee", value: "addEmp" },
          { name: "Update Employee Role", value: "updateRole" },
          { name: "View All Roles", value: "viewRoles" },
          { name: "Add Role", value: "addRole" },
          { name: "View All Departments", value: "viewDepts" },
          { name: "Add Department", value: "addDept" },
          { name: "Quit", value: "quit" },
        ],
        name: "selectedEmp",
        when: (answers) => answers.selection === "updateRole",
      },
      {
        type: "list",
        message: "Choose a new role:",
        choices: [
          { name: "View All Employees", value: "viewEmps" },
          { name: "Add Employee", value: "addEmp" },
          { name: "Update Employee Role", value: "updateRole" },
          { name: "View All Roles", value: "viewRoles" },
          { name: "Add Role", value: "addRole" },
          { name: "View All Departments", value: "viewDepts" },
          { name: "Add Department", value: "addDept" },
          { name: "Quit", value: "quit" },
        ],
        name: "newRole",
        when: (answers) => answers.selection === "updateRole",
      },
    ])

    // Receive the user's selection and run function to evaluate
    .then((response) => {
      if (command === "quit") {
        console.log("Successfully quit. See you next time!");
        process.exit();
      } else evaluateSelection(response);
    });
}

async function evaluateSelection(response) {
  const command = response.selection;
  if (command === "viewDepts") {
    db.query(
      "SELECT id, name FROM department ORDER BY name ASC",
      (err, data) => {
        console.table(data);
      }
    );
  } else if (command === "viewRoles") {
    db.query(
      "SELECT role.id, title, department.name, salary FROM role JOIN department ON role.department_id = department.id",
      function (err, data) {
        console.table(data);
      }
    );
  } else if (command === "viewEmps") {
    db.query(
      `SELECT e.id, e.first_name, e.last_name, role.title, department.name as department, role.salary, CONCAT(m.first_name, ' ', m.last_name) as "manager" 
      FROM employee as e
      JOIN role ON e.role_id = role.id 
      JOIN department ON role.department_id = department.id
      LEFT JOIN employee as m
      ON m.id = e.manager_id`,
      function (err, data) {
        console.table(data);
      }
    );
  } else if (command === "addDept") {
    db.query(
      `INSERT INTO department(name) VALUES('${response.deptName}')`,
      function (err, data) {
        console.log(`${response.deptName} department added!`);
      }
    );
  } else if (command === "addRole") {
    db.query(
      `INSERT INTO role(title, salary, department_id) VALUES('${response.roleName}', '${response.roleSalary}', '${response.roleDept}')`,
      function (err, data) {
        console.log(`${response.roleName} role added!`);
      }
    );
  } else if (command === "addEmp") {
    db.query(
      `INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES('${response.empFirstName}', '${response.empLastName}', '${response.empRole}', '${response.empMgr}')`,
      function (err, data) {
        console.log(
          `${response.empFirstName} ${response.empLastName} added to employees!`
        );
      }
    );
  } else if (command === "updateRole") {
        db.query(
          `UPDATE employee SET role_id = ${response.newRole} WHERE id = ${response.selectedEmp}`,
          function (err, data) {
            console.log(
              `${response.selectedEmp} role updated to ${response.newRole}!`
            );
          }
        );
  }

  // process.exit();
  //init();
}
