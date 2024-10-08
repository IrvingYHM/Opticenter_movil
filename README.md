# Opticenter_movil

## Descripción del Proyecto
La Aplicación Móvil de Opticenter Huejutla es una plataforma diseñada para llevar las funcionalidades esenciales de la plataforma web de la óptica a dispositivos móviles. Proporciona a los usuarios una experiencia optimizada y fluida para gestionar citas, comprar productos ópticos y realizar pagos. La aplicación está desarrollada con un enfoque en ofrecer una interfaz amigable y soportar tanto dispositivos iOS como Android.

## Objetivos

###	Objetivo general
- Desarrollar una aplicación movil de la empresa Opticenter Huejutla, mediante el uso de funciones esenciales de la plataforma web de la empresa otorgando a los pacientes una experiencia de usuario única.

### Objetivos específicos
-	Implemetar una funcionalidad de menú que permita a los usuarios ver las diferentes opciones que tendrá la aplicación móvil
-	Desarrollar una funcionalidad del login para que permita a los usuarios acceder a sus cuentas desde dispositivos móviles
-	Crear una interfaz de productos, facilitando a los usuarios la adquisición de productos ópticos.
-	Incluir una interfaz en donde el usuario pueda gestionar sus productos (Pedidos, Pagos, etc.)

## Metodología de Desarrollo
Estamos utilizando Extreme Programming (XP) para gestionar el proyecto, con un enfoque en entregas frecuentes, retroalimentación continua y alta participación del cliente. El proyecto está dividido en iteraciones, con pruebas constantes, refactorización y colaboración directa entre los miembros del equipo para asegurar la entrega de software de alta calidad.

## Control de Versiones
El proyecto utiliza Git como herramienta de control de versiones, con el repositorio alojado en GitHub. El flujo de trabajo sigue la estrategia Git Flow, donde se manejan ramas principales y de características:

- master: Contiene el código listo para producción.
- develop: Ramas para el desarrollo activo, donde se integran las características antes de pasar a producción.
- Ramas de características (feature/nueva-funcionalidad): Para el desarrollo de nuevas funcionalidades.
- Ramas de correcciones (hotfix/arreglo-de-error): Para aplicar correcciones rápidas a la rama de producción.

## Herramienta para el control de versiones

###	GitHub como herramienta de control de versiones
Se ha seleccionado GitHub junto con Git como la herramienta de control de versiones para este proyecto, debido a su eficiencia y flexibilidad en la gestión de código fuente. Esta combinación permite una colaboración ágil y efectiva entre los miembros del equipo, garantizando trazabilidad y control sobre cada cambio realizado.

-	Colaboración: A través de pull requests, los cambios son revisados y discutidos antes de ser integrados, mejorando la calidad del código.
-	Control de versiones distribuido: Cada desarrollador tiene una copia local del proyecto, permitiendo trabajar de manera independiente y fusionar cambios cuando sea necesario.
-	Trazabilidad: GitHub registra el historial de cada commit, vinculando cambios a tareas o problemas específicos, lo que facilita la revisión y el seguimiento.
-	Gestión de ramas: El equipo puede trabajar en distintas ramas (feature, hotfix), permitiendo desarrollo paralelo sin afectar el código principal.
-	Integración continua (CI/CD): GitHub se integra fácilmente con servicios de automatización como GitHub Actions para pruebas y despliegues automáticos.
-	Seguridad: Ofrece autenticación de dos factores y reglas de protección de ramas, garantizando un control de acceso adecuado.
-	Documentación y monitoreo: Soporta issues, proyectos y documentación en README o GitHub Pages, facilitando la gestión y el seguimiento del proyecto.

## Estrategia de versionamiento
Para este proyecto, se ha decidido utilizar Git Flow una estrategia de versionamiento ya que proporciona una estructura clara y organizada para la gestion de ramas. Esta estrategia es ampliamente utilizada y ofrece un enfoque claro y estandarizado para el control de versiones, facilitando la comprensión de la evolución del proyecto tanto para desarrolladores como para usuarios finales.

Versionamiento semántico será utilizado para etiquetar versiones siguiendo el formato MAJOR.MINOR.PATCH, donde:

-	MAJOR (versión mayor): Se incrementa cuando hay cambios incompatibles o de ruptura que no permiten la retro compatibilidad.
-	MINOR (versión menor): Se incrementa cuando se añaden nuevas funcionalidades que son retro compatibles con versiones anteriores.
-	PATCH (parche): Se incrementa cuando se corrigen errores o se hacen mejoras menores que no afectan la funcionalidad ni la compatibilidad.

## Estrategia de Despliegue
Se ha elegido la estrategia de despliegue Blue-Green debido a su capacidad para garantizar un tiempo de inactividad mínimo y un proceso de despliegue seguro. En este método, mantenemos dos entornos de producción activos (blue y green), donde uno es el entorno activo que los usuarios ven y el otro es el entorno de prueba o staging. Antes de cualquier despliegue, se realizan las pruebas correspondientes y, una vez comprobado que todo funciona correctamente, el tráfico de producción se redirige al nuevo entorno.

## Instrucciones de Instalación

1.- Clona el repositorio en tu máquina local:

    git clone https://github.com/IrvingYHM/Opticenter_movil.git

2.- Navega al directorio del proyecto:

    cd Opticenter_movil

3.- Instala las dependencias del proyecto:

    npm install

4.- Configura las variables de entorno necesarias para la base de datos y otros servicios.

5.- Ejecuta el proyecto localmente:

    npm run dev

6.- Accede al sitio web desde tu navegador en http://localhost:3000.