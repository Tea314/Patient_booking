-- Active: 1729747425261@@127.0.0.1@1521@ORCLDB1@ASSIGNMENT
CREATE TABLE Department (  
    ID INT PRIMARY KEY,  
    Speciality VARCHAR(100)
);  

CREATE Table Users (
    id          INT PRIMARY KEY,
    name        VARCHAR(100) NOT NULL,
    SSN         VARCHAR(10) NOT NULL UNIQUE,
    email       VARCHAR(40) NOT NULL,
    password    VARCHAR(20) NOT NULL,
    gender VARCHAR(10) not null check (gender in ('MALE', 'FEMALE', 'OTHER')),
    DOB DATE,
    role        VARCHAR(20) not null check (role in ('ADMIN','DOCTOR', 'PATIENT')),
    registrationDate DATE
);

CREATE TABLE Doctor (  
    ID INT PRIMARY KEY, 
    Speciality VARCHAR(100),   
    CONSTRAINT 	fk_doctor_id	FOREIGN KEY (ID) 
    REFERENCES Users(id) 
    ON DELETE CASCADE DEFERRABLE
);  

CREATE TABLE Doctor_Assigned (
    Doctor_ID INT NOT NULL,
    Department_ID INT NOT NULL,
    PRIMARY KEY (Doctor_ID, Department_ID),
    CONSTRAINT fk_doc_dep_doctor FOREIGN KEY (Doctor_ID) 
        REFERENCES Doctor(ID) ON DELETE CASCADE DEFERRABLE,
    CONSTRAINT fk_doc_dep_department FOREIGN KEY (Department_ID) 
        REFERENCES Department(ID) ON DELETE CASCADE DEFERRABLE
);

CREATE TABLE Room (  
    ID INT PRIMARY KEY,  
    Capacity INT,  
    Room_type VARCHAR(10) not null check (Room_type in ('NORMAL', 'DELUXE', 'PRIVATE')),
    price DECIMAL(10, 2)
);  

CREATE TABLE Patient (  
    ID INT PRIMARY KEY,    
);  

CREATE TABLE Patient_admission (
    Patient_ID INT,
    Room_ID INT,
    Date_start DATE, 
    Date_end DATE,
    CONSTRAINT fk_patient_admission_pa_id FOREIGN KEY (Patient_ID) 
        REFERENCES Patient(ID) ON DELETE SET NULL DEFERRABLE,
    CONSTRAINT fk_patient_admission_room_id FOREIGN KEY (Room_ID) 
        REFERENCES Room(ID) ON DELETE SET NULL DEFERRABLE
);

CREATE TABLE Appointment (  
    ID INT,  
    Date_regis DATE,  
    Time_regis TIMESTAMP,  
    Patient_id INT,  
    Doctor_id INT,  
    PRIMARY KEY(ID, Patient_id, Doctor_id),
    CONSTRAINT 	fk_app_pa_ssn	FOREIGN KEY (Patient_id) 
    REFERENCES Patient(ID) 
    ON DELETE SET NULL DEFERRABLE,
    CONSTRAINT 	fk_app_doc_ssn	FOREIGN KEY (Doctor_id) 
    REFERENCES Doctor(ID) 
    ON DELETE SET NULL DEFERRABLE  
);  

CREATE TABLE Treatment (  
    ID INT,
    Patient_id INT,  
    Doctor_id INT, 
    Date_prescripted DATE,  
    Diagnosis VARCHAR(100),  
    Invoice INT,
    Feedback VARCHAR(200), 
    CONSTRAINT 	fk_treat_doc	FOREIGN KEY (Doctor_id) 
    REFERENCES Doctor(ID) 
    ON DELETE SET NULL DEFERRABLE,
    CONSTRAINT 	fk_treat_pa	FOREIGN KEY (Patient_id) 
    REFERENCES Patient(ID) 
    ON DELETE SET NULL DEFERRABLE
);
CREATE Table Dosage_Treament (
    ID INT,
    Patient_id INT,  
    Doctor_id INT, 
    Medical_name VARCHAR(10),
    Medical_dosage VARCHAR(10),
    CONSTRAINT 	fk_do_treat_doc	FOREIGN KEY (Doctor_id) 
    REFERENCES Doctor(ID) 
    ON DELETE SET NULL DEFERRABLE,
    CONSTRAINT 	fk_do_treat_pa	FOREIGN KEY (Patient_id) 
    REFERENCES Patient(ID) 
    ON DELETE SET NULL DEFERRABLE
);

