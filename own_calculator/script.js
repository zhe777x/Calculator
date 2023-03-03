const previous_web = document.querySelector("[previous]")
const current_web = document.querySelector("[current]")
const all_clear = document.querySelector("[all-clear-button]")
const del = document.querySelector("[del-button]")
const operation_button = document.querySelectorAll("[operation-button]")
const number_button = document.querySelectorAll("[number-button]")
const equal_button = document.querySelector("[equal-button]")
const test = document.getElementById("test")
const current = "hello world"


class Calculator{
    constructor(previous,current){
        this.previous = previous
        this.current = current
        this.clear() //之所以要使用clear是因為current and previous 會出現<div class="happy new year"> ...
        current_web.innerHTML = "0"
        console.log("Hello world")
    }

    clear(){
        this.previous = ""
        this.current = ""
        this.operation = undefined
    }

    choose_button(operation){
        if(this.previous !== ""){
            this.comput()
        }
        if(this.current === ""){
            return;
        }
        this.operation = operation
        this.previous = this.current
        this.current = ""
    }

    del(){
        this.current = this.current.toString().slice(0,-1)
    }

    comput(){
        let output;
        const pre = parseFloat(this.previous)
        const cur = parseFloat(this.current)
        console.log("comput")
        console.log(pre)
        console.log(cur)
        console.log(`operation:${this.operation}`)
        if(isNaN(pre) || isNaN(cur)){
            return;
        }
        switch(this.operation){
            case "+":
                output = parseFloat((pre + cur).toFixed(9))
                break;
            case "-":
                output = parseFloat((pre - cur).toFixed(9))
                break;
            case "*":
                output = parseFloat((pre * cur).toFixed(9))
                break;
            case "÷":
                output = parseFloat((pre / cur).toFixed(9))
                break;
            default:
                return;
        }

        this.previous = ""
        this.current = output
        this.operation = undefined
        console.log("operation")
        console.log(this.operation)
        console.log(this.previous)
        console.log(this.current)
    }

    appendnumber(number){
        if(number == "." && this.current.includes(".")){
            return
        }
        this.current = this.current.toString() + number.toString()
    }

    getNumber(number){
        const textNumber = number.toString()
        const integer = parseFloat(textNumber.split(".")[0])
        const decimal = textNumber.split(".")[1]
        let integerdisplay;
        if(isNaN(integer)){
            integerdisplay = "0"
        }else{
            integerdisplay = integer.toLocaleString('en',{
                maximumFractionDigits:0
            })
        }

        if(decimal !== undefined){
            return `${integerdisplay}.${decimal}`
        }else{
            return `${integerdisplay}`
        }
    }

    display(){
        if(this.operation !== undefined){
            previous_web.innerText = `${this.getNumber(this.previous)} ${this.operation}`    
        }else{
            previous_web.innerText = ""
        }
        current_web.innerText = this.getNumber(this.current)
    }

}

const calculator = new Calculator(previous_web,current_web)

number_button.forEach(button => {
    button.addEventListener("click",() => {
        calculator.appendnumber(button.innerText)
        calculator.display()
    })
})

operation_button.forEach(button => {
    button.addEventListener("click",() => {
        calculator.choose_button(button.innerText)
        calculator.display()
    })
})

equal_button.addEventListener("click",() => {
    calculator.comput()
    calculator.display()
})

del.addEventListener("click",() => {
    calculator.del()
    calculator.display()
})

all_clear.addEventListener("click",() => {
    calculator.clear()
    calculator.display()
})

test.addEventListener("click",function(){
    console.log("test button")
    console.log(calculator.current)
    console.log(calculator.previous)
})