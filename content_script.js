const url = new URL(window.location.href);
const search = url.search;
const searchParam = new URLSearchParams(search);
const promptText = searchParam.get('q');
const OPENAI_ENDPOINT = "https://api.openai.com/v1/completions";

fetch(OPENAI_ENDPOINT, {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer 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`
    },
    body: JSON.stringify({
        "model": "text-davinci-003",
        "prompt": promptText,
        "max_tokens": 500,
        "temperature": 0,
    }),
})
.then(response => response.json())
.then(data => {
    if (data.choices && data.choices.length > 0) {
        const completion = data.choices[0].text.trim();
        insertCompletionIntoPage(completion);
    } else {
        console.error("No completions returned from OpenAI.");
    }
})
.catch(error => {
    console.error("Error calling OpenAI:", error);
});

function insertCompletionIntoPage(completion) {
    const completionContainer = document.createElement('div');
    completionContainer.className = 'insightly-completion';
    completionContainer.textContent = completion;

    const searchResults = document.querySelector('#search');
    if (searchResults) {
        searchResults.insertAdjacentElement('afterend', completionContainer);
    }
}
