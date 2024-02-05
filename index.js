// Add the required components
const inquirer = require("inquirer");
const fs = require("fs");

// Create the inquirer prompts for the user to answer
inquirer
  .prompt([
    {
      type: "list",
      message: "What would you like to do?",
      choices: [
        { value: "View All Employees" },
        { value: "Add Employee" },
        { value: "Update Employee Role" },
        { value: "View All Roles" },
        { value: "Add Role" },
        { value: "View All Departments" },
        { value: "Add Department" },
      ],
      name: "options",
    },
  ])

  // Process the user's responses and determine the correct shape object
  .then((response) => {
    console.log("To be continued...");
  });
