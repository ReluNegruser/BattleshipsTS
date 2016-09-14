var HelloWorld = (function () {
    function HelloWorld(message) {
        this.message = message;
    }
    return HelloWorld;
}());
var hello = new HelloWorld('Hi there!');
console.log(hello.message);
//# sourceMappingURL=controller.js.map