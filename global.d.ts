// global.d.ts
// Declaraciones para permitir la importación de archivos CSS/SCSS en TypeScript.
// Añade más extensiones si usas otras (less, styl, etc.).

declare module "*.module.css" {
  const classes: { readonly [key: string]: string };
  export default classes;
}

declare module "*.module.scss" {
  const classes: { readonly [key: string]: string };
  export default classes;
}

declare module "*.module.sass" {
  const classes: { readonly [key: string]: string };
  export default classes;
}

// Para imports de side-effect (p. ej. `import "./globals.css"`)
declare module "*.css";
declare module "*.scss";
declare module "*.sass";