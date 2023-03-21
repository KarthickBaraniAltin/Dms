export const useConvertFormData = () => {
    const convertData = (data) => {
        return Object.keys(data).reduce((accumulator, key) => {
            if (key.startsWith('calendar')) { // Converts data input for calendar components
                accumulator[key] = new Date(data[key])
            } else if (key.startsWith('time')) { // Converts data input for time components
                accumulator[key] = new Date(data[key])
            } else if (key.startsWith('radiobutton') || key.startsWith('checkbox')) { // Converts data inputs for radiobutton & checkbox components
                if (data[key] === undefined) {
                    accumulator[key] = []
                } else {
                    let parsedValue
                    try {
                        parsedValue = JSON.parse(data[key])
                        accumulator[key] = parsedValue
                    } catch (error) {
                        accumulator[key] = data[key]
                    }
                }
            } else {
              accumulator[key] = data[key]
            }
            return accumulator
        }, {})
    }
    
    return { convertData }
}