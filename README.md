# CodeMirror Editor for Umbraco
OBS: THIS IS A WORK IN PROGRESS

Adds CodeMirror Editor to Umbraco

# Installation:

## DocumentType:

1. Install zip or from Umbraco Repository browser
2. Create new DataType with CodeMirror, setup config.
3. Assign the new CodeMirror DataType to a document

## GridLayout:

1. Open *~/config/grid.editors.config.json*
2. Add the following snippet, to the end of the file before the closing "}":
<pre><code>
{
    "name": "Code editor",
    "alias": "code",
    "view": "~/App_Plugins/CodeMirror/Grid/Views/code.html",
    "render": "~/App_Plugins/CodeMirror/Grid/Render/code.cshtml",
    "icon": "icon-brackets"
}
</code></pre>
3. In Umbraco Backoffice open your grid layout DataType and assign "Code editor" to your columns
    * By default if "allow all" is enabled it will be available in your grid layout.

## DataType Configuration
<pre><code>
{
    label: "Show line numbers",
    description: "Whether to show line numbers to the left of the editor.",
    key: "lineNumbers",
    view: "boolean",
    defaultValue: "1"
},
{
    label: "Wrap words",
    description: "Whether CodeMirror should scroll or wrap for long lines. Defaults to false (scroll).",
    key: "lineWrapping",
    view: "boolean",
    defaultValue: "0"
},
{
    label: "Smart indent",
    description: "Whether to use the context-sensitive indentation that the mode provides (or just indent the same as the line before). Defaults to true.",
    key: "smartIndent",
    view: "boolean",
    defaultValue: "1"
},
{
    label: "Indent with tabs",
    description: "Whether, when indenting, the first N*tabSize spaces should be replaced by N tabs. Default is false.",
    key: "indentWithTabs",
    view: "boolean",
    defaultValue: "0"
},
{
    label: "Tab size",
    description: "The width of a tab character. Defaults to 4.",
    key: "tabSize",
    view: "number",
    defaultValue: "4"
}</code></pre>

# What is in the box?
* DataType
* Grid Editor + Render view


# Plans
* Add configuration option for default mode - select list
* Add configuration option for availble modes - multiple select list 
* Add support for CodeMirror mode selection - select list in controller view 
