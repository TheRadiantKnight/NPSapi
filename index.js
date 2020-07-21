const apiKey = '8YF8dGoOyfYtLfc7tYkJXzDxWBIhaA8UK0Q72zeu';

const searchURL = 'https://developer.nps.gov/api/v1/parks';


// query formatting function 
function formatQueryParams(params) {
    const queryItems = Object.keys(params)
      .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
    return queryItems.join('&');
  }

// 

function displayParks(responseJson) {
    console.log(responseJson);
    $('#results-list').empty();
    let parks = '';
    for (let i = 0; i < responseJson.data.length; i++) {
        parks += `<li><h3>${responseJson.data[i].fullName}</h3>
        <p>${responseJson.data[i].states}</p>
        <p>${responseJson.data[i].description}</p>
        <a target="_blank" href="${responseJson.data[i].url}">${responseJson.data[i].images[0].url}</a>
        </li>`;
    }
    $('#results-list').append(parks);

}

function searchParks(query, maxResults=10) {
    const params = {
        api_key: apiKey, 
        stateCode: query,
        limit: maxResults,
    };

    const queryString = formatQueryParams(params)
    const url = searchURL + '?' + queryString; 

    console.log(url);

    fetch(url) 
    .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error(response.statusText);
    }).then(responseJson => displayParks(responseJson));
};


function watchForm() {
    $('form').submit(event => {
        event.preventDefault();
        const parkName = $('#parkname').val();
        const maxResults = $('#select').val(); 

        if(maxResults <= 10) {
           return searchParks(parkName, maxResults);
        } else {
           return searchParks(parkName, 10);
        }          
      
    });
}

$(watchForm);