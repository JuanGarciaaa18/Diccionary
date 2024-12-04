//se importa el diccionario
import { dictionary } from './dictionary.js';  


// funcion mostrar palabras

function showWord(categories) {

    // espacio en donde se va a poner la lista
    const listContainer = document.getElementById('word-list');
    listContainer.innerHTML = ''; 

    // Obtener las palabras de la categoría seleccionada
    const words = dictionary.categories[categories];

    // ver si la categoria (array) tiene palabras 
    if (words && words.length > 0) {
        words.forEach(word => {
            
            // crear un parrafo cada vez que se encuentra una palabra 

            const wordElement = document.createElement('p');
            wordElement.innerHTML = `${word.english} (${word.spanish}): ${word.example}`;
            listContainer.appendChild(wordElement);
        });
    } else {
        listContainer.innerHTML = 'No hay palabras disponibles para esta categoría.';
    }
}

// cada funcioncs cuando se selecciona un input-radio

document.getElementById('animals').addEventListener('change', function() {
    if (this.checked) {
        showWord('animals'); 
    }
});

document.getElementById('fruits').addEventListener('change', function() {
    if (this.checked) {
        showWord('fruits'); 
    }
});

document.getElementById('colors').addEventListener('change', function() {
    if (this.checked) {
        showWord('colors'); 
    }
});

document.getElementById('physical_descriptions').addEventListener('change', function() {
    if (this.checked) {
        showWord('physical_descriptions'); 
    }
});

document.getElementById('skills').addEventListener('change', function() {
    if (this.checked) {
        showWord('skills'); 
    }
});

document.getElementById('verbs').addEventListener('change', function() {
    if (this.checked) {
        showWord('verbs'); 
    }
});


// Agregar un evento al botón "Nueva Palabra"
document.getElementById("addnewword").addEventListener("click", function() {
    // Obtener los valores de los inputs
    const spanish = document.getElementById("word-spanish").children[1].value;
    const english = document.getElementById("word-english").children[1].value;
    const example = document.getElementById("example").children[1].value;
  
    // Obtener la categoría seleccionada
    const category = document.querySelector('input[name="categories"]:checked').id;
  
    // Crear el objeto para la nueva palabra
    const newWord = {
      english: english,
      spanish: spanish,
      example: example
    };
  
    // Asignar un ID único basado en el tamaño actual del array de la categoría
    newWord.id = dictionary.categories[category].length + 1;
  
    // Agregar la nueva palabra a la categoría
    dictionary.categories[category].push(newWord);
  
    // Opcional: Mostrar un mensaje de confirmación o limpiar los campos
    alert("Palabra añadida:", newWord);
});



document.addEventListener('DOMContentLoaded', function () {
    // Referencias a los elementos
    const translateButton = document.getElementById('Btntranslate').querySelector('button');
    const responseElement = document.querySelector('.response p'); // Modificado para apuntar a la etiqueta <p>
    const inputWord = document.querySelector('.word input'); // Modificado para acceder al <input>
    const languageRadios = document.querySelectorAll('input[name="language"]'); // Radios de idioma

    // Evento para traducir
    translateButton.addEventListener('click', function () {
        const word = inputWord.value.toLowerCase(); // Palabra ingresada
        if (!word) {
            responseElement.textContent = 'Por favor, introduce una palabra.';
            return;
        }

        // Verificar qué idioma está seleccionado
        let selectedLanguage = null;
        languageRadios.forEach((radio) => {
            if (radio.checked) {
                selectedLanguage = radio.id === 'english' ? 'english' : 'spanish';
            }
        });

        if (!selectedLanguage) {
            responseElement.textContent = 'Por favor, selecciona un idioma.';
            return;
        }

    
        let translation = null;


        for (const category of Object.values(dictionary.categories)) {
        const wordObj = category.find((entry) =>
        selectedLanguage === 'english'
            ? entry.spanish.toLowerCase() === word
            : entry.english.toLowerCase() === word
    );

    if (wordObj) {
        translation = selectedLanguage === 'english' ? wordObj.english : wordObj.spanish;
        break;
    }
}


        // Mostrar el resultado
        responseElement.textContent = translation
            ? `Traducción: ${translation}`
            : 'No se encontró la palabra en el diccionario.';
    });
});
