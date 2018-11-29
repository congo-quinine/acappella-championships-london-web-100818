////////Document Selectors////////
const collegeTableEl = document.querySelector('#table-body')
const winnerEl = document.querySelector('#winner')

const collegeName = document.querySelector('#college-name')
const collegeGroup = document.querySelector('#college-group-name')
const membership = document.querySelector('#membership')
const division = document.querySelector('#division')

let sortName = false;
let sortGroup = false;
let sortMem = false;
let sortDiv = false;


let winner = [];

const renderCollegeData = (college) => {
  let collegeData = document.createElement('tr')
      collegeData.setAttribute('id', `${college.id}`)
      collegeData.innerHTML = `
      <td>${college.college.name}</td>
      <td>${college.name}</td>
      <td>${college.membership}</td> <td>${college.college.division}</td>
      <td><img src="./assets/trophy.png" data-id="*put an id here*"/></td>
      <td><button style='' id='delete' type='button'>Eliminate Group</button></td>
      `

      collegeTableEl.appendChild(collegeData)

      collegeData.addEventListener('click', (event) =>{

        if (event.target.innerHTML === 'Eliminate Group'){
            return removeTeam(collegeData)
        }

        winner.push(college)
        collegeData.innerHTML = ''
        if (winner.length > 1){
          renderCollegeData(winner[0])
          winner.splice(0,1)
        }
        makeCollegeWinner(college)
      })
}

const renderAllCollegeData = (colleges) => {
  colleges.forEach(college => renderCollegeData(college))
}

const makeCollegeWinner = (college) => {
  winnerEl.innerHTML = `${college.name}`
}

const removeTeam = (collegeData) => {
  collegeData.innerHTML = ''
}

const sortByCollegeNameAsc = (college) => {
collegeTableEl.innerHTML = ''
  renderAllCollegeData(college.sort(function(a,b){
    if (a.college.name < b.college.name){
      return -1;
    }
    if (a.college.name > b.college.name){
      return 1;
    }
    return 0;
  }))
}

const sortByCollegeNameDesc = (college) => {
collegeTableEl.innerHTML = ''
  renderAllCollegeData(college.sort(function(a,b){
    if (a.college.name < b.college.name){
      return 1;
    }
    if (a.college.name > b.college.name){
      return -1;
    }
    return 0;
  }))
}

const sortByCollegeGroupAsc = (college) => {
collegeTableEl.innerHTML = ''
  renderAllCollegeData(college.sort(function(a,b){
    if (a.name < b.name){
      return -1;
    }
    if (a.name > b.name){
      return 1;
    }
    return 0;
  }))
}

const sortByCollegeGroupDesc = (college) => {
collegeTableEl.innerHTML = ''
  renderAllCollegeData(college.sort(function(a,b){
    if (a.name < b.name){
      return 1;
    }
    if (a.name > b.name){
      return -1;
    }
    return 0;
  }))
}

const sortByCollegeMembership = (college) => {
collegeTableEl.innerHTML = ''
  renderAllCollegeData(college.sort(function(a,b){
    if (a.membership < b.membership){
      return -1;
    }
    if (a.membership > b.membership){
      return 1;
    }
    return 0;
  }))
}

const sortByCollegeDivision = (college) => {
collegeTableEl.innerHTML = ''
  renderAllCollegeData(college.sort(function(a,b){
    if (a.college.division < b.college.division){
      return -1;
    }
    if (a.college.division > b.college.division){
      return 1;
    }
    return 0;
  }))
}

collegeName.addEventListener('click', (event) => {
  if(sortName === false){
  sortName = true
  fetchGroupData()
  .then(sortByCollegeNameAsc)
}else {
  sortName = false
  fetchGroupData()
  .then(sortByCollegeNameDesc)
}

})
collegeGroup.addEventListener('click', (event) => {
  if (sortGroup === false){
    sortGroup = true;
    fetchGroupData()
    .then(sortByCollegeGroupAsc)
  }else {
    sortGroup = false;
    fetchGroupData()
    .then(sortByCollegeGroupDesc)
}
})

membership.addEventListener('click', (event) => {
  fetchGroupData()
  .then(sortByCollegeMembership)
})


division.addEventListener('click', (event) => {
  fetchGroupData()
  .then(sortByCollegeDivision)
})


//////API Calls////////
const fetchGroupData = () =>
  fetch('http://localhost:3000/a_cappella_groups')
    .then(res => res.json())

//////API Calls End////////



//////Function Calls////////
fetchGroupData()
.then(renderAllCollegeData)




// ### Deliverables
//
// - Your list of a cappella groups must be fetched from `http://localhost:3000/a_cappella_groups`
// - Get the list of groups to display on the page and fill the table with relevant information.
// - Your table HTML might look something like this: `<tr><td>*Insert College*</td> <td>*Insert Group Name*</td> <td>*Insert Membership*</td> <td>*Insert Division*</td> <td><img src='./assets/trophy.png' data-id='*put an id here*'/></td> </tr>`
// - On click of a button, remove the associated group from the table and add it to the Winner h2.
// - If you are struggling with identifying which group has been clicked, [try reading this](https://developer.mozilla.org/en-US/docs/Learn/HTML/Howto/Use_data_attributes).
// - BONUS: If a new group is selected as winner, the new group should be removed from the table and replace the old group in the Winner h2. The old group should also return to the table. At any given time, all groups should be visible on the app, but each should appear only once.
// - DOUBLE BONUS: Can you add a delete button which removes a group from the competition table?
// - TRIPLE BONUS: Can you make clicking on a table headers sort by that column attribute?
