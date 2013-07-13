function replace()
{
  function o2a(txt)
  {
    return txt.replace(/o/g, 'a').replace(/O/g, 'A');
  }
  function getNodesWithText(from)
  {
    var everything = from.querySelectorAll('*');
    var node, children, i, l, cI, cL;
    var result = [];
    for (i = 0, l = everything.length; i < l; i++)
    {
      node = everything[i];
      children = node.childNodes;
      for (cI = 0, cL = children.length; cI < cL; cI++)
      {
        if (children[cI].nodeName === '#text' && !/^\s*$/.test(children[cI].nodeValue))
        {
          result.push(node);
          break;
        }
      }
    }
    return result;
  }
  function inputsKeypressHandler(e)
  {
    var charCode = e.which || e.keyCode;
    if(charCode && charCode > 32)
    {
      e.preventDefault();
      var full = this.value;
      var keyChar = o2a(String.fromCharCode(charCode));
      var start = this.selectionStart || full.length,
          end = this.selectionEnd || start;
      var before = full.substring(0, start),
          after = full.substring(end);
      this.value = before + keyChar + after;
      this.selectionStart = this.selectionEnd = start + 1;
    }
  }
  function inputsPasteHandler(e)
  {
    /*Replaces everything in the textarea*/
    var elm = this;
    setTimeout(function() { inputsFullReplace(elm); }, 1);
  }
  function inputsFullReplace(i)
  {
    i.value = o2a(i.value);
  }
  var textNodes = getNodesWithText(document.body);
  for (var i = 0, l = textNodes.length; i < l; i++)
    if(textNodes[i].nodeName.toLowerCase() != 'textarea')
      textNodes[i].innerText = o2a(textNodes[i].innerText);
  document.title = o2a(document.title);
  var inputs = document.body.querySelectorAll('textarea, input[type=text]');
  for (var i = 0, l = inputs.length; i < l; i++)
  {
    inputs[i].value = o2a(inputs[i].value);
    inputs[i].onkeypress = inputsKeypressHandler;
    inputs[i].onpaste = inputsPasteHandler;
  }
}
replace();
