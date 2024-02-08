// Connect to database
const db = require("../config/connection");

module.exports = (response = {}) => {
  // response.deptName = Object.hasOwnProperty.call(response, "deptName") ? response.deptName : "";
  
  return {
    getDepartments: "SELECT id, name FROM department ORDER BY name ASC",

    postDepartment: `INSERT INTO department(name) VALUES('${response.deptName}')`,

    getRoles:
      "SELECT role.id, title, department.name, salary FROM role JOIN department ON role.department_id = department.id",

    postRole: `INSERT INTO role(title, salary, department_id) VALUES('${response.roleName}', '${response.roleSalary}', '${response.roleDept}')`,

    putRole: `UPDATE employee SET role_id = ${response.newRole} WHERE id = ${response.selectedEmp}`,

    getEmployees: `SELECT e.id, e.first_name, e.last_name, role.title, department.name as department, role.salary, CONCAT(m.first_name, ' ', m.last_name) as "manager" 
    FROM employee as e
    JOIN role ON e.role_id = role.id 
    JOIN department ON role.department_id = department.id
    LEFT JOIN employee as m
    ON m.id = e.manager_id`,

    postEmployee: `INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES('${response.empFirstName}', '${response.empLastName}', '${response.empRole}', '${response.empMgr}')`,
  };
};

// const query = () => {
// return db.query(
//   `SELECT id, name FROM department ORDER BY name ASC`,
//   function (err, data) {
//     console.log(data[0].name);
//   }
// );
// }

// var dataArray = [{}];

// function queryFunction() {
//   db.query(
//     `SELECT id, name FROM department ORDER BY name ASC`,
//     function (err, data) {
//       for (i = 0; i < data.length; i++) {
//         dataArray.push(data[i]);
//       }
//     }
//   );

// }
