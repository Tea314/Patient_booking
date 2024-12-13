from datetime import datetime, timedelta
import oracledb
from tkinter import *
from tkinter import messagebox
import subprocess
import eel
import json


def connect_db():
    try:
        conn = oracledb.connect(
            user="Assignment",  # Oracle username
            password="Khoa0301#",  # Oracle password
            dsn="localhost/ORCLDB1",  # DSN: hostname/servicename (or SID)
        )
        print("Successfully connected to the Oracle database")
        return conn
    except oracledb.DatabaseError as e:
        print("Failed to connect to the Oracle database")
        print("Error:", e)
        return None


def main_window():
    eel.init("Database_assign")

    # add
    @eel.expose
    def add_room(room_id, room_type, capacity):
        print("check")
        conn = connect_db()
        cursor = conn.cursor()
        insert_query = "INSERT INTO Room (ID, Roomtype, Capacity) VALUES (:id, :roomtype, :capacity)"
        try:
            cursor.execute(insert_query, [room_id, room_type, capacity])
            conn.commit()
            message = "Room added successfully"
        except oracledb.DatabaseError as e:
            message = f"Error adding room: {e}"
        conn.close()
        return message

    @eel.expose
    def add_appointment(date_regis, time_regis, patient_id, doctor_id):
        conn = connect_db()
        cursor = conn.cursor()
        insert_query = "INSERT INTO APPOINTMENT (ID, DATE_REGIS, TIME_REGIS, DOCTOR_ID, PATIENT_ID) VALUES (appointment_seq.NEXTVAL, TO_DATE(:date_regis, 'YYYY-MM-DD'), TO_TIMESTAMP(:time_regis, 'HH24:MI:SS'), :doctor_id, :patient_id)"
        try:
            cursor.execute(
                insert_query,
                {
                    "date_regis": date_regis,
                    "time_regis": time_regis,
                    "doctor_id": doctor_id,
                    "patient_id": patient_id,
                },
            )
            conn.commit()
            message = "Appointment added successfully"
        except oracledb.DatabaseError as e:
            message = f"Error adding appointment: {e}"
        conn.close()
        print(message)
        return message

    @eel.expose
    def add_department(id, speciality):
        conn = connect_db()
        cursor = conn.cursor()
        insert_query = (
            "INSERT INTO Department (ID, Speciality) VALUES (:id, :speciality)"
        )
        try:
            cursor.execute(insert_query, [id, speciality])
            conn.commit()
            message = "Department added successfully"
        except oracledb.DatabaseError as e:
            message = f"Error adding appointment: {e}"
        conn.close()
        return message

    @eel.expose
    def add_doctor(id, name, speciality, department_id):
        conn = connect_db()
        cursor = conn.cursor()
        insert_query = "INSERT INTO Doctor (ID,Name, Speciality,Department_id) VALUES (:id,:name, :speciality,:department_id)"
        try:
            cursor.execute(insert_query, [id, name, speciality, department_id])
            conn.commit()
            message = "Doctor added successfully"
        except oracledb.DatabaseError as e:
            message = f"Error adding appointment: {e}"
        conn.close()
        return message

    @eel.expose
    def add_medical_report(id, diagnosis, patient_id):
        conn = connect_db()
        cursor = conn.cursor()
        insert_query = "INSERT INTO Medical_report (ID, Diagnosis,Patient_id) VALUES (:id, :diagnosis, :patient_id)"
        try:
            cursor.execute(insert_query, [id, diagnosis, patient_id])
            conn.commit()
            message = "Medical report added successfully"
        except oracledb.DatabaseError as e:
            message = f"Error adding appointment: {e}"
        conn.close()
        return message

    @eel.expose
    def add_patient(id, name, dob, gender, room_id):
        conn = connect_db()
        cursor = conn.cursor()
        if room_id == -1:
            insert_query = "INSERT INTO PATIENT (ID, NAME, DOB, GENDER, ROOM_ID) VALUES (:id, :name, TO_DATE(:dob, 'YYYY-MM-DD'), :gender, NULL)"
            params = {"id": id, "name": name, "dob": dob, "gender": gender}
        else:
            insert_query = "INSERT INTO PATIENT (ID, NAME, DOB, GENDER, ROOM_ID) VALUES (:id, :name, TO_DATE(:dob, 'YYYY-MM-DD'), :gender, :room_id)"
            params = {
                "id": id,
                "name": name,
                "dob": dob,
                "gender": gender,
                "room_id": room_id,
            }
        try:
            cursor.execute(insert_query, params)
            conn.commit()
            message = "Patient report added successfully"
        except oracledb.DatabaseError as e:
            message = f"Error adding appointment: {e}"
        conn.close()
        print(message)
        return message

    @eel.expose
    def add_treament(
        id, date_booked, diagnosis, medical_name, dosage, medical_dosage, appointment_id
    ):
        conn = connect_db()
        cursor = conn.cursor()
        insert_query = "INSERT INTO Treatment (ID, Date_booked,Diagnosis,Medical_name,Dosage,Medical_dosage,Appointment_id) VALUES (:id, :date_booked, :diagnosis,:medical_name,:dosage, :medical_dosage,:appointment_id)"
        try:
            cursor.execute(
                insert_query,
                [
                    id,
                    date_booked,
                    diagnosis,
                    medical_name,
                    dosage,
                    medical_dosage,
                    appointment_id,
                ],
            )
            conn.commit()
            message = "Treatment report added successfully"
        except oracledb.DatabaseError as e:
            message = f"Error adding appointment: {e}"
        conn.close()
        return message

    @eel.expose
    def show_all_doctor():
        conn = connect_db()
        cursor = conn.cursor()
        show_query = """
                SELECT 
                    d.ID, 
                    u.name, 
                    d.Speciality
                FROM 
                    Doctor d
                JOIN 
                    Users u
                ON 
                    d.ID = u.id
                 """
        cursor.execute(show_query)
        message = "Show all doctor successfully"
        rows = cursor.fetchall()
        conn.close()
        # print((rows))
        return json.dumps(rows)

    @eel.expose
    def search_room(room_id):
        conn = connect_db()
        cursor = conn.cursor()
        query = "SELECT * FROM Room WHERE ID = :id"
        cursor.execute(query, [room_id])
        room = cursor.fetchone()
        conn.close()
        if room:
            return f"Room ID: {room[0]}, Room Type: {room[1]}, Capacity: {room[2]}"
        else:
            return "Room not found"

    @eel.expose
    def show_all_rooms():
        conn = connect_db()
        cursor = conn.cursor()
        query = "SELECT * FROM Room"
        cursor.execute(query)
        rows = cursor.fetchall()
        conn.close()
        return json.dumps(rows)

    @eel.expose  # room availability
    def update_room_availability(room_id, new_remaining):
        conn = connect_db()
        cursor = conn.cursor()
        update_query = "UPDATE Room SET Remaining = :remaining WHERE ID = :id"
        try:
            cursor.execute(update_query, [new_remaining, room_id])
            conn.commit()  # Commit the changes
            message = "Room remaining updated successfully"
        except oracledb.DatabaseError as e:
            message = f"Error updating room: {e}"
        print(message)
        conn.close()
        return message

    @eel.expose
    def show_booked_time(day_submit, am_or_pm, speciality):
        conn = connect_db()
        cursor = conn.cursor()
        query_to_find_doctor_id = (
            "SELECT ID FROM DOCTOR WHERE SPECIALITY LIKE :speciality ORDER BY ID"
        )
        cursor.execute(query_to_find_doctor_id, {"speciality": f"%{speciality}%"})
        doctor_id = cursor.fetchall()
        doctor_id_list = [x[0] for x in doctor_id]
        print(doctor_id)
        print(doctor_id_list)
        # print(type(doctor_id_list))
        query_to_find_time = """
            SELECT DOCTOR_ID,TIME_REGIS
            FROM APPOINTMENT
            WHERE DOCTOR_ID IN (
                SELECT ID
                FROM DOCTOR
                WHERE SPECIALITY LIKE :spec
            ) 
            AND DATE_REGIS = TO_DATE(:reg_date, 'YYYY-MM-DD')
        """
        cursor.execute(
            query_to_find_time, {"spec": f"%{speciality}%", "reg_date": day_submit}
        )
        doctor_time = cursor.fetchall()
        formatted_times = [
            [x[0], x[1].strftime("%H:%M") if isinstance(x[1], datetime) else None]
            for x in doctor_time
        ]
        sorted(formatted_times, key=lambda x: x[0])
        # for x in formatted_times:
        #     print(x)
        time_lefted = (
            [
                "10:00",
                "10:10",
                "10:20",
                "10:30",
                "10:40",
                "10:50",
                "11:00",
                "11:10",
                "11:20",
                "11:30",
                "11:40",
                "11:50",
            ]
            if am_or_pm == "am"
            else [
                "15:00",
                "15:10",
                "15:20",
                "15:30",
                "15:40",
                "15:50",
                "16:00",
                "16:10",
                "16:20",
                "16:30",
                "16:40",
                "16:50",
            ]
        )
        count_time = [0] * 12
        for x in formatted_times:
            if x[1] in time_lefted:
                count_time[time_lefted.index(x[1])] += 1
        for i in range(len(time_lefted)):
            if count_time[i] == len(doctor_id_list):
                time_lefted.remove(time_lefted[i])
        time_interval = timedelta(minutes=10)
        for i in range(len(time_lefted)):
            start_time = datetime.strptime(time_lefted[i], "%H:%M")
            end_time = start_time + time_interval
            time_range = f"{start_time.strftime('%H:%M')}-{end_time.strftime('%H:%M')}"
            time_lefted[i] = time_range
        # for x in time_lefted:
        #     print(x)
        conn.close()
        return time_lefted

    @eel.expose
    def find_doctor_id(day_submit, time_submit, speciality):
        conn = connect_db()
        cursor = conn.cursor()
        query_to_find_doctor_id = (
            "SELECT ID FROM DOCTOR WHERE SPECIALITY LIKE :speciality ORDER BY ID"
        )
        cursor.execute(query_to_find_doctor_id, {"speciality": f"%{speciality}%"})
        doctor_id = cursor.fetchall()
        doctor_id_list = [x[0] for x in doctor_id]
        # print(doctor_id_list)
        # print(type(doctor_id_list))
        query_to_find_time = """
            SELECT DOCTOR_ID,TIME_REGIS
            FROM APPOINTMENT
            WHERE DOCTOR_ID IN (
                SELECT ID
                FROM DOCTOR
                WHERE SPECIALITY LIKE :spec
            ) 
            AND DATE_REGIS = TO_DATE(:reg_date, 'YYYY-MM-DD')
        """
        cursor.execute(
            query_to_find_time, {"spec": f"%{speciality}%", "reg_date": day_submit}
        )
        doctor_time = cursor.fetchall()
        cursor.close()
        conn.close()
        formatted_times = [
            [x[0], x[1].strftime("%H:%M") if isinstance(x[1], datetime) else None]
            for x in doctor_time
        ]
        sorted(formatted_times, key=lambda x: x[0])
        count_time = [0] * 12
        for x in doctor_id_list:
            tmp = []
            for y in formatted_times:
                if y[0] == x:
                    tmp.append(y[1])
            # print(tmp)
            # print(time_submit)
            if time_submit not in tmp:
                return x
        return -1

    @eel.expose
    def show_doctor_time(day_submit, am_or_pm, doctor_id):
        conn = connect_db()
        cursor = conn.cursor()
        query_to_find_doctor_id = """
            SELECT TIME_REGIS 
            FROM APPOINTMENT 
            WHERE DATE_REGIS = TO_DATE(:day_submit, 'YYYY-MM-DD') 
            AND DOCTOR_ID = :doctor_id
        """
        cursor.execute(
            query_to_find_doctor_id, {"day_submit": day_submit, "doctor_id": doctor_id}
        )
        doctor_time = cursor.fetchall()
        formatted_times = [
            x[0].strftime("%H:%M") for x in doctor_time if x[0] is not None
        ]
        # for x in formatted_times:
        # print(x)
        time_lefted = (
            [
                "10:00",
                "10:10",
                "10:20",
                "10:30",
                "10:40",
                "10:50",
                "11:00",
                "11:10",
                "11:20",
                "11:30",
                "11:40",
                "11:50",
            ]
            if am_or_pm == "am"
            else [
                "15:00",
                "15:10",
                "15:20",
                "15:30",
                "15:40",
                "15:50",
                "16:00",
                "16:10",
                "16:20",
                "16:30",
                "16:40",
                "16:50",
            ]
        )
        for x in formatted_times:
            if x in time_lefted:
                time_lefted.remove(x)
        time_interval = timedelta(minutes=10)
        for i in range(len(time_lefted)):
            start_time = datetime.strptime(time_lefted[i], "%H:%M")
            end_time = start_time + time_interval
            time_range = f"{start_time.strftime('%H:%M')}-{end_time.strftime('%H:%M')}"
            time_lefted[i] = time_range
        # for x in time_lefted:
        #     print(x)
        conn.close()
        return time_lefted

    @eel.expose
    def check_patient_registered(patient_id):
        conn = connect_db()
        cursor = conn.cursor()
        query_to_check_id_patient = """
            SELECT COUNT(*) FROM PATIENT
            WHERE ID = :patient_id
        """
        cursor.execute(query_to_check_id_patient, {"patient_id": patient_id})
        check_patient = cursor.fetchone()
        print(check_patient[0])
        # if check_patient[0] == 0: return 1
        query_to_check_time = """
            SELECT DATE_REGIS
            FROM APPOINTMENT
            WHERE PATIENT_ID = :ID
            ORDER BY TIME_REGIS DESC
            FETCH FIRST 1 ROWS ONLY
        """
        cursor.execute(query_to_check_time, {"ID": patient_id})
        check_date = cursor.fetchone()
        cursor.close()
        conn.close()
        if check_date:
            check_date = check_date[0]
            formatted_date = check_date.strftime("%Y-%m-%d")
            print(formatted_date)
        else:
            print("Date expired")
            return 2

    @eel.expose
    def insert_user(name, ssn, email, password, gender, dob, role, registration_date):
        conn = connect_db()
        if conn:
            try:
                cursor = conn.cursor()
                query = """
                INSERT INTO Users (id, name, SSN, email, password, gender, DOB, role, registrationDate) 
                VALUES (users_seq.NEXTVAL, :name, :ssn, :email, :password, :gender, TO_DATE(:dob, 'YYYY-MM-DD'), :role, TO_DATE(:registration_date, 'YYYY-MM-DD'))
                """
                print({
                    'name': name,
                    'ssn': ssn,
                    'email': email,
                    'password': password,
                    'gender': gender.upper(),
                    'dob': dob,
                    'role': role,
                    'registration_date': registration_date
                })
                cursor.execute(query, {
                    'name': name,
                    'ssn': ssn,
                    'email': email,
                    'password': password,
                    'gender': gender.upper(),
                    'dob': dob,
                    'role': role,
                    'registration_date': registration_date
                })
                conn.commit()
                print("User inserted successfully!")
                return "Success"
            except oracledb.DatabaseError as e:
                print("Error during INSERT:", e)
                return str(e)
            finally:
                cursor.close()
                conn.close()
        else:
            return "Failed to connect to Oracle"
        

    @eel.expose
    def insert_doctor(name, ssn, email, password, gender, dob, role, registration_date, department_id):
        conn = connect_db()
        if conn: 
            try:
                cursor = conn.cursor()
                insert_user_sql = f"""
                INSERT INTO USERS 
                VALUES (users_seq.NEXTVAL, :name, :ssn, :email, :password, :gender, TO_DATE(:dob, 'YYYY-MM-DD'), :role, TO_DATE(:registration_date, 'YYYY-MM-DD'))
                """
                cursor.execute(insert_user_sql, {
                        'name': name,
                        'ssn': ssn,
                        'email': email,
                        'password': password,
                        'gender': gender.upper(),
                        'dob': dob,
                        'role': role,
                        'registration_date': registration_date
                    })
                cursor.execute("SELECT users_seq.CURRVAL FROM DUAL")
                new_user_id = cursor.fetchone()[0]
                insert_doctor_assigned_sql = "INSERT INTO DOCTOR_ASSIGNED VALUES(:doctor_id, :department_id)"
                cursor.execute(insert_doctor_assigned_sql, [new_user_id, department_id])
                conn.commit()
                print("Doctor inserted successfully!")
                return "Success"
            except oracledb.DatabaseError as e:
                    print("Error during retrieve:", e)
                    return str(e)
            finally:
                cursor.close()
                conn.close()
        else:
                return "Failed to connect to Oracle"
        
    @eel.expose
    def get_role(email):
        conn = connect_db()
        if conn:
            try:
                cursor = conn.cursor()
                query = """
                SELECT role from USERS WHERE EMAIL = :email
                """
                cursor.execute(query, {'email': email})
                role = cursor.fetchone()
                if role == None:
                    return "Wrong account"
                print(role[0])
                print(type(role[0]))
                return role[0]
            except oracledb.DatabaseError as e:
                print("Error during retrieve:", e)
                return str(e)
            finally:
                cursor.close()
                conn.close()
        else:
            return "Failed to connect to Oracle"
        
    @eel.expose
    def get_name(email):
        conn = connect_db()
        if conn:
            try:
                cursor = conn.cursor()
                query = """
                SELECT id,name, ssn, TO_CHAR(DOB,'YYYY-MM-DD'),GENDER from users WHERE EMAIL = :email
                """
                cursor.execute(query, {'email': email})
                res = cursor.fetchone()
                if res:
                    keys = ['id','name', 'ssn', 'dob', 'gender']
                    return dict(zip(keys, res))
                else:
                    return None
            except oracledb.DatabaseError as e:
                print("Error during retrieve:", e)
                return str(e)
            finally:
                cursor.close()
                conn.close()
        else:
            return "Failed to connect to Oracle"
    @eel.expose
    def get_doctor(email):
        conn = connect_db()
        if conn:
            try:
                cursor = conn.cursor()
                query = """
                SELECT u.id, u.name, u.ssn, TO_CHAR(u.DOB, 'YYYY-MM-DD') AS dob, u.GENDER, d.speciality
                FROM USERS u
                LEFT JOIN DOCTOR d ON u.ID = d.ID
                WHERE u.EMAIL = :email
                """
                cursor.execute(query, {'email': email})
                res = cursor.fetchone()
                if res:
                    keys = ['id','name', 'ssn', 'dob', 'gender', 'speciality']
                    return dict(zip(keys, res))
                else:
                    return None
            except oracledb.DatabaseError as e:
                print("Error during retrieve:", e)
                return str(e)
            finally:
                cursor.close()
                conn.close()
        else:
            return "Failed to connect to Oracle"
        
    @eel.expose
    def get_appointment_time(email):
        conn = connect_db()
        if conn:
            try:
                cursor = conn.cursor()
                query = """
                    SELECT a.ID, TO_CHAR(a.DATE_REGIS,'YYYY-MM-DD') as DATE_REGIS, TO_CHAR(a.TIME_REGIS,'HH24:MI') || ' - ' || TO_CHAR(a.TIME_REGIS + INTERVAL '10' MINUTE, 'HH24:MI') as TIME_REGIS , u.NAME
                    FROM APPOINTMENT a
                    JOIN USERS u ON a.PATIENT_ID = u.ID
                    WHERE a.DOCTOR_ID = (SELECT ID FROM USERS WHERE EMAIL = :email)
                """
                cursor.execute(query, {'email': email})
                res = cursor.fetchall()
                if res:
                    keys = ['id','day', 'time', 'name']
                    return [dict(zip(keys, row)) for row in res]
                else:
                    return None
            except oracledb.DatabaseError as e:
                print("Error during retrieve:", e)
                return str(e)
            finally:
                cursor.close()
                conn.close()
        else:
            return "Failed to connect to Oracle"
        
    @eel.expose
    def get_information_room_booking(email):
        conn = connect_db()
        if conn:
            try:
                cursor = conn.cursor()
                query = """
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
                        u_p.role = 'PATIENT' AND u_p.EMAIL = :email
                """
                cursor.execute(query, {'email': email})
                res = cursor.fetchone()
                if res:
                    keys = ['patient_id','patient_name', 'doctor_id', 'doctor_name', 'speciality']
                    return dict(zip(keys, res))
                else:
                    return None
            except oracledb.DatabaseError as e:
                print("Error during retrieve:", e)
                return str(e)
            finally:
                cursor.close()
                conn.close()
        else:
            return "Failed to connect to Oracle"
        
    @eel.expose
    def get_all_patient():
        conn = connect_db()
        if conn:
            try:
                cursor = conn.cursor()
                query = """
                SELECT id,name, ssn,email,password, GENDER,TO_CHAR(DOB,'YYYY-MM-DD'),role,TO_CHAR(REGISTRATIONDATE,'YYYY-MM-DD') FROM USERS WHERE ROLE = 'PATIENT'
                """
                cursor.execute(query)
                res = cursor.fetchall()
                if res:
                    keys = ['id', 'name', 'ssn', 'email', 'password', 'gender', 'dob', 'role', 'registrationdate']
                    result = [dict(zip(keys, row)) for row in res]
                    print(result)
                    return result
                else:
                    return []
            except oracledb.DatabaseError as e:
                print("Error during retrieve:", e)
                return str(e)
            finally:
                cursor.close()
                conn.close()
        else:
            return "Failed to connect to Oracle"
    @eel.expose
    def get_all_doctor():
        conn = connect_db()
        if conn:
            try:
                cursor = conn.cursor()
                query = """
                SELECT id,name, ssn,email,password, GENDER,TO_CHAR(DOB,'YYYY-MM-DD'),role,TO_CHAR(REGISTRATIONDATE,'YYYY-MM-DD') FROM USERS WHERE ROLE = 'DOCTOR'
                """
                cursor.execute(query)
                res = cursor.fetchall()
                if res:
                    keys = ['id', 'name', 'ssn', 'email', 'password', 'gender', 'dob', 'role', 'registrationdate']
                    result = [dict(zip(keys, row)) for row in res]
                    print(result)
                    return result
                else:
                    return []
            except oracledb.DatabaseError as e:
                print("Error during retrieve:", e)
                return str(e)
            finally:
                cursor.close()
                conn.close()
        else:
            return "Failed to connect to Oracle"

    @eel.expose
    def show_book_room():
        # conn = connect_db()
        # cursor - conn.cursor()
        room_show = [[8] * 10] * 30


    try:
        eel.start("authentication.html", size=(1024, 1440))
    except (SystemExit, MemoryError, KeyboardInterrupt):
        pass

    # check_patient_registered(input())
    # print(show_all_doctor())
    # show_doctor_time('2024-11-07','am',3)
    # add_patient(314,'Huynh Ngoc Khoa', '2004-01-03','Male', -1)
    # add_appointment('2024-11-04', '16:00:00', 314, 2)
    # print ('Closed browser log...!')
    # run app application
    # show_booked_time('2024-11-06','pm','Than kinh')
    # print(find_doctor_id('2024-11-15', '11:10', 'Than kinh'))


if __name__ == "__main__":
    main_window()
