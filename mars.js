// Grammar Check Function
function checkGrammar() {
  const clothing = document.getElementById("clothing-items").value;
  const color = document.getElementById("colors").value;
  const feedback = document.getElementById("grammar-feedback");
  
  if (clothing && color) {
    feedback.textContent = `Great job! You made a perfect sentence: "My ${color} ${clothing} is blue."`;
    feedback.style.color = "green";
  } else {
    feedback.textContent = "Oops! Try again.";
    feedback.style.color = "red";
  }
}

// Vocabulary Audio
function playAudio(item) {
  const audio = new Audio(`audio/${item}.mp3`);
  audio.play();
}

// Vocabulary Feedback
function checkVocabulary(item) {
  const correctItems = ["hat", "shirt", "socks"];
  const feedback = document.getElementById("vocab-feedback");

  if (correctItems.includes(item)) {
    feedback.textContent = `Great! You selected the ${item}.`;
    feedback.style.color = "green";
  } else {
    feedback.textContent = "Try again!";
    feedback.style.color = "red";
  }
}

// Listening Section - Play Sentence
function playSentence() {
  const sentences = ["My hat is blue", "My shirt is red", "My socks are green"];
  const randomSentence = sentences[Math.floor(Math.random() * sentences.length)];
  const audio = new Audio(`audio/${randomSentence.replace(/\s+/g, '-')}.mp3`);
  audio.play();
}

// Listening Section - Check the correct image
function checkListening(selectedItem) {
  const sentence = "My shirt is blue"; // For simplicity, hardcoding the sentence for now
  const feedback = document.getElementById("listening-feedback");
  
  if (selectedItem === "shirt" && sentence.includes("shirt")) {
    feedback.textContent = "Correct! Well done!";
    feedback.style.color = "green";
  } else {
    feedback.textContent = "Oops! Try again.";
    feedback.style.color = "red";
  }
}

// Writing Section - Check Writing
function checkWriting() {
  const input = document.getElementById("writing-input").value;
  const feedback = document.getElementById("writing-feedback");

  if (input.toLowerCase() === "my shirt is blue") {
    feedback.textContent = "Great job! Your sentence is perfect!";
    feedback.style.color = "green";
  } else {
    feedback.textContent = "Oops! Try again.";
    feedback.style.color = "red";
  }
}
