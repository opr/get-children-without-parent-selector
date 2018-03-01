export default function getChildrenWithoutParentSelector(parent, selector, exclusionSelector = null) {
    let foundElements = [];
    for(const c of parent.children) {
        if(null !== exclusionSelector && c.matches(exclusionSelector)) {
            continue;
        }
        if(c.matches(selector)) {
            foundElements.push(c);
        }
        foundElements.push(...getChildrenWithoutParentSelector(c, selector, exclusionSelector));
    }
    return foundElements;
}