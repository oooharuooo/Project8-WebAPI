// global variables
let employees = [];
let modalIndex = 0;
const urlAPI = `https://randomuser.me/api/?results=12&inc=name, picture,
email, location, phone, dob &noinfo &nat=US`
const gridContainer = document.querySelector(".grid-container");
const overlay = document.querySelector(".overlay");
const modalContainer = document.querySelector(".modal-content");
const modalClose = document.querySelector(".modal-close");
const searchBar = document.querySelector('#search')

fetch(urlAPI)
.then(res => res.json())
.then(res => res.results)
.then(displayEmployees)
.catch(err => console.log(err))

function displayEmployees(employeeData) {
    employees = employeeData;
    // store the employee HTML 
    let employeeHTML = '';
    // loop through each employee and create HTML markup
    employees.forEach((employee, index) => {
    let name = employee.name;
    let email = employee.email;
    let city = employee.location.city;
    let picture = employee.picture;

    employeeHTML += `
        <div class="card" data-index="${index}">
            <img class="avatar" src="${picture.large}" />
            <div class="text-container">
                <h2 class="name">${name.first} ${name.last}</h2>
                <p class="email">${email}</p>
                <p class="address">${city}</p>
            </div>
        </div>
    `
    });
    gridContainer.innerHTML = employeeHTML;
}

// Modal 
function displayModal(index) {
    let { name, dob, phone, email, location: { city, street, state, postcode
        }, picture } = employees[index];
    let date = new Date(dob.date);
    const modalHTML = `
        <img class="avatar" src="${picture.large}" />
        <div class="text-container">
            <h2 class="name">${name.first} ${name.last}</h2>
            <p class="email">${email}</p>
            <p class="address">${city}</p>
            <hr />
            <p>${phone}</p>
            <p class="address">${street.number} ${street.name}, ${state} ${postcode}</p>
            <p>Birthday:
            ${date.getMonth()}/${date.getDate()}/${date.getFullYear()}</p>
        </div>
    `;
    overlay.classList.remove("hidden");
    modalContainer.innerHTML = modalHTML;
    modalIndex = employees.indexOf(employees[index]);
}

//  Next and Previous Buttons
function nextPrev() {
    const rightArrow = document.querySelector('.next-button');
    const leftArrow = document.querySelector('.prev-button');
    rightArrow.addEventListener('click',() =>{
        displayModal(modalIndex + 1);
        });
    leftArrow.addEventListener('click',() =>{
        displayModal(modalIndex - 1);
        });
}
// Event Listener
gridContainer.addEventListener('click', e => {
        if (e.target !== gridContainer) {
    // select the card element based on its proximity to actual element clicked
        const card = e.target.closest(".card");
        const index = card.getAttribute('data-index');
        displayModal(index);
        nextPrev();
    }
});
// ModalClose button
modalClose.addEventListener('click', () => {
    overlay.classList.add("hidden");
});
   

// SearchBar
searchBar.addEventListener('keyup', () => {
    const namesList = Array.from(document.querySelectorAll('.name'));
    const input = searchBar.value.toLowerCase();
    namesList.forEach(name => { 
        const letterName = name.textContent.toLowerCase();
        if(letterName.indexOf(input) > -1) {
            name.closest('.card').style.display = '';
            
        }else {
            name.closest('.card').style.display = 'none';
        }
    })
})


