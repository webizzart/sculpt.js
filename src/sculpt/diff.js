export function mergeDiff(newNodes, oldNodes) {
  const keys = [];
  let lastNode;
  let lastIndex = 0;
  
  //from the inner element to the wrapper
  newNodes.reverse().forEach((node, index) => {
    if (node.key) {
      keys.push(node.key);
      //TODO: first check the same index element and if not, try find the key..
      const findIndex = oldNodes.findIndex(on => on.key === node.key);
      if (findIndex > -1) {
        //founded
        lastNode = oldNodes[findIndex];
        lastIndex = findIndex;
        if (lastNode.element.nodeType === 1 && node.element.nodeType === 1) {
          //diff attributes..
          diffAttrs(node, lastNode);
          //TODO: diff tag name
        }
        if (lastNode.element.firstChild && node.element && node.element.firstChild && node.element.firstChild.nodeType === 3 && lastNode.element.firstChild.nodeType === 3 && node.element.firstChild.textContent !== lastNode.element.firstChild.textContent) {
          console.warn("[diff] text was replaced");
          const replacedElement = lastNode.element;
          oldNodes[findIndex] = { key: node.key, element: node.element };
          replacedElement.parentNode.replaceChild(node.element, replacedElement);
          lastNode = oldNodes[findIndex];
        }
      }
      else {
        // create new..
        console.warn("[diff] create new element");
        oldNodes.splice(lastIndex, 0, node);
        lastNode.element.parentNode.insertBefore(node.element, lastNode.element);

      }
    }
  });
  oldNodes.filter(node => !keys.includes(node.key)).forEach(node => {
    console.warn("[diff] node removed from dom..");
    node.element.remove();
  });

}

function diffAttrs(node, lastNode) {
  Array.from(node.element.attributes).forEach(attr => {
    const oldAttr = lastNode.element.getAttribute(attr.name);
    const newAttr = node.element.getAttribute(attr.name);
    if (oldAttr !== newAttr) {
      lastNode.element.setAttribute(attr.name, newAttr);
      console.warn("[diff] attr changed");
    }
  });
}
