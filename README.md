# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- @vitejs/plugin-react uses Babel (or oxc when used in rolldown-vite) for Fast Refresh
- @vitejs/plugin-react-swc uses SWC for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see https://react.dev/learn/react-compiler/installation.

## Quick Enquiry (EmailJS + WhatsApp)

The Home page includes a Quick Enquiry form that can send enquiries via EmailJS and also generate a WhatsApp message link.

- Copy `.env.example` to `.env` and fill in:
  - `VITE_EMAILJS_SERVICE_ID`
  - `VITE_EMAILJS_TEMPLATE_ID`
  - `VITE_EMAILJS_PUBLIC_KEY`
  - `VITE_WHATSAPP_NUMBER` (international number, digits only preferred)

EmailJS template variables expected by the UI:
- `name`, `email`, `phone`, `date`, `details`

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      tseslint.configs.recommendedTypeChecked,
      tseslint.configs.strictTypeChecked,
      tseslint.configs.stylisticTypeChecked,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
])
