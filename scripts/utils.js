
/*
DOM SELECTORS
 */
const characterRow = document.querySelector('#charactersRow');


/*
HELPERS
 */
const createDivElement = function() {
    return document.createElement('div');
};
const createImageElement = function() {
    return document.createElement('img');
};


/*
RENDER FUNCTIONS
 */
const renderCharacters = function (characters) {
    characters.forEach(character => {
        characterRow.innerHTML += `
    <div class="col-md-3">
        <div class="card">
            <img 
                style="cursor: pointer;"
                src="${character.image}" 
                class="card-img-top" alt="character-image" 
                data-char-name="${character.name}">
            <div class="card-body">
                <p class="card-text">${character.name}</p>
                <p class="card-text">${character.titles}</p>
            </div>
        </div>
    </div>    
    `
    });
};

/*
UTILS
 */

const findCharacter = function(name, characterArray) {
  return characterArray.find( char => {
      return char.name === name;
  })
};


(function(){
    console.log('===== UTILS LOADED =====');
})();