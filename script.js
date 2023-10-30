const wizardTypes = [
    "Chronomancer",
    "Illusionist",
    "Elementalist",
    "Enchanter",
    "Necromancer",
    "Sigilist",
    "Soothsayer",
    "Summoner",
    "Thaumaturge",
    "Witch"
];

const spells = {
    Chronomancer: [
        "Crumble",
        "Decay",
        "Fast Act",
        "Fleet Feet",
        "Petrify",
        "Slow",
        "Time Store",
        "Time Walk"
    ],
    Illusionist: [
        "Beauty",
        "Blink",
        "Fool's Gold",
        "Glow",
        "Illusionary Soldier",
        "Invisibility",
        "Teleport",
        "Transpose"
    ],
    Elementalist: [
        "Call Storm",
        "Destructive Sphere",
        "Elemental Ball",
        "Elemental Bolt",
        "Elemental Hammer",
        "Elemental Shield",
        "Scatter Shot",
        "Wall"
    ],
    Enchanter: [
        "Animate Construct",
        "Control Construct",
        "Embed Enchantment",
        "Enchant Armor",
        "Enchant Weapon",
        "Grenade",
        "Strength",
        "Telekinesis"
    ],
    Necromancer: [
        "Animate Skull",
        "Bone Dart",
        "Bones of the Earth",
        "Control Undead",
        "Raise Zombie",
        "Spell Eater",
        "Steal Health",
        "Strike Dead"
    ],
    Sigilist: [
        "Absorb Knowledge",
        "Bridge",
        "Draining Word",
        "Explosive Rune",
        "Furious Quill",
        "Power Word",
        "Push",
        "Write Scroll"
    ],
    Soothsayer: [
        "Awareness",
        "Combat Awareness",
        "Mind Control",
        "Mind Lock",
        "Reveal Secret",
        "Suggestion",
        "True Sight",
        "Wizard Eye"
    ],
    Summoner: [
        "Control Demon",
        "Imp",
        "Leap",
        "Planar Tear",
        "Plane Walk",
        "Plague of Insects",
        "Possess",
        "Summon Demon"
    ],
    Thaumaturge: [
        "Banish",
        "Blinding Light",
        "Circle of Protection",
        "Destroy Undead",
        "Dispel",
        "Heal",
        "Miraculous Cure",
        "Shield"
    ],
    Witch: [
        "Animal Companion",
        "Brew Potion",
        "Control Animal",
        "Curse",
        "Familiar",
        "Fog",
        "Mud",
        "Poison Dart"
    ]
};

const alignedTypes = {
    Thaumaturge: ["Sigilist", "Illusionist", "Soothsayer"],
    Sigilist: ["Thaumaturge", "Illusionist", "Enchanter"],
    Illusionist: ["Sigilist", "Thaumaturge", "Soothsayer"],
    Soothsayer: ["Thaumaturge", "Illusionist", "Chronomancer"],
    Enchanter: ["Sigilist", "Elementalist", "Witch"],
    Elementalist: ["Enchanter", "Necromancer", "Chronomancer"],
    Chronomancer: ["Soothsayer", "Elementalist", "Summoner"],
    Necromancer: ["Elementalist", "Witch", "Summoner"],
    Witch: ["Enchanter", "Necromancer", "Summoner"],
    Summoner: ["Witch", "Necromancer", "Chronomancer"],
};

const opposingTypes = {
    Thaumaturge: "Necromancer",
    Necromancer: "Thaumaturge",
    Chronomancer: "Enchanter",
    Enchanter: "Chronomancer",
    Soothsayer: "Witch",
    Witch: "Soothsayer",
    Summoner: "Sigilist",
    Sigilist: "Summoner",
    Elementalist: "Illusionist",
    Illusionist: "Elementalist",
};

const neutralTypes = wizardTypes.filter(type => !alignedTypes[type] && !opposingTypes[type]);

function generateRandomOpposingType(wizardType) {
    return opposingTypes[wizardType];
}

