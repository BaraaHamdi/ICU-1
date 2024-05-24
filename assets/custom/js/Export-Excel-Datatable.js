Line.prototype.getHeight = function () {
    var max = 0;

    this.inlines.forEach(function (item) {
        max = Math.max(max, item.height || 0);
    });

    return max;
};