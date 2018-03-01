export default function getChildrenWithoutParentSelector(parent, selector, exclusionSelector = null) {
    let foundElements = [];
    for(const child of parent.children) {
        if(null !== exclusionSelector && child.matches(exclusionSelector)) {
            continue;
        }
        if(child.matches(selector)) {
            foundElements.push(child);
        }
        foundElements.push(...getChildrenWithoutParentSelector(child, selector, exclusionSelector));
    }
    return foundElements;
}