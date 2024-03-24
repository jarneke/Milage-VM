console.log("TEST");
setTimeout(() => {
    const calculateButtons = document.getElementsByClassName('CalculateTank');
}, 1000);
let i = 0;
for (const button of calculateButtons) {
    console.log(`button ${i} trying to add listener`);
    button.addEventListener('click', () => {
        console.log(`button ${i} clicked`);
        const tankDiv = button.closest('.tank');
        if (tankDiv) {
            const firstElementTextContent = tankDiv.firstElementChild.textContent;
            console.log(firstElementTextContent);
        }
    });
}