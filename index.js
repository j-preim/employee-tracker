// Add the required components
const inquirer = require("inquirer");
const mysql = require('mysql2');

// Connect to database
const db = require("./config/connection");

let command;

// init();

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
        { name: "View All Roles", value: "viewRoles"},
        { name: "Add Role", value: "addRole"},
        { name: "View All Departments", value: "viewDepts" },
        { name: "Add Department", value: "addDept" },
        { name: "Quit", value: "quit" },
      ],
      name: "selection",
    },
  ])

  // Receive the user's selection and run function to evaluate
  .then((response) => {
    command = response.selection;
    if (command === "quit") {
      console.log("Quit successful. See you next time!");
      process.exit();
    } else evaluateSelection(command);
  });
}

async function evaluateSelection(command) {
  if (command === "viewDepts") {
    db.query('SELECT id, name FROM department ORDER BY name ASC', function (err, results) {
      console.log(results);
    });
  }
  else if (command === "viewRoles") {
    db.query('SELECT role.id, title, department.name, salary FROM role JOIN department ON role.department_id = department.id', function (err, results) {
      console.log(results);
    });
  }

  init();
}
