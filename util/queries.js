module.exports = (response = {}) => {
  
  // Formatted query text
  return {
    getDepartments: "SELECT id, name FROM department ORDER BY name ASC",

    postDepartment: `INSERT INTO department(name) VALUES('${response.deptName}')`,

    getDeptBudget: `SELECT d.name as department, (SUM(r.salary)) as total_utilized_budget
    FROM employee as e
    JOIN role as r ON e.role_id = r.id 
    JOIN department as d ON r.department_id = d.id
    GROUP BY d.name`,

    getRoles:
      "SELECT role.id, title, department.name, salary FROM role JOIN department ON role.department_id = department.id",

    postRole: `INSERT INTO role(title, salary, department_id) VALUES('${response.roleName}', '${response.roleSalary}', '${response.roleDept}')`,

    putRole: `UPDATE employee SET role_id = ${response.newRole} WHERE id = ${response.selectedEmpUpdateRole}`,

    getEmployees: `SELECT e.id, e.first_name, e.last_name, role.title, department.name as department, role.salary, CONCAT(m.first_name, ' ', m.last_name) as "manager" 
    FROM employee as e
    JOIN role ON e.role_id = role.id 
    JOIN department ON role.department_id = department.id
    LEFT JOIN employee as m
    ON m.id = e.manager_id`,

    postEmployee: `INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES('${response.empFirstName}', '${response.empLastName}', '${response.empRole}', '${response.empMgr}')`,

    putMgr: `UPDATE employee SET manager_id = ${response.newMgr} WHERE id = ${response.selectedEmpUpdateMgr}`,
  };
};

