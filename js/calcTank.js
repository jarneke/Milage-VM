setTimeout = (() => {
    const calculateButtons = document.getElementsByClassName('CalculateTank');
    console.log(calculateButtons);
    console.log("1");
    for (const button of calculateButtons) {
        button.addEventListener('click', () => {
            const tankDiv = button.closest('.tank');
            if (tankDiv) {
                const previosFillDate = document.querySelector(`.tank[data-id="${tankDiv.getAttribute("data-id") - 1}"]`);
                const firstElementTextContent = tankDiv.firstElementChild.textContent;
                const clickedFillDate = firstElementTextContent.split(" ")[2];
                console.log("clicked Date: " + clickedFillDate);
                console.log("previos Date: " + previosFillDate);
            }
        });
    }
}, 1000);
