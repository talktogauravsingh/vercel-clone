const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 8000;

app.use((req, res, next) => {
    const hostname = req.hostname;
    const subDomain = hostname.split('.')[0];
    const projectPath = path.join(__dirname, '..', 'output', subDomain);

    if (fs.existsSync(projectPath)) {
        app.use(express.static(projectPath));
        app.get('*', (req, res) => {
            res.sendFile(path.join(projectPath, 'index.html'));
        });
    } else {
        res.status(404).send('Project not found');
    }

    console.log({ hostname, subDomain, projectPath });
    next();
});

app.listen(PORT, () => {
    console.log(`App is running on http://localhost:${PORT}`);
});
