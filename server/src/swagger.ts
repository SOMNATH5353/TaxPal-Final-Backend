// import swaggerJSDoc from "swagger-jsdoc";
// import * as swaggerUi from "swagger-ui-express";
// import { Application } from "express";
// import path from "path";

// const options: swaggerJSDoc.Options = {
//   definition: {
//     openapi: "3.0.0",
//     info: {
//       title: "TaxPal API Documentation",
//       version: "1.0.0",
//       description:
//         "Comprehensive API documentation for all modules ",
//     },
//     servers: [
//       {
//         url: "http://localhost:5000/api/v1",
//         description: "Local development server",
//       },
//     ],
//     components: {
//       securitySchemes: {
//         bearerAuth: {
//           type: "http",
//           scheme: "bearer",
//           bearerFormat: "JWT",
//         },
//       },
//     },
//     security: [{ bearerAuth: [] }],
//   },
//   apis: [
//     path.join(__dirname, "./api/**/*.ts"), //  includes ALL route files
//   ],
// };

// const swaggerSpec = swaggerJSDoc(options);

// export const setupSwagger = (app: Application) => {
//   app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
//   console.log("📘 Swagger docs available at: http://localhost:5000/api-docs");
// };


import swaggerJSDoc from "swagger-jsdoc";
import * as swaggerUi from "swagger-ui-express";
import { Application } from "express";
import path from "path";

const options: swaggerJSDoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "TaxPal API Documentation",
      version: "1.0.0",
      description: "Comprehensive API documentation for all modules",
    },
    servers: [
      {
        url:
          process.env.NODE_ENV === "production"
            ? "https://taxpal-a-personal-finance-tracking-app-2.onrender.com"
            : `http://localhost:${process.env.PORT || 5000}`,
        description:
          process.env.NODE_ENV === "production"
            ? "Production server"
            : "Development server",
      },
    ],
    basePath: "/api/v1", // ✅ Add this line
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [{ bearerAuth: [] }],
  },
  apis: [path.join(__dirname, "./api/**/*.{ts,js}")],
};


const swaggerSpec = swaggerJSDoc(options);

export const setupSwagger = (app: Application) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  console.log(
    `📘 Swagger docs available at: ${
      process.env.NODE_ENV === "production"
        ? "https://taxpal-a-personal-finance-tracking-app-2.onrender.com/api-docs"
        : `http://localhost:${process.env.PORT || 5000}/api-docs`
    }`
  );
};
