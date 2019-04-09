import { UploadedFile } from "types";
import { AxiosInstance } from "axios";

export const uploadFile = async (
  file: File,
  route: string,
  axiosInstance: AxiosInstance,
  onProgress?: (precent: number) => void,
) => {
  const form = new FormData();
  form.append("file", file);

  const response = await axiosInstance.post(route, form, {
    headers: { "Content-Type": "multipart/form-data" },
    onUploadProgress: ({ loaded, total }) =>
      onProgress && onProgress((loaded / total) * 100)
  });

  return response.data as UploadedFile;
};