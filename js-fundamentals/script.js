// JavaScript Fundamentals Practice Assignment

// 1. Variables and Data Types
let courseName = "JavaScript Fundamentals";
const maxStudents = 15;
let isBeginnerCourse = true;
let tuitionFee = 199.99;
let courseDescription = null;

// 2. Strings
console.log("Course name length:", courseName.length);
console.log("Uppercase course name:", courseName.toUpperCase());

// 3. Template Literals
let courseInfo = `The course "${courseName}" can accommodate ${maxStudents} students.`;
console.log(courseInfo);

// 4. Arrays
let topics = [
  "Variables",
  "Strings",
  "Arrays",
  "Objects",
  "Loops",
  "Functions",
];
topics.push("Conditionals");
console.log("Course topics:", topics);

// 5. Objects
let instructor = {
  name: "John Doe",
  age: 35,
  languages: ["JavaScript", "Python", "C++"],
};

// 6. Destructuring
let { name, age } = instructor;
console.log(`Instructor ${name} is ${age} years old.`);

// 7. Loops
console.log("Course topics:");
for (let i = 0; i < topics.length; i++) {
  console.log(`- ${topics[i]}`);
}

// 8. Conditionals
let earlyBirdDiscount =
  tuitionFee > 200 ? "10% discount available" : "No discount available";
console.log(earlyBirdDiscount);

// 9. Functions
function calculateTotalCost(baseFee, materialsCost) {
  return baseFee + materialsCost;
}

// 10. Arrow Functions
const applyDiscount = (total, discountPercent) => {
  return total - (total * discountPercent) / 100;
};

// 11. Using functions
let totalCost = calculateTotalCost(tuitionFee, 50);
let discountedCost = applyDiscount(totalCost, 10);

console.log(`Total cost: $${totalCost}`);
console.log(`Cost after 10% discount: $${discountedCost}`);

// 12. Array Methods
let advancedTopics = ["Promises", "Async/Await", "Modules"];
let allTopics = topics.concat(advancedTopics);

console.log("All topics including advanced:");
allTopics.forEach((topic) => console.log(`- ${topic}`));

// 13. Conditional Statements
if (isBeginnerCourse && maxStudents > 25) {
  console.log("This is a large beginner course");
} else if (isBeginnerCourse) {
  console.log("This is a standard beginner course");
} else {
  console.log("This is an advanced course");
}

// ASSIGNMENT:
// 1. Add a new property to the instructor object

instructor.country = "Spain";
// 2. Create a function that filters topics array to only show topics with more than 5 characters

function filterTopics(arr, size) {
  return arr.filter((elem) => elem.length > size);
}

console.log(filterTopics(topics, 5));
// 3. Use a while loop to simulate a simple quiz game

let score = 0;

while (score < 1) {
  answer = prompt("Where is John from?");
  if (answer.toLowerCase() === "spain") {
    score++;
    console.log(`Correct, you scored ${score} point! Quiz complete.`);
  } else {
    console.log(`Incorrect, you scored ${score} points! Please try again.`);
  }
}

// 4. Implement a switch statement to provide different messages based on the number of topics

switch (topics.length) {
  case 0:
    console.log("The course does not include any topics.");
    break;
  case 1:
    console.log("The course includes one topic.");
    break;
  case 2:
    console.log("The course includes two topics.");
    break;
  default:
    console.log("The course includes more than two topics.");
    break;
}

// 5. Use the ternary operator to assign a difficulty level to the course

let courseDifficulty = advancedTopics.some((topic) => topics.includes(topic))
  ? "Course difficulty: Expert"
  : "Course difficulty: Moderate";
console.log(courseDifficulty);
