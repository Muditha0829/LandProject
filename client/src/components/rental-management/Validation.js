
export const checkValidation = (data) => {

    if(data.type == ""){
        return "Please Select Rental Type";
    }else if(data.town == ""){
        return "Please Insert Town / City";
    }else if(data.street == ""){
        return "please Insert Street";
    }else if(data.heading == ""){
        return "Please Insert Heading";
    }else if(data.description == ""){
        return "Please Insert Description";
    }else if(data.floorArea == "" || !/\d{2,5}/i.test(Number(data.floorArea) || !/^[^.a-zA-Z]+$/i.test(data.floorArea))){
        return "Please Insert Valid Floor Area";
    }else if(data.nearBus == "" || !/^[^.a-zA-Z]+$/i.test(data.nearBus)){
        return "Please Insert Nearest Bus";
    }else if(data.nearTrain == "" || !/^[^.a-zA-Z]+$/i.test(data.nearTrain)){
        return "Please Insert Nearest Train";
    }else if(data.minTerm == "" || !/^[^.a-zA-Z]+$/i.test(data.minTerm)){
        return "Please Insert Minimum Term";
    }else if(data.PriceRS == "" || !/^[0-9]{5,9}$/i.test(Number(data.PriceRS))){
        return "Please Insert Valid Price RS";
    }else if(data.noOfDay == ""){
        return "Please Insert No Of Days";
    }else if(data.priceForeign == "" || !/^[0-9]{5,9}$/i.test(Number(data.priceForeign))){
        return "Please Insert valid Price Foreign";
    }else if(data.perMonth == ""){
        return "Please Insert Per Month";
    }else if(data.availability == ""){
        return "Please Insert Availability";
    }else if(data.owner == ""){
        return "Please Insert Owner";
    }else if(data.name == ""){
        return "Please Insert Name";
    }else if(data.email == ""){
        return "Please Insert E-mail";
    }else if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(data.email)){
        return "Please Insert Valid Email";
    }else if(data.number == "" || !/^(\+\d{1,2}\s?)?1?\-?\.?\s?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/i.test(data.number)){
        return "Please Insert valid mobile Number";
    }else{
        return "clear";
    }
  }
  /**
   * mobile number matches
   * 1-718-444-1122
    718-444-1122
    (718)-444-1122
    17184441122
    7184441122
    718.444.1122
    1718.444.1122
    1-123-456-7890
    1 123-456-7890
    1 (123) 456-7890
    1 123 456 7890
    1.123.456.7890
    +91 (123) 456-7890
    18005551234
    1 800 555 1234
    +1 800 555-1234
    +86 800 555 1234
    1-800-555-1234
    1 (800) 555-1234
    (800)555-1234
    (800) 555-1234
    (800)5551234
    800-555-1234
    800.555.1234
    18001234567
    1 800 123 4567
    1-800-123-4567
    +18001234567
    +1 800 123 4567
    +1 (800) 123 4567
    1(800)1234567
    +1800 1234567
    1.8001234567
    1.800.123.4567
    +1 (800) 123-4567
    18001234567
    1 800 123 4567
    +1 800 123-4567
    +86 800 123 4567
    1-800-123-4567
    1 (800) 123-4567
    (800)123-4567
    (800) 123-4567
    (800)1234567
    800-123-4567
    800.123.4567
    1231231231
    123-1231231
    123123-1231
    123-123 1231
    123 123-1231
    123-123-1231
    (123)123-1231
    (123)123 1231
    (123) 123-1231
    (123) 123 1231
    +99 1234567890
    +991234567890
    (555) 444-6789
    555-444-6789
    555.444.6789
    555 444 6789
    18005551234
    1 800 555 1234
    +1 800 555-1234
    +86 800 555 1234
    1-800-555-1234
    1.800.555.1234
    +1.800.555.1234
    1 (800) 555-1234
    (800)555-1234
    (800) 555-1234
    (800)5551234
    800-555-1234
    800.555.1234
    (003) 555-1212
    (103) 555-1212
    (911) 555-1212
    18005551234
    1 800 555 1234
    +86 800-555-1234
    1 (800) 555-1234
   */