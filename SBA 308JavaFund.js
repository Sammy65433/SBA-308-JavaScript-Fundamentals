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

// The provided assignment group.
const AssignmentGroup = {
  id: 12345,
  name: "Fundamentals of JavaScript",
  course_id: 451,
  group_weight: 25,
  assignments: [{
      id: 1,
      name: "Declare a Variable",
      due_at: "2023-01-25",
      points_possible: 50
    },
    {
      id: 2,
      name: "Write a Function",
      due_at: "2023-02-27",
      points_possible: 150
    },
    {
      id: 3,
      name: "Code the World",
      due_at: "3156-11-15",
      points_possible: 500
    }
  ]
};

// The provided learner submission data.
const LearnerSubmissions = [{
    learner_id: 125,
    assignment_id: 1,
    submission: {
      submitted_at: "2023-01-25",
      score: 47
    }
  },
  {
    learner_id: 125,
    assignment_id: 2,
    submission: {
      submitted_at: "2023-02-12",
      score: 150
    }
  },
  {
    learner_id: 125,
    assignment_id: 3,
    submission: {
      submitted_at: "2023-01-25",
      score: 400
    }
  },
  {
    learner_id: 132,
    assignment_id: 1,
    submission: {
      submitted_at: "2023-01-24",
      score: 39
    }
  },
  {
    learner_id: 132,
    assignment_id: 2,
    submission: {
      submitted_at: "2023-03-07",
      score: 140
    }
  }
];




// console.log(result);


// console.log("CourseInfo:-------", CourseInfo,
//   "\nAssignmentGroup:------ ", AssignmentGroup,
//   "LearnerSubmissions:-------", LearnerSubmissions);


const result = getLearnerData(CourseInfo, AssignmentGroup, LearnerSubmissions);


// Helper Functions - break it down into little helpers 
//  
// Helper 1 - Has the assignment's due date already passed?
function isAssignmentDue(dueDate) { // <-- added dueDate parameter (was missing!)
  const today = new Date();
  const due = new Date(dueDate);
  return due <= today; // true = it's due, include it
}

// Helper 2 - Was the submission turned in late?
function isSubmissionLate(submittedAt, dueAt) {
  const submitted = new Date(submittedAt);
  const due = new Date(dueAt);
  return submitted > due; // true = late, apply penalty
}

// Helper 3 - Does the assignment group actually belong to this course?
function validateData(course, assignmentGroup) {
  if (assignmentGroup.course_id !== course.id) {
    throw new Error(
      `Invalid data: AssignmentGroup "${assignmentGroup.name}" does not belong to course "${course.name}".`
    );
  }

  for (const assignment of assignmentGroup.assignments) {
    if (typeof assignment.points_possible !== "number" || assignment.points_possible <= 0) {
      throw new Error(
        `Invalid data: Assignment "${assignment.name}" has invalid points_possible.`
      );
    }
  }
}

// BUILD A LOOKUP MAP FOR ASSIGNMENTS
// create an object where the key = assignment id.
// 
// const assignmentMap = {}; // empty object to fill

// for (const assignment of assignmentGroup.assignments) {
//   // Only actually due assignments 
//   if (isAssignmentDue(assignment.due_at)) {
//     assignmentMap[assignment.id] = assignment; // store by id
//   }
// }


function pointsPossible( agArray, assignment_id) {
  for (let j = 0; j < agArray.length; j++) {
    if (agArray[j].id == assignment_id) {
      return agArray[j].points_possible
    }
  }
}



function getLearnerData(course, ag, submissions) {

  const result = []

  const ids = []

  for (let sub of submissions) {

    if (ids.includes(sub.learner_id) !== true) {
      ids.push(sub.learner_id);
    }
   

  }
  console.log("Unique learner ids found:", ids);


 console.log(ids);
  // 2. Create Learner Obj
  for (let learnerId of ids) {
    let learnersReport = {
      id: learnerId
    }
    // console.log(learnersReport)
    result.push(learnersReport);

    // Need a variable to store totals!
    let totalscore = 0
    let totalPossible = 0
        // if (!isAssignmentDue(matchingAssignment.due_at)) continue;

        // find all submissions belonging to this learner
    for (let i = 0; i < submissions.length; i++) {
      
      //  process submissions for this learner
      if (submissions[i].learner_id === learnerId) {
        let assignmentId   = submissions[i].assignment_id;
        let submittedAt    = submissions[i].submission.submitted_at;
        let subScore       = submissions[i].submission.score;

        // pointsPossible helper function 
        let possible = pointsPossible(ag.assignments, assignmentId);


        console.log("Submission Score: " +submissions[i].submission.score)
        totalscore += submissions[i].submission.score;
        totalPossible += possible;
        // if (isSubmissionLate(submissions[i].submission.submitted_at, matchingAssignment.due_at)) {
          // Apply penalty or handle late submission
        }

        for (let j = 0; j < AssignmentGroup.assignments.length; j++) {
          if (AssignmentGroup.assignments[j].id == submissions[i].assignment_id) {
            // console.log("They Match!")
            console.log("points Possible: " + AssignmentGroup.assignments[j].points_possible)
            break;
          // } else if (AssignmentGroup.assignments[1].id != submissions[i].assignment_id) {
            // console.log("They Match!")
            // console.log("points Possible: " + AssignmentGroup.assignments[1].points_possible)
          }
        }
      }
console.log("Total Score:", +totalscore);
    }

    

  }
  // }



  // here, we would process this data to achieve the desired result.
  // const result = [
  //   {
  //     id: 125,
  //     avg: 0.985, // (47 + 150) / (50 + 150)
  //     1: 0.94, // 47 / 50
  //     2: 1.0 // 150 / 150
  //   },
  //   {
  //     id: 132,
  //     avg: 0.82, // (39 + 125) / (50 + 150)
  //     1: 0.78, // 39 / 50
  //     2: 0.833 // late: (140 - 15) / 150
  //   }
  // ];

  // return result;

  // }
  // const result = getLearnerData(CourseInfo, AssignmentGroup, LearnerSubmissions);

  // function sum(x,y) { return x * y }

  // console.log("Total sum:", sum(2,3))
  // console.log("Total sum:", sum(7,10))
  // console.log("Total sum:", sum(48,100))

