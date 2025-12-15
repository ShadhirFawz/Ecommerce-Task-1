// Minimal ESLint config (no `extends`) to avoid circular-extends bugs
module.exports = {
  root: true,
  parserOptions: {
    ecmaVersion: 2023,
    sourceType: "module",
    ecmaFeatures: { jsx: true },
  },
  ignorePatterns: ["node_modules/**", ".next/**", "out/**", "build/**", "next-env.d.ts"],
  rules: {
    // enforce semicolons explicitly
    semi: ["error", "always"],
    // basic console handling
    "no-console": ["warn", { allow: ["warn", "error"] }],
  },
  overrides: [
    {
      files: ["*.ts", "*.tsx"],
      rules: {
        // keep same semi rule for TS files
        semi: ["error", "always"],
      },
    },
  ],
};
