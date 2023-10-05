import {encoded, translations} from './data.js'

let excluded = ['groupId', 'service', 'formatSize', 'ca']  // массив полей которые не надо декодировать
const decoded = []

const decode = () => {
    encoded.map((item) => {
        for (const key in item) {
            if (item[key] === null || excluded.includes(key)) {
                continue
            } else {
                item[key] = translations[item[key]]
                console.log(item)
            }
        }
        decoded.push(item)
    })
}

decode()
console.log(decoded)

const itemsWithUniqueIds = []
const findUnique = () => {
    encoded.map((item) => {
        let keys = []
        let ans = {}
        for (const key in item) {
            if (item[key] === null || keys.includes(item[key])) {
                continue
            } else {
                ans[key] = item[key]
                keys.push(item[key])
            }
        }
        itemsWithUniqueIds.push(ans)
    })
}
findUnique()
console.log(itemsWithUniqueIds)