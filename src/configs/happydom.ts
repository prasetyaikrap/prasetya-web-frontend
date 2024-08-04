import { GlobalRegistrator } from "@happy-dom/global-registrator";
import * as matchers from "@testing-library/jest-dom/matchers";
import { expect } from "bun:test";

const oldConsole = console;
GlobalRegistrator.register();
window.console = oldConsole;

// Extend the expect object with custom matchers
expect.extend(matchers);
