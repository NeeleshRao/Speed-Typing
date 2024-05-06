const RANDOM_QUOTE_API_URL = "https://api.quotable.io/random"
const quoteDisplayElement = window.document.getElementById("quoteDisplay")
const quoteInputElement = window.document.getElementById("quoteInput")
const timerElement = window.document.getElementById("timer")

quoteInputElement.addEventListener('input', () => {
    const arrayQuote = quoteDisplayElement.querySelectorAll('span')
    const arrayValue = quoteInputElement.value.split("")
    console.log(arrayQuote)

    correct = true

    arrayQuote.forEach((characterSpan, index) => {
        const character = arrayValue[index]
        // console.log(arrayQuote, arrayValue)
        const correctCharacter = characterSpan.innerText;

        if (character == null) {
            characterSpan.classList.remove("correct")
            characterSpan.classList.remove("incorrect")
            correct = false
        }

        else if (character === correctCharacter) {
            characterSpan.classList.add("correct")
            characterSpan.classList.remove("incorrect")
        }

        else {
            characterSpan.classList.remove("correct")
            characterSpan.classList.add("incorrect")
            correct = false
        }
    })

    if (correct) getNextQuote()
})

function getRandomQuote() {
    return fetch(RANDOM_QUOTE_API_URL)
        .then(response => response.json())
        .then(data => data.content)
}

async function getNextQuote() {
    const quote = await getRandomQuote();
    // console.log(quote);
    quoteDisplayElement.innerText = "";
    quote.split('').forEach(character => {
        const characterSpan = document.createElement('span')
        // characterSpan.classList.add('incorrect')
        characterSpan.innerText = character;
        quoteDisplayElement.appendChild(characterSpan)
    });
    quoteInputElement.value = null;
    startTimer();

}

let startTime;
function startTimer() {
    timerElement.innerText = 0;
    startTime = new Date()
    setInterval(() => {
        timer.innerText = getTimerTime()
    }, 1000)
}

function getTimerTime() {
    return Math.floor((new Date() - startTime) / 1000)
}



getNextQuote()