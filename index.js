const data = {
  services: [
    {
      id: 1,
      head: null,
      name: "Проф.осмотр",
      node: 0,
      price: 100.0,
      sorthead: 20,
    },
    {
      id: 2,
      head: null,
      name: "Хирургия",
      node: 1,
      price: 0.0,
      sorthead: 10,
    },
    {
      id: 3,
      head: 2,
      name: "Удаление зубов",
      node: 1,
      price: 0.0,
      sorthead: 10,
    },
    {
      id: 4,
      head: 3,
      name: "Удаление зуба",
      node: 0,
      price: 800.0,
      sorthead: 10,
    },
    {
      id: 5,
      head: 3,
      name: "Удаление 8ого зуба",
      node: 0,
      price: 1000.0,
      sorthead: 30,
    },
    {
      id: 6,
      head: 3,
      name: "Удаление осколка зуба",
      node: 0,
      price: 2000.0,
      sorthead: 20,
    },
    {
      id: 7,
      head: 2,
      name: "Хирургические вмешательство",
      node: 0,
      price: 200.0,
      sorthead: 10,
    },
    {
      id: 8,
      head: 2,
      name: "Имплантация зубов",
      node: 1,
      price: 0.0,
      sorthead: 20,
    },
    {
      id: 9,
      head: 8,
      name: "Коронка",
      node: 0,
      price: 3000.0,
      sorthead: 10,
    },
    {
      id: 10,
      head: 8,
      name: "Слепок челюсти",
      node: 0,
      price: 500.0,
      sorthead: 20,
    },
  ],
};

function createHtmlNode(tag, params) {
  const element = document.createElement(tag);

  if (params.style) {
    element.setAttribute("style", params.style);
  }

  if (params.children) {
    element.append(...params.children);
  }

  return element;
}

function createDataList(array) {
  return array.map((item) => {
    if (item.node) {
      return createHtmlNode("li", {
        children: [
          createHtmlNode("details", {
            children: [
              createHtmlNode("summary", { children: [item.name] }),
              createHtmlNode("ul", {
                children: createDataList(item.children),
              }),
            ],
          }),
        ],
      });
    } else {
      return createHtmlNode("li", {
        children: [`${item.name} (${item.price})`],
      });
    }
  });
}

function createDomElement(treeList) {
  return createHtmlNode("ul", {
    children: createDataList(treeList),
  });
}

const html = createDomElement(parseData(data));

document.getElementById("app").append(html);
