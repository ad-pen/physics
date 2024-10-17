const quizData = [
    {
        question: "What is the unit of electric field?",
        options: ["N/C", "V/m", "Coulombs"],
        answer: 0 // The correct option (index of the options array)
    },
    {
        question: "What is the formula for electric force?",
        options: ["F = qE", "F = ma", "F = E/d"],
        answer: 0
    }
];

function startQuiz() {
    const quizContainer = document.getElementById('quiz-container');
    quizContainer.innerHTML = ''; // Clear previous content if any

    quizData.forEach((q, index) => {
        // Create a div for each question
        const questionDiv = document.createElement('div');
        questionDiv.classList.add('quiz-question');

        // Add the question text
        const questionText = document.createElement('h3');
        questionText.textContent = `${index + 1}. ${q.question}`;
        questionDiv.appendChild(questionText);

        // Add options as radio buttons
        q.options.forEach((option, i) => {
            const label = document.createElement('label');
            const radioInput = document.createElement('input');
            radioInput.type = 'radio';
            radioInput.name = `question${index}`;
            radioInput.value = i;

            label.appendChild(radioInput);
            label.appendChild(document.createTextNode(option));

            questionDiv.appendChild(label);
            questionDiv.appendChild(document.createElement('br')); // Add a line break
        });

        quizContainer.appendChild(questionDiv);
    });

    // Add a submit button
    const submitButton = document.createElement('button');
    submitButton.textContent = 'Submit';
    submitButton.onclick = submitQuiz;
    quizContainer.appendChild(submitButton);
}

function submitQuiz() {
    let score = 0;

    quizData.forEach((q, index) => {
        const selectedOption = document.querySelector(`input[name="question${index}"]:checked`);
        
        if (selectedOption && parseInt(selectedOption.value) === q.answer) {
            score++;
        }
    });

    // Display the result
    const resultDiv = document.createElement('div');
    resultDiv.textContent = `Your score is ${score}/${quizData.length}.`;

    // Clear the quiz and show the result
    const quizContainer = document.getElementById('quiz-container');
    quizContainer.innerHTML = '';
    quizContainer.appendChild(resultDiv);
}

// Start the quiz when the page loads
startQuiz();
