BASE='https://fra.cloud.appwrite.io/v1'
PROJECT='6472219f8fb9ed981690'
DB='6588d3242bb48890cf77'
KEY='standard_562725793cc581f3f39b482af97c14241aceef9fd0e5e16558241754a0cef2ac00f9a4a03db4c020bf4fd6f5b159863540af9aeb9b2563bfd15ed12f220d323bd783c2632637692139f4034470eaf37381a7e80cc47a84123d746e3d209ae8f76fee9cbbf6e4311cce2db7ce65a048837371aac1f2eb3ea14f2f954648f0f1d6'
COL='experiences'

# 1. Crear colección
curl -s -X POST "$BASE/databases/$DB/collections" \
  -H "Content-Type: application/json" \
  -H "X-Appwrite-Project: $PROJECT" \
  -H "X-Appwrite-Key: $KEY" \
  -d '{"collectionId":"experiences","name":"experiences","permissions":["read(\"any\")"],"documentSecurity":false}'

sleep 2

# Atributos
curl -s -X POST "$BASE/databases/$DB/collections/experiences/attributes/string" \
  -H "Content-Type: application/json" \
  -H "X-Appwrite-Project: $PROJECT" \
  -H "X-Appwrite-Key: $KEY" \
  -d '{"key":"company","size":255,"required":true}'
sleep 1

curl -s -X POST "$BASE/databases/$DB/collections/experiences/attributes/string" \
  -H "Content-Type: application/json" \
  -H "X-Appwrite-Project: $PROJECT" \
  -H "X-Appwrite-Key: $KEY" \
  -d '{"key":"position_es","size":255,"required":true}'
sleep 1

curl -s -X POST "$BASE/databases/$DB/collections/experiences/attributes/string" \
  -H "Content-Type: application/json" \
  -H "X-Appwrite-Project: $PROJECT" \
  -H "X-Appwrite-Key: $KEY" \
  -d '{"key":"position_en","size":255,"required":true}'
sleep 1

curl -s -X POST "$BASE/databases/$DB/collections/experiences/attributes/string" \
  -H "Content-Type: application/json" \
  -H "X-Appwrite-Project: $PROJECT" \
  -H "X-Appwrite-Key: $KEY" \
  -d '{"key":"description_es","size":3000,"required":true}'
sleep 1

curl -s -X POST "$BASE/databases/$DB/collections/experiences/attributes/string" \
  -H "Content-Type: application/json" \
  -H "X-Appwrite-Project: $PROJECT" \
  -H "X-Appwrite-Key: $KEY" \
  -d '{"key":"description_en","size":3000,"required":true}'
sleep 1

curl -s -X POST "$BASE/databases/$DB/collections/experiences/attributes/string" \
  -H "Content-Type: application/json" \
  -H "X-Appwrite-Project: $PROJECT" \
  -H "X-Appwrite-Key: $KEY" \
  -d '{"key":"technologies","size":100,"required":false,"array":true}'
sleep 1

curl -s -X POST "$BASE/databases/$DB/collections/experiences/attributes/string" \
  -H "Content-Type: application/json" \
  -H "X-Appwrite-Project: $PROJECT" \
  -H "X-Appwrite-Key: $KEY" \
  -d '{"key":"company_url","size":500,"required":false}'
sleep 1

curl -s -X POST "$BASE/databases/$DB/collections/experiences/attributes/string" \
  -H "Content-Type: application/json" \
  -H "X-Appwrite-Project: $PROJECT" \
  -H "X-Appwrite-Key: $KEY" \
  -d '{"key":"start_date","size":20,"required":true}'
sleep 1

curl -s -X POST "$BASE/databases/$DB/collections/experiences/attributes/string" \
  -H "Content-Type: application/json" \
  -H "X-Appwrite-Project: $PROJECT" \
  -H "X-Appwrite-Key: $KEY" \
  -d '{"key":"end_date","size":20,"required":false}'
sleep 1

