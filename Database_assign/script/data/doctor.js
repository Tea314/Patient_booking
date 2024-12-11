let doctorsPy = await eel.show_all_doctor()();
console.log(doctorsPy)
// let jsonData = doctorsPy
//   .replace(/\(/g, '[')        // Thay thế ( bằng [
//   .replace(/\)/g, ']')        // Thay thế ) bằng ]
//   .replace(/,\s*]/g, ']')     // Xóa dấu phẩy trước dấu ]
//   .replace(/"/g, '\\"')       // Escape dấu nháy kép trong chuỗi con
//   .replace(/'/g, '"')         // Thay thế ' bằng "
//   .replace(/\\"/g, '"');      // Khôi phục các dấu nháy kép bên trong chuỗi con về định dạng JSON

export let doctors = JSON.parse(doctorsPy);
let value = 'images\\cat.jpg';
let images = Array(Object.keys(doctors).length).fill(value)
doctors.forEach((doctor, index) => {
  doctor[3] = images[index];
})
value = 'images\\duc_doctor.png';
images = Array(Object.keys(doctors).length).fill(value)
doctors[3][3] = value;