const users = [
    { id: 1, name: "John Doe", role: "Patient", registered: "2024-01-01" },
    { id: 2, name: "Dr. Alice Smith", role: "Doctor", registered: "2024-01-05" },
    { id: 3, name: "Dr. Bob Johnson", role: "Doctor", registered: "2024-01-15", status: "Pending" },
    { id: 4, name: "Jane Roe", role: "Patient", registered: "2024-01-20" },
];
async function getAllPatient() {
    return await eel.get_all_patient()();
}
async function getAllDoctor() {
    return await eel.get_all_doctor()();
}
export function renderTable(data, headers) {
    const table = document.createElement("table");
    const thead = document.createElement("thead");
    const tbody = document.createElement("tbody");

    const headerRow = document.createElement("tr");
    headers.forEach((header) => {
        const th = document.createElement("th");
        th.textContent = header;
        headerRow.appendChild(th);
    });
    thead.appendChild(headerRow);

    data.forEach((row) => {
        const tr = document.createElement("tr");
        headers.forEach((header) => {
            const td = document.createElement("td");
            td.textContent = row[header.toLowerCase()] || "-";
            tr.appendChild(td);
        });
        tbody.appendChild(tr);
    });

    table.appendChild(thead);
    table.appendChild(tbody);
    return table;
}

// Function to show all patients
export async function showPatients() {
    const content = document.getElementById("content");
    content.innerHTML = "<h1>All Patients</h1>";
    const patients = await getAllPatient();
    console.log(patients);
    const table = renderTable(patients, ["ID", "Name", "SSN", "Email", "Gender", "DOB", "RegistrationDate"]);
    content.appendChild(table);
}

// Function to show all doctors
export async function showDoctors() {
    const content = document.getElementById("content");
    content.innerHTML = "<h1>All Doctors</h1>";
    const doctors = await getAllDoctor();
    console.log(doctors);
    const table = renderTable(doctors, ["ID", "Name", "SSN", "Email", "Gender", "DOB", "RegistrationDate"]);
    content.appendChild(table);
}

// Function to show new doctors for approval
export function showNewDoctors() {
    const content = document.getElementById("content");
    content.innerHTML = "<h1>New Doctors for Approval</h1>";
    const newDoctors = users.filter((user) => user.role === "Doctor" && user.status === "Pending");
    const table = renderTable(newDoctors, ["ID", "Name", "Registered"]);
    content.appendChild(table);
}

window.showPatients = showPatients;
window.showDoctors = showDoctors;
window.showNewDoctors = showNewDoctors;
document.getElementById("show-patients").addEventListener("click", showPatients);
document.getElementById("show-doctors").addEventListener("click", showDoctors);
document.getElementById("show-new-doctors").addEventListener("click", showNewDoctors);

