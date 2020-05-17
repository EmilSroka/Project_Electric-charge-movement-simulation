export class UIManager {
    constructor() {
        this.buttonState = true;
        this.selectButton = document.querySelector('.select');
        this.buttonStart = document.querySelector('.button-start');
        this.buttonCenterRight = document.querySelector('.button-centerRight');
        this.buttonCenterLeft = document.querySelector('.button-centerLeft');
        this.setButtonText();
        this.startButtonListenerAl();
    }
    setSelectOptions(modes) {
        modes.forEach(mode => {
            var opt = document.createElement('option');
            opt.value = mode;
            opt.textContent = mode;
            this.selectButton.appendChild(opt);
        });
    }
    addOptionListener(func) {
        this.selectButton.addEventListener('change', func);
    }
    removeOptionListener(func) {
        this.selectButton.removeEventListener('change', func);
    }
    setState(counter) {
        this.buttonCenterLeft.value = `${this.buttonCenterLeft.value} ${counter[0]}`;
        this.buttonCenterRight.value = `${this.buttonCenterRight.value} ${counter[1]}`;
    }
    setButtonText() {
        this.buttonCenterLeft.value = 'liczba elektronów';
        this.buttonCenterRight.value = 'liczba protonów';
    }
    addButtonCenterLeftListener(func) {
        this.buttonCenterLeft.addEventListener('click', func);
    }
    addButtonCenterRightListener(func) {
        this.buttonCenterRight.addEventListener('click', func);
    }
    removeButtonCenterLeftListener(func) {
        this.buttonCenterLeft.removeEventListener('click', func);
    }
    removeButtonCenterRightListener(func) {
        this.buttonCenterRight.removeEventListener('click', func);
    }
    setCenterLeftButtonState(counter) {
        this.buttonCenterLeft.value = `${counter}`;
    }
    
    disableCenterLeftButton() {
        this.buttonCenterLeft.disabled = true;
    }
    disableCenterRightButtonDisable() {
        this.buttonCenterRight.disabled = true;
    }
    startButtonListenerAl() {
        this.buttonStart.addEventListener('click', this.startButtonOnClickHandlerAlert.bind(this));
    }
    startButtonListener() {
        this.buttonStart.addEventListener('click', this.startButtonOnClickHandler.bind(this));
    }
    startButtonOnClickHandlerAlert() {
        this.startButtonOnClickHandler();
        alert(this.buttonStart.value);
    } 
    startButtonOnClickHandler() {
        this.buttonState = !this.buttonState;
        this.buttonState ? this.buttonStart.value = 'Start' : this.buttonStart.value = 'Reset';
        this.buttonStart.classList.toggle('button-reset');
        this.buttonStart.blur();
    }

}