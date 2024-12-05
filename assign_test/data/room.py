import json

# Giả sử rooms là danh sách các phòng
rooms = [{
  "id": 1,
  "capacity": 6,
  "type": "Normal",
  "remaining": 5
}, {
  "id": 2,
  "capacity": 6,
  "type": "Normal",
  "remaining": 4
}, {
  "id": 3,
  "capacity": 4,
  "type": "Deluxe",
  "remaining": 4
}, {
  "id": 4,
  "capacity": 1,
  "type": "VIP",
  "remaining": 1
}, {
  "id": 5,
  "capacity": 1,
  "type": "VIP",
  "remaining": 1
}, {
  "id": 6,
  "capacity": 4,
  "type": "Deluxe",
  "remaining": 0
}, {
  "id": 7,
  "capacity": 4,
  "type": "Deluxe",
  "remaining": 1
}, {
  "id": 8,
  "capacity": 4,
  "type": "Deluxe",
  "remaining": 1
}]

# Ghi dữ liệu rooms ra file JSON
with open('rooms.json', 'w') as json_file:
    json.dump(rooms, json_file)