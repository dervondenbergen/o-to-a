function replace() {
    function getNodesWithText(from) {
        var everything = from.querySelectorAll('*');
        var node, children, i, l, cI, cL;
        var result = [];
        for (i = 0, l = everything.length; i < l; i++) {
            node = everything[i];
            children = node.childNodes;
            for (cI = 0, cL = children.length; cI < cL; cI++) {
                if (children[cI].nodeName === '#text' && !/^\s*$/.test(children[cI].nodeValue)) {
                    result.push(node);
                    break;
                }
            }
        }
        return result;
    }
    var textNodes = getNodesWithText(document.body);
    for (var i = 0, l = textNodes.length; i < l; i++)
    textNodes[i].innerText = textNodes[i].innerText.replace(/o/g, "a");
}
