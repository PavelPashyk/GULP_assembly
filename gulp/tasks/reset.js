import { deleteAsync } from "del";

//удаляет автомотически файлы в dist/files которые мы удалили в src/files
export const reset = () => {
    return deleteAsync(["dist"]);
};
