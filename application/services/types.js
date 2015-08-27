module.service('types', [function () {

    var types = [
        ['jpg|jpeg|jpe|gif|png|bmp|tif|tiff|ico', 'mdi-file-image'],
        ['asf|asx|wmv|wmx|wm|avi|divx|flv|mov|qt|mpeg|mpg|mpe|mp4|m4v|ogv|webm|mkv', 'mdi-file-video'],
        ['txt|asc|c|cc|h|csv|csv|tsv|ics|rtx|css|htm|html', 'mdi-file-document'],
        ['mp3|m4a|m4b|ra|ram|wav|ogg|oga|mid|midi|wma|wax|mka', 'mdi-file-music'],
        ['rtf|js|swf|class|tar|tar|zip|gz|gzip|rar|7z|exe', 'mdi-file'],
        ['doc|docx|docm|dotx|dotm', 'mdi-file-word'],
        ['pot|pps|ppt|pptx|pptm|ppsx|ppsm', 'mdi-file-powerpoint'],
        ['xla|xls|xlt|xlw|xlsx|xlsm|xlsb|xltx|xltm|xlam', 'mdi-file-excel'],
        ['pdf', 'mdi-file-pdf']],
        defaultClass = 'mdi-file';

    return {
        getIcon: function (fileName) {
            var arr = fileName.split('.'),
                type = arr[arr.length - 1];

            for (var c = 0; c < types.length; c++) {
                if (types[c][0].indexOf(type) >= 0) {
                    return types[c][1];
                }
            }

            return defaultClass;
        }
    }
}]);