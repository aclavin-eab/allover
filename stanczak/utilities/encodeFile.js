const reader = new FileReader()

const encodeFile = function(file){
    return new Promise((resolve, reject) => {
        reader.readAsDataURL(file)
        reader.onloadend = (ev) => {
            resolve(reader.result)
            // objy.imageName = submitEv.target.imageName.value
        }
        reader.onerror = (ev) => {
            reject(reader.error)
        }
    })
}

export default encodeFile
