# IC Web Widgets

A bunch of widgets that can be embedded into other website (ie. Webflow). These widgets have developed as client-side rendered React applications.

## Dependencies

- jsDelivr: free CDN for hosting the application files
- Index's API: provides the data that powers these charts.

## Release Process

1. Create feature branch and develop feature.
2. When development is complete, `yarn build` and also commit the artifact `dist/index-web-widgets.js`.
3. Review and merge into `main`.
4. Create a new tag and release in Github.
5. Generate a new CDN URL with (jsDelivr Github tool)[https://www.jsdelivr.com/github].

- https://github.com/IndexCoop/index-web-widgets/blob/1.0.0/dist/index-web-widgets.js
- https://cdn.jsdelivr.net/gh/IndexCoop/index-web-widgets@1.0.0/dist/index-web-widgets.js

5. Update the script src for the website with the new CDN URL. See Webflow set up for more details.

## Infrastructure

This application is a single JavaScript file hosted on jsDelivr.

## Development

```bash
# Install external dependencies
yarn install

# Start local instance of the application
yarn start

# Lint
yarn lint:fix

# Compile code for production
yarn build

# Deploy built code
yarn deploy

# Combination on build and deploy
yarn build-deploy
```

### Adding a new widget

1. Add a new component in the `/src/widget` directory
2. Append the new component to the `app.js` switch statement
3. Append the new component to the `/dist/index.html` to view the component

## Webflow Set Up

A. Insert this widget library so that it is available for the entire site.

1. From your site, go to `Site settings` from the menu
2. Go to `Custom Code` section
3. In the `Footer code` section insert the script like the following:

```
<!-- S3 hosting -->
<script src="https://<bucket>.s3.<region>.amazonaws.com/bundle.js"></script>
<!-- jsDelivr hosting -->
<script src="https://cdn.jsdelivr.net/gh/IndexCoop/index-web-widgets@1.0.1/dist/index-web-widgets.js"></script>
```

B. Inserting a widget

1. Add Element > Advanced > Embed
2. Add custom code for **one** of the following widgets you would like to insert

```
<!-- Token Allocation (Pie Chart) -->
<div class="index_web_widget" data-widget-type="chart-token-allocation" data-token-symbol="DPI"></div>
<div class="index_web_widget" data-widget-type="chart-token-allocation" data-token-symbol="MVI"></div>
<div class="index_web_widget" data-widget-type="chart-token-allocation" data-token-symbol="BED"></div>

<!-- Price (Line Chart) -->
<div class="index_web_widget" data-widget-type="chart-token-line" data-token-symbol="DPI"></div>
<div class="index_web_widget" data-widget-type="chart-token-line" data-token-symbol="MVI"></div>
<div class="index_web_widget" data-widget-type="chart-token-line" data-token-symbol="BED"></div>
```

C. Publish Site To Review Changes

## TODO

- add unit test

## Archived: Initial Infrastructure Considerations

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

Commited file: https://github.com/TheodoreChuang/index-web-widgets/blob/1.0.0/dist/index-web-widgets.js
->
CDN automatically available at: https://cdn.jsdelivr.net/gh/TheodoreChuang/index-web-widgets@1.0.0/dist/index-web-widgets.js

We will need to either use release versions or somehow invalid their cache if we don't; otherwise, updates to the same compile files will not get reflected.
