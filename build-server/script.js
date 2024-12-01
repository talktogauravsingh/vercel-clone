const { exec } = require("child_process");
const path = require("path");
const fs = require("fs");
const fsExtra = require("fs-extra");

async function init() {
    console.log("Executing the script.js");

    const projectId = process.env.PROJECT_ID;
    if (!projectId) {
        console.error("Error: Unable to find PROJECT_ID in .env file");
        return;
    }

    const outDirPath = path.join(__dirname, "output");
    console.log("__dirname", __dirname);
    console.log("outDirPath", outDirPath);

    // Execute npm install and npm run build
    const p = exec(`cd ${outDirPath} && npm install && npm run build`);

    p.stdout.on("data", (data) => {
        console.log(data.toString());
    });

    p.stderr.on("data", (data) => {
        console.error("Error", data.toString());
    });

    p.on("close", async () => {
        console.log("Build Completed");

        // Ensure the __outputs directory exists
        const outputsDirPath = path.join(__dirname, "__outputs");
        if (!fs.existsSync(outputsDirPath)) {
            fs.mkdirSync(outputsDirPath, { recursive: true });
            console.log(`Created directory: ${outputsDirPath}`);
        } else {
            console.log(`Directory already exists: ${outputsDirPath}`);
        }

        // Ensure the project-specific directory exists
        const projectDirPath = path.join(outputsDirPath, projectId);
        if (!fs.existsSync(projectDirPath)) {
            fs.mkdirSync(projectDirPath, { recursive: true });
            console.log(`Created directory: ${projectDirPath}`);
        } else {
            console.log(`Directory already exists: ${projectDirPath}`);
        }

        // Copy the build directory to the project-specific directory
        const buildDirPath = path.join(outDirPath, "build");
        const destinationPath = path.join(projectDirPath);

        if (fs.existsSync(buildDirPath)) {
            try {
                await fsExtra.copy(buildDirPath, destinationPath, { overwrite: true });
                console.log(`Build directory copied to: ${destinationPath}`);
            } catch (err) {
                console.error("Error moving build directory:", err);
            }
        } else {
            console.error("Build directory does not exist");
        }
    });
}

init();
