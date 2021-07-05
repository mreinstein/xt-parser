function optionalFloat (num) {
    if (num === '-') return 0
    return parseFloat(num) || num
}


function optionalInt (num) {
    if (num === '-') return 0
    return parseInt(num, 10)
}


function optionalBoolean (value) {
    return value.toLowerCase() === 'true'
}


function parseLine (line, lineDescriptor) {
    line = line.trim()
    if (line.length === 0 || line.startsWith('//'))
        return // encountered comment

    let tokens = line.match(/\S+/g)

    if (tokens.length !== lineDescriptor.columns.length) {
        console.error('invalid line:', line)
        return
    }

    const result = {}

    lineDescriptor.columns.forEach(function (c, i) {
        let lineResult

        if (c.type === 'string') lineResult = tokens[i]
        else if (c.type === 'int') lineResult = optionalInt(tokens[i])
        else if (c.type === 'float') lineResult = optionalFloat(tokens[i])
        else if (c.type === 'boolean') lineResult = optionalBoolean(tokens[i])
        else throw new Error('unsupported xt column type:', c.type)

        result[c.name] = lineResult
    })

    return result
}


export default function parse (inp, lineDescriptor) {
    const items = {},
        lines = inp.split('\n')

    lines.forEach(function (line) {
        const e = parseLine(line, lineDescriptor)
        if (e) {
            const key = lineDescriptor.getKey(e)
            items[key] = lineDescriptor.getValue(e)
        }
    })

    return items
}
