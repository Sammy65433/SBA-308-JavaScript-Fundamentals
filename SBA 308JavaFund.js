// Objectives

// Employ basic JavaScript syntax accurately.

// Implement control flow structures such as conditionals and loops 
// effectively.

// Use arrays and objects to organize and manage data.

// Develop functions to create reusable code.

// Utilize loops and iteration to navigate through data collections.

// Implement error handling to manage potential code failures 
// gracefully.

// The order of code:

// Set up sample data
// Write small helper functions
// Write the main function
// Test and handle errors

// RAW DATA -

const CourseInfo = {
  id: 451,
  name: "Introduction to JavaScript"
};

//  AssignmentGroup - belongs to a course (matched by course_id)
const AssignmentGroup = {
  id: 12345,
  name: "Fundamentals of JavaScript",
  course_id: CourseInfo.id,          // must match CourseInfo.id
  group_weight: 25,    // worth 25% of the total grade 
  assignments: [
    { id: 1, name: "Declare a Variable",   due_at: "2023-01-25", points_possible: 50  }, 
    { id: 2, name: "Write a Function",     due_at: "2023-02-27", points_possible: 150 }, 
    { id: 3, name: "Code the World",       due_at: "3156-11-15", points_possible: 500 }  // Not due yet = skip
    // future - ignored
  ]
};

//  Learner submissions – what they turned in and when 
const LearnerSubmissions = [
  { learner_id: 125, assignment_id: 1, submission: { submitted_at: "2023-01-25", score: 47 } },
  { learner_id: 125, assignment_id: 2, submission: { submitted_at: "2023-02-12", score: 150 } },
  { learner_id: 125, assignment_id: 3, submission: { submitted_at: "2023-01-25", score: 400 } },
  { learner_id: 132, assignment_id: 1, submission: { submitted_at: "2023-01-24", score: 39 } },
  { learner_id: 132, assignment_id: 2, submission: { submitted_at: "2023-03-07", score: 140 } } // late
];



console.log("CourseInfo:-------", CourseInfo,   
    "\nAssignmentGroup:------ ", AssignmentGroup, 
    "LearnerSubmissions:-------", LearnerSubmissions);




// Helper Functions - break it down into little helpers 
// Helper 1 - check assignment due date has passed / Dont include future assignment
// compare due date to todays 

function isAssignmentDue() {
    const today = new Date();        //todays date 
    const due = new Date(dueDate);  //converting str into real date obj
    return due <= today             //true due date is today or in past 
}

// Helper 2 -
// Late Submissions lose 10% of points as penalty 
// comparing submitted_at date to due_at

function isSubmissionLate(submittedAt, dueAt) {
    // convert date str into date obj
  const submitted = new Date(submittedAt);
  const due = new Date(dueAt);
  return submitted > due;   // true if submitted AFTER due date
}


// Helper 3 Make sure data makes sense 
// Does the AssignmentGroup belong to this course?
function validateData(course, assignmentGroup) {
    if (assignmentGroup.course_id !== course.id) {
    throw new Error(
      `Invalid data: AssignmentGroup "${assignmentGroup.name}" does not belong to course "${course.name}".`
    );
  }

//  check for bad data
  for (const assignment of assignmentGroup.assignments) {

    // points_possible of 0 would cause division by zero - red flag 
    if (typeof assignment.points_possible !== "number" || assignment.points_possible <= 0) {
        // console.log(typeof assignment.points_possible);
        // console.log(assignment.points_possible);

      throw new Error(
        `Invalid data: Assignment "${assignment.name}" has an invalid points_possible value.`
        

      );
    }
  }
}
try { validateData(CourseInfo, AssignmentGroup); console.log("data ok"); }
catch (e) { console.error(e.message); }

// Learning report learner id 
// Check Data Always -------------

function getLearnerData(course, assignmentGroup, learnerSubmission) {
    try {
    validateData(course, assignmentGroup);
  } catch (error) {
    
    // If validation fails 
    console.error("Data validation error:", error.message);
    return []; 
    // don't process bad data
  }

}

// BUILD A LOOKUP MAP FOR ASSIGNMENTS
// create an object where the key = assignment id.
  // 
  







