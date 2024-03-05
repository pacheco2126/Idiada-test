<div align="center">
<img src="idiada.png" height="90px" width="auto" /> 
<h2>Technical test for Idiada</h2>
</div>

## 🛠️ Stack

- [**Angular**](https://angular.io/) - The web development framework for building the future
- [**Typescript**](https://www.typescriptlang.org/) - Additional syntax to JavaScript
- [**PrimeNG**](https://primeng.org/) - The Most Complete UI Suite for Angular

## 🚀 START

### 1. Install dependencies

- [pnpm](https://pnpm.io/installation) as dependency manager

```bash
# Set the environment variable NODE_OPTIONS to --openssl-legacy-provider.
export NODE_OPTIONS=--openssl-legacy-provider

# Start the project
pnpm install
```

### 3. Launch the development server

```bash
ng serve
```


1. Open [**http://localhost:4200**](http://localhost:4200/) 🚀

# IdiadaExerciseAngular

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 6.0.8.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## 🧞 Commands

|     | Commnd          | Action                                        |
| :-- | :--------------- | :-------------------------------------------- |
| ⚙️  | `ng serve` | Launch the development server in  `localhost:4200`.  |
| ⚙️  | `ng build` | to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.  |
| ⚙️  | `ng generate component component-name`| to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`. |
| ⚙️  | `ng test`  | to execute the unit tests via [Karma](https://karma-runner.github.io).  |
| ⚙️  | `ng e2e`   | to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).  |

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

## Backend

**1.  Requeriments**
    
    Tomcat 9
    Java 8 or +
    Maven
    Your favourite IDE (VsCode, Eclipse, IntelliJ, Netbeans...)

**2.  How to import project (VsCode)**

    *  Import--> Project folder (With pom.xml maven will automatically add the functionalities)
    *  Go Maven --> Lifecycle - Clean then Install
    *  Add the server in VsCode --> Servers --> Create new server
    *  Add "idiada-exercise-backend war" generated with Maven to tomcat server
    *  Run server
    *  Run the main file
    
**3. API documentation**

    *  Swagger is configured for generating API documentation
       Can be accessed in http://localhost:8080/idiada-exercise-backend/swagger-ui.html#/
