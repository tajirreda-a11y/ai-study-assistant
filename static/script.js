async function askAI() {

    let questionInput = document.getElementById("question");
    let button = document.getElementById("askButton");
    let chatContainer = document.getElementById("chatContainer");

    let question = questionInput.value;

    if (question.trim() === "") {
        return;
    }

    // User message
    let userMessage = document.createElement("div");
    userMessage.className = "user-message";
    userMessage.innerText = question;

    chatContainer.appendChild(userMessage);

    // AI loading message
    let aiMessage = document.createElement("div");
    aiMessage.className = "ai-message";
    aiMessage.innerText = "Thinking...";

    chatContainer.appendChild(aiMessage);

    questionInput.value = "";

    button.disabled = true;
    button.innerText = "Loading...";

    let response = await fetch("/ask", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            question: question
        })
    });

    let data = await response.json();

    aiMessage.innerText = data.answer;

    button.disabled = false;
    button.innerText = "Ask AI";
    
}

document.getElementById("question").addEventListener("keydown", function(event) {

    if (event.key === "Enter") {
        askAI();
    }

});
