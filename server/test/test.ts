import {EventRoles, UserRoles} from "../database.ts";

function insertSampleData() {
    // Insert sample users
    UserRoles.insert.run('admin', 'admin', 'admin@example.com', 'password123');
    UserRoles.insert.run('user1', 'user', 'user1@example.com', 'password123');
    UserRoles.insert.run('guest1', 'guest', 'guest1@example.com', 'password123');

    // Insert sample events
    EventRoles.insert.run('Event 1', 'Type A', '2023-10-01', true, 'Description for Event 1', 'Info for Event 1');
    EventRoles.insert.run('Event 2', 'Type B', '2023-10-02', true, 'Description for Event 2', 'Info for Event 2');
    EventRoles.insert.run('Event 3', 'Type C', '2023-10-03', false, 'Description for Event 3', 'Info for Event 3');
}

insertSampleData();
console.log('Sample data inserted successfully');