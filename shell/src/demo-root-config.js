import { registerApplication, start } from "single-spa";
import {
  constructApplications,
  constructRoutes,
  constructLayoutEngine,
} from "single-spa-layout";
import microfrontendLayout from "./microfrontend-layout.html";

const routes = constructRoutes(microfrontendLayout);
const applications = constructApplications({
  routes,
  loadApp({ name }) {
    return System.import(name);
  },
});
const layoutEngine = constructLayoutEngine({ routes, applications });

registerApplication(
  "@demo/navbar",
  () => System.import("@demo/navbar"),
  (location) => true
);

registerApplication(
  "@demo/main",
  () => System.import("@demo/main"),
  (location) => true
);

registerApplication(
  "@demo/footer",
  () => System.import("@demo/footer"),
  (location) => true
);
// applications.forEach(registerApplication);

layoutEngine.activate();
start();
