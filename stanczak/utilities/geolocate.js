const geolocate = function(){
    return new Promise((resolve, reject) => {
        if("geolocation" in navigator){
            navigator.geolocation.getCurrentPosition(position => {
                resolve(position)
            });
        } else {
            reject("you don't have geolocation!")
        }
    })
}

export default geolocate
