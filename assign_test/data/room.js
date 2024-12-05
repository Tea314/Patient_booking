
// class Room {
//   id;
//   capacity;
//   type;
//   remaining;

//   constructor (roomDetails) {
//     this.id = roomDetails.id;
//     this.capacity = roomDetails.capacity;
//     this.type = roomDetails.type;
//     this.remaining = roomDetails.remaining;
//   }
// }

// export function saveToStorage() {
//   localStorage.setItem('rooms', JSON.stringify(rooms));
// }

// export let rooms = JSON.parse(localStorage.getItem('rooms')) || [];

// // Fetch dữ liệu từ file rooms.json và cập nhật vào biến rooms
// fetch('rooms.json')
//   .then(response => response.json())  // Chuyển dữ liệu JSON thành đối tượng JavaScript
//   .then(data => {
//     rooms = data.map(roomDetails => new Room(roomDetails));  // Tạo các đối tượng Room từ dữ liệu JSON

//     // Lưu vào localStorage để lần sau có thể lấy ra
//     localStorage.setItem('rooms', JSON.stringify(rooms));
//   })
//   .catch(error => console.error('Error fetching room data:', error));
// rooms = rooms.map((roomDetails) => {
//   return new Room(roomDetails);
// });

let data = `
[
  (1, 6, "NORMAL", 6),
  (2, 4, "DELUXE", 2),
  (3, 6, "NORMAL", 1),
  (4, 1, "VIP", 1),
  (5, 4, "DELUXE", 0),
  (6, 1, "VIP", 1),
  (7, 4, "DELUXE", 2),
  (8, 4, "DELUXE", 1)
]
`;

// Chuyển đổi chuỗi thành định dạng JSON
let jsonData = data
  .replace(/\(/g, '[') // Thay thế ( bằng [
  .replace(/\)/g, ']') // Thay thế ) bằng ]
  .replace(/,\s*\]/g, ']') // Xóa dấu phẩy trước dấu ]
  .replace(/"\s*\]/g, '"'); // Xóa dấu cách trước dấu ]

export let rooms = JSON.parse(jsonData);