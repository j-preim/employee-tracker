// Add the required components
const inquirer = require("inquirer");
const mysql = require("mysql2");

// Connect to database
const db = require("./config/connection");

// Add required modules
const prompts = require("./util/prompts");
const queries = require("./util/queries");

console.log(
  `
  ,-------------------------------.
  |                               |
  |  WELCOME TO EMPLOYEE MANAGER  |
  |                               |
  '-------------------------------'
  `
);

async function mainMenu() {
  const promptsList = await prompts();
  // Create the inquirer prompts for the user to answer
  inquirer
    .prompt(promptsList)

    // Receive the user's selection and run function to evaluate
    .then((response) => {
      if (response.selection === "quit") {
        console.log("Successfully quit. See you next time!");
        process.exit();
      } else evaluateSelection(response);
    });
}

async function evaluateSelection(response) {
  const {
    getDepartments,
    postDepartment,
    getDeptBudget,
    getRoles,
    postRole,
    putRole,
    getEmployees,
    postEmployee,
    putMgr,
  } = queries(response);
  const command = await response.selection;
  if (command === "viewDepts") {
    db.query(getDepartments, function (err, data) {
      console.table(data);
      mainMenu();
    });
  } if (command === "viewBudget") {
    db.query(getDeptBudget, function (err, data) {
      console.table(data);
      mainMenu();
    });
  } else if (command === "viewRoles") {
    db.query(getRoles, function (err, data) {
      console.table(data);
      mainMenu();
    });
  } else if (command === "viewEmps") {
    db.query(getEmployees, function (err, data) {
      console.table(data);
      mainMenu();
    });
  } else if (command === "addDept") {
    db.query(postDepartment, function (err, data) {
      console.log(`${response.deptName} department added!`);
      mainMenu();
    });
  } else if (command === "addRole") {
    db.query(postRole, function (err, data) {
      if (err) {
        console.log(err);
      } else {
        console.log(`${response.roleName} role added!`);
      }
      mainMenu();
    });
  } else if (command === "addEmp") {
    db.query(postEmployee, function (err, data) {
      console.log(
        `${response.empFirstName} ${response.empLastName} added to employees!`
      );
      mainMenu();
    });
  } else if (command === "updateRole") {
    db.query(putRole, function (err, data) {
      console.log(
        `${response.selectedEmpUpdateRole} role updated to ${response.newRole}!`
      );
      mainMenu();
    });
  } else if (command === "updateMgr") {
    db.query(putMgr, function (err, data) {
      console.log(data);
      console.log(
        `${response.selectedEmpUpdateMgr} manager updated to ${response.newMgr}!`
      );
      mainMenu();
    });
  }
}

function init() {
  mainMenu();
}

init();
