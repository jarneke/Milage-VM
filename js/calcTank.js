window.onload = () => {
    const calculateButtons = document.getElementsByClassName('CalculateTank');
    for (const button of calculateButtons) {
        button.addEventListener('click', () => {
            const tankDiv = button.closest('.tank');
            if (tankDiv) {

                const firstElementTextContent = tankDiv.firstElementChild.textContent;
                const clickedFillDate = firstElementTextContent.split(" ")[2];
                console.log("clicked Date: " + clickedFillDate);
                console.log("previos Date: " + previosFillDate);
            }
        });
    }
};