CREATE TABLE Medical_Report (  
    ID INT,  
    Diagnosis VARCHAR(100),  
    Patient_id INT,  
    PRIMARY KEY(ID, Patient_id),
    CONSTRAINT 	fk_med_pa_id	FOREIGN KEY (Patient_id) 
    REFERENCES Patient(ID) 
    ON DELETE SET NULL DEFERRABLE 
);

---------------------------------------------------------------------------------------------------
---------------------------------------------------------------------------------------------------
CREATE SEQUENCE users_seq START WITH 1;
alter sequence users_seq restart start with 1;
SELECT users_seq.NEXTVAL FROM DUAL;

SELECT role from USERS WHERE EMAIL = 'huynhkhoa03012004@gmail.com';
SELECT name, ssn, TO_CHAR(DOB,'YYYY-MM-DD'),GENDER from users WHERE EMAIL = 'huynhkhoa03012004@gmail.com';
INSERT INTO USERS VALUES (users_seq.NEXTVAL, 'admin', '0000000000', 'admin@gmail.com', 'Admin12345', 'OTHER', TO_DATE('2000-01-01', 'YYYY-MM-DD'), 'ADMIN', TO_DATE('2000-01-01', 'YYYY-MM-DD'));
INSERT INTO USERS VALUES (users_seq.NEXTVAL, 'Huynh Tea', '0000000001', 'tea1@gmail.com', 'Khoa112345', 'MALE', TO_DATE('2000-01-01', 'YYYY-MM-DD'), 'PATIENT', TO_DATE('2000-01-01', 'YYYY-MM-DD'));


INSERT INTO ROOM (ID, Capacity, ROOM_TYPE) VALUES (1, 2, 'DELUXE');
INSERT INTO ROOM (ID, Capacity, ROOM_TYPE) VALUES (2, 4, 'NORMAL');
INSERT INTO ROOM (ID, Capacity, ROOM_TYPE) VALUES (3, 1, 'KING');

SELECT * FROM ROOM;
UPDATE ROOM
SET REMAINING = CAPACITY;

SELECT * FROM DEPARTMENT;
INSERT INTO DEPARTMENT(ID, SPECIALITY) VALUES (1, 'Co_Xuong_Khop');
INSERT INTO DEPARTMENT(ID, SPECIALITY) VALUES (2, 'Than_Kinh');
INSERT INTO DOCTOR(ID, NAME, SPECIALITY, DEPARTMENT_ID) VALUES (1, 'Huynh Ngoc Khoa','Truong khoa, 40 nam kinh nghiem', 2);
INSERT INTO DOCTOR(ID, NAME, SPECIALITY, DEPARTMENT_ID) VALUES (2, 'Nguyen Le Duy Khang','Pho khoa, 20 nam kinh nghiem', 2);
INSERT INTO DOCTOR(ID, NAME, SPECIALITY, DEPARTMENT_ID) VALUES (3, 'Le Duc Nghia','Than kinh, San phu khoa', 2);
INSERT INTO DOCTOR(ID, NAME, SPECIALITY, DEPARTMENT_ID) VALUES (4, 'Nguyen Duc','Tiet Nieu, San phu khoa', 2);




SELECT patient_seq.NEXTVAL FROM dual;
SELECT trigger_name, status
FROM user_triggers
WHERE trigger_name = 'PATIENT_ID_TRIGGER';

ALTER TABLE APPOINTMENT ADD Patient_ID INT;


