import express from "express";
import * as env from "@env/environment";

const app = express();

app.get("/api/hello_world", (req, res) => {
    res.send("<h1>Hello, World</h1>")
})

app.get("/api/v1/items", (req, res) => {
    res.send([
        {
            name: "Pencil",
            id: 1,
        },
        {
            name: "Apple",
            id: 2,
        },
        {
            name: "T-shirt",
            id: 3,
        }
    ])
})

const print = (path: any, layer: any) => {
  if (layer.route) {
    layer.route.stack.forEach(print.bind(null, path.concat(split(layer.route.path))))
  } else if (layer.name === 'router' && layer.handle.stack) {
    layer.handle.stack.forEach(print.bind(null, path.concat(split(layer.regexp))))
  } else if (layer.method) {
    console.log('%s /%s',
      layer.method.toUpperCase(),
      path.concat(split(layer.regexp)).filter(Boolean).join('/'))
  }
}

const split = (thing: any) => {
  if (typeof thing === 'string') {
    return thing.split('/')
  } else if (thing.fast_slash) {
    return ''
  } else {
    var match = thing.toString()
      .replace('\\/?', '')
      .replace('(?=\\/|$)', '$')
      .match(/^\/\^((?:\\[.*+?^${}()|[\]\\\/]|[^.*+?^${}()|[\]\\\/])*)\$\//)
    return match
      ? match[1].replace(/\\(.)/g, '$1').split('/')
      : '<complex:' + thing.toString() + '>'
  }
}

console.log("Express Routes:")
app._router.stack.forEach(print.bind(null, []))
console.log("")

app.listen(env.values.API_PORT, () => {
    console.log(`Express listening on port: ${env.values.API_PORT}`);
});