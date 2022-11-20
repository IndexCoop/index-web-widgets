# IC Web Widgets

A bunch of widgets that can be embedded into other website (ie. Webflow).

## Infrastructure

Webflow does not host JavaScript files. While we can directly embed JS code, there are character limits so this is only feasible for small snippets.

Hosting widgets with iframes is one option but requires the application to be hosted somewhere. Unless we already have the infrastructure set up for this, this option is probably not worth it.

My proposed option at the moment, is to develop our widgets in React. The main reason for this is because React is a dependency for the charting library we will likely use. The Webflow app can then incorporate our externally host JS code with <script/>. For this option, the JS code needs to be publicly available.

### JS Hosting Options

**Private S3**

We could host our code with AWS S3. The current deployment relies on AWS CLI ran locally but this could be enhanced to run in some future CI/CD pipeline.

- ✓ self-hosted means greater control
- x self-hosted means we bear to cost of maintenance (fiat and time)

**jsDelivr (CDN)**

- ✓ Free
- ✓ No set up
- ✓ Supports versioning
- ? Availability, to be confirmed but should be high
- X Relying on a third party service provider

Determine CDN link with their online tool here:
https://www.jsdelivr.com/github

https://github.com/TheodoreChuang/index-web-widgets/blob/main/dist/index-web-widgets.js
-> https://cdn.jsdelivr.net/gh/TheodoreChuang/index-web-widgets@main/dist/index-web-widgets.js

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
<!-- S3 hosting -->
<script src="https://<bucket>.s3.<region>.amazonaws.com/bundle.js"></script>
<!-- jsDelivr hosting -->
<script src="https://cdn.jsdelivr.net/gh/TheodoreChuang/index-web-widgets@main/dist/index-web-widgets.js"></script>
```

B. Inserting a widget

1. Add Element > Advanced > Embed
2. Add custom code for whichever widget you would like

```
<div class="chart_widget" data-chart-type="line"></div>
```

C. Publish Site To Review Changes
