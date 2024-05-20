const tree = require("./tree.json");

// Question 1
function find_by_id(tree, id) {
    if (tree.id === id) {
        return tree;
    }
    if (tree.children) {
        for (let child of tree.children) {
            let result = find_by_id(child, id);
            if (result) {
                return result;
            }
        }
    }
    return null;
}

 
// Test for Question 1
let node = find_by_id(tree, 4);
console.log(node.data); // => { title: 'Fan' }

// ========================================================

// Question 2
function isAvailable(node, datetime) {
    const dayOfWeek = datetime.getDay(); // Sunday - Saturday : 0 - 6
    const hours = datetime.getHours();
    const minutes = datetime.getMinutes();
    const timeInMinutes = hours * 60 + minutes;
    
    const [startHours, startMinutes] = node.start_time.split(':').map(Number);
    const startTimeInMinutes = startHours * 60 + startMinutes;

    const [endHours, endMinutes] = node.end_time.split(':').map(Number);
    const endTimeInMinutes = endHours * 60 + endMinutes;

    return node.days_of_week.includes(dayOfWeek) && 
           timeInMinutes >= startTimeInMinutes && 
           timeInMinutes <= endTimeInMinutes;
}
 
const case_A = {
    start_time: '09:00',
    end_time: '17:00',
    days_of_week: [1, 2, 3, 4, 5] // Monday - Friday
};

const testDatetime = new Date('2024-05-20T15:30:00'); // Monday
console.log(isAvailable(case_A, testDatetime)); // => true

const testDatetime2 = new Date('2024-05-18T15:30:00'); // Saturday
console.log(isAvailable(case_A, testDatetime2)); // => false

const case_B = {  
    start_time: "22:00", 
    end_time: "02:00", 
    days_of_week: [0,1,2,6] 
}

const datetime = new Date("2020-01-01T01:30:00Z")
console.log(isAvailable(case_B, datetime)); // => false 

