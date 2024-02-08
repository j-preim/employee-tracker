// Connect to database
const db = require("../config/connection");

// Require queries
const {
  getDepartments,
  postDepartment,
  getRoles,
  postRole,
  putRole,
  getEmployees,
  postEmployee,
} = require("../util/queries");

function deptChoices() {
  db.query(getDepartments, function (err, data) {
    let deptChoiceValues = [];
    for(i = 0; i < data.length; i++) {
      deptChoiceValues.push({ name: data[i].name, value: data[i].id });
    }
    return deptChoiceValues;
  });
}

const prompts = [
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
    choices: deptChoices(),
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
      // { name: "View All Employees", value: "viewEmps" },
      // { name: "Add Employee", value: "addEmp" },
      // { name: "Update Employee Role", value: "updateRole" },
      // { name: "View All Roles", value: "viewRoles" },
      // { name: "Add Role", value: "addRole" },
      // { name: "View All Departments", value: "viewDepts" },
      // { name: "Add Department", value: "addDept" },
      // { name: "Quit", value: "quit" },
    ],
    name: "empRole",
    when: (answers) => answers.selection === "addEmp",
  },
  {
    type: "list",
    message: "Choose this employee's manager:",
    choices: [
      // { name: "View All Employees", value: "viewEmps" },
      // { name: "Add Employee", value: "addEmp" },
      // { name: "Update Employee Role", value: "updateRole" },
      // { name: "View All Roles", value: "viewRoles" },
      // { name: "Add Role", value: "addRole" },
      // { name: "View All Departments", value: "viewDepts" },
      // { name: "Add Department", value: "addDept" },
      // { name: "Quit", value: "quit" },
    ],
    name: "empMgr",
    when: (answers) => answers.selection === "addEmp",
  },
  {
    type: "list",
    message: "Choose an employee:",
    choices: [
      // { name: "View All Employees", value: "viewEmps" },
      // { name: "Add Employee", value: "addEmp" },
      // { name: "Update Employee Role", value: "updateRole" },
      // { name: "View All Roles", value: "viewRoles" },
      // { name: "Add Role", value: "addRole" },
      // { name: "View All Departments", value: "viewDepts" },
      // { name: "Add Department", value: "addDept" },
      // { name: "Quit", value: "quit" },
    ],
    name: "selectedEmp",
    when: (answers) => answers.selection === "updateRole",
  },
  {
    type: "list",
    message: "Choose a new role:",
    choices: [
      // { name: "View All Employees", value: "viewEmps" },
      // { name: "Add Employee", value: "addEmp" },
      // { name: "Update Employee Role", value: "updateRole" },
      // { name: "View All Roles", value: "viewRoles" },
      // { name: "Add Role", value: "addRole" },
      // { name: "View All Departments", value: "viewDepts" },
      // { name: "Add Department", value: "addDept" },
      // { name: "Quit", value: "quit" },
    ],
    name: "newRole",
    when: (answers) => answers.selection === "updateRole",
  },
];

module.exports = prompts;