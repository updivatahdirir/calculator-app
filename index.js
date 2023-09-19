const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')
const equalsButton = document.querySelector('[data-equals]')
const deleteButton = document.querySelector('[data-delete]')
const allClearButton = document.querySelector('[data-all-clear]')
const previousOperandButton = document.querySelector('[data-previous-operand]')
const currentOperandButton = document.querySelector('[data-current-operand]')






class Calculator {
  constructor(previousOperandButton, currentOperandButton) {
    this.previousOperandButton = previousOperandButton;
    this.currentOperandButton = currentOperandButton;
    this.clear()
  } 
  
  clear() {
        this.currentOperand = ''
        this.previousOperand = ''
        this.opertion =  ''
  } 
  
  delete() {
        this.currentOperand = this.currentOperand.toString().slice(0, -1)
  }
  
  appendNumber(number) {
        if (number === '.' && this.currentOperand.includes('.')) return
        this.currentOperand = this.currentOperand.toString() + number.toString() 
  }
  
  chooseOperation(operation) {
        if (this.currentOperand === '') return
        if(this.previousOperand !== '') {
          this.compute()
        }
        this.opertion = operation
        this.previousOperand = this.currentOperand
        this.currentOperand = ''
  }
  
  compute() {
        let computation
        const prev = parseFloat(this.previousOperand)
        const curr = parseFloat(this.currentOperand)
        if(isNaN(prev) || isNaN(curr)) return
        switch (this.opertion) {
          case '+':
            computation = prev + curr
            break;
          case '-':
            computation = prev - curr
          break;
          case '*':
            computation = prev * curr
            break;
          case '÷':
            computation = prev / curr
            break;
          default:
            return
        }
        this.currentOperand = computation
        this.opertion = undefined
        this.previousOperand = ''
  }

  getDisplay(number) {
    const floatNumber = parseFloat(number)
    if (isNaN(floatNumber)) return ''
      return floatNumber.toLocaleString('en')
      
    
  }
  
  updateDisplay() {
       this.currentOperandButton.innerText = 
       this.getDisplay(this.currentOperand)
       if (this.opertion != null) {
       this.previousOperandButton.innerText = 
       `${this.getDisplay(this.previousOperand)} ${this.opertion}`
        
       }
  }
}
const calculator = new Calculator(previousOperandButton, currentOperandButton)


numberButtons.forEach(button => {
  button.addEventListener('click', () => {
    calculator.appendNumber(button.innerText)
    calculator.updateDisplay()
  })
})

operationButtons.forEach(button => {
  button.addEventListener('click', () => {
    calculator.chooseOperation(button.innerText)
    calculator.updateDisplay()
  })
})



allClearButton.addEventListener('click', () => {
  calculator.clear()
  calculator.updateDisplay()
})


deleteButton.addEventListener('click', () => {
  calculator.delete()
  calculator.updateDisplay()
})


equalsButton.addEventListener('click', () => {
  calculator.compute()
  calculator.updateDisplay()
})