ALTER TABLE APPOINTMENT ADD CONSTRAINT fk_patient_id FOREIGN KEY(Patient_ID) REFERENCES PATIENT(ID);
ALTER TABLE MEDICAL_REPORT ADD Patient_ID INT;
ALTER TABLE MEDICAL_REPORT ADD CONSTRAINT fk_patient_id_medi FOREIGN KEY(Patient_ID) REFERENCES PATIENT(ID);

INSERT INTO patient (ID,NAME, DOB, GENDER, ROOM_ID)
VALUES (1,'Khoa', TO_DATE('2004-01-03', 'YYYY-MM-DD'), 'Male', NULL);

UPDATE PATIENT
SET DOB = TO_DATE('2004-01-03', 'YYYY-MM-DD')
WHERE ID = 1;
INSERT INTO patient (ID,NAME, DOB, GENDER, ROOM_ID)
VALUES (2,'Khang', TO_DATE('2004-01-27', 'YYYY-MM-DD'), 'Male', NULL);

INSERT INTO patient (ID,NAME, DOB, GENDER, ROOM_ID)
VALUES (3,'Huy', TO_DATE('2003-09-23', 'YYYY-MM-DD'), 'Male', NULL);

CREATE SEQUENCE appointment_seq START WITH 1;
alter sequence appointment_seq restart start with 1;
CREATE or REPLACE TRIGGER appoinment_id_trigger
BEFORE INSERT on APPOINTMENT
FOR EACH ROW
BEGIN
    SELECT appointment_seq.NEXTVAL
    INTO :NEW.ID
    FROM dual;
END:
/

DROP TRIGGER appoinment_id_trigger;
INSERT INTO APPOINTMENT (ID, DATE_REGIS, TIME_REGIS, DOCTOR_ID, PATIENT_ID)
VALUES (appointment_seq.NEXTVAL, TO_DATE('2024-11-03', 'YYYY-MM-DD'), TO_TIMESTAMP('10:00:00', 'HH24:MI:SS'), 1, NULL);
INSERT INTO APPOINTMENT (ID, DATE_REGIS, TIME_REGIS, DOCTOR_ID, PATIENT_ID)
VALUES (appointment_seq.NEXTVAL, TO_DATE('2024-11-03', 'YYYY-MM-DD'), TO_TIMESTAMP('10:10:00', 'HH24:MI:SS'), 1, 2);

INSERT INTO APPOINTMENT (ID, DATE_REGIS, TIME_REGIS, DOCTOR_ID, PATIENT_ID)
VALUES (appointment_seq.NEXTVAL, TO_DATE('2024-11-03', 'YYYY-MM-DD'), TO_TIMESTAMP('11:10:00', 'HH24:MI:SS'), 1, 2);

INSERT INTO APPOINTMENT (ID, DATE_REGIS, TIME_REGIS, DOCTOR_ID, PATIENT_ID)
VALUES (appointment_seq.NEXTVAL, TO_DATE('2024-11-03', 'YYYY-MM-DD'), TO_TIMESTAMP('15:00:00', 'HH24:MI:SS'), 1, 1);
INSERT INTO APPOINTMENT (ID, DATE_REGIS, TIME_REGIS, DOCTOR_ID, PATIENT_ID)
VALUES (appointment_seq.NEXTVAL, TO_DATE('2024-11-03', 'YYYY-MM-DD'), TO_TIMESTAMP('15:30:00', 'HH24:MI:SS'), 1, 2);

INSERT INTO APPOINTMENT (ID, DATE_REGIS, TIME_REGIS, DOCTOR_ID, PATIENT_ID)
VALUES (appointment_seq.NEXTVAL, TO_DATE('2024-11-03', 'YYYY-MM-DD'), TO_TIMESTAMP('15:40:00', 'HH24:MI:SS'), 1, 2);

