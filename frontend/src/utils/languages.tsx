import {DiGroovy, DiJava, DiLess, DiProlog} from 'react-icons/di';
import {GiRazor} from 'react-icons/gi';
import {IoLogoVue, IoText} from 'react-icons/io5';
import {MdHttp} from 'react-icons/md';
import {
	SiAngular,
	SiApache,
	SiAstro,
	SiBat,
	SiC,
	SiClojure,
	SiCmake,
	SiCoffeescript,
	SiCplusplus,
	SiCrystal,
	SiCsharp,
	SiCss3,
	SiD,
	SiDart,
	SiDocker,
	SiElixir,
	SiElm,
	SiErlang,
	SiFishshell,
	SiFortran,
	SiFsharp,
	SiGit,
	SiGo,
	SiGodotengine,
	SiGraphql,
	SiHandlebarsdotjs,
	SiHashicorp,
	SiHaskell,
	SiHtml5,
	SiJavascript,
	SiJinja,
	SiJson,
	SiJulia,
	SiKotlin,
	SiLatex,
	SiLua,
	SiMake,
	SiMarkdown,
	SiMarko,
	SiMdx,
	SiMermaid,
	SiNginx,
	SiNim,
	SiNixos,
	SiNushell,
	SiOcaml,
	SiPerl,
	SiPhp,
	SiPostcss,
	SiPowershell,
	SiPrisma,
	SiPug,
	SiPuppet,
	SiPurescript,
	SiPython,
	SiR,
	SiRacket,
	SiReact,
	SiRiscv,
	SiRuby,
	SiRust,
	SiSass,
	SiScala,
	SiShell,
	SiSolidity,
	SiSplunk,
	SiStylus,
	SiSvelte,
	SiSwift,
	SiTerraform,
	SiToml,
	SiTypescript,
	SiTypst,
	SiV,
	SiVim,
	SiVisualbasic,
	SiWebassembly,
	SiWolfram,
	SiYaml,
	SiZig,
} from 'react-icons/si';
import {TbFileTypeXml} from 'react-icons/tb';

export const findLanguage = (value: string): Language | undefined =>
	languages.find(
		(language: Language): boolean =>
			language.key === value || language.name === value,
	);

export type Language = {
	name: string;
	key: string;
	icon: JSX.Element;
};

