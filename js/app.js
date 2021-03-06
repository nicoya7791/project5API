
const userUrl = 'https://randomuser.me/api/?results=12&nat=US';
const userDiv = document.querySelector('#gallery');
const searchDiv = document.querySelector('.search-container');

// change background color of the page.
document.querySelector('body').style.background = '#CFEFA8';

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
 * get random users profiles in an array. returns a promise with 12 objects from US nationality.
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
        userDiv.innerHTML = '<h2>something went really wrong!</h2>';
        console.log(e)
    });


/**==============================================
 *  Generate the html to display the users information, function is called on the request response.
 *=============================================*/

function displayHTML(users) {
    //interate through every user in the array to create a card with user information
    users.results.map(user => {
        const userCard = document.createElement('div');
        userDiv.appendChild(userCard);
        userCard.innerHTML = `
            <div style = 'background: #fdf6e3' class="card">
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
        //event listerner to each card and creates modal window. calls function to update user information

        userCard.addEventListener('click', (e) => {
            let cardIndex = users.results.indexOf(user);
            createModalWindow();
            modalWindowContent(user);
            prevNextButton(users, cardIndex);
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
 * Create modal window html. function is call in the displayHTML function
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

/** close modal window.
 *  Function to remove the modal window on click of close button, function is called in createModalWindow function
 */
function closeModalWindow() {
    const closeBtn = document.querySelector('#modal-close-btn');
    const modalWindow = document.querySelector('.modal-container');
    closeBtn.addEventListener('click', () => {
        modalWindow.remove();
    })
};

/**
 * 
 * @param {object} users manage the next and previous buttons functionality
 *  on click updates the information of the user base on the object index, function is call in the displayHTML()
 *  when last user has been riched reassigns the index value to 0 or 11 to start from first or last object again.
 */
function prevNextButton(users, index) {
    let currentCardIndex = index;
    let next = document.querySelector('#modal-next');
    let previous = document.querySelector('#modal-prev');
    // Next button functionality
    next.addEventListener('click', () => {
        if (currentCardIndex >= 0 && currentCardIndex < 11) {
            currentCardIndex++;
            let user = users.results[currentCardIndex];
            modalWindowContent(user);
        } else {
            currentCardIndex = 0;
            let user = users.results[currentCardIndex];
            modalWindowContent(user);
        }

    });
    // previous button functionality
    previous.addEventListener('click', () => {
        if (currentCardIndex > 0 && currentCardIndex <= 11) {
            currentCardIndex--;
            let user = users.results[currentCardIndex];
            modalWindowContent(user);
        } else {
            currentCardIndex = 11;
            let user = users.results[currentCardIndex];
            modalWindowContent(user);
        }

    });

};


/**
 * =====================================
 * @param {object} updates user information in the modal window
 * a peson/user object will be passed as a para from the map() fucntion in displayHTML() function; 
 *  *====================================*/
function modalWindowContent(users) {
    let modalInfo = document.querySelector('.modal-info-container')
    let user = users;
    let address = `${user.location.street.number} ${user.location.street.name}, ${user.location.city}, ${user.location.state} ${user.location.postcode} `;
    let birthDay = new Date(user.dob.date);
    let month = birthDay.getMonth() + 1;
    let day = birthDay.getDay();
    let year = birthDay.getFullYear();
    let dob = month + '/' + day + '/' + year;
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
 *  create filter function to be used in search box
 */
const input = document.querySelector('#search-input');
const submit = document.querySelector('#search-submit');

// event listener on click search for input value
submit.addEventListener('click', () => {
    searchUsers();
});

// event listener on keyup, search for input value

input.addEventListener('keyup', () => {
    searchUsers();
});


/**
 *  search bar functionality.
 */
function searchUsers() {
    const usersNames = document.querySelectorAll('#name');
    const inputValue = input.value.toLowerCase();

    for (let name of usersNames) {
        if (name !== 0 && name.innerHTML.toLowerCase().includes(inputValue)) {

            name.parentNode.parentNode.style.display = 'flex';

        } else {
            name.parentNode.parentNode.style.display = 'none';
        };

    };

}