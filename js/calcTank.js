const calculateButtons = document.getElementsByClassName('CalculateTank');

for (const button of calculateButtons) {
    button.addEventListener('click', () => {
        const tankDiv = button.closest('.tank');
        if (tankDiv) {
            const firstElementTextContent = tankDiv.firstElementChild.textContent;
            console.log(firstElementTextContent);
        }
    });
}