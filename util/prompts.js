// Connect to database
const db = require("../config/connection");

// Require queries
const { getDepartments, getRoles, getEmployees } = require("../util/queries")();

//Functions to generate conditional prompt choices
async function deptChoices() {
  let deptChoiceValues = [];
  db.query(getDepartments, function (err, data) {
    for (i = 0; i < data.length; i++) {
      deptChoiceValues.push({ name: data[i].name, value: data[i].id });
    }
  });
  return deptChoiceValues;
}

async function roleChoices() {
  let roleChoiceValues = [];
  db.query(getRoles, function (err, data) {
    for (i = 0; i < data.length; i++) {
      roleChoiceValues.push({ name: data[i].title, value: data[i].id });
    }
  });
  return roleChoiceValues;
}

async function employeeChoices() {
  let employeeChoiceValues = [];
  db.query(getEmployees, function (err, data) {
    for (i = 0; i < data.length; i++) {
      employeeChoiceValues.push({ name: `${data[i].first_name} ${data[i].last_name}`, value: data[i].id });
    }
  });
  return employeeChoiceValues;
}

const prompts = async () => {
  const departments = await deptChoices();
  const roles = await roleChoices();
  const employees = await employeeChoices();

// All inquirer prompts
  return [
    {
      type: "list",
      message: "What would you like to do?",
      choices: [
        { name: "View All Employees", value: "viewEmps" },
        { name: "Add Employee", value: "addEmp" },
        { name: "Update Employee Role", value: "updateRole" },
        { name: "Update Employee Manager", value: "updateMgr" },
        { name: "View All Roles", value: "viewRoles" },
        { name: "Add Role", value: "addRole" },
        { name: "View All Departments", value: "viewDepts" },
        { name: "Add Department", value: "addDept" },
        { name: "View Total Utilized Budget by Department", value: "viewBudget" },
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
      choices: departments,
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
      choices: roles,
      name: "empRole",
      when: (answers) => answers.selection === "addEmp",
    },
    {
      type: "list",
      message: "Choose this employee's manager:",
      choices: employees,
      name: "empMgr",
      when: (answers) => answers.selection === "addEmp",
    },
    {
      type: "list",
      message: "Choose an employee:",
      choices: employees,
      name: "selectedEmpUpdateRole",
      when: (answers) => answers.selection === "updateRole",
    },
    {
      type: "list",
      message: "Choose a new role:",
      choices: roles,
      name: "newRole",
      when: (answers) => answers.selection === "updateRole",
    },
    {
      type: "list",
      message: "Choose an employee:",
      choices: employees,
      name: "selectedEmpUpdateMgr",
      when: (answers) => answers.selection === "updateMgr",
    },
    {
      type: "list",
      message: "Choose a new manager:",
      choices: employees,
      name: "newMgr",
      when: (answers) => answers.selection === "updateMgr",
    },
  ];
};

module.exports = prompts;
