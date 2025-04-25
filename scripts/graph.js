document.addEventListener("DOMContentLoaded", function () {
    fetch('data/reading_list.json')
        .then(response => response.json())
        .then(data => {
            const nodes = [];
            const edges = [];
            const nodeSet = new Set();
            const user = "Moi"; // Simulated user node

            // Add user node
            nodes.push({ id: user, label: user });
            nodeSet.add(user);

            // Add books as nodes and connect them to user
            data.forEach((entry, index) => {
                if (!nodeSet.has(entry.title)) {
                    nodes.push({ id: entry.title, label: entry.title });
                    nodeSet.add(entry.title);
                }
                edges.push({ from: user, to: entry.title, label: "lit" });
            });

            const container = document.getElementById('viz');
            const dataVis = {
                nodes: new vis.DataSet(nodes),
                edges: new vis.DataSet(edges)
            };
            const options = {
                nodes: {
                    shape: 'dot',
                    size: 16,
                    font: {
                        size: 14
                    }
                },
                edges: {
                    arrows: 'to'
                }
            };
            const network = new vis.Network(container, dataVis, options);
        })
        .catch(error => {
            console.error("Error loading JSON:", error);
        });
});