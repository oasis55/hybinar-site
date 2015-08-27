module.filter('declOfNum', [function () {
    return function (number, titles) {
        if((!number || !titles) && number !== 0) return undefined;

        var cases = [2, 0, 1, 1, 1, 2];
        return number + ' ' + titles[ (number%100>4 && number%100<20)? 2 : cases[(number%10<5)?number%10:5] ];
    };
}]);