const geolocate = function(){
    console.log('running geolocate')
    return new Promise((resolve, reject) => {
        console.log('in geo promise')
        if("geolocation" in navigator){
            console.log('in the geolocation existing!')
            navigator.geolocation.getCurrentPosition(position => {
                console.log("about to resolve w", position)
                resolve(position)
            });
        } else {
            console.log('nah, about to reject')
            reject("you don't have geolocation!!")
        }
    })
}

export default geolocate
