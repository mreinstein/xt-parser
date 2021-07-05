# xt-parser
minimal, simplistic parser for separated value text files.

In several toy projects I use a very simplistic white space separated data file format. I end these data files with `.xt`

This module accespts a descriptor object that describes a row in the data file, and parses out that text into javascript objects.


## usage

Let's say you have a `sounds.xt` file that contains the following data:

```
// sound            count
footstep_wood         4
footstep_stone        4
jump                  1
```

```javascript
import xtParser from './xt-parser.js'


const soundLineDescriptor = {
    columns: [
        {
            name: 'sound',
            type: 'string',
            optional: false,
        },
        {
            name: 'count',
            type: 'int',
            optional: false,
        },
    ],

    getKey: function (entry) {
        return entry.sound
    },

    getValue: function (entry) {
        return entry.count
    },
}


async function main () {
	const raw = await fetch('/sounds.xt')
    const result = await raw.text()
	// parse the .xt file into a javascript object
    soundCounts = xtParser(result, soundLineDescriptor)
	console.log(soundCounts)  // { footstep_wood: 4, footstep_stone: 4, jump: 1 }
}


main()
```