INSERT INTO APPOINTMENT (ID, DATE_REGIS, TIME_REGIS, DOCTOR_ID, PATIENT_ID)
VALUES (appointment_seq.NEXTVAL, TO_DATE('2024-11-03', 'YYYY-MM-DD'), TO_TIMESTAMP('16:20:00', 'HH24:MI:SS'), 1, 2);
SELECT Time_regis FROM APPOINTMENT
WHERE DATE_REGIS = TO_DATE('2024-11-03', 'YYYY-MM-DD');

SELECT TIME_REGIS, DOCTOR_ID
FROM APPOINTMENT
WHERE  DOCTOR_ID IN (
    SELECT ID
    FROM DOCTOR
    WHERE SPECIALITY LIKE '%Than kinh%'
) AND DATE_REGIS = TO_DATE('2024-11-04', 'YYYY-MM-DD');
INSERT INTO APPOINTMENT (ID, DATE_REGIS, TIME_REGIS, DOCTOR_ID, PATIENT_ID)
VALUES (appointment_seq.NEXTVAL, TO_DATE('2024-11-04', 'YYYY-MM-DD'), TO_TIMESTAMP('16:20:00', 'HH24:MI:SS'), 1, 2);

SELECT ID
    FROM DOCTOR
    WHERE SPECIALITY LIKE '%Than kinh%';

INSERT INTO PATIENT (ID, NAME, DOB, GENDER, ROOM_ID) 
VALUES (2410, 'Duyen', TO_DATE('2004-10-24', 'YYYY-MM-DD'),'Female',NULL);


SELECT TIME_REGIS 
FROM APPOINTMENT 
WHERE DATE_REGIS = TO_DATE('2024-11-07', 'YYYY-MM-DD') 
  AND DOCTOR_ID = 3;
SELECT TIME_REGIS FROM APPOINTMENT WHERE DOCTOR_ID = 3;

SELECT ID, NAME, SPECIALITY FROM DOCTOR;

SELECT COUNT(*) FROM PATIENT
WHERE ID = 1;

SELECT DATE_REGIS
FROM APPOINTMENT
WHERE PATIENT_ID = 1
ORDER BY TIME_REGIS DESC
FETCH FIRST 1 ROWS ONLY;

