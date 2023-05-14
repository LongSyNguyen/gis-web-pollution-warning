/**
 * @Description
  house_number: số nhà
  road: tên đường
  neighbourhood: khu vực lân cận
  suburb: khu vực phụ cận
  city_district: quận/huyện (thành phố)
  city: thành phố
  county: tỉnh/thành phố trực thuộc trung ương
  state_district: quận/huyện (tỉnh)
  state: tỉnh/thành phố trực thuộc trung ương
  postcode: mã bưu chính
  country: quốc gia
  country_code: mã quốc gia ISO 3166-1 alpha-2
  town: thị trấn
 */

async function getAddress(params) {
  let lat = params.lat;
  let long = params.long;
  let full_address = params.full_address;
  let house_number = params.house_number
  let road = params.road
  let neighbourhood = params.neighbourhood
  let suburb = params.suburb
  let city_district = params.city_district
  let city = params.city
  let county = params.county
  let state_district = params.state_district
  let state = params.state
  let postcode = params.postcode
  let country = params.country
  let country_code = params.country_code
  let town = params.town

  const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${long}`;
  const response = await fetch(url);
  const response_json = await response.json();
  let data = {};

  if (full_address) {
    data.full_address = response_json.display_name;
  }
  if (house_number) {
    if (response_json.address.house_number) {
      data.house_number = response_json.address.house_number;
    }
  }
  if (road) {
    if (response_json.address.road) {
      data.road = response_json.address.road;
    }
  }
  if (neighbourhood) {
    if (response_json.address.neighbourhood) {
      data.neighbourhood = response_json.address.neighbourhood;
    }
  }
  if (suburb) {
    if (response_json.address.suburb) {
      data.suburb = response_json.address.suburb;
    }
  }
  if (city_district) {
    if (response_json.address.city_district) {
      data.city_district = response_json.address.city_district;
    }
  }
  if (city) {
    if (response_json.address.city) {
      data.city = response_json.address.city;
    }
  }
  if (county) {
    if (response_json.address.county) {
      data.county = response_json.address.county;
    }
  }
  if (state_district) {
    if (response_json.address.state_district) {
      data.state_district = response_json.address.state_district;
    }
  }
  if (state) {
    if (response_json.address.state) {
      data.state = response_json.address.state;
    }
  }
  if (postcode) {
    if (response_json.address.postcode) {
      data.postcode = response_json.address.postcode;
    }
  }
  if (country) {
    if (response_json.address.country) {
      data.country = response_json.address.country;
    }
  }
  if (country_code) {
    if (response_json.address.country_code) {
      data.country_code = response_json.address.country_code;
    }
  }
  if (town) {
    if (response_json.address.town) {
      data.town = response_json.address.town;
    }
  }

  return data;
}

module.exports = getAddress;