curl -s -X POST "$BASE/databases/$DB/collections/experiences/attributes/integer" \
  -H "Content-Type: application/json" \
  -H "X-Appwrite-Project: $PROJECT" \
  -H "X-Appwrite-Key: $KEY" \
  -d '{"key":"order","required":true,"min":0}'

sleep 3

echo "Colección creada, insertando experiencias..."

# 1. Jikkosoft
curl -s -X POST "$BASE/databases/$DB/collections/$COL/documents" \
  -H "Content-Type: application/json" \
  -H "X-Appwrite-Project: $PROJECT" \
  -H "X-Appwrite-Key: $KEY" \
  -d '{
    "documentId": "unique()",
    "data": {
      "company": "Jikkosoft",
      "position_es": "Software Engineer Mid Advance",
      "position_en": "Mid Advance Software Engineer",
      "description_es": "Desarrollo de microservicios con Go en modalidad remota, trabajando en soluciones escalables y de alto rendimiento.",
      "description_en": "Microservices development with Go in remote mode, working on scalable and high-performance solutions.",
      "technologies": ["Go", "Microservices"],
      "company_url": "https://jikkosoft.com",
      "start_date": "2025-10",
      "order": 1
    }
  }' | grep -o '"company":"[^"]*"'

# 2. Alumnus LMS - CTO
curl -s -X POST "$BASE/databases/$DB/collections/$COL/documents" \
  -H "Content-Type: application/json" \
  -H "X-Appwrite-Project: $PROJECT" \
  -H "X-Appwrite-Key: $KEY" \
  -d '{
    "documentId": "unique()",
    "data": {
      "company": "Alumnus LMS",
      "position_es": "CTO & Co-Founder",
      "position_en": "CTO & Co-Founder",
      "description_es": "Lidero la visión tecnológica de la empresa, impulsando estrategias que alinean el desarrollo de productos con los objetivos comerciales. Implementé la metodología SCRUM para optimizar procesos y fomentar la colaboración efectiva. Responsable del desarrollo de funciones clave en el backend, asegurando un manejo de datos eficiente y estandarizado, con enfoque en la mejora continua de la arquitectura del sistema.",
      "description_en": "Leading the company technological vision, driving strategies that align product development with business objectives. Implemented SCRUM methodology to optimize processes and foster effective collaboration. Responsible for developing key backend features, ensuring efficient and standardized data handling, focused on continuous improvement of the system architecture.",
      "technologies": ["PHP", "Laravel", "Vue.js", "Socket.io", "AWS", "Pulumi", "TypeScript", "PostgreSQL", "Docker", "SCRUM"],
      "company_url": "https://web.alumnuslms.com",
      "start_date": "2024-01",
      "order": 2
    }
  }' | grep -o '"company":"[^"]*"'

# 3. Solventa Fintech
curl -s -X POST "$BASE/databases/$DB/collections/$COL/documents" \
  -H "Content-Type: application/json" \
  -H "X-Appwrite-Project: $PROJECT" \
  -H "X-Appwrite-Key: $KEY" \
  -d '{
    "documentId": "unique()",
    "data": {
      "company": "Solventa Fintech",
      "position_es": "Ingeniero de Desarrollo Senior",
      "position_en": "Senior Software Engineer",
      "description_es": "Desarrollo y mantenimiento de sistemas de información con PHP Laravel y NodeJS. Desarrollo y optimización de APIs REST con Laravel y NestJS. Integración con el proveedor POMELO LATAM para la emisión y gestión de tarjetas de crédito conectadas al CRM de la compañía.",
      "description_en": "Development and maintenance of information systems using PHP Laravel and NodeJS. Development and optimization of REST APIs with Laravel and NestJS. Integration with POMELO LATAM provider for credit card issuance and management connected to the company CRM.",
      "technologies": ["PHP", "Laravel", "Node.js", "NestJS", "REST APIs", "XML", "CRM"],
      "company_url": "https://solventa.com",
      "start_date": "2025-02",
      "end_date": "2025-10",
      "order": 3
    }
  }' | grep -o '"company":"[^"]*"'

