import OpenAI from "openai";

const apiKey = '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';
const openai = new OpenAI({ apiKey, dangerouslyAllowBrowser: true });
var userContent;
var flashcardSide = 1;
var flashcards;
var flashcardIndex = 0;

async function getUserInput() {
    document.getElementById("userInput").style.display = "none";
    document.getElementById("submitButton").style.display = "none";
    document.getElementById("flashcardDiv").style.display = "table";
    document.getElementById("flipButton").style.display = "block";
    document.getElementById("leftButton").style.display = "block";
    document.getElementById("rightButton").style.display = "block";
    userContent = document.getElementById("userInput").value;
    console.log(userContent);
    await main();
    flipFlashcard();
}

async function main() {
    const completion = await openai.chat.completions.create({
        messages: [
            { role: "system", content: 'You will be provided with a block of notes, and your task is to extract key concepts and information and create a list of flash cards using it. Write each flash card on a new line, in the format of question:::answer.' },
            { role: "user", content: userContent }
        ],
        model: "gpt-4-1106-preview",
    });

    flashcards = completion.choices[0].message.content;
    flashcards = flashcards.split('\n');

    for (let i = 0; i < flashcards.length; i++) {
        flashcards[i] = flashcards[i].split(":::");
    }

    for (let i = 0; i < flashcards.length; i++) {
        console.log(flashcards[i]);
    }

    document.getElementById("flashcardText").innerText = flashcards[flashcardIndex][flashcardSide];
}

function flipFlashcard() {
    flashcardSide = flashcardSide === 0 ? 1 : 0;
    document.getElementById("flashcardText").innerText = flashcards[flashcardIndex][flashcardSide];
}

function goLeft() {
    flashcardIndex = flashcardIndex - 1;
    flashcardSide = 0;
    document.getElementById("flashcardText").innerText = flashcards[flashcardIndex][flashcardSide];
}

function goRight() {
    flashcardIndex = flashcardIndex + 1;
    flashcardSide = 0;
    document.getElementById("flashcardText").innerText = flashcards[flashcardIndex][flashcardSide];
}

document.addEventListener("DOMContentLoaded", function () {
    var submitButton = document.getElementById("submitButton");
    submitButton.addEventListener("click", getUserInput);
    var flipButton = document.getElementById("flipButton");
    flipButton.addEventListener("click", flipFlashcard);
    var leftButton = document.getElementById("leftButton");
    leftButton.addEventListener("click", goLeft);
    var rightButton = document.getElementById("rightButton");
    rightButton.addEventListener("click", goRight);
});