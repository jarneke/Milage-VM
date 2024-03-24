console.log("TEST");
setTimeout(() => {
    const calculateButtons = document.getElementsByClassName('CalculateTank');
    for (const button of calculateButtons) {
        button.addEventListener('click', () => {
            const tankDiv = button.closest('.tank');
            console.log(tankDiv.getAttribute("data-id"));
            if (tankDiv) {
                const firstElementTextContent = tankDiv.firstElementChild.textContent;
                const clickedFillDate = firstElementTextContent.split(" ")[2];
                console.log("clicked Date: " + clickedFillDate);
                console.log("previos Date: " + previosFillDate);
            }
        });
    }
}, 1000);
