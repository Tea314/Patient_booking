-- Active: 1729747425261@@127.0.0.1@1521@ORCLDB1@ASSIGNMENT
CREATE TABLE Department (  
    ID INT PRIMARY KEY,  
    Speciality VARCHAR(100)
);  

CREATE Table Users (
    id          INT PRIMARY KEY,
    name        VARCHAR(100) NOT NULL UNIQUE,
    SSN         VARCHAR(10) NOT NULL UNIQUE,
    email       VARCHAR(40) NOT NULL,
    password    VARCHAR(20) NOT NULL,
    gender VARCHAR(10) not null check (gender in ('MALE', 'FEMALE', 'OTHER')),
    DOB DATE,
    role        VARCHAR(20) not null check (role in ('ADMIN','DOCTOR', 'PATIENT')),
    registrationDate DATE
);

CREATE TABLE Doctor (  
    ID VARCHAR(10) PRIMARY KEY,
    doctor_ssn varchar(10) not null unique,  
    name VARCHAR(100),  
    Speciality VARCHAR(100),  
    Department_ID INT,  
    CONSTRAINT 	fk_doctor_ssn	FOREIGN KEY (doctor_ssn) 
    REFERENCES Users(SSN) 
    ON DELETE CASCADE DEFERRABLE
);  

CREATE TABLE Room (  
    ID INT PRIMARY KEY,  
    Capacity INT,  
    Room_type VARCHAR(50)  
);  
CREATE TABLE Patient (  
    ID VARCHAR(10) PRIMARY KEY,  
    patient_ssn varchar(10) not null unique,
    Name VARCHAR(100),    
    Room_ID INT,
    CONSTRAINT 	fk_patient_ssn	FOREIGN KEY (patient_ssn) 
    REFERENCES Users(ssn) 
    ON DELETE CASCADE DEFERRABLE ,
    CONSTRAINT 	fk_room_id	FOREIGN KEY (Room_ID) 
    REFERENCES Room(ID) 
    ON DELETE SET NULL DEFERRABLE
);  

CREATE TABLE Appointment (  
    ID INT PRIMARY KEY,  
    Date_regis DATE,  
    Time_regis TIMESTAMP,  
    Patient_ssn VARCHAR(10) NOT NULL,  
    Doctor_ssn VARCHAR(10) NOT NULL,  
    CONSTRAINT 	fk_app_pa_ssn	FOREIGN KEY (Patient_ssn) 
    REFERENCES Patient(patient_ssn) 
    ON DELETE SET NULL DEFERRABLE,
    CONSTRAINT 	fk_app_doc_ssn	FOREIGN KEY (Doctor_ssn) 
    REFERENCES Doctor(Doctor_ssn) 
    ON DELETE SET NULL DEFERRABLE  
);  

CREATE TABLE Treatment (  
    ID INT PRIMARY KEY,  
    Date_prescripted DATE,  
    Diagnosis VARCHAR(100),  
    Medical_name VARCHAR(100),    
    Medical_dosage VARCHAR(100),  
    Appointment_ID INT,  
    CONSTRAINT 	fk_treat_app	FOREIGN KEY (Appointment_ID) 
    REFERENCES Appointment(ID) 
    ON DELETE SET NULL DEFERRABLE
);

CREATE TABLE Medical_Report (  
    ID INT PRIMARY KEY,  
    Diagnosis VARCHAR(100),  
    Patient_ssn VARCHAR(10) NOT NULL,  
    CONSTRAINT 	fk_med_pa_ssn	FOREIGN KEY (Patient_ssn) 
    REFERENCES Patient(patient_ssn) 
    ON DELETE SET NULL DEFERRABLE 
);
CREATE Table Invoice (
    Patient_ssn VARCHAR(10) NOT NULL,  
    Doctor_ssn VARCHAR(10) NOT NULL,
    Amount INT,
    Appointment_ID INT,
    PRIMARY KEY (Patient_ssn, Doctor_ssn, Appointment_ID),
    CONSTRAINT 	fk_invoice_doc_ssn	FOREIGN KEY (Doctor_ssn) 
    REFERENCES Doctor(doctor_ssn) 
    ON DELETE SET NULL DEFERRABLE ,
    CONSTRAINT 	fk_invoice_pa_ssn	FOREIGN KEY (Patient_ssn) 
    REFERENCES Patient(patient_ssn) 
    ON DELETE SET NULL DEFERRABLE ,
    CONSTRAINT 	fk_invoice_app_date	FOREIGN KEY (Appointment_ID) 
    REFERENCES Appointment(ID) 
    ON DELETE SET NULL DEFERRABLE 
);
CREATE TABLE Feedback (
    ID INT PRIMARY KEY,
    Patient_ssn varchar(10) not null,
    Feedback_para varchar(100),
    CONSTRAINT 	fk_feedback_pa_ssn	FOREIGN KEY (Patient_ssn) 
    REFERENCES Patient(patient_ssn) 
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

INSERT INTO USERS VALUES (users_seq.NEXTVAL, 'Huynh Tea', '0000000001', 'tea1@gmail.com', 'Khoa112345', 'MALE', TO_DATE('2000-01-01', 'YYYY-MM-DD'), 'PATIENT', TO_DATE('2000-01-01', 'YYYY-MM-DD'));

INSERT INTO Users (id, name, SSN, email, password, gender, DOB, role, registrationDate) 
                VALUES (users_seq.NEXTVAL, 'Huynh Ngoc Khoa1', '0482040002', 'huynhkhoa340@gmail.com', 'Khoa03012004', 'FEMALE', TO_DATE(:dob, 'YYYY-MM-DD'), :role, TO_DATE(:registration_date, 'YYYY-MM-DD'))





