
const userUrl = 'https://randomuser.me/api/?results=12';
const userDiv = document.querySelector('#gallery');

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
 * get random users profiles in an array. results holds those 12 objects, returns a promise
 */

async function getRandomUsers(url) {
    const usersJson = await getJSON(url);
    return usersJson;

}
/**
 *  Generate the html to display the users information
 */

function displayHTML(users) {
    //interate through every user in the array
    users.results.map(user => {

        const userCard = document.createElement('div');
        userDiv.appendChild(userCard);
        // if statment to check if we get data or not
        userCard.innerHTML = `
            <div class="card">
                    <div class="card-img-container">
                        <img class="card-img" src="${user.picture.large}" alt="profile picture">
                    </div>
                    <div class="card-info-container">
                        <h3 id="name" class="card-name cap">${user.name.first} ${user.name.last}</h3>
                        <p class="card-text">${user.email}</p>
                        <p class="card-text cap">${user.location.city}, ${user.location.state}</p>
                    </div>
            </div>

        `

    });
}

getRandomUsers(userUrl)
    .then(displayHTML)
    .catch(e => {
        userDiv.innerHTML = '<h2>something went wrong</h2>';
        console.log(e)
    });
