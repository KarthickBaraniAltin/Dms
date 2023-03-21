export const useConvertFormData = () => {
    const parseDate = (dateString) => {
        return new Date(dateString)
    }

    const parseTime = (timeString) => {
        return new Date(timeString)
    }

    const convertedData = (data) => {
        return Object.keys(data).reduce((accumulator, key) => {
            if (key.startsWith('calendar')) {
              accumulator[key] = parseDate(data[key])
            } else if (key.startsWith('time')) {
                accumulator[key] = parseTime(data[key])
            } else {
              accumulator[key] = data[key]
            }
            return accumulator
        }, {})
    }
    
    return { parseDate, parseTime, convertedData }
}