-- INSERT DATA INTO DEPARTMENT
INSERT INTO Department (ID, Speciality) VALUES (1, 'Musculoskeletal System');
INSERT INTO Department (ID, Speciality) VALUES (2, 'Neurology');
INSERT INTO Department (ID, Speciality) VALUES (3, 'Gastroenterology');
INSERT INTO Department (ID, Speciality) VALUES (4, 'Cardiology');
INSERT INTO Department (ID, Speciality) VALUES (5, 'Ent - Eye - Odontology');
INSERT INTO Department (ID, Speciality) VALUES (6, 'Spinal column');
INSERT INTO Department (ID, Speciality) VALUES (7, 'Traditional medicine');
INSERT INTO Department (ID, Speciality) VALUES (8, 'Acupuncture');
INSERT INTO Department (ID, Speciality) VALUES (9, 'Obstetrics & Gynaecology');
INSERT INTO Department (ID, Speciality) VALUES (10, 'Fetal Echocardiography');
INSERT INTO Department (ID, Speciality) VALUES (11, 'Pediatrics');
INSERT INTO Department (ID, Speciality) VALUES (12, 'Dermatology');
INSERT INTO Department (ID, Speciality) VALUES (13, 'Hepato');
INSERT INTO Department (ID, Speciality) VALUES (14, 'Mental health');
INSERT INTO Department (ID, Speciality) VALUES (15, 'Immunology');
INSERT INTO Department (ID, Speciality) VALUES (16, 'Respiratory - Lung');
INSERT INTO Department (ID, Speciality) VALUES (17, 'Neurosurgery');
INSERT INTO Department (ID, Speciality) VALUES (18, 'Andrology');
INSERT INTO Department (ID, Speciality) VALUES (19, 'Ophthalmology');
INSERT INTO Department (ID, Speciality) VALUES (20, 'Kidney - Urology');
INSERT INTO Department (ID, Speciality) VALUES (21, 'Pediatric');
INSERT INTO Department (ID, Speciality) VALUES (22, 'Dental');
INSERT INTO Department (ID, Speciality) VALUES (23, 'Diabetes - Endocrine');
INSERT INTO Department (ID, Speciality) VALUES (24, 'Rehabilitation');
INSERT INTO Department (ID, Speciality) VALUES (25, 'MRI');
INSERT INTO Department (ID, Speciality) VALUES (26, 'Computed tomography(CT)');
INSERT INTO Department (ID, Speciality) VALUES (27, 'Gastroenterology');
INSERT INTO Department (ID, Speciality) VALUES (28, 'Oncology');
INSERT INTO Department (ID, Speciality) VALUES (29, 'Cosmetic dermatology');
INSERT INTO Department (ID, Speciality) VALUES (30, 'Infectious diseases');
INSERT INTO Department (ID, Speciality) VALUES (31, 'Family doctor');
INSERT INTO Department (ID, Speciality) VALUES (32, 'Maxillofacial surgery');
INSERT INTO Department (ID, Speciality) VALUES (33, 'Psychotherapy');
INSERT INTO Department (ID, Speciality) VALUES (34, 'Infertility');
INSERT INTO Department (ID, Speciality) VALUES (35, 'Trauma - Orthopedics');
INSERT INTO Department (ID, Speciality) VALUES (36, 'Orthodontics');
INSERT INTO Department (ID, Speciality) VALUES (37, 'Implant porcelain teeth');
INSERT INTO Department (ID, Speciality) VALUES (38, 'Dental implant');
INSERT INTO Department (ID, Speciality) VALUES (39, 'Wisdom tooth extraction');
INSERT INTO Department (ID, Speciality) VALUES (40, 'General dentistry');
INSERT INTO Department (ID, Speciality) VALUES (41, 'Pediatric Dentistry');
INSERT INTO Department (ID, Speciality) VALUES (42, 'Thyroid');
INSERT INTO Department (ID, Speciality) VALUES (43, 'Breast Specialist');

SELECT COUNT(*) FROM DEPARTMENT;

---------------------------------------------------------------------------------------------------
-- Trigger-to-Prevent-Deletion-of-Patients-with-Appointments
CREATE TRIGGER PreventPatientDeletion  
BEFORE DELETE ON Patient  
FOR EACH ROW  
BEGIN  
    DECLARE appointment_count INT;  
    SELECT COUNT(*) INTO appointment_count  
    FROM Appointment  
    WHERE ID_Patient = OLD.ID_Patient;  

    IF appointment_count > 0 THEN  
        SIGNAL SQLSTATE '45000'  
        SET MESSAGE_TEXT = 'Cannot delete patient with existing appointments.';  
    END IF;  
END;  
-- Trigger-to-Automatically-Generate-Invoice-After-Appointment
CREATE TRIGGER AfterAppointmentInsert  
AFTER INSERT ON Appointment  
FOR EACH ROW  
BEGIN  
    INSERT INTO Invoice (ID_Patient, Amount, IssueDate)  
    VALUES (NEW.ID_Patient, 100.00, CURDATE()); -- Assuming a fixed amount for simplicity  
END;  
/



-- trigger to update patient or doctor when create user
CREATE OR REPLACE TRIGGER trg_insert_user
AFTER INSERT ON Users
FOR EACH ROW
BEGIN
    IF UPPER(:NEW.role) = 'DOCTOR' THEN
        INSERT INTO Doctor (ID, Speciality)
        VALUES (:NEW.id, NULL);
    ELSIF UPPER(:NEW.role) = 'PATIENT' THEN
        INSERT INTO Patient (ID)
        VALUES (:NEW.id);
    END IF;
END;
/
-- trigger to auto update speciality of doctor
CREATE OR REPLACE TRIGGER trg_update_doctor_speciality
AFTER INSERT ON Doctor_Assigned
FOR EACH ROW
DECLARE
    dept_speciality VARCHAR2(100);
    current_speciality VARCHAR2(4000);
