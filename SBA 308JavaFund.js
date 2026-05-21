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


// const result = getLearnerData(CourseInfo, AssignmentGroup, LearnerSubmissions);


// Helper Functions - break it down into little helpers 
//  
// Helper 1 - Has the assignment's due date already passed?
// Is this homework already due yet?”
// If yes, include it
// If no, skip it for now
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
// the assignment group belongs to the right course
// each assignment has valid points
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

// Look through all assignments until you find the one with the same id
function pointsPossible( agArray, assignment_id) {
  for (let j = 0; j < agArray.length; j++) {
    if (agArray[j].id === assignment_id) {
      return agArray[j].points_possible
    }
  }
}



function getLearnerData(course, ag, submissions) {


  // // try/catch - validate data first - tested at the bootom of the code 
  // Before I do math, let me check if theses papers make sense.
// If not, stop and return an empty list
  try {
    validateData(course, ag);
  } catch (error) {
    console.error("Data validation error:", error.message);
    return [];
  }

  const result = []

  const ids = []

  // unique learner ids
  for (let sub of submissions) {

    if (ids.includes(sub.learner_id) !== true) {
      ids.push(sub.learner_id);
    }
   

  }
  console.log("Unique learner ids found:", ids);


//  console.log(ids);
  // 2. Create Learner Obj
  // loop over each learner id and build their report
//   For each student ID
// Start a report card 
  for (let learnerId of ids) {
    let learnersReport = {
      id: learnerId
    }
    // console.log(learnersReport)
    result.push(learnersReport);

    // Need a variable to store totals!
    let totalscore = 0;
    let totalPossible = 0;
        // if (!isAssignmentDue(matchingAssignment.due_at)) continue;

        // find all submissions belonging to this learner - Quinn Loop
//         Go through every submission
// Only use the ones that belong to the current student 
    for (let i = 0; i < submissions.length; i++) {
      
      //  process submissions for this learner
      if (submissions[i].learner_id === learnerId) {

        //  data from submission for easy access
        let assignmentId   = submissions[i].assignment_id;
        let submittedAt    = submissions[i].submission.submitted_at;
        let subScore       = submissions[i].submission.score;

        // pointsPossible helper function - Quinn built this 
        let possible = pointsPossible(ag.assignments, assignmentId);

                    // 
        console.log("Submission Score: " +submissions[i].submission.score)

        // 
        // totalscore += submissions[i].submission.score;
        // totalPossible += possible;
        // if (isSubmissionLate(submissions[i].submission.submitted_at, matchingAssignment.due_at)) {
          // Apply penalty or handle late submission
        

        // find the matching assignment to get due_at and points_possible  
        let matchingAssignment = null;
        for (let j = 0; j < ag.assignments.length; j++) {
          if (ag.assignments[j].id === assignmentId) {
            matchingAssignment = ag.assignments[j];
            // console.log("They Match!")
            console.log("points Possible: " + ag.assignments[j].points_possible)
            break; // Quinn used break here - Got the keys stop looking 

          // } else if (AssignmentGroup.assignments[1].id != submissions[i].assignment_id) {
            // console.log("They Match!")
            // console.log("points Possible: " + AssignmentGroup.assignments[1].points_possible)
          }
        }
        // if no matching assignment found, skip it (continue = Quinn mentioned this)
        if (matchingAssignment === null) {
          continue;
        }

      // checking if homework assignment was turned in after its due date. 
      // If it was, calculate a "late penalty" (which is 10% of the possible 
      // score) and then subtracts that penalty from the score you earned. 
      // So, if you could have gotten 100 points, but you were late, you'd lose 
      // 10 points. 10% of 100 is 10 so 150 should be 15
       // apply late penalty if submitted after due date
        if (isSubmissionLate(submittedAt, matchingAssignment.due_at)) {
          let penalty = possible * 0.10;
          console.log("Late penalty:", penalty);
          subScore = subScore - penalty;
        }
         // add to running totals (what I think Quinn was building toward)


        //  totalScore    += subScore;   //this didnt work for some reason, 
        // so I just added the original submission score without penalty.

        totalscore += submissions[i].submission.score;
        totalPossible += possible;
        

        // store individual assignment percentage like "1: 0.94"
        // Quinn drew this on the board — 47 / 50 = 0.94, 150 / 150 = 1.0. 
        // That's just the percentage formula. subScore / possible

        learnersReport[assignmentId] = parseFloat(subScore / possible).toFixed(3);
// .toFixed() returns a string, not a number. So "0.9" instead of 0.9. 
// To keep it a number wrap it in parseFloat():

// parseFloat() - MdN parsefloat 
// A floating point number parsed from the given string, or 
// NaN when the first non-whitespace character cannot be converted to a number.        // parseFloat(3.14);
// parseFloat("3.14");
// parseFloat("  3.14  ");
// parseFloat("314e-2");
// parseFloat("0.0314E+2");
// parseFloat("3.14some non-digit characters");
// parseFloat({
//   toString() {
//     return "3.14";
//   },
// });


        
        console.log("Learner:", learnerId, "| Assignment:", assignmentId, "| Score %:", learnersReport[assignmentId]);
      }
          // console.log("Total Score:", +totalscore);

      }
      // return result;
    //   calculate weighted average (score / totalPossible)
    // // quin drew this on screen: 240/300 = 0.80
    // totalScore = 
      if (totalPossible > 0) {
      learnersReport.avg = parseFloat(totalscore / totalPossible).toFixed(2);
    }

    console.log("Learner:", learnerId, "| avg:", learnersReport.avg);
  }
      return result;


    }

    const result = getLearnerData(CourseInfo, AssignmentGroup, LearnerSubmissions);
console.log("FINAL RESULT:", result);

//      const result = getLearnerData(CourseInfo, AssignmentGroup, LearnerSubmissions);
// console.log("FINAL RESULT:", result);



    

    

  
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
  

  console.log("---------------| This is a Test!!!!!!! |-------------------------:");
try {
  validateData({ id: 999, name: "Wrong Course" }, AssignmentGroup);
} catch (e) {
  console.error("Test 1 caught:", e.message);
}
try {
  validateData(CourseInfo, {
    id: 12345,
    name: "Test Group",
    course_id: 451,
    group_weight: 25,
    assignments: [
      { id: 99, name: "Bad Assignment", due_at: "2023-01-25", points_possible: 0 }
    ]
  });
} catch (e) {
  console.error("Test 2 caught:", e.message);
}
try {
  validateData(CourseInfo, AssignmentGroup);
  console.log("Test 3 passed: data is valid");
} catch (e) {
  console.error("Test 3 failed:", e.message);
}



// CourseInfo = the class
// AssignmentGroup = the homework list
// AssignmentGroup.assignments = each homework assignment
// LearnerSubmissions = what each student turned in