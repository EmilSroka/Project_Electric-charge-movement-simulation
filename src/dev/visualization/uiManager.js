export class UIManager {
    constructor() {
        this.buttonState = true;
        this.statrListeners = [];
        this.resetListeners = [];
        this.selectButton = document.querySelector('.select');
        this.buttonStart = document.querySelector('.button-start');
        this.buttonCenterRight = document.querySelector('.button-centerRight');
        this.buttonCenterLeft = document.querySelector('.button-centerLeft');
        this.leftCounter = 0;
        this.rightCounter = 0;
        this.leftText = '';
        this.rightText = '';

        this.startButtonListener();
    }
    setSelectOptions(modes, defaultMode) {
        modes.forEach(mode => {
            var opt = document.createElement('option');
            opt.value = mode;
            opt.textContent = mode;
            if(mode === defaultMode)
                opt.setAttribute('selected', true);
            this.selectButton.appendChild(opt);
        });
    }
    disableSelectOptions() {
        this.selectButton.disabled = true;
    }
    enableSelectOptions() {
        this.selectButton.disabled = false;
    }
    addOptionListener(func) {
        this.selectButton.addEventListener('change', func);
    }
    removeOptionListener(func) {
        this.selectButton.removeEventListener('change', func);
    }
    setState(left, right) {
        this.leftCounter = left;
        this.rightCounter = right;
        this.renderText();
    }
    setButtonTexts(leftText, rightText) {
        this.leftText = leftText;
        this.rightText = rightText;
        this.renderText();
    }
    renderText(){
        this.buttonCenterLeft.value = `${this.leftText} (${this.leftCounter})`;
        this.buttonCenterRight.value = `${this.rightText} (${this.rightCounter})`;
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

    enableCenterLeftButton() {
        this.buttonCenterLeft.disabled = false;
    }

    disableCenterRightButton() {
        this.buttonCenterRight.disabled = true;
    }

    enableCenterRightButton() {
        this.buttonCenterRight.disabled = false;
    }

    // wtf ???
    

    addStartListener(listener){
        if(!this.statrListeners.includes(listener))
            this.statrListeners.push(listener);
    }

    notifyStartListeners(){
        for(let listener of this.statrListeners){
            listener();
        }
    }

    addResetListener(listener){
        if(!this.resetListeners.includes(listener))
            this.resetListeners.push(listener);
    }

    notifyResetListener(){
        for(let listener of this.resetListeners){
            listener();
        }
    }

    startButtonListener() {
        this.buttonStart.addEventListener('click', () => {
            this.buttonState = !this.buttonState;
            this.handleStartButton();
            if(this.buttonState){
                this.notifyResetListener();
            } else {
                this.notifyStartListeners();
            }
        });
    }

    handleStartButton(){
        if(this.buttonState){ 
            this.buttonStart.value = 'Start';
            this.buttonStart.classList.remove('button-reset');
        } else {
            this.buttonStart.value = 'Reset';
            this.buttonStart.classList.add('button-reset');
        }
    }

    setButtonState(state){
        this.buttonState = state;
        this.handleStartButton();
    }
}