BEGIN
    SELECT Speciality INTO dept_speciality
    FROM Department
    WHERE ID = :NEW.Department_ID;
    SELECT Speciality INTO current_speciality
    FROM Doctor
    WHERE ID = :NEW.Doctor_ID;

    IF current_speciality IS NULL THEN
        UPDATE Doctor
        SET Speciality = dept_speciality
        WHERE ID = :NEW.Doctor_ID;
    ELSIF INSTR(current_speciality, dept_speciality) = 0 THEN
        UPDATE Doctor
        SET Speciality = current_speciality || ', ' || dept_speciality
        WHERE ID = :NEW.Doctor_ID;
    END IF;
END;
/

INSERT INTO USERS VALUES (users_seq.NEXTVAL, 'Huynh Tea', '0000000001', 'tea1@gmail.com', 'Khoa112345', 'MALE', TO_DATE('2000-01-01', 'YYYY-MM-DD'), 'PATIENT', TO_DATE('2000-01-01', 'YYYY-MM-DD'));
INSERT INTO USERS VALUES (users_seq.NEXTVAL, 'Huynh Tea', '0000000001', 'tea1@gmail.com', 'Khoa112345', 'MALE', TO_DATE('2000-01-01', 'YYYY-MM-DD'), 'PATIENT', TO_DATE('2000-01-01', 'YYYY-MM-DD'));
INSERT INTO USERS VALUES (users_seq.NEXTVAL, 'Le Duc Nghia', '0000000002', 'nghia@gmail.com', 'Nghia12345', 'MALE', TO_DATE('2000-01-01', 'YYYY-MM-DD'), 'DOCTOR', TO_DATE('2000-01-01', 'YYYY-MM-DD'));
INSERT INTO USERS VALUES (users_seq.NEXTVAL, 'Le Duc Khang', '0000000003', 'kahng@gmail.com', 'Khang12345', 'MALE', TO_DATE('2000-01-01', 'YYYY-MM-DD'), 'DOCTOR', TO_DATE('2000-01-01', 'YYYY-MM-DD'));

INSERT INTO DOCTOR_ASSIGNED VALUES(29,2);
INSERT INTO DOCTOR_ASSIGNED VALUES(29,3);
INSERT INTO DOCTOR_ASSIGNED VALUES(30,2);
INSERT INTO DOCTOR_ASSIGNED VALUES(30,4);

SELECT * FROM DEPARTMENT;
SELECT SPECIALITY FROM DEPARTMENT WHERE ID = 2;
SELECT SPECIALITY FROM DOCTOR WHERE ID = 29;




SELECT 
    d.ID, 
    u.name, 
    d.Speciality
FROM 
    Doctor d
JOIN 
    Users u
ON 
    d.ID = u.id;

SELECT 
    u_p.SSN AS Patient_ID, 
    u_p.name AS Patient_Name, 
    d.ID AS Doctor_ID, 
    u_d.name AS Doctor_Name, 
    d.Speciality AS Doctor_Department
FROM 
    Patient p
JOIN 
    Users u_p 
ON 
    p.ID = u_p.ID
JOIN 
    Appointment a 
ON 
    p.ID = a.Patient_ID
JOIN 
    Doctor d 
ON 
    a.Doctor_ID = d.ID
JOIN 
    Users u_d 
ON 
    d.ID = u_d.ID
WHERE 
    u_p.role = 'PATIENT' AND u_p.EMAIL = 'huynhkhoa340@gmail.com';

SELECT * FROM USERS WHERE ROLE = 'PATIENT';
SELECT * FROM USERS WHERE ROLE = 'DOCTOR';

SELECT u.id, u.name, u.ssn, TO_CHAR(u.DOB, 'YYYY-MM-DD') AS dob, u.GENDER, d.speciality
FROM USERS u
LEFT JOIN DOCTOR d ON u.ID = d.ID
WHERE u.EMAIL = 'huynhkhoa240@gmail.com';