# 4. Andes Certificación Digital
curl -s -X POST "$BASE/databases/$DB/collections/$COL/documents" \
  -H "Content-Type: application/json" \
  -H "X-Appwrite-Project: $PROJECT" \
  -H "X-Appwrite-Key: $KEY" \
  -d '{
    "documentId": "unique()",
    "data": {
      "company": "Andes - Servicio de Certificación Digital",
      "position_es": "Ingeniero de Desarrollo Senior",
      "position_en": "Senior Software Engineer",
      "description_es": "Desarrollo y mantenimiento de sistemas con React y Laravel. Desarrollo de APIs SOAP y REST con PHP nativo, Lumen y CodeIgniter. Análisis y optimización de rendimiento en consultas y manejo de archivos. Lideré un equipo de tres ingenieros junior, gestionando proyectos y fomentando su crecimiento mediante mentoría continua.",
      "description_en": "Development and maintenance of systems using React and Laravel. SOAP and REST API development with native PHP, Lumen and CodeIgniter. Performance analysis and optimization in queries and file handling. Led a team of three junior engineers, managing projects and fostering their growth through continuous mentoring.",
      "technologies": ["PHP", "Laravel", "Lumen", "CodeIgniter", "React", "SOAP", "REST APIs", "MySQL"],
      "start_date": "2023-02",
      "end_date": "2025-01",
      "order": 4
    }
  }' | grep -o '"company":"[^"]*"'

# 5. Hipertexto
curl -s -X POST "$BASE/databases/$DB/collections/$COL/documents" \
  -H "Content-Type: application/json" \
  -H "X-Appwrite-Project: $PROJECT" \
  -H "X-Appwrite-Key: $KEY" \
  -d '{
    "documentId": "unique()",
    "data": {
      "company": "Hipertexto",
      "position_es": "Ingeniero de Desarrollo",
      "position_en": "Software Engineer",
      "description_es": "Mantenimiento y desarrollo de módulos sobre ERP existente en OsCommerce (SIIEL 3.0). Desarrollo de ERP (SIIEL 4.0) con Laravel 7.x integrando Marketplace como VTEX, Linio, MercadoLibre, Magento y Rappi. Desarrollo de rutinas Shell + PHP para procesar metadatos de libros. Mantenimiento de E-commerce VTEX con enfoque en SEO y analítica. Integración con sistema contable HELISA Cloud.",
      "description_en": "Maintenance and development of modules on OsCommerce ERP (SIIEL 3.0). Development of ERP (SIIEL 4.0) with Laravel 7.x integrating Marketplaces like VTEX, Linio, MercadoLibre, Magento and Rappi. Shell + PHP routines for book metadata processing. VTEX E-commerce maintenance focused on SEO and analytics. Integration with HELISA Cloud accounting system.",
      "technologies": ["PHP", "Laravel", "OsCommerce", "VTEX", "Magento", "MercadoLibre", "Shell", "MySQL", "SEO"],
      "company_url": "https://hipertexto.com",
      "start_date": "2020-03",
      "end_date": "2023-01",
      "order": 5
    }
  }' | grep -o '"company":"[^"]*"'

# 6. The Dot Studio
curl -s -X POST "$BASE/databases/$DB/collections/$COL/documents" \
  -H "Content-Type: application/json" \
  -H "X-Appwrite-Project: $PROJECT" \
  -H "X-Appwrite-Key: $KEY" \
  -d '{
    "documentId": "unique()",
    "data": {
      "company": "The Dot Studio",
      "position_es": "Desarrollador Web",
      "position_en": "Web Developer",
      "description_es": "Desarrollo de sitios web con WordPress, Drupal y frameworks PHP. Puzzles web con HTML5 y PhaserJS. Automatización de backups con scripts Bash. Optimización de sitios enfocada en rendimiento y SEO. Administración de servidores con Cpanel/SSH. Despliegue de proyectos en Google Cloud.",
      "description_en": "Web development using WordPress, Drupal and PHP frameworks. Web puzzles with HTML5 and PhaserJS. Backup automation using Bash scripts. Site optimization focused on performance and SEO. Server administration via Cpanel/SSH. Project deployment on Google Cloud.",
      "technologies": ["PHP", "WordPress", "Drupal", "PhaserJS", "HTML5", "JavaScript", "Bash", "Google Cloud", "SEO"],
      "start_date": "2017-05",
      "end_date": "2020-02",
      "order": 6
    }
  }' | grep -o '"company":"[^"]*"'

