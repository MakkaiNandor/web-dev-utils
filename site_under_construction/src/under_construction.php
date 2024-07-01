<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Under Construction</title>
    <style>
        :root {
            --color-text: #fffdcf;
            --color-title: #fffdcf;
            --color-link: #fbfb37;
        }
        * {
            box-sizing: border-box;
        }
        html, body {
            height: 100%;
        }
        html {
            font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
            font-size: clamp(10pt, 2.3vw, 26pt);
            line-height: 1.5;
            color: var(--color-text);
        }
        body {
            margin: 0;
            display: flex;
            background-image: url('./background.jpeg');
            background-size: cover;
            background-repeat: no-repeat;
            padding-inline: 2rem;
        }
        img {
            max-width: 100%;
            max-height: 100%;
        }
        h1 {
            font-size: 2.5rem;
            color: var(--color-title);
        }
        ul {
            list-style: none;
            padding: 0;
            margin: 0;
        }
        a {
            color: var(--color-link);
            text-decoration: none;
        }
        a:hover {
            text-decoration: underline;
        }
        li {
            margin-block: 0.25rem;
        }
        .wrapper {
            position: relative;
            margin: auto;
            padding: 2.5rem 2rem 1.5rem;
            text-align: center;
            isolation: isolate;
        }
        .wrapper::before {
            content: '';
            position: fixed;
            inset: 0;
            z-index: -2;
            backdrop-filter: blur(3px) brightness(0.7);
        }
        .wrapper::after {
            content: '';
            position: absolute;
            inset: 0;
            z-index: -1;
            backdrop-filter: blur(5px) brightness(0.5);
            border-radius: 2rem;
        }
        .contact {
            margin-top: 2rem;
            font-size: 0.75rem;
        }
        .contact p {
            margin-block: 0.3rem;
        }
        @media screen and (max-width: 500px) {
            body {
                padding: 0;
            }
            .wrapper {
                padding: 1rem;
            }
            .wrapper::after {
                display: none;
            }
            .wrapper::before {
                backdrop-filter: blur(5px) brightness(0.4);
            }
        }
    </style>
</head>
<body>
    <div class="wrapper">
        <img class="logo" src="./logo.png" alt="Company Logo">
        <h1>Under Construction</h1>
        <p>We are currently working on our site. Stay tuned. We'll be back soon.</p>
        <div class="contact">
            <p>You can still contact us at:</p>
            <ul>
                <li><a href="mailto:under@construction.com">under@construction.com</a></li>
                <li><a href="tel:0123456789">0123456789</a></li>
            </ul>
        </div>
    </div>
</body>
</html>