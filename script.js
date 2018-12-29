(function () {
    'use strict';

    function getEmpolyees() {
        const savedEmployees = localStorage.getItem("Employees");
        if (savedEmployees) {
            return JSON.parse(savedEmployees);
        } else {
            const employees = [{

                    firstName: 'John',
                    lastName: 'Doe',
                    age: 31,
                    sex: 'male',
                    employed: true
                },
                {
                    firstName: 'Amelia',
                    lastName: 'Clark',
                    age: 22,
                    sex: 'female',
                    employed: true
                },
                {
                    firstName: 'Jack',
                    lastName: 'Jones',
                    age: 21,
                    sex: 'male',
                    employed: false
                },
                {
                    firstName: 'Olivia',
                    lastName: 'Wilde',
                    age: 31,
                    sex: 'female',
                    employed: true
                },
            ]
            localStorage.setItem("Employees", JSON.stringify(employees));

            return JSON.parse(localStorage.getItem("Employees"));
        }

    }

    function renderHeaders() {
        const tableHeaders = Object.keys(employees[0]);
        const tableHeadersDOM = document.getElementById("table-headers");
        let htmlHeaders = "<th scope='col'>Index</th>";
        tableHeaders.forEach(function (header) {
            htmlHeaders += `<th scope='col'>${header}</th>`
        });
        tableHeadersDOM.innerHTML = htmlHeaders;
    }

    function renderTableBody(employeesArray) {
        const tableValuesDOM = document.getElementById("table-values");
        let tableData = ""
        employeesArray.forEach(function (employee, index) {
            tableData +=
                `<tr>
                    <th scope="row">${index+1}</th>
                    <td>${employee.firstName}</td>
                    <td>${employee.lastName}</td>
                    <td>${employee.age}</td>
                    <td>${employee.sex}</td>
                    <td>${employee.employed ? 'yes' : 'no'}</td>
                </tr>`
        });
        tableValuesDOM.innerHTML = tableData;
    }

    function filterWoman() {
        const filteredEmployees = employees.filter(function (employee) {
            return employee.sex === 'female';
        })
        renderTableBody(filteredEmployees);
    }

    function filterMan() {
        const filteredEmployees = employees.filter(function (employee) {
            return employee.sex === "male";
        })
        renderTableBody(filteredEmployees);
    }

    function refreshTable() {
        renderTableBody(employees);
    }

    function addNewEmployee() {
        const firstName = document.getElementById("firstName").value;
        const lastName = document.getElementById("lastName").value;
        const employeeAge = document.getElementById("age").value;
        const employeeSex = document.getElementById("sexSelect").value;
        const employedStatus = document.getElementById("employed").value;

        if (firstName && lastName && employeeAge && employeeSex) {
            const newEmployee = {
                firstName: firstName,
                lastName: lastName,
                age: employeeAge,
                sex: employeeSex,
                employed: employedStatus,
            }
            employees.push(newEmployee);
            localStorage.setItem("Employees", JSON.stringify(employees));
            renderTableBody(employees);
        } else {
            alert("Please fill all the fields");
        }
    }

    const employees = getEmpolyees()
    renderHeaders();
    renderTableBody(employees);


    const filterWomanButton = document.getElementById("woman-button");
    filterWomanButton.addEventListener("click", filterMan);

    const filterManButton = document.getElementById("man-button");
    filterManButton.addEventListener("click", filterWoman);

    const refreshButton = document.getElementById("refresh");
    refreshButton.addEventListener("click", refreshTable);

    const addNewEmployeeButton = document.getElementById("new-employee-button");
    addNewEmployeeButton.addEventListener("click", addNewEmployee);

}());