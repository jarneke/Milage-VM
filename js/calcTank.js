const calculateButtons = document.querySelectorAll('.CalculateTank');

calculateButtons.forEach(button => {
    button.addEventListener('click', () => {
        const tankDiv = button.closest('.tank');
        if (tankDiv) {
            const firstElementTextContent = tankDiv.firstElementChild.textContent;
            console.log(firstElementTextContent);
        }
    });
});