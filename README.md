# 🌟 Dermasilk - Sistema de Gestión de Membresías

Sistema integral de gestión para centros de depilación láser que permite administrar membresías, clientes, citas y programas de fidelización de manera eficiente y profesional.

## 📋 Características Principales

### 🎯 Dashboard Ejecutivo
- **Métricas en tiempo real**: Ingresos, clientes activos, citas programadas
- **Indicadores de rendimiento**: Tasas de satisfacción, progreso de tratamientos
- **Alertas inteligentes**: Recordatorios de citas, seguimientos pendientes
- **Gráficos interactivos**: Análisis de tendencias y crecimiento

### 👥 Gestión de Clientes
- **Perfiles completos**: Información personal, historial médico, preferencias
- **Tipos de membresía**: Estándar, Premium, Básica, Familiar
- **Seguimiento de progreso**: Sesiones completadas vs. programadas
- **Sistema de puntos**: Programa de recompensas y fidelización
- **Estado VIP**: Clasificación automática de clientes premium

### 📅 Sistema de Citas
- **Calendario inteligente**: Programación optimizada de sesiones
- **Recordatorios automáticos**: WhatsApp, SMS y email
- **Gestión de disponibilidad**: Control de horarios y recursos
- **Historial completo**: Registro de todas las citas y tratamientos

### 💰 Control Financiero
- **Pagos y depósitos**: Seguimiento detallado de transacciones
- **Facturación automática**: Generación de recibos y facturas
- **Reportes financieros**: Análisis de ingresos y proyecciones
- **Integración con POS**: Conexión con sistemas Loyverse

### 📊 Analytics y Reportes
- **Métricas de satisfacción**: Encuestas y feedback de clientes
- **Análisis de retención**: Tasas de renovación y abandono
- **Reportes personalizados**: Exportación de datos en múltiples formatos
- **Fotos antes/después**: Galería de resultados para seguimiento

### 🔗 Integraciones
- **Loyverse POS**: Sincronización automática de ventas
- **WhatsApp Business**: Comunicación directa con clientes
- **Sistemas de pago**: Procesamiento seguro de transacciones
- **Cloud Storage**: Respaldo automático de datos

## 🚀 Tecnologías Utilizadas

- **Frontend**: React 18.2.0
- **UI Components**: Lucide React Icons
- **Build Tool**: React Scripts 5.0.1
- **Styling**: CSS Modules / Styled Components
- **State Management**: React Hooks

## 📦 Instalación

### Prerrequisitos
- Node.js (versión 16 o superior)
- npm o yarn
- Git

### Pasos de instalación

1. **Clonar el repositorio**
   ```bash
   git clone https://github.com/tu-usuario/dermasilk-sistema.git
   cd dermasilk-sistema
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   ```

3. **Iniciar el servidor de desarrollo**
   ```bash
   npm start
   ```

4. **Abrir en el navegador**
   ```
   http://localhost:3000
   ```

## 🛠️ Scripts Disponibles

- `npm start` - Inicia el servidor de desarrollo
- `npm run build` - Construye la aplicación para producción
- `npm test` - Ejecuta las pruebas unitarias
- `npm run eject` - Expone la configuración de webpack (irreversible)

## 📱 Funcionalidades por Módulo

### Dashboard Principal
- Resumen ejecutivo con KPIs principales
- Gráficos de tendencias de ingresos
- Lista de citas del día
- Alertas y notificaciones importantes

### Gestión de Membresías
- **Estándar (8 meses)**: Tratamiento básico con seguimiento
- **Premium (12 meses)**: Tratamiento extendido con beneficios adicionales
- **Básica (6 meses)**: Opción económica para áreas pequeñas
- **Familiar Premium**: Paquetes para múltiples usuarios

### Sistema de Recompensas
- Acumulación de puntos por sesiones completadas
- Canjes por descuentos y servicios adicionales
- Programa VIP automático para clientes frecuentes
- Referidos con bonificaciones especiales

### Comunicación con Clientes
- Recordatorios automáticos de citas
- Seguimiento post-tratamiento
- Encuestas de satisfacción
- Campañas de marketing personalizadas

## 🔧 Configuración

### Variables de Entorno
Crea un archivo `.env` en la raíz del proyecto:

```env
REACT_APP_API_URL=https://api.dermasilk.com
REACT_APP_LOYVERSE_API_KEY=tu_api_key_aqui
REACT_APP_WHATSAPP_TOKEN=tu_token_whatsapp
```

### Configuración de Loyverse
1. Obtener API Key desde el panel de Loyverse
2. Configurar webhook para sincronización automática
3. Mapear productos y servicios

## 📈 Métricas y KPIs

- **Tasa de Retención**: % de clientes que renuevan membresía
- **Satisfacción Promedio**: Calificación de 1-5 estrellas
- **Ingresos Mensuales**: Seguimiento de objetivos financieros
- **Ocupación**: % de citas programadas vs. disponibles
- **Conversión**: Leads a clientes activos

## 🎨 Personalización

El sistema permite personalizar:
- Colores y branding corporativo
- Tipos de membresía y precios
- Áreas de tratamiento disponibles
- Configuración de recordatorios
- Reportes y métricas

## 🔒 Seguridad

- Encriptación de datos sensibles
- Autenticación de usuarios
- Respaldos automáticos
- Cumplimiento con GDPR/LOPD
- Logs de auditoría

## 📞 Soporte

Para soporte técnico o consultas:
- **Email**: soporte@dermasilk.com
- **WhatsApp**: +52 443-XXX-XXXX
- **Documentación**: [docs.dermasilk.com](https://docs.dermasilk.com)

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Por favor:
1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 🏆 Reconocimientos

- Equipo de desarrollo Dermasilk
- Comunidad React
- Iconos por Lucide React
- Inspiración en las mejores prácticas de UX/UI

---

**Desarrollado con ❤️ para centros de belleza modernos**

*Versión 1.0.0 - Julio 2025*
