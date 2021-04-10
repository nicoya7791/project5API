
const userUrl = 'https://randomuser.me/api/?results=12&nat=US';
const userDiv = document.querySelector('#gallery');
const searchDiv = document.querySelector('.search-container')


/**
  fetch request function. takes an URL return a promise in json format
 */
async function getJSON(url) {
    try {
        const response = await fetch(url);
        return await response.json();
    } catch (error) {
        throw error;
    }
}

/**
 * get random users profiles in an array. results holds those 12 objects from USA, returns a promise
 */

async function getRandomUsers(url) {
    const usersJson = await getJSON(url);
    return usersJson;

}

let usersArray = getRandomUsers(userUrl);

/**====================================
 *  Displaying 12 users in the index.html
 *========================================*/
usersArray
    .then(displayHTML)
    .catch(e => {
        userDiv.innerHTML = '<h2>something went wrong</h2>';
        console.log(e)
    });


/**==============================================
 *  Generate the html to display the users information
 *=============================================*/

function displayHTML(users) {
    //interate through every user in the array
    users.results.map(user => {
        const userCard = document.createElement('div');
        userDiv.appendChild(userCard);
        userCard.innerHTML = `
            <div class="card">
                    <div class="card-img-container">
                        <img class="card-img" src= ${user.picture.large} alt="profile picture">
                    </div>
                    <div class="card-info-container">
                        <h3 id="name" class="card-name cap">${user.name.first} ${user.name.last}</h3>
                        <p class="card-text">${user.email}</p>
                        <p class="card-text cap">${user.location.city}, ${user.location.state}</p>
                    </div>
            </div>

        `
        //event listerner to each card and creates modal window
        userCard.addEventListener('click', (e) => {
            createModalWindow();
            usersArray.then(modalWindowContent);
        });

    });

}

/**===========================================================
 * add search bar and append it to div with 'search-container' class.
 *===========================================================*/
const searchBar = `   
    <form action="#" method="get">
    <input type="search" id="search-input" class="search-input" placeholder="Search...">
    <input type="submit" value="&#x1F50D;" id="search-submit" class="search-submit">
    </form>
`;
searchDiv.insertAdjacentHTML('beforeend', searchBar);

/**======================================
 * Create modal window html.
 *=========================================*/
function createModalWindow() {
    let modalHTML = `
    <div class="modal-container">
    <div class="modal">
        <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
        <div class="modal-info-container">
        </div>
    </div>

    <div class="modal-btn-container">
        <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
        <button type="button" id="modal-next" class="modal-next btn">Next</button>
    </div>
</div>
`
    userDiv.insertAdjacentHTML('beforeend', modalHTML);
    closeModalWindow();

};

/**
 *  Function to remove the modal window on click of close button, function is called in createModalWindow.
 */
function closeModalWindow() {
    const closeBtn = document.querySelector('#modal-close-btn');
    const modalWindow = document.querySelector('.modal-container');
    closeBtn.addEventListener('click', () => {
        modalWindow.remove();
    })
};


/**
 * =====================================
 * @param {object} updates user information in the modal window
 * for now only display index 0, i need to loop throught the array of opbject and update when clink next or prev
 *====================================*/
function modalWindowContent(users) {
    let userIndex = 0;
    let modalInfo = document.querySelector('.modal-info-container')
    console.log(modalInfo);
    let user = users.results[userIndex];
    let address = `${user.location.street.number} ${user.location.street.name}, ${user.location.city}, ${user.location.state} ${user.location.postcode} `;
    let birthDay = new Date(user.dob.date);
    let month = birthDay.getMonth() + 1;
    let day = birthDay.getDay();
    let year = birthDay.getFullYear();
    let dob = month + '/' + day + '/' + year;
    console.log(user);
    const content = `
    <img class="modal-img" src = ${user.picture.large} alt = "profile picture" >
    <h3 id="name" class="modal-name cap">${user.name.first} ${user.name.last}</h3>
    <p class="modal-text">${user.email}</p>
    <p class="modal-text cap">${user.location.city}</p>
    <hr>
    <p class="modal-text">${user.cell}</p>
    <p class="modal-text">${address}</p>
    <p class="modal-text">Birthday: ${dob}</p>

    `

    // Insert the user information in the modal card.
    modalInfo.innerHTML = content;
}




/**
 *  1. create function to handle the next button and previous button
 *      a. when click next or previous update the modal window information.
 *      b. need to increment the index by one or redue index by one
 *      c. how to pass the index to create modal window content?
 *      d. handle the when the index is 0 or last index data.lenth
 *      f. create event listener to close window when clicked outside the window(check if this is a requirement)
 *
 *  2. create filter funtion then create event listener on key up to search the names of employees.
 *
 *
 */