// https://shiki.matsu.io/languages
export const languages: Language[] = [
	{ name: "Text", key: "none", icon: <IoText /> },
	{ name: "ABAP", key: "abap", icon: <IoText /> },
	{ name: "ActionScript", key: "actionscript-3", icon: <IoText /> },
	{ name: "Ada", key: "ada", icon: <IoText /> },
	{ name: "Angular (HTML)", key: "angular-html", icon: <SiAngular /> },
	{ name: "Angular (TypeScript)", key: "angular-ts", icon: <SiAngular /> },
	{ name: "Apache", key: "apache", icon: <SiApache /> },
	{ name: "Apex", key: "apex", icon: <IoText /> },
	{ name: "APL", key: "apl", icon: <IoText /> },
	{ name: "Astro", key: "astro", icon: <SiAstro /> },
	{ name: "Batch File", key: "bat", icon: <SiBat /> },
	{ name: "Beancount", key: "beancount", icon: <IoText /> },
	{ name: "Berry", key: "berry", icon: <IoText /> },
	{ name: "BibTeX", key: "bibtex", icon: <IoText /> },
	{ name: "Bicep", key: "bicep", icon: <IoText /> },
	{ name: "Blade", key: "blade", icon: <IoText /> },
	{ name: "C", key: "c", icon: <SiC /> },
	{ name: "Cadence", key: "cadence", icon: <IoText /> },
	{ name: "Clarity", key: "clarity", icon: <IoText /> },
	{ name: "Clojure", key: "clojure", icon: <SiClojure /> },
	{ name: "CMake", key: "cmake", icon: <SiCmake /> },
	{ name: "COBOL", key: "cobol", icon: <IoText /> },
	{ name: "CodeQL", key: "codeql", icon: <IoText /> },
	{ name: "CoffeeScript", key: "coffeescript", icon: <SiCoffeescript /> },
	{ name: "Common Lisp", key: "common-lisp", icon: <IoText /> },
	{ name: "C++", key: "cpp", icon: <SiCplusplus /> },
	{ name: "Crystal", key: "crystal", icon: <SiCrystal /> },
	{ name: "C#", key: "csharp", icon: <SiCsharp /> },
	{ name: "CSS", key: "css", icon: <SiCss3 /> },
	{ name: "CSV", key: "csv", icon: <IoText /> },
	{ name: "CUE", key: "cue", icon: <IoText /> },
	{ name: "Cypher", key: "cypher", icon: <IoText /> },
	{ name: "D", key: "d", icon: <SiD /> },
	{ name: "Dart", key: "dart", icon: <SiDart /> },
	{ name: "DAX", key: "dax", icon: <IoText /> },
	{ name: "Desktop", key: "desktop", icon: <IoText /> },
	{ name: "Diff", key: "diff", icon: <IoText /> },
	{ name: "Dockerfile", key: "dockerfile", icon: <SiDocker /> },
	{ name: "Dream Maker", key: "dream-maker", icon: <IoText /> },
	{ name: "Elixir", key: "elixir", icon: <SiElixir /> },
	{ name: "Elm", key: "elm", icon: <SiElm /> },
	{ name: "ERB", key: "erb", icon: <IoText /> },
	{ name: "Erlang", key: "erlang", icon: <SiErlang /> },
	{ name: "Fennel", key: "fennel", icon: <IoText /> },
	{ name: "Fish", key: "fish", icon: <SiFishshell /> },
	{ name: "Fortran (Fixed)", key: "fortran-fixed-form", icon: <SiFortran /> },
	{ name: "Fortran (Free)", key: "fortran-free-form", icon: <SiFortran /> },
	{ name: "F#", key: "fsharp", icon: <SiFsharp /> },
	{ name: "Godot (Resource)", key: "gdresource", icon: <SiGodotengine /> },
	{ name: "Godot (Script)", key: "gdscript", icon: <SiGodotengine /> },
	{ name: "Gherkin", key: "gherkin", icon: <IoText /> },
	{ name: "Git (Commit Message)", key: "git-commit", icon: <SiGit /> },
	{ name: "Git (Rebase Message)", key: "git-rebase", icon: <SiGit /> },
	{ name: "Gleam", key: "gleam", icon: <IoText /> },
	{ name: "Glimmer (JS)", key: "glimmer-js", icon: <IoText /> },
	{ name: "Glimmer (TS)", key: "glimmer-ts", icon: <IoText /> },
	{ name: "GLSL", key: "glsl", icon: <IoText /> },
	{ name: "Gnuplot", key: "gnuplot", icon: <IoText /> },
	{ name: "Go", key: "go", icon: <SiGo /> },
	{ name: "GraphQL", key: "graphql", icon: <SiGraphql /> },
	{ name: "Groovy", key: "groovy", icon: <DiGroovy /> },
	{ name: "Hack", key: "hack", icon: <IoText /> },
	{ name: "Ruby Haml", key: "haml", icon: <IoText /> },
	{ name: "Handlebars", key: "handlebars", icon: <SiHandlebarsdotjs /> },
	{ name: "Haskell", key: "haskell", icon: <SiHaskell /> },
	{ name: "HashiCorp  HCL", key: "hcl", icon: <SiHashicorp /> },
	{ name: "Hjson", key: "hjson", icon: <SiJson /> },
	{ name: "HLSL", key: "hlsl", icon: <IoText /> },
	{ name: "HTML", key: "html", icon: <SiHtml5 /> },
	{ name: "HTML (Derivative)", key: "html-derivative", icon: <SiHtml5 /> },
	{ name: "HTTP", key: "http", icon: <MdHttp /> },
	{ name: "Hy", key: "hy", icon: <IoText /> },
	{ name: "Imba", key: "imba", icon: <IoText /> },
	{ name: "INI", key: "ini", icon: <IoText /> },
	{ name: "Java", key: "java", icon: <DiJava /> },
	{ name: "JavaScript", key: "javascript", icon: <SiJavascript /> },
	{ name: "Jinja", key: "jinja", icon: <SiJinja /> },
	{ name: "JSON", key: "json", icon: <SiJson /> },
	{ name: "JSON5", key: "json5", icon: <SiJson /> },
	{ name: "JSON (Comments)", key: "jsonc", icon: <SiJson /> },
	{ name: "JSON (Lines)", key: "jsonl", icon: <SiJson /> },
	{ name: "Jsonnet", key: "jsonnet", icon: <IoText /> },
	{ name: "JSSM", key: "jssm", icon: <IoText /> },
	{ name: "JSX", key: "jsx", icon: <SiReact /> },
	{ name: "Julia", key: "julia", icon: <SiJulia /> },
	{ name: "Kotlin", key: "kotlin", icon: <SiKotlin /> },
	{ name: "Kusto", key: "kusto", icon: <IoText /> },
	{ name: "LaTeX", key: "latex", icon: <SiLatex /> },
	{ name: "Less", key: "less", icon: <DiLess /> },
	{ name: "Liquid", key: "liquid", icon: <IoText /> },
	{ name: "Log file", key: "log", icon: <IoText /> },
	{ name: "Logo", key: "logo", icon: <IoText /> },
	{ name: "Lua", key: "lua", icon: <SiLua /> },
	{ name: "Makefile", key: "make", icon: <SiMake /> },
	{ name: "Markdown", key: "markdown", icon: <SiMarkdown /> },
	{ name: "Marko", key: "marko", icon: <SiMarko /> },
	{ name: "MATLAB", key: "matlab", icon: <IoText /> },
	{ name: "MDC", key: "mdc", icon: <IoText /> },
	{ name: "MDX", key: "mdx", icon: <SiMdx /> },
	{ name: "Mermaid", key: "mermaid", icon: <SiMermaid /> },
	{ name: "Mojo", key: "mojo", icon: <IoText /> },
	{ name: "Move", key: "move", icon: <IoText /> },
	{ name: "Narrat", key: "narrat", icon: <IoText /> },
	{ name: "Nextflow", key: "nextflow", icon: <IoText /> },
	{ name: "Nginx", key: "nginx", icon: <SiNginx /> },
	{ name: "Nim", key: "nim", icon: <SiNim /> },
	{ name: "Nix", key: "nix", icon: <SiNixos /> },
	{ name: "Nushell", key: "nushell", icon: <SiNushell /> },
	{ name: "Objective-C", key: "objective-c", icon: <IoText /> },
	{ name: "Objective-C++", key: "objective-cpp", icon: <IoText /> },
	{ name: "OCaml", key: "ocaml", icon: <SiOcaml /> },
	{ name: "Pascal", key: "pascal", icon: <IoText /> },
	{ name: "Perl", key: "perl", icon: <SiPerl /> },
	{ name: "PHP", key: "php", icon: <SiPhp /> },
	{ name: "Pl/SQL", key: "plsql", icon: <IoText /> },
	{ name: "Gettext PO", key: "po", icon: <IoText /> },
	{ name: "PostCSS", key: "postcss", icon: <SiPostcss /> },
	{ name: "PowerQuery", key: "powerquery", icon: <IoText /> },
	{ name: "PowerShell", key: "powershell", icon: <SiPowershell /> },
	{ name: "Prisma", key: "prisma", icon: <SiPrisma /> },
	{ name: "Prolog", key: "prolog", icon: <DiProlog /> },
	{ name: "Protocol Buffer 3", key: "proto", icon: <IoText /> },
	{ name: "Pug", key: "pug", icon: <SiPug /> },
	{ name: "Puppet", key: "puppet", icon: <SiPuppet /> },
	{ name: "PureScript", key: "purescript", icon: <SiPurescript /> },
	{ name: "Python", key: "python", icon: <SiPython /> },
	{ name: "R", key: "r", icon: <SiR /> },
	{ name: "Racket", key: "racket", icon: <SiRacket /> },
	{ name: "Raku", key: "raku", icon: <IoText /> },
	{ name: "ASP.NET Razor", key: "razor", icon: <GiRazor /> },
	{ name: "Windows registry Script", key: "reg", icon: <IoText /> },
	{ name: "Rel", key: "rel", icon: <IoText /> },
	{ name: "RISC-V", key: "riscv", icon: <SiRiscv /> },
	{ name: "reStructuredText", key: "rst", icon: <IoText /> },
	{ name: "Ruby", key: "ruby", icon: <SiRuby /> },
	{ name: "Rust", key: "rust", icon: <SiRust /> },
	{ name: "SAS", key: "sas", icon: <IoText /> },
	{ name: "Sass", key: "sass", icon: <SiSass /> },
	{ name: "Scala", key: "scala", icon: <SiScala /> },
	{ name: "Scheme", key: "scheme", icon: <IoText /> },
	{ name: "SCSS", key: "scss", icon: <IoText /> },
	{ name: "ShaderLab", key: "shaderlab", icon: <IoText /> },
	{ name: "Shell", key: "shell", icon: <SiShell /> },
	{ name: "Shell Session", key: "shellsession", icon: <SiShell /> },
	{ name: "Smalltalk", key: "smalltalk", icon: <IoText /> },
	{ name: "Solidity", key: "solidity", icon: <SiSolidity /> },
	{ name: "SPARQL", key: "sparql", icon: <IoText /> },
	{ name: "Splunk Query Language", key: "splunk", icon: <SiSplunk /> },
	{ name: "SQL", key: "sql", icon: <IoText /> },
	{ name: "SSH Config", key: "ssh-config", icon: <IoText /> },
	{ name: "Stata", key: "stata", icon: <IoText /> },
	{ name: "Stylus", key: "stylus", icon: <SiStylus /> },
	{ name: "Svelte", key: "svelte", icon: <SiSvelte /> },
	{ name: "Swift", key: "swift", icon: <SiSwift /> },
	{ name: "SystemVerilog", key: "system-verilog", icon: <IoText /> },
	{ name: "Systemd Units", key: "systemd", icon: <IoText /> },
	{ name: "Tasl", key: "tasl", icon: <IoText /> },
	{ name: "Tcl", key: "tcl", icon: <IoText /> },
	{ name: "Terraform", key: "terraform", icon: <SiTerraform /> },
	{ name: "TeX", key: "tex", icon: <IoText /> },
	{ name: "TOML", key: "toml", icon: <SiToml /> },
	{ name: "TSV", key: "tsv", icon: <IoText /> },
	{ name: "TSX", key: "tsx", icon: <SiReact /> },
	{ name: "Turtle", key: "turtle", icon: <IoText /> },
	{ name: "Twig", key: "twig", icon: <IoText /> },
	{ name: "TypeScript", key: "typescript", icon: <SiTypescript /> },
	{ name: "Typst", key: "typst", icon: <SiTypst /> },
	{ name: "V", key: "v", icon: <SiV /> },
	{ name: "Visual Basic", key: "vb", icon: <SiVisualbasic /> },
	{ name: "Verilog", key: "verilog", icon: <IoText /> },
	{ name: "VHDL", key: "vhdl", icon: <IoText /> },
	{ name: "Vim Script", key: "viml", icon: <SiVim /> },
	{ name: "Vue", key: "vue", icon: <IoLogoVue /> },
	{ name: "Vue (HTML)", key: "vue-html", icon: <IoLogoVue /> },
	{ name: "Vyper", key: "vyper", icon: <IoText /> },
	{ name: "WebAssembly", key: "wasm", icon: <SiWebassembly /> },
	{ name: "Wenyan", key: "wenyan", icon: <IoText /> },
	{ name: "WGSL", key: "wgsl", icon: <IoText /> },
	{ name: "Wolfram", key: "wolfram", icon: <SiWolfram /> },
	{ name: "XML", key: "xml", icon: <TbFileTypeXml /> },
	{ name: "XSL", key: "xsl", icon: <TbFileTypeXml /> },
	{ name: "YAML", key: "yaml", icon: <SiYaml /> },
	{ name: "ZenScript", key: "zenscript", icon: <IoText /> },
	{ name: "Zig", key: "zig", icon: <SiZig /> },
] as const;