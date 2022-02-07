/*
Treehouse Techdegree:
FSJS Project 2 - Data Pagination and Filtering
*/

/*
For assistance:
   Check out the "Project Resources" section of the Instructions tab: https://teamtreehouse.com/projects/data-pagination-and-filtering#instructions
   Reach out in your Slack community: https://treehouse-fsjs-102.slack.com/app_redirect?channel=unit-2
*/

/**
 * This function will create and insert the elements needed to display a "page" of nine students
 * @param {array} students - a full list of students
 * @param {int} page - the page number of the nine students from fulll list of student to be displayed
 */
function showPage(students, page) {
  //Default set the displaying students-list content to empty
  const studentList = document.querySelector("ul.student-list");
  studentList.innerHTML = "";

  /*Iterate the students list from the selected page towards either the next nine students or the remainder of all the students.*/
  for (let i = page * 9; i < (page + 1) * 9 && i < students.length; i++) {
    let student = students[i];

    //Convert the student object into HTML and append it to the student-list DOM for display
    let li = `
      <li class="student-item cf">
      <div class="student-details">
        <img class="avatar" src="${student.picture.large}" alt="Profile Picture">
        <h3>${student.name.first} ${student.name.last}</h3>
        <span class="email">${student.email}</span>
      </div>
      <div class="joined-details">
        <span class="date">Joined ${student.registered.date}</span>
      </div>
    </li>     
      `;
    studentList.insertAdjacentHTML("beforeend", li);
  }
}

/**
 * This function will create and insert/append the elements needed for the pagination buttons
 * A page is consists of maximum of nine students
 * @param {array} list - list of students
 */
function addPagination(list) {
  // By default set the pagination link list to empty
  const linkList = document.querySelector("ul.link-list");
  linkList.innerHTML = "";

  // Get the corresponding total number of pages to be display from the given students-list
  const numOfPages = Math.ceil(list.length / 9);

  // Hide the pagination link list if only displaying one page of student(s)
  if (numOfPages === 1) {
    linkList.style.display = "none";
  } else {
    linkList.style.display = "";
  }

  //For each page up to the number of pages required to display all the student create a button to represent the page
  for (let i = 1; i <= numOfPages; i++) {
    let li = `  
      <li>
      <button type="button">${i}</button>
      </li>
      `;
    linkList.insertAdjacentHTML("beforeend", li);
  }
  //By default set the first page button to be active
  linkList.firstElementChild.firstElementChild.className = "active";

  //Listening for click event from the pagination link list buttons.
  linkList.addEventListener("click", (e) => {
    //Only non-active buttons can be clicked
    if (
      e.target.tagName === "BUTTON" &&
      !e.target.classList.contains("active")
    ) {
      let selectPage = parseInt(e.target.textContent);
      if (selectPage) {
        //Set the clicked button to be the only button that is active.
        linkList.querySelector("button.active").classList.remove("active");
        e.target.classList.add("active");
        //Lastly, show the corresponding page of students
        showPage(list, selectPage - 1);
      }
    }
  });
}
/**
 * This function allows the user to enter searching criteria and display the result
 * @param {array} list - list of students to be searched
 */
function searchBar(list) {
  //Add the search bar into the DOM
  const searchBarHTML = `
   <label for="search" class="student-search">
   <span>Search by name</span>
   <input id="search" placeholder="Search by name...">
   <button type="button"><img src="img/icn-search.svg" alt="Search icon"></button>
   </label>
   `;
  const header = document.querySelector("header");
  header.insertAdjacentHTML("beforeend", searchBarHTML);

  //Enable search queries, when the user pushes Enter key the search of student matching keyed in criteria will begin
  const searchInput = document.getElementById("search");
  searchInput.addEventListener("keyup", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const text = searchInput.value;
      const students = [];
      //Currently search everywhere of the first and last name of the student with case insensititivity
      const regSearch = new RegExp(text, "ig");
      for (let student of list) {
        if (
          student.name.first.match(regSearch) ||
          student.name.last.match(regSearch)
        ) {
          students.push(student);
        }
      }
      // If no student matches the result shows "No results"; Otherwise, show list of students and with the corresponding pagination.
      if (students.length === 0) {
        document.querySelector("ul.student-list").innerHTML =
          '<li class="student-item cf">No results</li>';
        document.querySelector("ul.link-list").innerHTML = "";
      } else {
        showPage(students, 0);
        addPagination(students);
      }
    }
  });
  // When the search button is clicked triggers call to searching of students
  header.querySelector("button").addEventListener("click", () => {
    const keyEvent = new KeyboardEvent("keyup", { key: "Enter" });
    searchInput.dispatchEvent(keyEvent);
  });
}

// Populate the page when is fully loaded and the DOM is ready,
document.addEventListener("DOMContentLoaded", () => {
  //Display students and pagination.
  showPage(data, 0);
  addPagination(data);
  //Enables search bar
  searchBar(data);
});
