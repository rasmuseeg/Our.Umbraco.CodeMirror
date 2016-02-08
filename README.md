# CodeMirror Editors for UmbracoCMS
Adds CodeMirror editors to your UmbracoCMS

## Installation

### Our Umbraco
The package can be installaed trough Our Umbraco Packages

### NuGet
The package is available to install trough NuGet repostiory
```
PM > Install-Package Our.Umbraco.CodeMirror
```

### Manual installation

## Editors

### File editor
#### Config
#### Usage


### Multiple files editor
#### Config
#### Usage


### Grid editor
The Grid editor allows you to write code with highligting

#### Config
Add the following snippet to ``~/config/grid.editors.config.js``
```
{
    "name": "Code",
    "alias": "code",
    "view": "~/app_plugins/codemirror/views/grid-file-editor.html",
    "render": "~/app_plugins/codemirror/render/grid-file-editor.cshtml",
    "icon": "icon-brackets"
}

```
#### Usage
1. Allow the editor on your Grid Editor datatype
2. Add the editor, on the grid layout.
3. Start writing your code
4. Render the code on the front-end
5. Add your favorite code highligter


## Roadmap
* Save files to path
* Include to highligt code on frontend