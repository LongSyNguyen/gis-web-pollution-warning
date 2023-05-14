function calResultByAqi(aqi) {
    let result
    if(aqi >=0 && aqi <=50) {
        result = 1;
    } else if(aqi >=51 && aqi <=100) {
        result = 2;
    } else if(aqi >=101 && aqi <=150) {
        result = 3;
    } else if(aqi >=151 && aqi <=200) {
        result = 4;
    } else if(aqi >=201 && aqi <=300) {
        result = 5;
    } else {
        result = 6;
    }
    return result;
}

module.exports = calResultByAqi;