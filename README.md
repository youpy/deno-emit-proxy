# deno-emit-proxy

A server that bundles dynamically specified deno modules as javascript and serves them to the client

## usage

```html
<html>
  <body>
    <script type="module">
      import hello from "https://deno-emit-proxy.deno.dev/x/hello@v0.0.3/mod.ts";

      hello();
    </script>
  </body>
</html>
```