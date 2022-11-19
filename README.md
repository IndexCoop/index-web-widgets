# IC Web Widgets

A bunch of widgets that can be embedded into other website (ie. Webflow).

## Infrastructure

The JS code needs to be publicly available. At the momentm this is hosted with AWS S3.
The main application can then consume these widgets by incorporating the JS code.

Deployment relies on AWS ClI.

## Development

### Adding a new widget

1. Add a new component in the `/src/widget` directory
2. Append the new component to the `app.js` switch statement
3. Append the new component to the `/dist/index.html` to view the component

## Webflow Set Up

A. For each page that will be consuming these widgets, you will first need to add the JavaScript.

1. Go to page settings
2. Go to `Custom Code` section
3. In the `Before </body> tag` subsection insert the previous build and deploy JS

```
<script src="https://<bucket>.s3.<region>.amazonaws.com/bundle.js"></script>
```

B. Inserting a widget

1. Add Element > Advanced > Embed
2. Add custom code for whichever widget you would like

```
<div class="chart_widget" data-chart-type="line"></div>
```

C. Publish Site To Review Changes
