# Descripción del proyecto
Este proyecto es una aplicación construida en **ReactJS**, inicializado utilizando **Vite**. El objetivo principal fue crear una interfaz simple en la que un usuario pueda pegar su API Key de OpenAI y una idea de startup, y obtener una respuesta generada por el modelo.

La autenticación de usuarios se implementó con **Supabase Auth**, utilizando _magic links_, siguiendo la [guía de inicio rápido](https://supabase.com/docs/guides/auth/quickstarts/react).

Se puede acceder a la aplicación mediante el siguiente link: https://millonaria-o-piramidal.vercel.app
## Interfaz
- El diseño fue creado usando **[v0](https://v0.dev/)** como punto de partida
- Empecé por la **landing page**, trabajando primero en la estructura HTML y luego estilando directamente desde el **inspector del navegador**, usando CSS puro
- Para el sistema de rutas usé **React Router**, definiendo una _protected route_ para la `/home`, que solo se puede acceder si el usuario está autenticado.
- Una vez la autenticación estuvo resuelta, creé la **home page**, que contiene un formulario simple:
    - Un campo para ingresar la API Key de OpenAI
    - Un textarea para pegar una idea de startup
- El formulario fue creado usando **React Hook Form**, y los componentes de entrada son de la librería **Mantine UI**, con estilos propios.
- La lógica para llamar a la API de OpenAI se encapsuló en una función externa. Para evitar consumir crédito durante el desarrollo, utilicé la extensión de Firefox **Tweak**, que permite mockear requests HTTP.
## Base de datos
Para almacenar la información relacionada a cada usuario (como su tipo de cuenta y el uso de prompts), creé una tabla `profiles` en Supabase:
```sql
create table profiles (
  id uuid primary key references auth.users(id),
  tier text not null default 'free', -- 'free' o 'pro'
  prompts_used int not null default 0,
  updated_at timestamp default now()
);
```

Activé **RLS (Row Level Security)** y agregué una policy básica:
```sql
alter table profiles enable row level security;

create policy "Users can access their own profile" on profiles
  for all
  using (auth.uid() = id);
```

Creé un trigger para insertar automáticamente una fila en `profiles` cuando se registra un nuevo usuario:
```sql
create or replace function handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id)
  values (new.id);
  return new;
end;
$$ language plpgsql security definer;
```

Como ya me había registrado, agregué manualmente las filas faltantes:
```sql
insert into public.profiles (id)
select id
from auth.users
where id not in (select id from public.profiles);
```
## Deployment
Para desplegar el proyecto, usé **Vercel**:
- Creé una cuenta y la conecté con mi repositorio de GitHub.
- Vercel se encargó del build y deployment automático.
- Configuré la URL a la que Supabase redirige una vez completada la autenticación, apuntando a la versión desplegada del proyecto en Vercel.
## Cosas que me hubiera gustado hacer
- Una pequeña guía visual sobre dónde conseguir la **API Key de OpenAI**
- **Responsive design**: adaptar la UI para pantallas móviles
- Mejor manejo de errores, sobre todo en:
    - fallos al consultar la API
    - errores al actualizar la base de datos
- **Validaciones** más robustas, especialmente en el campo de la API Key
- Que los cambios de **account tier** (ej. pasar de free a pro) se reflejen automáticamente sin necesidad de refrescar
- Usar una función de incremento (`rpc`) o trigger SQL para actualizar `prompts_used` sin tener que hacer dos queries
- Implementar un **modal (mockeado) de Stripe** para pagos
	- Como solución temporal, el botón "Versión Pro" en el navbar permite regalar acceso Pro a los usuarios que lo acepten