SELECT a.ID, TO_CHAR(a.DATE_REGIS,'YYYY-MM-DD') as DATE_REGIS, TO_CHAR(a.TIME_REGIS,'HH24:MI') || ' - ' || TO_CHAR(a.TIME_REGIS + INTERVAL '10' MINUTE, 'HH24:MI') as TIME_REGIS , u.NAME
FROM APPOINTMENT a
JOIN USERS u ON a.PATIENT_ID = u.ID
WHERE a.DOCTOR_ID = (SELECT ID FROM USERS WHERE EMAIL = 'nghia@gmail.com');


SELECT TIME_REGIS 
FROM APPOINTMENT 
WHERE DATE_REGIS = TO_DATE("2024-12-13", 'YYYY-MM-DD') 
AND DOCTOR_ID = 29;



SELECT COUNT(*) FROM PATIENT_ADMISSION
WHERE DATE_START = '2024-12-13' AND ROOM_ID = 1;

INSERT INTO TREATMENT (ID, PATIENT_ID, DOCTOR_ID, DATE_PRESCRIPTED, DIAGNOSIS)
VALUES ();
INSERT INTO DOSAGE_TREAMENT (ID, PATIENT_ID, DOCTOR_ID, MEDICAL_NAME, MEDICAL_DOSAGE)
values ();
CREATE INDEX idx_name ON Users(NAME);
drop INDEX IDX_NAME;
SELECT INDEX_NAME, COLUMN_NAME
FROM USER_IND_COLUMNS
WHERE TABLE_NAME = 'USERS';
SELECT * FROM USERS WHERE NAME like '%Khoa%';



SET SERVEROUTPUT ON;

DECLARE
    start_time NUMBER;
    end_time NUMBER;
BEGIN
    start_time := DBMS_UTILITY.GET_TIME;
    FOR rec IN (SELECT * FROM users WHERE name = 'User_83') LOOP
        NULL; 
    END LOOP;
    end_time := DBMS_UTILITY.GET_TIME;
    DBMS_OUTPUT.PUT_LINE('Time before creating index: ' || (end_time - start_time) || ' hundredths of seconds');
    EXECUTE IMMEDIATE 'CREATE INDEX idx_users_name ON Users(name)';
    start_time := DBMS_UTILITY.GET_TIME;
    FOR rec IN (SELECT * FROM users WHERE name = 'User_83') LOOP
        NULL; 
    END LOOP;
    end_time := DBMS_UTILITY.GET_TIME;
    DBMS_OUTPUT.PUT_LINE('Time after creating index: ' || (end_time - start_time) || ' hundredths of seconds');
    EXECUTE IMMEDIATE 'DROP INDEX idx_users_name';
END;
/
SELECT COUNT(*) from users where email = 'huynhkhoa340@gmail.com';


BEGIN
    FOR i IN 1..1000000 LOOP
        INSERT INTO Users (id, name, ssn, email, password, gender, dob, role, registrationDate)
        VALUES (
            i,
            'User_' || i,
            TO_CHAR(i, '0000000000'),
            'user_' || i || '@example.com',
            'password_' || i,
            CASE MOD(i, 3)
                WHEN 0 THEN 'MALE'
                WHEN 1 THEN 'FEMALE'
                ELSE 'OTHER'
            END,
            TRUNC(SYSDATE) - MOD(i, 365),
            'PATIENT',
            TRUNC(SYSDATE) - MOD(i, 100)
        );
    END LOOP;
    COMMIT;
END;
/


CREATE TRIGGER AfterAppointmentInsert  
AFTER INSERT ON Appointment  
FOR EACH ROW  
BEGIN  
    INSERT INTO Invoice (ID_Patient, Amount, IssueDate)  
    VALUES (NEW.ID_Patient, 100.00, CURDATE());  
END;


UPDATE Users
SET name = 'New Name',
    DOB = TO_DATE('1990-01-01', 'YYYY-MM-DD'),
    gender = 'MALE'
WHERE id = 1;
