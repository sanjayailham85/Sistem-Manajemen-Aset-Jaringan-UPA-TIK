import toast from "react-hot-toast";

export const notifyCreate = (module) => {
  toast.success(`Berhasil menambah ${module}`);
};

export const notifyUpdate = (module) => {
  toast.success(`Berhasil update ${module}`);
};

export const notifyDelete = (module) => {
  toast.success(`Berhasil menghapus ${module}`);
};
export const notifyImport = () => {
  toast.success(`Berhasil import data`);
};
export const notifyExport = () => {
  toast.success(`Berhasil export data`);
};

export const notifyError = () => {
  toast.error(`Terjadi kesalahan. Silakan coba lagi.`);
};
export const notifyImportError = () => {
  toast.error(`Data tidak valid.`);
};
export const notifyDeleteError = (module) => {
  toast.error(
    `${module} Tidak bisa dihapus karena masih ada perangkat yang terdaftar`
  );
};
