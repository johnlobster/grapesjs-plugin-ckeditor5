# GrapesJS CKEditor5

This plugin replaces the default Rich Text Editor with CKEditor5 inline build

# *Under development DO NOT USE*

## Summary

* Plugin
  * Name: `gjs-plugin-ckeditor5`
  * Options:
      * `options` CKEditor5's configuration object, eg. `{ language: 'en', toolbar: [...], ...}`
      * `position` Position side of the toolbar, default: `left`, options: `left|center|right`

Ckeditor5 information can be found at https://ckeditor.com/docs/ckeditor5/latest/  
This plugin uses v15.0.0

## Download

* `npm i grapesjs-plugin-ckeditor5` or `yarn add grapesjs-plugin-ckeditor5`
* Latest release link https://github.com/johnlobster/grapesjs-plugin-ckeditor5/releases/latest



## Usage

```html
<script src="https://cdn.ckeditor.com/ckeditor5/15.0.0/inline/ckeditor.js"></script>
<link href="path/to/grapes.min.css" rel="stylesheet"/>
<script src="path/to/grapes.min.js"></script>
<script src="path/to/grapesjs-plugin-ckeditor.min.js"></script>

<div id="gjs"></div>

<script type="text/javascript">
  var editor = grapesjs.init({
      container : '#gjs',
      plugins: ['gjs-plugin-ckeditor'],
      pluginsOpts: {
        'gjs-plugin-ckeditor': {/* ...options */}
      }
  });
</script>
```



## Development

Clone the repository

```sh
$ git clone https://github.com/artf/grapesjs-plugin-ckeditor.git
$ cd grapesjs-plugin-ckeditor
```

Install dependencies

```sh
$ npm i
```

The plugin relies on GrapesJS and CKEditor via `peerDependencies` so you have to install them manually

```sh
$ npm i grapesjs ckeditor --no-save
```

Start the dev server

```sh
$ npm start
```


## License

BSD 3-Clause
