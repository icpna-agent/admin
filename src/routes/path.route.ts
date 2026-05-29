import { ApiField } from 'api/backend.api';

// Fallback if backend API doesn't have it yet, assuming Rol is 'admin' | 'empleado' based on given code
type Rol = 'admin' | 'empleado'; // Temporarily hardcoded for safety. If backend has 'roles', you can use the generic ApiField.

export type PathNode = {
  _path: string;
  [key: string]: any;
};

export function buildPath(node: PathNode): string {
  const findFullPath = (obj: any, target: PathNode, path: string[] = []): string[] | null => {
    if (!obj || typeof obj !== 'object') return null;

    if (obj === target) {
      return path;
    }

    for (const key in obj) {
      if (key === '_path') continue;

      const value = obj[key];
      const nextPath =
        '_path' in obj && typeof obj._path === 'string' ? [...path, obj._path] : path;

      const result = findFullPath(value, target, nextPath);
      if (result) return result;
    }

    return null;
  };

  const fullPath = findFullPath(PATH, node);

  if (!fullPath) {
    return node._path ?? '';
  }

  return [...fullPath, node._path].filter(Boolean).join('/');
}

export function getPath(node: PathNode): string {
  return node._path;
}

export const PATH = {
  auth: {
    _path: 'auth',
    signIn: { _path: 'sign-in' },
    signUp: { _path: 'sign-up' },
  },
  admin: {
    _path: 'admin',
    dashboard: {
      _path: 'dashboard',
    },
    book: {
      _path: 'book',
      list: { _path: 'list' },
      edit: { _path: 'edit/:id' },
    },
    index: {
      _path: 'index',
      list: { _path: 'list' },
      edit: { _path: 'edit/:id' },
    },
    unit: {
      _path: 'unit',
      list: { _path: 'list' },
      edit: { _path: 'edit/:id' },
    },
    lesson: {
      _path: 'lesson',
      list: { _path: 'list' },
      edit: { _path: 'edit/:id' },
    },
    panel: {
      _path: 'panel',
      list: { _path: 'list' },
      edit: { _path: 'edit/:id' },
    },
    audio: {
      _path: 'audio',
      list: { _path: 'list' },
      edit: { _path: 'edit/:id' },
    },
    image: {
      _path: 'image',
      list: { _path: 'list' },
      edit: { _path: 'edit/:id' },
    },
  },
  error: {
    _path: 'error',
    unauthorized: { _path: 'unauthorized' },
  },
} as const;

export const ROUTE_CONFIG = {
  // Rutas por defecto según el nivel
  defaultRoutes: {
    admin: buildPath(PATH.admin.book.list),
    empleado: buildPath(PATH.admin.book.list),
  } as Record<Rol, string>,

  routeAccess: {
    // Book
    [buildPath(PATH.admin.book)]: ['admin', 'empleado'],
    [buildPath(PATH.admin.book.list)]: ['admin', 'empleado'],
    [buildPath(PATH.admin.book.edit)]: ['admin'],

    // Index
    [buildPath(PATH.admin.index)]: ['admin', 'empleado'],
    [buildPath(PATH.admin.index.list)]: ['admin', 'empleado'],
    [buildPath(PATH.admin.index.edit)]: ['admin'],

    // Unit
    [buildPath(PATH.admin.unit)]: ['admin', 'empleado'],
    [buildPath(PATH.admin.unit.list)]: ['admin', 'empleado'],
    [buildPath(PATH.admin.unit.edit)]: ['admin'],

    // Lesson
    [buildPath(PATH.admin.lesson)]: ['admin', 'empleado'],
    [buildPath(PATH.admin.lesson.list)]: ['admin', 'empleado'],
    [buildPath(PATH.admin.lesson.edit)]: ['admin'],

    // Panel
    [buildPath(PATH.admin.panel)]: ['admin', 'empleado'],
    [buildPath(PATH.admin.panel.list)]: ['admin', 'empleado'],
    [buildPath(PATH.admin.panel.edit)]: ['admin'],

    // Audio
    [buildPath(PATH.admin.audio)]: ['admin', 'empleado'],
    [buildPath(PATH.admin.audio.list)]: ['admin', 'empleado'],
    [buildPath(PATH.admin.audio.edit)]: ['admin'],

    // Image
    [buildPath(PATH.admin.image)]: ['admin', 'empleado'],
    [buildPath(PATH.admin.image.list)]: ['admin', 'empleado'],
    [buildPath(PATH.admin.image.edit)]: ['admin'],

    // Errors
    [buildPath(PATH.error.unauthorized)]: ['admin', 'empleado'],
  } as Record<string, Rol[]>,
};

export function canAccessRoute(route: string, roles: string[]): boolean {
  let allowedRols = ROUTE_CONFIG.routeAccess[route];

  if (!allowedRols) {
    const rules = Object.entries(ROUTE_CONFIG.routeAccess);
    for (const [pathPattern, rolesConfig] of rules) {
      const regexStr = '^' + pathPattern.replace(/:[^\s/]+/g, '([^/]+)') + '$';
      const regex = new RegExp(regexStr);
      if (regex.test(route)) {
        allowedRols = rolesConfig;
        break;
      }
    }
  }

  if (!allowedRols) return true;
  return roles.some((role) => allowedRols.includes(role as Rol));
}

export function getDefaultRoute(roles: string[]): string {
  const role = roles[0];
  return ROUTE_CONFIG.defaultRoutes[role as Rol] || buildPath(PATH.admin.book.list);
}
