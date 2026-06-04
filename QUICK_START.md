# 🚀 Guía Rápida - Componentes Reutilizables

## 1️⃣ Loader - Componente de Carga

### Importar
```tsx
import Loader from '@/components/Loader';
```

### Usar - Modo Normal
```tsx
<Loader 
  size="md" 
  message="Cargando usuarios..." 
/>
```

### Usar - Pantalla Completa
```tsx
<Loader 
  fullPage 
  message="Por favor espera..." 
/>
```

### Tamaños disponibles
- `sm` - Pequeño
- `md` - Mediano (por defecto)
- `lg` - Grande

---

## 2️⃣ EmptyState - Estado Vacío

### Importar
```tsx
import EmptyState from '@/components/EmptyState';
```

### Usar - Básico
```tsx
<EmptyState
  title="No hay usuarios"
  description="Crea el primer usuario para comenzar"
/>
```

### Usar - Con Acción
```tsx
<EmptyState
  title="No hay datos"
  description="Comienza agregando un elemento"
  action={{
    label: "+ Crear",
    onClick: () => openModal()
  }}
/>
```

### Usar - Con Ícono Personalizado
```tsx
<EmptyState
  icon="🚀"
  title="Listo para empezar"
  description="Tu espacio está vacío"
  action={{
    label: "Comenzar",
    onClick: () => {}
  }}
/>
```

---

## 3️⃣ Pagination - Paginación

### Importar
```tsx
import Pagination from '@/components/Pagination';
```

### Usar - Modo Completo
```tsx
<Pagination
  pagination={paginationData}
  currentPage={page}
  onPreviousPage={() => loadData(page - 1)}
  onNextPage={() => loadData(page + 1)}
/>
```

### Usar - Modo Compacto (para modales)
```tsx
<Pagination
  pagination={pagination}
  currentPage={currentPage}
  onPreviousPage={handlePrev}
  onNextPage={handleNext}
  compact={true}
/>
```

---

## 📋 Patrón de Uso Completo

```tsx
'use client';

import { useState } from 'react';
import Loader from '@/components/Loader';
import EmptyState from '@/components/EmptyState';
import Pagination from '@/components/Pagination';

export default function MyPage() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState(null);
  const [page, setPage] = useState(1);

  const loadData = async (newPage) => {
    setLoading(true);
    try {
      // Tu lógica de API
      const response = await fetch(`/api/data?page=${newPage}`);
      const result = await response.json();
      setData(result.data);
      setPagination(result.pagination);
      setPage(newPage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      {loading ? (
        <Loader message="Cargando..." />
      ) : data.length === 0 ? (
        <EmptyState
          title="Sin resultados"
          action={{
            label: "+ Agregar",
            onClick: () => {}
          }}
        />
      ) : (
        <>
          {/* Tu tabla o lista */}
          {data.map(item => (
            <div key={item.id}>{item.name}</div>
          ))}
          
          {/* Paginación */}
          <Pagination
            pagination={pagination}
            currentPage={page}
            onPreviousPage={() => loadData(page - 1)}
            onNextPage={() => loadData(page + 1)}
          />
        </>
      )}
    </div>
  );
}
```

---

## 🎨 Personalización de Estilos

Los componentes usan Tailwind puro, así que puedes:

### Modificar Loader
```tsx
// En Loader.tsx, cambiar los colores:
// border-t-slate-900 → border-t-blue-600
// border-slate-200 → border-blue-100
```

### Modificar EmptyState
```tsx
// En EmptyState.tsx, cambiar:
// bg-slate-50 → bg-gray-50
// text-slate-900 → text-gray-900
```

### Modificar Pagination
```tsx
// En Pagination.tsx, cambiar clases de botones
// border-slate-300 → border-gray-300
```

---

## ⚡ Tips de Performance

1. **Lazy load modales**
   ```tsx
   {isOpen && <ModalConPaginacion />}
   ```

2. **Memoizar componentes largos**
   ```tsx
   const MemoizedTable = memo(Table);
   ```

3. **Usar keys correctas**
   ```tsx
   {data.map(item => (
     <Row key={item.id} />
   ))}
   ```

---

## 🐛 Troubleshooting

### "Cannot find module Loader"
- ✅ Verifica que el archivo esté en `/components/Loader.tsx`
- ✅ Recarga el IDE (Ctrl+Shift+P → Reload)

### Loader no gira
- ✅ Verifica que `animate-spin` esté en Tailwind config
- ✅ Asegúrate que el CSS esté compilado

### EmptyState se ve roto
- ✅ Verifica que tengas Tailwind v4 instalado
- ✅ Usa `@tailwindcss/postcss v4` mínimo

### Pagination deshabilitado incorrectamente
- ✅ Asegúrate que `pagination.hasNextPage` sea boolean
- ✅ Verifica la estructura del objeto ResponsePagination

---

## 📚 Documentación Completa

Ver [DESIGN_IMPROVEMENTS.md](./DESIGN_IMPROVEMENTS.md) para:
- Props detalladas
- Ejemplos avanzados
- Mejoras futuras
- Notas técnicas
- Responsive design

---

**Última actualización:** 2026-06-04  
**Versión de Tailwind:** v4+
