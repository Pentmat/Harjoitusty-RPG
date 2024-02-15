// Function to throw the dice
function throwDice() {
    // Get the selected critical modifier
    const criticalModifier = parseInt(document.querySelector(".choose-critical select").value) || 0;

    // Get the custom modifier from the input, defaulting to 0 if not provided
    const customModifier = parseInt(document.getElementById("customModifier").value) || 0;

    // Assuming D100 is rolled
    const diceResult = Math.floor(Math.random() * 100) + 1;

    // Apply the modifiers to the dice result
    const modifiedResult = diceResult + criticalModifier + customModifier;

    // Get the existing results from local storage or initialize an empty array
    const storedResults = JSON.parse(localStorage.getItem("diceResults")) || [];

    // Add the new result to the list
    storedResults.push({
        diceResult,
        criticalModifier,
        customModifier,
        modifiedResult,
    });

    // Save the updated list in local storage
    localStorage.setItem("diceResults", JSON.stringify(storedResults));

    // Update the displayed result
    updateResultDisplay(storedResults);
}

// Function to update the displayed result and highlight the table row
function updateResultDisplay(results) {
    const resultList = document.getElementById("resultList");

    // Update the displayed list
    resultList.innerHTML = "<h3>Aiemmat tulokset:</h3>";

    for (const result of results) {
        const listItem = document.createElement("li");
        const diceResult = result.diceResult;
        const criticalModifier = result.criticalModifier;
        const customModifier = result.customModifier;
        const modifiedResult = result.modifiedResult;

        listItem.innerHTML = `D${diceResult} + ${criticalModifier} + ${customModifier} = ${modifiedResult}`;
        resultList.appendChild(listItem);

        // Check if the modified result falls within the specified ranges for Crit_1 and Crit_2
        highlightRow("crit_1", modifiedResult, -49, 6);
        highlightRow("crit_2", modifiedResult, 6, 20);
    }

    // Scroll the result container to the bottom to show the newest result
    resultList.scrollTop = resultList.scrollHeight;
}

// Function to highlight the table row based on the modified dice result and range
function highlightRow(className, modifiedResult, rangeStart, rangeEnd) {
    const tableRow = document.querySelector(`.${className}`);

    if (modifiedResult >= rangeStart && modifiedResult <= rangeEnd) {
        tableRow.classList.add("highlight");
    } else {
        tableRow.classList.remove("highlight");
    }
}

// Initial display on page load
document.addEventListener("DOMContentLoaded", () => {
    const storedResults = JSON.parse(localStorage.getItem("diceResults")) || [];
    updateResultDisplay(storedResults);
});
