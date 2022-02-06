/*
Treehouse Techdegree:
FSJS Project 2 - Data Pagination and Filtering
*/



/*
For assistance:
   Check out the "Project Resources" section of the Instructions tab: https://teamtreehouse.com/projects/data-pagination-and-filtering#instructions
   Reach out in your Slack community: https://treehouse-fsjs-102.slack.com/app_redirect?channel=unit-2
*/



/*
Create the `showPage` function
This function will create and insert/append the elements needed to display a "page" of nine students
*/
function showPage(students, page){
   const studentList =  document.querySelector('ul.student-list');
   studentList.innerHTML = '';
   for(let i=page * 9; i < (page + 1) * 9 && i < students.length;i++){
      let student = students[i];
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
     studentList.insertAdjacentHTML('beforeend',li);
   }
}


/*
Create the `addPagination` function
This function will create and insert/append the elements needed for the pagination buttons
*/
function addPagination(list){
   // empty out the pagination link list
   const linkList = document.querySelector('ul.link-list');
   linkList.innerHTML = '';

   const numOfPages = Math.ceil(list.length / 9);
   if (numOfPages === 1){
      linkList.style.display = 'none';
   } else {
      linkList.style.display = '';
   }

   for(let i =1;i<=numOfPages;i++){
    let li =  `  
      <li>
      <button type="button">${i}</button>
      </li>
      `;
      linkList.insertAdjacentHTML('beforeend',li);
   }
   linkList.firstElementChild.firstElementChild.className = 'active';

   linkList.addEventListener('click', (e) => {
      if (e.target.tagName === 'BUTTON' && !e.target.classList.contains('active')){
         let selectPage = parseInt(e.target.textContent);
         if (selectPage){
            // set pagination to have the current page to active
            linkList.querySelector('button.active').classList.remove('active');
            e.target.classList.add('active');
            // show content of the current page
            showPage(list,selectPage - 1);
         }
      }

   });
}

function searchBar(list){
   const searchBarHTML = `
   <label for="search" class="student-search">
   <span>Search by name</span>
   <input id="search" placeholder="Search by name...">
   <button type="button"><img src="img/icn-search.svg" alt="Search icon"></button>
   </label>
   `;
   const header = document.querySelector('header');
   header.insertAdjacentHTML('beforeend',searchBarHTML);

   const searchInput = document.getElementById('search');
   searchInput.addEventListener('keyup', (e)=>{
      if (e.key === 'Enter'){
        e.preventDefault();
        const text = searchInput.value;
        const students = [];
        const regSearch = new RegExp(text,'ig');
        for(let student of list){
           if (student.name.first.match(regSearch) || student.name.last.match(regSearch)){
              students.push(student);
           }
        }
        if (students.length === 0){
         document.querySelector('ul.student-list').innerHTML = '<li class="student-item cf">No results</li>';
         document.querySelector('ul.link-list').innerHTML = '';
        } else {
         showPage(students,0);
         addPagination(students);
        }
      }
   })

   header.querySelector('button').addEventListener('click',()=>{
      const keyEvent = new KeyboardEvent("keyup", {key:"Enter"});
      searchInput.dispatchEvent(keyEvent);
   });
}

// Call functions
document.addEventListener('DOMContentLoaded',()=>{
   let dataX = data; //.slice(0,5);
   showPage(dataX,0);
   addPagination(dataX);
   searchBar(dataX);
});