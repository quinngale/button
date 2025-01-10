let agreementRequest = fetch('knights-of-ni.json');

window.addEventListener('DOMContentLoaded', async e => {

    function placeChildRandomly(parentElement, childElement) {
        let width = parentElement.clientWidth;
        let height = parentElement.clientHeight;

        let childWidth = childElement.offsetWidth;
        let childHeight = childElement.offsetHeight;

        let positionX = (((width - childWidth) * Math.random())).toFixed(0);
        let positionY = (((height - childHeight) * Math.random())).toFixed(0);

        childElement.style.top = `${positionY}px`;
        childElement.style.left = `${positionX}px`;
    }

    let tosContainer = document.querySelector("#tos-container");
    let tosContinue = document.querySelector("#tos-continue");
    let tosCompletedImage = new Image()
    tosCompletedImage.src = "check.svg";
    let resizeTimeout = null;

    let button = document.createElement('button');

    let agreement = await agreementRequest
        .then(agreementRequest => agreementRequest.json())
        .then(agreementRequest => agreementRequest.text.split(" "));

    button.textContent = agreement.shift();
    button.setAttribute('type', 'button');

    tosContainer.append(button);

    placeChildRandomly(tosContainer, button);

    tosContinue.setAttribute('disabled', true);

    button.addEventListener('click', _e => {
        if (agreement.length > 0) {
            button.textContent = agreement.shift();

            placeChildRandomly(tosContainer, button);
        } else {
            tosContinue.removeAttribute('disabled');
            tosContainer.removeChild(button);
            tosContainer.appendChild(tosCompletedImage);
            resizeObserver.unobserve(tosContainer);
        }
    });

    let firstRun = true
    let resizeObserver = new ResizeObserver(obj => {
        if (resizeTimeout != null) clearTimeout(resizeTimeout);
        if (!firstRun)
            resizeTimeout = setTimeout(() => {
                placeChildRandomly(tosContainer, button);
            }, 100);
        else firstRun = false;
    });

    resizeObserver.observe(tosContainer);
})