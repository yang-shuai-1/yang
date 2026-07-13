import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  globalIgnores([
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
  {
    rules: {
      // Allow Chinese quotes in JSX
      "react/no-unescaped-entities": "off",
      // Don't require setState in useEffect to be wrapped
      "react-hooks/set-state-in-effect": "off",
      // Allow <a> for external links
      "@next/next/no-html-link-for-pages": "off",
    },
  },
]);

export default eslintConfig;