function generateRandomNeutralType(wizardType) {
    const neutralCandidates = neutralTypes.filter(type => type !== wizardType);
    const randomIndex = Math.floor(Math.random() * neutralCandidates.length);
    return neutralCandidates[randomIndex];
}

function generateRandomWizard() {
    const randomIndex = Math.floor(Math.random() * wizardTypes.length);
    return wizardTypes[randomIndex];
}

function generateRandomSpells(wizardType) {
    const spellList = spells[wizardType];
    if (!spellList) {
        return [];
    }

    const shuffledSpells = spellList.slice(); // Copy the array
    for (let i = shuffledSpells.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledSpells[i], shuffledSpells[j]] = [shuffledSpells[j], shuffledSpells[i]]; // Swap elements
    }

    return shuffledSpells.slice(0, 3); // Return the first 3 shuffled spells
}

function generateAlignedSpells(wizardType) {
    const aligned = alignedTypes[wizardType];
    const alignedSpells = [];
    if (aligned) {
        aligned.forEach((type) => {
            const spellList = spells[type];
            if (spellList) {
                const randomIndex = Math.floor(Math.random() * spellList.length);
                alignedSpells.push({ type, spell: spellList[randomIndex] });
            }
        });
    }
    return alignedSpells;
}

function generateRandomNeutralSpells(wizardType) {
    const neutralCandidates = neutralTypes.filter(type => type !== wizardType);
    const neutralSpells = [];
    neutralCandidates.forEach((type) => {
        const spellList = spells[type];
        if (spellList) {
            const randomIndex = Math.floor(Math.random() * spellList.length);
            neutralSpells.push({ type, spell: spellList[randomIndex] });
        }
    });
    return neutralSpells.slice(0, 2); // Return the first 2 random neutral spells
}

document.addEventListener("DOMContentLoaded", function() {
    const wizardTypeElement = document.getElementById("wizard-type");
    const generateButton = document.getElementById("generate-button");
    const spellListElement = document.getElementById("spell-list");

    generateButton.addEventListener("click", function() {
        const randomWizardType = generateRandomWizard();
        const randomSpells = generateRandomSpells(randomWizardType);
        const alignedSpells = generateAlignedSpells(randomWizardType);

        wizardTypeElement.textContent = randomWizardType;

        if (randomSpells.length > 0) {
            spellListElement.innerHTML = "<p>Learned Spells:</p>";
            const ul = document.createElement("ul");
            randomSpells.forEach(spell => {
                const li = document.createElement("li");
                li.textContent = spell;
                ul.appendChild(li);
            });
            spellListElement.appendChild(ul);
        } else {
            spellListElement.innerHTML = "";
        }

        if (alignedSpells.length > 0) {
            const alignedSpellsElement = document.createElement("p");
            alignedSpellsElement.textContent = "Aligned Spells:";
            spellListElement.appendChild(alignedSpellsElement);

            const ulAligned = document.createElement("ul");
            alignedSpells.forEach(alignedSpell => {
                const liAligned = document.createElement("li");
                liAligned.textContent = `${alignedSpell.type}: ${alignedSpell.spell}`;
                ulAligned.appendChild(liAligned);
            });
            spellListElement.appendChild(ulAligned);
        }

        if (neutralSpells.length > 0) {
            const neutralSpellsElement = document.createElement("p");
            neutralSpellsElement.textContent = "Neutral Spells:";
            spellListElement.appendChild(neutralSpellsElement);

            const ulNeutral = document.createElement("ul");
            neutralSpells.forEach(neutralSpell => {
                const liNeutral = document.createElement("li");
                liNeutral.textContent = `${neutralSpell.type}: ${neutralSpell.spell}`;
                ulNeutral.appendChild(liNeutral);
            });
            spellListElement.appendChild(ulNeutral);
        }
    });

    // Initial generation when the page loads
    const initialWizardType = generateRandomWizard();
    wizardTypeElement.textContent = initialWizardType;
    spellListElement.innerHTML = "";
});
