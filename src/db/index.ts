import { drizzle } from "drizzle-orm/d1";
import { getCloudflareContext } from "@opennextjs/cloudflare";
import * as schema from "./schema";
import { cache } from "react";

// Crea un cliente de Drizzle por request usando el binding D1 de Cloudflare Workers.
// Usamos `cache` de React para reutilizar la misma instancia dentro de una misma request
// sin que quede en el scope global (Workers no permite I/O desde scope global).
export const getDb = cache(() => {
  const { env } = getCloudflareContext();
  return drizzle((env as any).GEOHERE_DB, { schema });
});

// Alias para que el código existente que usa `db` siga compilando sin cambios.
// En cada route handler, sustituye `db` por `getDb()` para que sea compatible con Workers.
export const db = new Proxy({} as ReturnType<typeof getDb>, {
  get(_target, prop) {
    return (getDb() as any)[prop];
  },
});
