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

export const notifyError = () => {
  toast.error(`Terjadi kesalahan. Silakan coba lagi.`);
};
export const notifyDeleteError = (module) => {
  toast.error(
    `${module} tidak bisa dihapus karena masih ada perangkat yang terdaftar`
  );
};
