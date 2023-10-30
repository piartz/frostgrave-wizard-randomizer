const wizardTypes = [
    "Chronomancy",
    "Elemental",
    "Enchantment",
    "Illusion",
    "Necromancy",
    "Sigil",
    "Soothsayer",
    "Summoning",
    "Thaumaturgy",
    "Witch"
];

function generateRandomWizard() {
    const randomIndex = Math.floor(Math.random() * wizardTypes.length);
    return wizardTypes[randomIndex];
}

document.addEventListener("DOMContentLoaded", function() {
    const wizardTypeElement = document.getElementById("wizard-type");
    const generateButton = document.getElementById("generate-button");

    generateButton.addEventListener("click", function() {
        const randomWizardType = generateRandomWizard();
        wizardTypeElement.textContent = randomWizardType;
    });

    // Initial generation when the page loads
    const initialWizardType = generateRandomWizard();
    wizardTypeElement.textContent = initialWizardType;
});
