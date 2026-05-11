import pdfMake from 'pdfmake/build/pdfmake';
import pdfMakeThaiVfsSource from 'pdfmake-thai/build/vfs_fonts?raw';

let initialized = false;

export function ensurePdfMake() {
  if (initialized && pdfMake.vfs) {
    return pdfMake;
  }

  if (!globalThis.pdfMake) {
    globalThis.pdfMake = pdfMake;
  }

  if (!globalThis.pdfMake.vfs || !globalThis.pdfMake.vfs['THSarabunNew.ttf']) {
    Function(pdfMakeThaiVfsSource).call(globalThis);
  }

  if (!globalThis.pdfMake?.vfs) {
    throw new Error('Failed to initialize pdfMake VFS');
  }

  pdfMake.vfs = globalThis.pdfMake.vfs;
  globalThis.pdfMake = pdfMake;
  initialized = true;

  return pdfMake;
}

const pdfMakeProxy = new Proxy(pdfMake, {
  get(target, prop) {
    ensurePdfMake();
    const value = target[prop];

    return typeof value === 'function' ? value.bind(target) : value;
  },
  set(target, prop, value) {
    ensurePdfMake();
    target[prop] = value;
    return true;
  },
});

export default pdfMakeProxy;
