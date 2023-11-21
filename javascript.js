const text = document.querySelector('#number')

var temp = 0;
var operation = '';

function finishOperation() {
    switch(operation) {
        case 'addition':
            temp += Number(text.value)
            text.value = temp
            break
        case 'subtraction':
            temp -= Number(text.value)
            text.value = temp
            break
        case 'divide':
            temp = temp/(text.value)
            text.value = temp
        case 'multiply':
            temp = temp * text.value
            text.value = temp
        case 'percent':
            
        default:
            break
    }
    operation = 'reset'
    temp = 0
}

document.querySelectorAll('.button').forEach((item) => {
    item.addEventListener('click', () => {
        // (operation == 'reset') ? (text.value = 0, operation = ''): operation ='';
        if (operation == 'reset') {
            text.value = 0
            operation = ""
        }
        switch(item.getAttribute('data-value')) {
            default:
                text.value = Number((text.value).replaceAll(",", "") + item.getAttribute('data-value')).toLocaleString()
                text.scrollTo(text.scrollWidth, this.scrollHeight)
                break
                case null:
                    switch(item.getAttribute('data-effect')) {
                        case 'clear':
                            text.value = 0
                            temp = 0
                            break
                        case 'add':
                            temp += Number(text.value)
                            text.value = 0
                            operation = 'addition'
                            break
                        case 'sub':
                            temp -= Number(text.value)
                            text.value = 0
                            operation = 'subtraction'
                            break
                        case 'divide':
                            temp = Number(text.value)
                            text.value = 0
                            operation = 'divide'
                            break
                        case 'multiply':
                            temp = Number(text.value)
                            text.value = 0
                            operation = 'multiply'
                            break
                        case 'negative':
                            text.value = -Number(text.value)
                            break
                        case 'percent':
                            temp = Number(text.value)
                            operation = 'percent'
                            break
                        case 'ans':
                            finishOperation()
                            break
                        }
                        break
                    }
        console.log(text.value)
    })
})