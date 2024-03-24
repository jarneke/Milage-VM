console.log("TEST");
setTimeout(() => {
    const calculateButtons = document.getElementsByClassName('CalculateTank');
    let i = 0;
    for (const button of calculateButtons) {
        console.log(`button ${i} trying to add listener`);
        button.addEventListener('click', () => {
            console.log(`button ${i} clicked`);
            const tankDiv = button.closest('.tank');
            if (tankDiv) {
                const firstElementTextContent = tankDiv.firstElementChild.textContent;
                const clickedFillDate = firstElementTextContent.split(" ")[2];
                console.log(clickedFillDate);
            }
        });
    }
}, 1000);
