# CodeMirror Editor for Umbraco
Adds CodeMirror Editor to Umbraco

# Installation
1. Install zip from Umbraco Repository or manualy
2. Create a new DataType with *CodeMirror* editor

## DataType
Base configuration
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
* 
