const p1 = document.querySelector('.pregunta-uno');
const resultado = document.getElementById('resultado');
const enviar = document.querySelector('.enviar');

function getRandom(arr, n) {
  var result = new Array(n),
    len = arr.length,
    taken = new Array(len);
  if (n > len)
    throw new RangeError('getRandom: more elements taken than available');
  while (n--) {
    var x = Math.floor(Math.random() * len);
    result[n] = arr[x in taken ? taken[x] : x];
    taken[x] = --len in taken ? taken[len] : len;
  }
  return result;
}

async function getData() {
  const resp = await fetch(
    'https://platzi-master-api.herokuapp.com/preguntas/',
    {
      mode: 'cors',
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
    }
  );
  let data = await resp.json();
  data = await getRandom(data, 5);
  return data;
}

getData()
  .then((data) => {
    for (let n = 0; n < data.length; n++) {
      let template = `
      <div class="question">
        <div class="heading">
          <h2>${data[n].pregunta}</h2>
          <p>Pregunta #${n + 1}</p>
        </div>
        <fieldset id="${data[n].class}">
        <label for="${data[n].alternativas[0]}">
          <input  type="radio" required id="${data[n].alternativas[0]}" name="${
        data[n].class
      }" value="${data[n].alternativas[0]}" />
         ${data[n].alternativas[0]}</label>

         <label for="${data[n].alternativas[1]}">
          <input type="radio" required id="${data[n].alternativas[1]}" name="${
        data[n].class
      }" value="${data[n].alternativas[1]}" />
          ${data[n].alternativas[1]}</label>

      <label for="${data[n].alternativas[2]}">
          <input type="radio" required id="${data[n].alternativas[2]}" name="${
        data[n].class
      }" value="${data[n].alternativas[2]}" />
          ${data[n].alternativas[2]}</label>

      <label for="${data[n].alternativas[3]}">
          <input type="radio" required id="${data[n].alternativas[3]}" name="${
        data[n].class
      }" value="${data[n].alternativas[3]}" />
          ${data[n].alternativas[3]}</label>
      </fieldset>

      </div>
      `;

      let pr = document.createElement('section');
      pr.innerHTML = template;
      p1.appendChild(pr);
    }
  })
  .then(() => {
    const submitInput = document.getElementById('submit');
    const resetInput = document.getElementById('reset');
    var inputSelector = document.querySelectorAll('input[type=radio]');
    const modalBg = document.querySelector('.modal-bg');
    const warning = document.getElementById('warning');
    var buenas = 0;
    var malas = 0;

    resetInput.addEventListener('click', function () {
      resultado.innerHTML = ' ';
    });

    submitInput.addEventListener('click', function (e) {
      e.preventDefault();
      inputSelector.forEach((radio) => {
        if (radio.checked) {
          if (
            radio.value == 'Ratatatatatatata' ||
            radio.value == 'Las rodillas' ||
            radio.value == 'Hot dog' ||
            radio.value == 'Jeringa' ||
            radio.value == 'Yo-yo' ||
            radio.value == 'La sombra' ||
            radio.value == 'Cocos' ||
            radio.value == 'Un reloj de bolsillo' ||
            radio.value == 'El silencio' ||
            radio.value == 'La letra Y'
          ) {
            buenas++;
          } else {
            malas++;
          }
        }
      });
      const score = malas + buenas;
      if (score < 5) {
        modalBg.classList.add('bg-active');
        warning.innerHTML = `<h2>Quedaron preguntas sin responder, vuelve a intentarlo.</h2>`;
      } else if (score === 5) {
        modalBg.classList.add('bg-active');
        resultado.innerHTML = `Buenas: <b>${buenas}</b> ✅ | Malas: <b>${malas}</b> ❌`;
      }
    });
  })
  .catch((err) => console.log('errors: ' + err.message));