# 7. EyS Soluciones
curl -s -X POST "$BASE/databases/$DB/collections/$COL/documents" \
  -H "Content-Type: application/json" \
  -H "X-Appwrite-Project: $PROJECT" \
  -H "X-Appwrite-Key: $KEY" \
  -d '{
    "documentId": "unique()",
    "data": {
      "company": "EyS Soluciones Empresariales IT SA",
      "position_es": "Analista de Soporte Técnico",
      "position_en": "Technical Support Analyst",
      "description_es": "Soporte técnico de nivel 1. Mantenimiento preventivo y correctivo de equipos de cómputo. Configuración de equipos, correo electrónico y soporte general de red. Recuperación de información en discos duros.",
      "description_en": "Level 1 technical support. Preventive and corrective maintenance of computer equipment. Equipment configuration, email and general network support. Data recovery from hard drives.",
      "technologies": ["Hardware", "Networking", "MySQL"],
      "start_date": "2016-12",
      "end_date": "2017-03",
      "order": 7
    }
  }' | grep -o '"company":"[^"]*"'

# 8. Aviation Safety
curl -s -X POST "$BASE/databases/$DB/collections/$COL/documents" \
  -H "Content-Type: application/json" \
  -H "X-Appwrite-Project: $PROJECT" \
  -H "X-Appwrite-Key: $KEY" \
  -d '{
    "documentId": "unique()",
    "data": {
      "company": "Aviation Safety & SMS Soluciones",
      "position_es": "Desarrollador Web",
      "position_en": "Web Developer",
      "description_es": "Desarrollo y modificación de módulos de sistemas de información. Mantenimiento de software, administración, optimización y recuperación de bases de datos MySQL.",
      "description_en": "Development and modification of information system modules. Software maintenance, administration, optimization and recovery of MySQL databases.",
      "technologies": ["PHP", "MySQL", "Web Applications"],
      "start_date": "2016-05",
      "end_date": "2016-09",
      "order": 8
    }
  }' | grep -o '"company":"[^"]*"'

# 9. Academy Maxon
curl -s -X POST "$BASE/databases/$DB/collections/$COL/documents" \
  -H "Content-Type: application/json" \
  -H "X-Appwrite-Project: $PROJECT" \
  -H "X-Appwrite-Key: $KEY" \
  -d '{
    "documentId": "unique()",
    "data": {
      "company": "Academy Maxon - Official & Professional Training",
      "position_es": "Desarrollador de Software para Web",
      "position_en": "Web Software Developer",
      "description_es": "Desarrollo y mantenimiento del sistema web de la empresa.",
      "description_en": "Development and maintenance of the company web system.",
      "technologies": ["PHP", "Web Applications"],
      "start_date": "2015-11",
      "end_date": "2016-03",
      "order": 9
    }
  }' | grep -o '"company":"[^"]*"'

# 10. Colegio Colombo Hebreo
curl -s -X POST "$BASE/databases/$DB/collections/$COL/documents" \
  -H "Content-Type: application/json" \
  -H "X-Appwrite-Project: $PROJECT" \
  -H "X-Appwrite-Key: $KEY" \
  -d '{
    "documentId": "unique()",
    "data": {
      "company": "Colegio Colombo Hebreo",
      "position_es": "Desarrollador de Software",
      "position_en": "Software Developer",
      "description_es": "Mantenimiento preventivo y correctivo de computadores. Desarrollo de módulos del sistema de gestión académica.",
      "description_en": "Preventive and corrective computer maintenance. Development of modules for the academic management system.",
      "technologies": ["PHP", "Web Applications"],
      "start_date": "2013-12",
      "end_date": "2014-06",
      "order": 10
    }
  }' | grep -o '"company":"[^"]*"'

echo "Experiencias cargadas!"