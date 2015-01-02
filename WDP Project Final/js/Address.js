/**
 * Created by Tom on 02.01.15.
 */

var Address = function (street, number, postalCode, city, countryCode, countryName) {
    this.getStreet = function () {
        return street
    }

    this.getNumber = function () {
        return number
    }

    this.getPostalCode = function () {
        return postalCode
    }

    this.getCity = function () {
        return city
    }

    this.getCountryCode = function () {
        return countryCode
    }

    this.getCountryName = function () {
        return countryName
    }

    this.getFormattedAddress = function () {
        return street + " " + number + "<br>" + countryCode + "-" + postalCode + " " + city + "<br>" + countryName.toUpperCase()
    }
}
