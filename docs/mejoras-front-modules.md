  Cómo lo hacen las apps grandes

  No es "un hook por módulo" — es separar el ciclo de vida del fetch de datos. En apps grandes (Shopify,
  Linear, Vercel) el patrón dominante es:

  1. TanStack Query / React Query para todo lo que es datos. El init del módulo no hace fetch manual en un
  useEffect con loading a mano. En su lugar: useQuery declarativa con enabled (espera workspaceId), staleTime,
  cache, refetch on focus/reconnect, y los estados isLoading/isError/data gratis. Nada de "cargar al montar" —
  cada pieza de datos se autogestiona y se invalida con queryClient.invalidateQueries. Vos ya tenés
  @tanstack/react-query en dependencias y el módulo contacts ya lo usa (useListContacts) — el chat todavía no.

  1. Suscripciones en un hook dedicado con cleanup correcto. Websocket, listeners globales, focus/visibility,
  polling → un solo useEffect con return () => que desuscribe. Es lo que te dejé en useChatEvents, pero para
  apps grandes el socket se arma con useEffect que maneja reconnect y depura la sala en el cleanup (no solo
  emit).
  2. Guards a nivel de ruta/provider, no en hooks. "Si no hay workspace, no renderizar el módulo" es un
  middleware de layout/route o un <Guard> en el provider — no un if dentro del init. Esto evita que cada módulo
   repita el guard.
  3. Máquinas de estado (XState) para flujos complejos. Cuando el init orquesta transiciones (loading → ready →
   error, con reintentos y eventos que cambian el estado), un hook con useEffect se vuelve frágil; XState lo
  modela explícito. Es el paso siguiente si el init crece.
  4. Los "efectos de sync" (tu watcher de workspace) sí van en hooks — eso es correcto y universal: cuando una
  dependencia externa cambia (workspace, usuario), un hook dedicado reactúa. Eso lo hiciste bien.

  Conclusión para tu caso: lo que armaste (init + watcher + events + breadcrumb como hooks, padre solo
  composición) es el paso correcto de estructura. El siguiente salto de calidad, cuando el chat crezca, es
  mover los ListChatsAction/ListConversationFiltersAction de "fetch en useEffect" a useQuery con cache — ahí el
   init hook se queda solo orquestando lo que Query no cubre (socket, guards, breadcrumb).