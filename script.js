class App {
  constructor() {
    this.users = [];
    this.rooms = [];
    this.buildings = {};
    this.bookings = [];
  }
  // buildings + floors + rooms format -> {B1: [{F1: [{id: 1, room: C1}, {id: 2, room: C2}]}}
  addBuilding(building) {
    if (typeof building !== 'string') return `Invalid Building`;
    // check if building already exists
    if (this.buildings[building]) return `Building: ${building} already exists`;
    this.buildings[building] = {};
    return `Building: ${building} added`;
  }
  addFloors(building, floor) {
    if (typeof floor !== 'string' || typeof building !== 'string')
      return 'Invalid floor or building';
    // check if building exists
    if (!this.buildings[building])
      return `Building: ${building} does not exist`;
    // check if floor already exists
    const foundFloor = this.buildings[building][floor];
    if (foundFloor) return `Floor: ${floor} already exists`;
    // push the floor object
    this.buildings[building][floor] = [];
    return `Floor: ${floor} added to Building: ${building}`;
  }
  addRooms(building, floor, room) {
    if (
      typeof floor !== 'string' ||
      typeof building !== 'string' ||
      typeof room !== 'string'
    )
      return 'Invalid floor or building or room';
    // check if building exists
    if (!this.buildings[building])
      return `Building: ${building} does not exist`;
    // check if floor already exists
    const foundFloor = this.buildings[building][floor];
    if (!foundFloor) return `Floor: ${floor} does not exist`;
    // check if room already exist in a building, a building can have rooms with unique names
    const foundRoom = this.rooms.find(
      (r) => r.building === building && r.name === room
    );
    if (foundRoom)
      return `Room: ${room} already exist on Floor: ${floor} in Building: ${building}`;
    const newRoomId = this.rooms.length + 1;
    const newRoom = { id: newRoomId, name: room };
    foundFloor.push(newRoom);
    this.rooms.push({
      ...newRoom,
      building,
      floor,
      booked: false,
    });
    return `Room: {id:${
      this.rooms.length + 1
    }, room:${room}} added to Floor: ${floor} in Building: ${building}`;
  }
  bookARoom(username, timeSlot) {
    // check if slot is valid
    if (timeSlot.end - timeSlot.start < 0 || timeSlot.end - timeSlot.start > 12)
      return `Booking can only be done for maximum 12 hours`;
    // check if room is available
    const availableRoom = this.rooms.find((room) => room.booked === false);
    if (!availableRoom) return 'No Room Available!';
    // add users
    const userId = this.users.length + 1;
    const newUser = { userId, name: username };
    this.users.push(newUser);
    // add bookings
    this.bookings.push({
      roomId: availableRoom.id,
      userId,
      building: availableRoom.building,
      floor: availableRoom.floor,
      timeSlot,
    });
    // mark the room booked
    availableRoom.booked = true;
  }
  cancelBooking(userId) {
    // check if there is a booking
    const booking = this.bookings.find((booking) => booking.userId === userId);
    if (!booking) return `No booking for User: ${userId}`;
    // remove the booking for a user
    this.bookings = this.bookings.filter(
      (booking) => booking.userId === userId
    );
    // mark room booking to false
    this.rooms = this.rooms.map((room) =>
      room.id === booking.roomId ? { ...room, booked: false } : room
    );
  }
  listBookings() {
    console.log(this.bookings);
  }
  listUsers() {
    console.log(this.users);
  }
  listBuildings() {
    console.log(this.buildings);
  }
  listUsers() {
    console.log(this.users);
  }
  listFloorsInBuildings(building) {
    if (typeof building !== 'string') {
      console.log(`Invalid Building`);
      return;
    }
    if (!this.buildings[building]) {
      console.log(`Building: ${building} does not exist`);
      return;
    }
    console.log(this.buildings[building]);
  }
  listConferenceRooms() {
    console.log(this.rooms);
  }
}

const app = new App();

let output;

output = app.addBuilding('B1');
output = app.addBuilding('B2');
output = app.addBuilding('B3');

output = app.addFloors('B1', 'F1');
output = app.addFloors('B1', 'F2');
output = app.addFloors('B1', 'F3');

output = app.addFloors('B2', 'F1');
output = app.addFloors('B2', 'F2');
output = app.addFloors('B3', 'F1');

output = app.addRooms('B1', 'F1', 'C1');
output = app.addRooms('B1', 'F1', 'C2');
output = app.addRooms('B1', 'F1', 'C3');
output = app.addRooms('B1', 'F1', 'C2');

output = app.addRooms('B2', 'F1', 'C1');
output = app.addRooms('B2', 'F2', 'C2');
output = app.addRooms('B2', 'F2', 'C3');
output = app.addRooms('B2', 'F1', 'C2');

// book rooms
output = app.bookARoom('User1', { start: 2, end: 3 });
output = app.bookARoom('User2', { start: 2, end: 3 });
output = app.bookARoom('User3', { start: 2, end: 3 });
output = app.bookARoom('User4', { start: 12, end: 15 });
output = app.bookARoom('User5', { start: 2, end: 3 });
output = app.bookARoom('User6', { start: 11, end: 12 });
output = app.bookARoom('User7', { start: 5, end: 7 });
output = app.bookARoom('User8', { start: 15, end: 17 });

// console.log(output);
app.listBuildings();
app.listFloorsInBuildings('B1');
app.listConferenceRooms();
// app.listUsers();
app.listBookings();
