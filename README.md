# Hospital Management System (HMS)

The **Hospital Management System (HMS)** is a web-based application designed to streamline hospital operations, including patient management, appointment booking, and doctor scheduling. This project was developed as part of the Database System course (CO2014) at the University of Technology, Ho Chi Minh City, by students Tran Tri Dung, Nguyen Le Duy Khang, and Huynh Ngoc Khoa.

## Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Technology Stack](#technology-stack)
- [Architecture](#architecture)
- [Database Schema](#database-schema)
- [Setup Instructions](#setup-instructions)
- [Usage](#usage)
- [Contributors](#contributors)
- [License](#license)

## Project Overview

The HMS is designed to facilitate efficient hospital management by providing role-based functionalities for administrators, doctors, and patients. The system supports patient registration, appointment booking (based on department or doctor), profile management, and doctor scheduling, with a focus on data integrity, security, and performance optimization.

The application adheres to modern software engineering practices, including BCNF-normalized database design, indexing for query optimization, and a layered architecture for modularity and scalability.

## Features

### Core Functionalities
- **Patient Management**:
  - Add new patients to the database with unique email validation.
  - Prevent deletion of patients with existing appointments using triggers.
  - Restrict updates to sensitive fields (e.g., SSN, email, ID).
- **Appointment Booking**:
  - Book appointments based on department, automatically assigning a doctor with available time slots.
  - Book appointments by selecting a specific doctor, displaying their free time slots.
  - Automatically generate invoices upon appointment creation.
- **Doctor Management**:
  - Automatically assign specialties to doctors based on department assignments.
  - Display future booking calendars for doctors, preventing modifications to past records.
- **User Management**:
  - Role-based access control for admins, doctors, and patients.
  - Automatic insertion of users into `Doctor` or `Patient` tables based on their role.

### Performance and Security
- **Indexing**: Optimized query performance using indexes (e.g., on `Users.name`), reducing execution time significantly (e.g., from 0.044s to 0.006s for a sample query).
- **Data Integrity**: Enforced through triggers, constraints, and BCNF normalization.
- **Security**: Secure authentication and compliance with healthcare data privacy regulations.

## Technology Stack

- **Frontend**:
  - HTML, CSS, JavaScript: For responsive and interactive user interfaces.
- **Backend**:
  - Python: Core programming language.
  - EEL: Framework bridging Python backend with web frontend, following MVC architecture.
- **Database**:
  - Oracle: For structured and scalable data management.
  - Tools: Docker, Visual Studio Code, SQL Developer for database access and management.
- **Version Control**:
  - Git: For source code versioning.
  - GitHub: For repository hosting and collaboration.
- **Deployment**:
  - Docker: For consistent development and production environments.

## Architecture

The HMS follows a layered architecture to ensure modularity and maintainability:

1. **Presentation Layer (Frontend)**:
   - Built with HTML, CSS, and JavaScript.
   - Provides role-based dashboards for admins, doctors, and patients.
   - Ensures responsive design for cross-platform compatibility.
2. **Application Layer (Backend)**:
   - Developed using Python with the EEL framework.
   - Implements business logic, role-based access control, and session management.
3. **Database Layer**:
   - Uses Oracle for data storage with a BCNF-normalized schema.
   - Incorporates triggers, constraints, and indexes for data integrity and performance.

## Database Schema

The database is designed to meet BCNF normalization requirements, ensuring no data redundancy and efficient querying. Key tables include:

- **Users**: Stores user information (ID, Name, SSN, Email, Password, Gender, DOB, Role, RegistrationDate).
- **Doctor**: Stores doctor details (ID, Specialty).
- **Patient**: Stores patient details (ID).
- **Appointment**: Manages appointments (ID, Patient_ID, Doctor_ID, Date_regis, Time_regis).
- **Department**: Stores department details (ID, Specialty).
- **Doctor_Assigned**: Links doctors to departments.
- **Room**: Manages hospital rooms (ID, Capacity, Room_type, Price).
- **Patient_Admission**: Tracks patient admissions (Patient_ID, Room_ID, Date_start, Date_end).
- **Treatment**: Records treatments (ID, Patient_ID, Doctor_ID, Date_prescripted, Diagnosis).
- **Dosage_Treatment**: Manages medication dosages.
- **Medical_Report**: Stores medical reports (ID, Patient_ID, Diagnosis).

### Triggers
- `PreventPatientDeletion`: Blocks deletion of patients with active appointments.
- `AfterAppointment`: Creates an invoice automatically after an appointment is booked.
- `trg_insert_user`: Inserts new users into `Doctor` or `Patient` tables based on their role.
- `trg_update_doctor_speciality`: Updates a doctor’s specialty based on department assignments.

## Setup Instructions

### Prerequisites
- Python 3.8+
- Oracle Database
- Docker
- Visual Studio Code
- Git
- Node.js (for frontend dependencies, if any)

### Installation Steps
1. **Clone the Repository**:
   ```bash
   git clone https://github.com/Tea314/Cafes-Viewing-Website
   cd Cafes-Viewing-Website
   ```

2. **Set Up the Oracle Database**:
   - Use Docker to set up an Oracle database container:
     ```bash
     docker run -d -p 1521:1521 --name oracle-db gvenzl/oracle-xe
     ```
   - Configure the database using SQL Developer or a similar tool.
   - Run the provided SQL scripts to create tables, triggers, and populate sample data.

3. **Install Backend Dependencies**:
   ```bash
   pip install eel oracledb
   ```

4. **Set Up Frontend**:
   - Ensure HTML, CSS, and JavaScript files are placed in the appropriate directory (e.g., `web/`).
   - Install any required JavaScript libraries (e.g., jQuery, Chart.js) if used:
     ```bash
     npm install
     ```

5. **Configure Environment**:
   - Update database connection settings in the Python backend (e.g., `user`, `password`, `dsn` in `oracledb.connect`).
   - Example:
     ```python
     conn = oracledb.connect(user="KHOA", password="Khoa0301#", dsn="localhost/ORCLDB1")
     ```

6. **Run the Application**:
   ```bash
   python main.py
   ```
   - The application will start, and the UI will be accessible via a web browser (typically at `http://localhost:8000`).

## Usage

1. **Admin**:
   - Log in with admin credentials to view all patients and doctors.
   - Manage user accounts and monitor system activities.
2. **Patient**:
   - Register or log in to book appointments by department or doctor.
   - Update personal information (except SSN, email, ID).
   - View booking history.
3. **Doctor**:
   - Log in to view future appointment schedules.
   - Update availability and specialty details.

## Contributors

| Name                  | Student ID | Contribution                                                                 |
|-----------------------|------------|------------------------------------------------------------------------------|
| Tran Tri Dung         | 2252133    | User groups, app architecture, functions, procedures, triggers, specifications |
| Nguyen Le Duy Khang   | 2252303    | Frontend development, BCNF normalization, data creation                       |
| Huynh Ngoc Khoa       | 2211591    | Backend development, indexing, functions, procedures, triggers, specifications |

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

### Notes for Customization
- **Repository URL**: Update the `git clone` URL with your actual GitHub repository link.
- **Port Number**: Adjust the port number (`8000`) in the usage instructions if your EEL application uses a different port.
- **Additional Instructions**: If your project has specific setup steps (e.g., environment variables, additional dependencies), include them in the `Setup Instructions` section.
- **License**: If you prefer a different license, update the `License` section accordingly.

Let me know if you need further refinements or additional sections in the README!
