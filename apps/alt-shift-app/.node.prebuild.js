import fs from "fs";
import path from "path";
import MarkdownIt from "markdown-it";

const md = new MarkdownIt();

const markdown = fs.readFileSync(
  path.resolve(import.meta.dirname, "../../README.md"),
  "utf8",
);
const html = md.render(markdown);

await fs.writeFileSync(
  path.resolve(import.meta.dirname, "public", "readme.html"),
  `
            <html>
                <head>
                    <link rel="stylesheet" href="https://unpkg.com/mvp.css">
                    <style>
                        :root {
                            --font-size: calc(1rem + .25vw);
                        }
                        body {
                            display: block;
                            max-width: 800px;
                            margin: 0 auto;
                        }
                        img {
                            display: inline-block;
                            max-width: 100%;
                        }
                    </style>
                    <script>
                        const ost = () => setTimeout(() => document.getElementById('ost')?.play(), 1000);
                        window.addEventListener('click', ost);
                        window.addEventListener('scroll', ost);
                    </script>
                </head>
                <body>
                    <sup>
                        <audio id="ost" controls autoplay loop volume="0.2">
                            <source src="https://github.com/rchuvilev/test-assignment-variant/blob/main/.readme/soundtrack.mp3?raw=true" type="audio/mpeg">
                            Your browser does not support the audio element.
                        </audio>
                        Soundtrack😎
                    </sup>
                    ${html}
                </body>
            </html>
    `,
  "utf8",
);
