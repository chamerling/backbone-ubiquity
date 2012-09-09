if (typeof exports == 'undefined') { //Client side
    Models = window.Models = {};
} else { //Server side
    mongo.connect(["humans", "animals", "users"],'db');
    //mongo.connect(["humans", "animals"],'db');
    require('./animals.js');
    require('./humans.js');
    require('./users.js');
}

//typeof exports === 'undefined' ? Models = window.Models = {}:null;