import fs from "fs";
import path from "path";

const ROUTES_DIR = "./app/(app)";

function walk(dir, parent = "") {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const routes = [];

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    const route = path.join(parent, entry.name);

    if (entry.isDirectory()) {
      routes.push(...walk(fullPath, route));
    } else if (entry.isFile() && entry.name.endsWith(".tsx")) {
      const name = route.replace(/\.tsx$/, "");
      routes.push("/" + name.replace(/index$/, "").replace(/\\/g, "/"));
    }
  }

  return routes;
}

const routes = walk(ROUTES_DIR);
console.log("\n🧭 Routes détectées :\n");
routes.forEach((route) => console.log(`- ${route}`));
