function parseData(json) {
  const data = JSON.parse(json);
  return recursiveSort(createForest(data));
}

function createTreeNode(data) {
  const node = {
    id: data.id,
    name: data.name,
    price: data.price,
    sorthead: data.sorthead,
    head: data.head,
    node: data.node,
  };
  if (data.node) {
    node["children"] = [];
  }
  return node;
}

function findParentNode(node, arr) {
  let parent = arr.find((item) => item.id == node.head);
  if (parent) return parent;

  for (const item of arr) {
    if (item.node === 0) continue;
    parent = findParentNode(node, item.children);
    if (parent) return parent;
  }
  return null;
}

function createForest(data) {
  return data.services.reduce((prev, curr) => {
    const node = createTreeNode(curr);
    let parent = null;

    if (node.head) {
      parent = findParentNode(node, prev);
      if (parent) {
        parent.children.push(node);
      }
      return prev;
    } else {
      return [...prev, node];
    }
  }, []);
}

function recursiveSort(data) {
  data.sort((a, b) => a.sorthead - b.sorthead);
  data.forEach((element) => {
    if (element.node) recursiveSort(element.children);
  });

  return data;
}
